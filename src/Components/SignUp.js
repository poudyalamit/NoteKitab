import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [credentials, setCredentials] = useState({ name:"", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();
  const handlesign = async (e) => {
    e.preventDefault();
    const {name, email,password}= credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name,email, password})
    });
    const json = await response.json();
    console.log(json);
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/login"); 
  }
  const onChange = async (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value })
  }
  return (
    <div className='Container'>
      <form onSubmit={handlesign}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp"  onChange={onChange}  required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword"  onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
