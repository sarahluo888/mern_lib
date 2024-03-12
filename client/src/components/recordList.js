import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BookEntry = (props) => (
  <tr>
    <td>{props.book.title}</td>
    <td>{props.book.author}</td>
    <td>{props.book.genre}</td>
    <td>{props.book.publicationYear}</td>
    <td>{props.book.availability ? "Available" : "Not Available"}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.book._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteBook(props.book._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
//  <tr>
//    <td>{props.record.name}</td>
//    <td>{props.record.position}</td>
//    <td>{props.record.level}</td>
//    <td>
//      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
//      <button className="btn btn-link"
//        onClick={() => {
//          props.deleteRecord(props.record._id);
//        }}
//      >
//        Delete
//      </button>
//    </td>
//  </tr>
);

export default function BookList() {
  const [books, setBooks] = useState([]);

  // Fetch books from the database
  // useEffect(() => {
  //   async function fetchBooks() {
  //     try {
  //       const response = await fetch("http://localhost:5050/books");
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setBooks(data);
  //     } catch (error) {
  //       console.error("Error fetching books:", error);
  //     }
  //   }

  //   fetchBooks();
  // }, []);

   useEffect(() => {
   async function getBooks() {
     const response = await fetch(`http://localhost:5050/books/`);
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const data = await response.json();
     setBooks(data);
   }

   getBooks();

   return;
 }, [books.length]);

  // Delete book
  async function deleteBook(bookId) {
    try {
      await fetch(`http://localhost:5050/books/${bookId}`, {
        method: "DELETE"
      });
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

// export default function RecordList() {
//  const [records, setRecords] = useState([]);

//  // This method fetches the records from the database.
//  useEffect(() => {
//    async function getRecords() {
//      const response = await fetch(`http://localhost:5050/record/`);

//      if (!response.ok) {
//        const message = `An error occurred: ${response.statusText}`;
//        window.alert(message);
//        return;
//      }

//      const records = await response.json();
//      setRecords(records);
//    }

//    getRecords();

//    return;
//  }, [records.length]);

//  // This method will delete a record
//  async function deleteRecord(id) {
//    await fetch(`http://localhost:5050/record/${id}`, {
//      method: "DELETE"
//    });

//    const newRecords = records.filter((el) => el._id !== id);
//    setRecords(newRecords);
//  }

 // This method will map out the records on the table
//  function recordList() {
//    return records.map((record) => {
//      return (
//        <Record
//          record={record}
//          deleteRecord={() => deleteRecord(record._id)}
//          key={record._id}
//        />
//      );
//    });
//  }
function renderBookList() {
  return books.map((book) => 
 { return (  <BookEntry
      book={book}
      deleteBook={() => deleteBook(book._id)}
      key={book._id}
    />)}
  );
}

 // This will display the table with the records of individuals.
 return (
  <div>
  <h3>Book List</h3>
  <table className="table" style={{ marginTop: 20 }}>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Genre</th>
        <th>Publication Year</th>
        <th>Availability</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>{renderBookList()}</tbody>
  </table>
</div>
 );
}
