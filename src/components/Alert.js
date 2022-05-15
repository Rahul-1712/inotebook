import React from "react";

const Alert = (props) => {
const {alert} = props;
  return (
    
    <div className="mb-3" style={{height: "50px"}}>
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        <strong>{alert.type}</strong> : {alert.message}
      </div>}
    </div>

  );
};

export default Alert;
