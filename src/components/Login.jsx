import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const host = "http://localhost:5000";

const Login = () => {

    let redirect = useNavigate();
    const [cred, setCred] = useState({email: "", password: ""});

    let onChange = (e) => {
        setCred({...cred, [e.target.name]:e.target.value});
    }

    const getUser = async (e) => {
        
          // Default options are marked with *
          e.preventDefault();
          const response = await fetch(`${host}/api/auth/login`, {

            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email: cred.email,password: cred.password})
          });
          let json = await response.json(); // parses JSON response into native JavaScript objects
          if(json.success){
              localStorage.setItem('token', json.authToken);
            redirect("/");
          }
        }

  return (
    <div>
        <form>
        <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" name='email' onChange={onChange}  value={cred.email}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' onChange={onChange}  value={cred.password}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={getUser}>Login</button>
        </form>
    </div>
  )
}

export default Login