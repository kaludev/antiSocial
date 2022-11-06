const login = document.getElementById("login");
const register = document.getElementById("register");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

register.onsubmit = async e =>{
    e.preventDefault();
    try{
        const body ={
            email: email.value,
            username: username.value,
            password: password.value,
        }
        const res = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "aplication/json"
            },
            body: JSON.stringify(body)
        })
        const json = await res.json();
        if(!json.ok) throw new Error(json.message);
        window.location.href = "/";
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
            password: password.value,
        }
        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "aplication/json"
            },
            body: JSON.stringify(body)
        })
        const json = await res.json();
        if(!json.ok) throw new Error(json.message);
        window.location.href = "/";
    }
    catch(error){
        alert(error.message);
    }
}
