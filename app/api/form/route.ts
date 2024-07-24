import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import { Options } from "nodemailer/lib/smtp-transport";

interface Data {
    nameSurname: string;
    email: string;
    message: string;
    phone: string;
    token: string;
}

const handlebarOptions: hbs.NodemailerExpressHandlebarsOptions = {
    viewEngine: {
        extname: ".handlebars",
        partialsDir: path.resolve("./templates/"),
        defaultLayout: false,
    },
    viewPath: path.resolve("./templates/"),
    extName: ".handlebars",
};

export async function POST(request: NextRequest) {
    const data: Data = await request.json();
    const { nameSurname, email, phone, message, token } = data;

    const human = await validateHuman(token);
    if (!human) {
        return NextResponse.json({ errors: ["It's a bot! ❤️ ❌ 🤖"] }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        port: 465,
        secure: true,
        host: process.env.CONTACT_FORM_HOST,
        auth: {
            user: process.env.CONTACT_FORM_SEND_EMAIL,
            pass: process.env.CONTACT_FORM_PASS,
        },
        tls: { rejectUnauthorized: false },
    } as Options);

    transporter.use("compile", hbs(handlebarOptions));

    try {
        await transporter.sendMail({
            from: `${nameSurname} <${email}>`,
            replyTo: email,
            to: process.env.CONTACT_FORM_RECEIVE_EMAIL,
            subject: `Contact form from ${nameSurname}`,
            template: "contact",
            context: {
                nameSurname,
                email,
                phone,
                message,
            },
        } as nodemailer.SendMailOptions);

        await transporter.sendMail({
            from: `Pablo Hermosa <${process.env.CONTACT_FORM_SEND_EMAIL}>`,
            to: email,
            subject: "Thank you for your message",
            template: "contact",
            context: {
                nameSurname,
                email,
                phone,
                message,
            },
        } as nodemailer.SendMailOptions);

        return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "an error occurred" }, { status: 500 });
    }
}

async function validateHuman(token: string): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        {
            method: "POST",
        }
    );
    const data = await response.json();
    return data.success;
}