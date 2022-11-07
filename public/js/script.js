const login = document.getElementById("login");
const register = document.getElementById("register");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

register.onsubmit = async e =>{
    e.preventDefault();
    try{
        const body ={
            username: username.value,
            email: email.value,
            password: password.value
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        console.log(options)
        const res = await fetch("/api/users/register", options)
        const json = await res.json();
        if(!json.ok) throw new Error(json.message);
        location.href = "/../index.html";
    }
    catch(error){
        alert(error.message);
    }
}

login.onsubmit = async e =>{
    e.preventDefault();
    try{
        const body ={
            username: username.value,
            password: password.value
        }
        const res = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const json = await res.json();
        if(!json.ok) throw new Error(json.message);
        location.href = "/../index.html";
    }
    catch(error){
        alert(error.message);
    }
}
