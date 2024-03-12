import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
//  const [form, setForm] = useState({
//    name: "",
//    position: "",
//    level: "",
//  });
const [form, setForm] = useState({
  title: "",
  author: "",
  genre: "",
  publicationYear: "",
  availability: true,
});
 const navigate = useNavigate();

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();

   // When a post request is sent to the create url, we'll add a new record to the database.
  //  const newPerson = { ...form };
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

  //  setForm({ name: "", position: "", level: "" });
  setForm({ title: "", author: "", genre: "", publicationYear: "", availability: true });

   navigate("/");
 }

 // This following section will display the form that takes the input from the user.
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
          <label htmlFor="publicationYear">Publication Year</label>
          <input
            type="number"
            className="form-control"
            id="publicationYear"
            value={form.publicationYear}
            onChange={(e) => updateForm({ publicationYear: e.target.value })}
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
          <input type="submit" value="Add Book" className="btn btn-primary" />
        </div>
      </form>
    </div>
  //  <div>
  //    <h3>Add New Book</h3>
  //    <form onSubmit={onSubmit}>
  //      <div className="form-group">
  //        <label htmlFor="name">Title</label>
  //        <input
  //          type="text"
  //          className="form-control"
  //          id="title"
  //          value={form.title}
  //          onChange={(e) => updateForm({ title: e.target.value })}
  //        />
  //      </div>
  //      <div className="form-group">
  //        <label htmlFor="position">Position</label>
  //        <input
  //          type="text"
  //          className="form-control"
  //          id="position"
  //          value={form.position}
  //          onChange={(e) => updateForm({ position: e.target.value })}
  //        />
  //      </div>
  //      <div className="form-group">
  //        <div className="form-check form-check-inline">
  //          <input
  //            className="form-check-input"
  //            type="radio"
  //            name="positionOptions"
  //            id="positionIntern"
  //            value="Intern"
  //            checked={form.level === "Intern"}
  //            onChange={(e) => updateForm({ level: e.target.value })}
  //          />
  //          <label htmlFor="positionIntern" className="form-check-label">Intern</label>
  //        </div>
  //        <div className="form-check form-check-inline">
  //          <input
  //            className="form-check-input"
  //            type="radio"
  //            name="positionOptions"
  //            id="positionJunior"
  //            value="Junior"
  //            checked={form.level === "Junior"}
  //            onChange={(e) => updateForm({ level: e.target.value })}
  //          />
  //          <label htmlFor="positionJunior" className="form-check-label">Junior</label>
  //        </div>
  //        <div className="form-check form-check-inline">
  //          <input
  //            className="form-check-input"
  //            type="radio"
  //            name="positionOptions"
  //            id="positionSenior"
  //            value="Senior"
  //            checked={form.level === "Senior"}
  //            onChange={(e) => updateForm({ level: e.target.value })}
  //          />
  //          <label htmlFor="positionSenior" className="form-check-label">Senior</label>
  //        </div>
  //      </div>
  //      <div className="form-group">
  //        <input
  //          type="submit"
  //          value="Add book"
  //          className="btn btn-primary"
  //        />
  //      </div>
  //    </form>
  //  </div>
 );
}
