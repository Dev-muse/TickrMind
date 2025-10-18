import mongoose from "mongoose";
import { cache } from "react";

const MONGODB_URI = process.env.MONGODB_URI;

// CONFIG FOR MONGOOSE

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

// nextjs hotreload opens new connection on every change 
//func ensures we connect to mongodb database efficiently
//func stores connection in global cache so we don't have to constantly make new connection

export const connectToDatabase = async () => {
  if (!MONGODB_URI) throw new Error("MONGODB_URI must be set in .env");

  // if connection exists returns immediate
  if (cached.conn) return cached.conn;

  //no existing connection , new one made then caches it 
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  // if connection fails retries 
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  console.log(`Connected to database ${process.env.NODE_ENV} : ${MONGODB_URI}`)

  
  return cached.conn
};
