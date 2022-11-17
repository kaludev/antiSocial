import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import "./loginAndRegister.css"

const initialFormData ={
    username: '',
    email: '',
    password: ''
}

function Register(){
    const [formData,setFormData] = useState(initialFormData)
    const navigate = useNavigate()

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }
            const res = await fetch("http://localhost:5000/api/users/register", options)
            console.log(res)
            const json = await res.json();
            console.log(json)
            if(!json.ok) throw new Error(json.message);
            navigate('/')
        }
        catch(error){
            alert(error);
        }
    }
    return(
        <div className="formBg">
        <form onSubmit={handleSubmit} action="" id="register">
            <div className="title">Hello there!</div>
            <div className="subtitle">Let's create your account!</div>
            <div className="inputContainer">
                <input id="username" name="username" value = {formData.username} className="input" type="text" placeholder=" " onChange={handleChange}/>
                <div className="cut"></div>
                <label htmlFor="username" className="placeholder">Username</label>
            </div>
            <div className="inputContainer">
                <input id="email" name="email" className="input" value = {formData.email} type="email" placeholder=" " onChange={handleChange}/>
                <div className="cut cut-short"></div>
                <label htmlFor="email" className="placeholder">Email</label>
            </div>
            <div className="inputContainer">
            <input id="password" name="password" value = {formData.password} className="input" type="password" placeholder=" " onChange={handleChange}/>
            <div className="cut"></div>
            <label htmlFor="password" className="placeholder">Password</label>
            </div>
            <div className="goToLogin">
                <p>Already have an account? <Link to="/login">Sign in</Link></p>
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

export default Register;
