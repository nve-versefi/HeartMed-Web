'use client'
import React, { useState, useRef} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";


const formSchema = z.object({
  nameSurname: z.string().min(1, { message: "Se requiere nombre completo" }),
  email: z.string().min(1, { message: "Se requiere email" }).email({
    message: "Introduzca una dirección email válida por favor",
  }),
  phone: z
    .string()
    .min(1, { message: "Se requiere el número de teléfono" })
    .regex(/^(?:(?:\+|00)34)?[6789]\d{8}$/, {
      message: "Introduzca un número de teléfono válida por favor",
    }),
  message: z
    .string()
    .min(10, { message: "El mensaje debe ser mayor de 10 caracteres" })
    .max(1000, { message: "El mensaje debe ser menos de 1000 caracteres" }),
  termsAndConditions: z.boolean().refine((val) => val, { message: "Debe aceptar los términos de uso y la política de privacidad para enviar el mensaje" }),
  marketingCommunications: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Form: React.FC = () => {
  const [result, setResult] = useState<string>();
  const [resultColor, setResultColor] = useState<string>();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    // You can set default values for the form here for testing purposes
  
  });
  const processForm = async (data: FormData) => {
    const token = await recaptchaRef?.current?.executeAsync();
    recaptchaRef?.current?.reset();
    // @ts-ignore-next-line
    data["token"] = token || "";
    const config = {
      method: "post",
      url: "/api/form",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const response = await axios(config);
      if (response.status === 200) {
        // Handle success. You can change the message to whatever you want.
        setResult(
          "Your message has been sent. Thank you for contacting us. We will get back to you as soon as possible."
        );
        setResultColor("text-green-500");
        // Reset the form after successful submission
        reset();
      }
    } catch (err: any) {
      // Handle errors. You can change the message to whatever you want.
      setResult(err.response.data.message + ": " + err.response.statusText);
      setResultColor("text-red-500");
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)} noValidate>
      <div className="mb-4">
        <h2 className="text-center font-bold text-4xl text-thunderbird-500 mb-8 mt-16">Ponte en contacto con nosotros</h2>
        <div className="relative">
          {errors.nameSurname?.message ? (
            <FiUser className="w-6 h-6 absolute top-1/2 -translate-y-1/2 left-2 border-r pr-2 text-red-500" />
          ) : (
            <FiUser className="w-6 h-6 absolute top-1/2 -translate-y-1/2 left-2 border-r pr-2" />
          )}
          <input
            className={`shadow appearance-none outline-none border rounded w-full py-2 pl-10 text-gray-700 leading-tight duration-300
          ${errors.nameSurname?.message && "shadow-[0_0_0_2px] shadow-red-500"}
          `}
            type="text"
            placeholder="Nombre Completo"
            {...register("nameSurname")}
          />
        </div>
        {errors.nameSurname?.message && (
          <div className="text-red-500 text-xs mt-1">
            {errors.nameSurname?.message}
          </div>
        )}
      </div>
      <div className="mb-4">
        <div className="relative">
          {errors.email?.message ? (
            <FiMail className="w-6 h-6 absolute top-1/2 -translate-y-1/2 left-2 border-r pr-2 text-red-500" />
          ) : (
            <FiMail className="w-6 h-6 absolute top-1/2 -translate-y-1/2 left-2 border-r pr-2" />
          )}
          <input
            className={`shadow appearance-none outline-none border rounded w-full py-2 pl-10 text-gray-700  leading-tight duration-300
          ${errors.email?.message && "shadow-[0_0_0_2px] shadow-red-500"}
          `}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
        </div>
        {errors.email?.message && (
          <div className="text-red-500 text-xs mt-1">
            {errors.email?.message}
          </div>
        )}
      </div>
      <div className="mb-4">
        <div className="relative">
          {errors.phone?.message ? (
            <FiPhone className="w-6 h-6 text-red-500 absolute top-1/2 -translate-y-1/2 left-2 border-r pr-2" />
          ) : (
            <FiPhone className="w-6 h-6 absolute top-1/2 -translate-y-1/2 left-2 border-r pr-2" />
          )}
          <input
            className={`shadow appearance-none outline-none border rounded w-full py-2 pl-10 text-gray-700 leading-tight duration-300
          ${errors.phone?.message && "shadow-[0_0_0_2px] shadow-red-500"}
          `}
            type="tel"
            placeholder="Teléfono"
            {...register("phone")}
          />
        </div>
        {errors.phone?.message && (
          <div className="text-red-500 text-xs mt-1">
            {errors.phone?.message}
          </div>
        )}
      </div>
      <div className="mb-4">
        <textarea
          className={`shadow appearance-none outline-none border rounded w-full py-2 px-3 text-gray-700 leading-tight duration-300
          ${errors.message?.message && "shadow-[0_0_0_2px] shadow-red-500"}
          `}
          placeholder="Mensaje"
          rows={5}
          {...register("message")}
        ></textarea>
        {errors.message?.message && (
          <div className="text-red-500 text-xs mt-1">
            {errors.message?.message}
          </div>
        )}
      </div>
      <div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          size="invisible"
          ref={recaptchaRef}
          hl="en"
        />
      </div>
      <div className="flex gap-10 items-center justify-between">
        <button
          className={`${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          } bg-black hover:bg-gray-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline duration-300`}
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit(processForm)}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>

        {isSubmitSuccessful && (
          <div className={`text-right ${resultColor}`}>{result}</div>
        )}
      </div>
      <div className="flex flex-col mb-4">
  <label className="inline-flex items-center mt-4 ">
    <input
      type="checkbox"
      className="form-checkbox h-5 w-5 text-black border-gray-300 rounded focus:ring-0"
      {...register("termsAndConditions")}
    />
    <span className="ml-2 text-gray-700">Acepto los términos de uso y la política de privacidad</span>
  </label>
  <label className="inline-flex items-center mt-4">
    <input
      type="checkbox"
      className="form-checkbox h-5 w-5 text-black border-gray-300 rounded focus:ring-0"
      {...register("marketingCommunications")}
    />
    <span className="ml-2 text-gray-700">Acepto recibir comunicaciones de marketing</span>
  </label>
</div>
    </form>
  );
}

export default Form;