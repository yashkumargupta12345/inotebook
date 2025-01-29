import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:6000/api/Auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
        localStorage.setItem('token', json.authToken);
        navigate("/");
        props.showAlert("Logged In Successfully ", "success")
    }
    else{
        props.showAlert("Invalid Credentials", "danger")
    }
}

const onChange= (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
}

    return (
        <div className="container mt-2">
            <h2 className="my-3"> Create an account to use iNotebook...</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name= "email" id="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onChange}/>
                </div> 
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
