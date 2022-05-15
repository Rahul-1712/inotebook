import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import notesContext from "../context/notes/notesContext";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const Context = useContext(notesContext);
  const { notes, getNotes, editNote } = Context;

  const navigate = useNavigate();

  useEffect(() => {

    if (localStorage.getItem("token")){

      getNotes();
    }
    else{
      navigate("/Login")
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(note)
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();

    props.showAlert("success", "Your Notes has been Updated successfully");
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        ref={ref}
        hidden={true}
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Title
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="etitle"
                  name="etitle"
                  onChange={onchange}
                  value={note.etitle}
                  minLength={5}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Description
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="edescription"
                  name="edescription"
                  onChange={onchange}
                  value={note.edescription}
                  minLength={5}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword2" class="form-label">
                  tag
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="etag"
                  name="etag"
                  onChange={onchange}
                  value={note.etag}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
              ref = {refClose}
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={handleSubmit}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        {  (notes) ? notes.map((note) => {
          return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />;
        }) 
        : <p>No Notes Saved</p>}
      </div>
    </>
  );
};

export default Notes;
