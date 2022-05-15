import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

function Home(props) {

  return (
    <div>
      <AddNote showAlert={props.showAlert}  />

      <div className="container my-3">
      <h2 className="">Saved notes</h2>
        <Notes showAlert={props.showAlert} />
      </div>
    </div>
  );
}

export default Home;
