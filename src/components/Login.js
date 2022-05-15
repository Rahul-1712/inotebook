import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:'',password:''})

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // API Call to Login
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          });

          const json = await response.json();

          if (json.success) {
            console.log(json)
    
            localStorage.setItem("token", json.authToken)
            
            navigate("/");
            props.showAlert("success", "Login successfull");
            }else{
              props.showAlert("danger", "Login successfull");
            }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        console.log(credentials)
    
      };

  return (
    <>
    <h2 className="my-3">Login to INoteBook</h2>
    <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name="email" value={credentials.email} onChange={onchange} aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" value={credentials.password} onChange={onchange} name="password" />
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </>
  )
}

export default Login