import React, { useContext } from "react";
import notesContext from "../context/notes/notesContext";

const NoteItem = (props) => {
  const { note , updateNote } = props;
  const Context = useContext(notesContext);
  const { deleteNote } = Context;


  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <h5 className="card-title">{note.title}</h5>
            <div>
            <i class="fa-solid fa-pen-to-square mx-3" onClick={() => {updateNote(note)}}></i>
            <i className="fa-solid fa-trash-can mx-3" onClick={() => {deleteNote(note._id); props.showAlert("success", "Note deleted successfully")}} ></i>
            </div>
          </div>
          <h6 className="card-subtitle mb-2 text-muted" >{note.tag}</h6>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
