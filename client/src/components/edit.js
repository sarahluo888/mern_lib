import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
    availability: true,
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
        publicationYear: form.publicationYear,
        availability: form.availability
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
            value={form.availability ? "true" : "false"}
            onChange={(e) => updateForm({ availability: e.target.value === "true" })}
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <div className="form-group">
          <input type="submit" value="Update Book" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router";

// export default function Edit() {
//  const [form, setForm] = useState({
//    name: "",
//    position: "",
//    level: "",
//    records: [],
//  });
//  const params = useParams();
//  const navigate = useNavigate();

//  useEffect(() => {
//    async function fetchData() {
//      const id = params.id.toString();
//      const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);

//      if (!response.ok) {
//        const message = `An error has occurred: ${response.statusText}`;
//        window.alert(message);
//        return;
//      }

//      const record = await response.json();
//      if (!record) {
//        window.alert(`Record with id ${id} not found`);
//        navigate("/");
//        return;
//      }

//      setForm(record);
//    }

//    fetchData();

//    return;
//  }, [params.id, navigate]);

//  // These methods will update the state properties.
//  function updateForm(value) {
//    return setForm((prev) => {
//      return { ...prev, ...value };
//    });
//  }

//  async function onSubmit(e) {
//    e.preventDefault();
//    const editedPerson = {
//      name: form.name,
//      position: form.position,
//      level: form.level,
//    };

//    // This will send a post request to update the data in the database.
//    await fetch(`http://localhost:5050/record/${params.id}`, {
//      method: "PATCH",
//      body: JSON.stringify(editedPerson),
//      headers: {
//        'Content-Type': 'application/json'
//      },
//    });

//    navigate("/");
//  }

//  // This following section will display the form that takes input from the user to update the data.
//  return (
//    <div>
//      <h3>Update Record</h3>
//      <form onSubmit={onSubmit}>
//        <div className="form-group">
//          <label htmlFor="name">Name: </label>
//          <input
//            type="text"
//            className="form-control"
//            id="name"
//            value={form.name}
//            onChange={(e) => updateForm({ name: e.target.value })}
//          />
//        </div>
//        <div className="form-group">
//          <label htmlFor="position">Position: </label>
//          <input
//            type="text"
//            className="form-control"
//            id="position"
//            value={form.position}
//            onChange={(e) => updateForm({ position: e.target.value })}
//          />
//        </div>
//        <div className="form-group">
//          <div className="form-check form-check-inline">
//            <input
//              className="form-check-input"
//              type="radio"
//              name="positionOptions"
//              id="positionIntern"
//              value="Intern"
//              checked={form.level === "Intern"}
//              onChange={(e) => updateForm({ level: e.target.value })}
//            />
//            <label htmlFor="positionIntern" className="form-check-label">Intern</label>
//          </div>
//          <div className="form-check form-check-inline">
//            <input
//              className="form-check-input"
//              type="radio"
//              name="positionOptions"
//              id="positionJunior"
//              value="Junior"
//              checked={form.level === "Junior"}
//              onChange={(e) => updateForm({ level: e.target.value })}
//            />
//            <label htmlFor="positionJunior" className="form-check-label">Junior</label>
//          </div>
//          <div className="form-check form-check-inline">
//            <input
//              className="form-check-input"
//              type="radio"
//              name="positionOptions"
//              id="positionSenior"
//              value="Senior"
//              checked={form.level === "Senior"}
//              onChange={(e) => updateForm({ level: e.target.value })}
//            />
//            <label htmlFor="positionSenior" className="form-check-label">Senior</label>
//        </div>
//        </div>
//        <br />

//        <div className="form-group">
//          <input
//            type="submit"
//            value="Update Record"
//            className="btn btn-primary"
//          />
//        </div>
//      </form>
//    </div>
//  );
// }
