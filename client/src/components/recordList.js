import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    maxWidth: "750px",
  },
};

const ReportModal = ({ isOpen, onRequestClose, report, filteredBooks }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyles}
      contentLabel="Report Modal"
    >
      <h2>Report</h2>
      <div>
        <p>Total Books: {report.totalBooks}</p>
        <p>Max Holds: {report.maxHolds}</p>
        <p>Average Page Number: {report.avgPageNumber}</p>
        <p>Average Holds: {report.avgHolds}</p>
      </div>
      <h4>Filtered Books</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Page Number</th>
            <th>Availability</th>
            <th>Holds</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.pageNumber}</td>
              <td>{book.availability ? "Available" : "Not Available"}</td>
              <td>{book.holds}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={onRequestClose}
        style={{
          border: "none",
          backgroundColor: "#cccdcf",
          borderRadius: 12,
        }}
        onMouseEnter={(e) => { e.target.style.backgroundColor = "#8c8c8c"; }}
        onMouseLeave={(e) => { e.target.style.backgroundColor = "#cccdcf"; }}
      >
        Close
      </button>
    </Modal>
  );
};

const BookEntry = (props) => (
  <tr>
    <td>{props.book.title}</td>
    <td>{props.book.author}</td>
    <td>{props.book.genre}</td>
    <td>{props.book.pageNumber}</td>
    <td>{props.book.availability ? "Available" : "Not Available"}</td>
    <td>{props.book.holds}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.book._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteBook(props.book._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [reportModalIsOpen, setReportModalIsOpen] = useState(false);
  const [report, setReport] = useState([]);
  const [filters, setFilters] = useState({
    genre: "",
    availability: "",
    author: "",
  });

  useEffect(() => {
    async function getBooks() {
      const response = await fetch(`http://localhost:5050/books/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      const uniqueAuthors = [...new Set(data.map(book => book.author))];
      setAuthors(uniqueAuthors);
      const uniqueGenres = [...new Set(data.map(book => book.genre))];
      setGenres(uniqueGenres);
      setBooks(data);
    }
    getBooks();
    return;
  }, [books.length]);

  // delete book
  async function deleteBook(bookId) {
    try {
      await fetch(`http://localhost:5050/books/${bookId}`, {
        method: "DELETE",
      });
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  async function genReport() {
    let filteredBooks = books;

    if (filters.genre) {
      filteredBooks = filteredBooks.filter((book) => book.genre === filters.genre);
    }
    if (filters.availability !== "") {
      const availability = filters.availability === "true";
      filteredBooks = filteredBooks.filter((book) => book.availability === availability);
    }
    if (filters.author) {
      filteredBooks = filteredBooks.filter((book) => book.author === filters.author);
    }
  
    const totalBooks = filteredBooks.length;
    let totalPageNumber = 0;
    for (let i = 0; i < filteredBooks.length; i++) {
      totalPageNumber += Number(filteredBooks[i].pageNumber);
    }
    let totalHolds = 0;
    let maxHolds = 0;
    for (let i = 0; i < filteredBooks.length; i++) {
      maxHolds = Math.max(maxHolds, filteredBooks[i].holds);
      totalHolds += Number(filteredBooks[i].holds);
    }
    const avgPageNumber = totalPageNumber / totalBooks || 0;
    const avgHolds = totalHolds / totalBooks || 0;
    
    setReportModalIsOpen(true);
    setReport({ totalBooks, avgPageNumber, maxHolds, avgHolds });
    setFilteredBooks(filteredBooks);
  }

  function renderBookList() {
    return books.map((book) => {
      return (
        <BookEntry
          book={book}
          deleteBook={() => deleteBook(book._id)}
          key={book._id}
        />
      );
    });
  }

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  }

  return (
    <div>
      <h3>Your Personal Library</h3>
      <h5 style={{ marginTop: 30 }}>Filters</h5>
      <div className="filters">
        <label style={{ marginRight: 20 }}>
          Genre:
          <select
            name="genre"
            value={filters.genre}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>
        <label style={{ marginRight: 20 }}>
          Availability:
          <select
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </label>
        <label style={{ marginRight: 20 }}>
          Author:
          <select
            name="author"
            value={filters.author}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={genReport}
          style={{
            border: "none",
            backgroundColor: "#cccdcf",
            borderRadius: 12,
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = "#8c8c8c"; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = "#cccdcf"; }}
        >
          Generate Report
        </button>
        <ReportModal
  isOpen={reportModalIsOpen}
  onRequestClose={() => setReportModalIsOpen(false)}
  report={report}
  filteredBooks={filteredBooks}
/>
      </div>
      <table className="table" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Page Number</th>
            <th>Availability</th>
            <th>Holds</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderBookList()}</tbody>
      </table>
    </div>
  );
}
