import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    pageNumber: "",
    availability: true,
    holds: "",
    books: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const id = params.id.toString();
        const response = await fetch(`http://localhost:5050/books/${params.id.toString()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setForm(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        navigate("/");
      }
    }

    fetchData();
  }, [params.id, navigate]);

  // Update form state
  function updateForm(value) {
    setForm((prev) => ({
      ...prev,
      ...value
    }));
  }

  // Handle form submission
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const editedBook = {
        title: form.title,
        author: form.author,
        genre: form.genre,
        pageNumber: form.pageNumber,
        availability: form.availability,
        holds: form.holds,
      };

      await fetch(`http://localhost:5050/books/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(editedBook),
        headers: {
          "Content-Type": "application/json"
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  }

  return (
    <div>
      <h3>Edit Book</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={form.author}
            onChange={(e) => updateForm({ author: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            value={form.genre}
            onChange={(e) => updateForm({ genre: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pageNumber">Page Number</label>
          <input
            type="number"
            className="form-control"
            id="pageNumber"
            value={form.pageNumber}
            onChange={(e) => updateForm({ pageNumber: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <select
            className="form-control"
            id="availability"
            value={form.availability ? "true" : "false"}
            onChange={(e) => updateForm({ availability: e.target.value === "true" })}
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="holds">Holds</label>
          <input
            type="number"
            className="form-control"
            id="holds"
            value={form.holds}
            onChange={(e) => updateForm({ holds: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Update Book" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

