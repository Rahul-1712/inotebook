import React, { useContext, useState } from "react";
import notesContext from "../context/notes/notesContext";

const AddNote = (props) => {
  const Context = useContext(notesContext);
  const { addNote } = Context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    })

    props.showAlert("success", "Your Notes has been added");
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log( note)
  };

  return (
    <>
      <h2>Add a new note</h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="title" class="form-label">
            Title
          </label>
          <input
            type="text"
            class="form-control"
            id="title"
            name="title"
            onChange={onchange}
            value={note.title}
            minLength={5}
            required
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">
            Description
          </label>
          <input
            type="text"
            class="form-control"
            id="description"
            name="description"
            onChange={onchange}
            value={note.description}
            minLength={5}
            required
          />
        </div>
        <div class="mb-3">
          <label for="tag" class="form-label">
            tag
          </label>
          <input
            type="text"
            class="form-control"
            id="tag"
            name="tag"
            onChange={onchange}
            value={note.tag}
            required
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary my-3"
   
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddNote;
