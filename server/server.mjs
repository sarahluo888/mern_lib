import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import books from "./routes/record.mjs";
// import mongoose from "mongoose";
// import AuthorModel from "./models/Author.js";
// import db from "./db/conn.mjs";

const PORT = 5050;
const app = express();

// await mongoose.connect("mongodb+srv://sarr:hellohello@cluster0.ns32rdv.mongodb.net/?retryWrites=true&w=majority");
app.use(cors());
app.use(express.json());

app.use("/books", books);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
