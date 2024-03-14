import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// router.getAuthors = async () => {
//   const post = await db.collection('author').findOne({});
//   console.log(post.name)
// }

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("book");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("book");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    pageNumber: req.body.pageNumber,
    availability: req.body.availability,
  };
  let collection = await db.collection("book");
  const authorCollection = await db.collection("author");
  const genreCollection = await db.collection("genre");

  // Check if author exists
  const existingAuthor = await authorCollection.findOne({
    name: req.body.author,
  });
  if (!existingAuthor) {
    await authorCollection.insertOne({ name: req.body.author });
  }

  const existingGenre = await genreCollection.findOne({
    name: req.body.genre,
  });
  if (!existingGenre) {
    await genreCollection.insertOne({ name: req.body.genre });
  }

  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const bookCollection = await db.collection("book");
  const authorCollection = await db.collection("author");
  const genreCollection = await db.collection("genre");

  const book = await bookCollection.findOne(query);
  const originalAuthor = book.author;
  const originalGenre = book.genre;
  const updates = {
    $set: {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      pageNumber: req.body.pageNumber,
      availability: req.body.availability,
    },
  };
  let result = await bookCollection.updateOne(query, updates);

  const otherBooksByOriginalAuthor = await bookCollection.find({ author: originalAuthor }).toArray();
  if (otherBooksByOriginalAuthor.length === 0) {
    await authorCollection.deleteOne({ name: originalAuthor });
  }
  const newAuthorName = req.body.author;
  let newAuthor = await authorCollection.findOne({ name: newAuthorName });
  if (!newAuthor) {
    await authorCollection.insertOne({ name: newAuthorName });
    newAuthor = { _id: authorCollection.insertedId };
  }

  const otherBooksInGenre = await bookCollection.find({ genre: originalGenre }).toArray();
  if (otherBooksInGenre.length === 0) {
    await genreCollection.deleteOne({ name: originalGenre });
  }
  const newGenreName = req.body.genre;
  let newGenre = await genreCollection.findOne({ name: newGenreName });
  if (!newGenre) {
    await genreCollection.insertOne({ name: newGenreName });
    newGenre = { _id: genreCollection.insertedId };
  }
  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const bookCollection = db.collection("book");
  const authorCollection = db.collection("author");
  const genreCollection = db.collection("genre");

  const book = await bookCollection.findOne(query);
  const authorName = book.author;
  const genreName = book.genre;

  let result = await bookCollection.deleteOne(query);
  const otherBooksByAuthor = await bookCollection
    .find({ author: authorName })
    .toArray();
  if (otherBooksByAuthor.length === 0) {
    await authorCollection.deleteOne({ name: authorName });
  }

  const otherBooksInGenre = await bookCollection
  .find({ genre: genreName })
  .toArray();
if (otherBooksInGenre.length === 0) {
  await genreCollection.deleteOne({ name: genreName });
}

  res.send(result).status(200);
});

export default router;
