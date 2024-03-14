import { MongoClient } from "mongodb";
// import mongoose from 'mongoose';

const connectionString = "mongodb+srv://sarr:hellohello@cluster0.ns32rdv.mongodb.net/?retryWrites=true&w=majority";
// await mongoose.connect("mongodb+srv://sarr:hellohello@cluster0.ns32rdv.mongodb.net/?retryWrites=true&w=majority");

const client = new MongoClient(connectionString);

let conn;
try {
  console.log("Connecting to MongoDB Atlas...");
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("sample_training");

export default db;