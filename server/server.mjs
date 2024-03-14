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
// pre existing collection
// const Author = mongoose.model('Author', AuthorModel.schema, 'author');
// router.getAuthors = async () => {
//   const post = await db.collection('author').findOne({});
//   console.log(post.name)
// }

// app.get('/authors', async (req, res) => {
//   try {
//     // const authors = await Author.find();
//     const authors = await db.collection('author').findOne({});
//   // console.log(post.name)
//     console.log("Authors retrieved:", authors);
//     res.json(authors);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.use(cors());
app.use(express.json());

app.use("/books", books);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
