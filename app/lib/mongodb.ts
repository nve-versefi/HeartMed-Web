// src/app/lib/mongodb.ts

import { MongoClient } from "mongodb";

if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.MONGODB_URI || !process.env.DB_NAME) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const encodedUsername = encodeURIComponent(process.env.DB_USERNAME);
const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);

const uri = `${process.env.MONGODB_URI.replace("mongodb+srv://", `mongodb+srv://${encodedUsername}:${encodedPassword}@`)}/?retryWrites=true&w=majority&appName=JaviHermosa`;

const options = {};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClient = client;
  } else {
    client = globalWithMongo._mongoClient;
  }
} else {
  client = new MongoClient(uri, options);
}

export default async function connect() {
  await client.connect();
  return client;
}
