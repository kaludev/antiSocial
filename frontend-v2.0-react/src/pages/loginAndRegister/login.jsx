import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import { useStateContext } from "../../context/stateContext";
import "./loginAndRegister.css"

const initialFormData = {
    username: "",
    password: ""
}
function Login(){
    const [formData,setFormData] = useState(initialFormData);
    const navigate = useNavigate();
    const {setUser} = useStateContext();
    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    

    async function handleSubmit(e){
        e.preventDefault();
        try{
            
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }) 
            const json = await res.json();
            if(!json.ok) throw new Error(json.message);
            setUser(json.user);
            navigate("/")
        }
        catch(error){
            alert(error);
        }
    }
    return(
        <div className="formBg">
            <form onSubmit={handleSubmit} action="" id="login">
                <div className="title">Welcome back!</div>
                <div className="subtitle">Let's find what's new</div>
                <div className="inputContainer">
                    <input id="username" name ="username" value={formData.username} className="input" type="text" placeholder=" " onChange={handleChange}/>
                    <div className="cut"></div>
                    <label htmlFor="username" className="placeholder">Username</label>
                </div>
                <div className="inputContainer">
                <input id="password" className="input" name = "password"value={formData.password} type="password" placeholder=" " onChange={handleChange}/>
                <div className="cut"></div>
                <label htmlFor="password" className="placeholder">Password</label>
                </div>
                <div className="goToLogin">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
                <div className="btn">
                    <button type="submit" className="submit">Submit</button>
                </div>
            </form>
        <div className="formImg">
        </div>
    </div>
    );
}

export default Login;