import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";

//cookies
import { nextCookies } from "better-auth/next-js";
import { Db } from "mongodb";

// singleton instance : ensures we only create 1 instance no multiple connections
let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {

  
  if (authInstance) return authInstance;

  // connect to db
  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db as unknown as Db;

  // check if db connection work
  if (!db) throw new Error("db connection not founds");

  // define type of adaptor
  authInstance = betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    plugins: [nextCookies()],
  });

  return authInstance;
};

export const auth = await getAuth();
