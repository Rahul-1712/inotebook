import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:'', email:'', password:'', cpassword:''})

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
if (credentials.password === credentials.cpassword) {
  
      // API Call to Login
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();

        if (json.success) {
        console.log(json)

        localStorage.setItem("token", json.authToken)
        
        navigate("/");
        props.showAlert("success", "Signup successfull");
        }else{
          props.showAlert("danger", "Signup successfull");
        }
}
else{
  alert("Passwords must be same");
}
  }

  const onchange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
      // console.log(credentials)
  
    };
  return (
    <>
    <h2 className="my-3">Sign up  to INoteBook</h2>
      
    <form onSubmit={handleSubmit}>
    <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" name="name" value={credentials.name} onChange={onchange} minLength={3} required aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name="email" value={credentials.email} onChange={onchange} aria-describedby="emailHelp" required />
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" value={credentials.password} onChange={onchange} name="password" required />
  </div>
  <div class="mb-3">
    <label for="cpassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="cpassword" value={credentials.cpassword} onChange={onchange} name="cpassword" minLength={8} required />
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </>
  );
};

export default Signup;
