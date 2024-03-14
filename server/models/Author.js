import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
});

const Author = mongoose.model('Author', authorSchema, 'author');

export default Author;