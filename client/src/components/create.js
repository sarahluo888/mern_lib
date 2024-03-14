import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
const [form, setForm] = useState({
  title: "",
  author: "",
  genre: "",
  pageNumber: "",
  holds: "",
  availability: true,
});
 const navigate = useNavigate();

 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 async function onSubmit(e) {
   e.preventDefault();

  const newBook = { ...form };

   await fetch("http://localhost:5050/books", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newBook),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

  setForm({ title: "", author: "", genre: "", pageNumber: "", availability: true, holds: "" });

   navigate("/");
 }

 return (
  <div>
      <h3>Add New Book</h3>
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
            value={form.availability}
            onChange={(e) => updateForm({ availability: e.target.value === "true" })}
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
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
          <input type="submit" value="Add Book" className="btn btn-primary" />
        </div>
      </form>
    </div>
 );
}
