import React, { useState } from "react";
import NotesContext from "./notesContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes

  const getNotes = async () => {
    // API call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();

    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    // API call

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();

    setNotes(notes.concat(note));
  };

  const editNote = async (id, title, description, tag) => {
    // API call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    const newNote = JSON.parse(JSON.stringify(notes));

    //  Logic for editing note
    for (let index = 0; index < notes.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        console.log(newNote[index]);
        break;
      }
    }
    setNotes(newNote);
  };

  const deleteNote = async (id) => {
    // API call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NotesContext.Provider
      value={{ notes, getNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NoteState;
