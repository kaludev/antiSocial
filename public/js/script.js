const login = document.getElementById("login");
const register = document.getElementById("register");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
if(register){
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
            const res = await fetch("/api/users/register", options)
            console.log(res)
            const json = await res.json();
            console.log(json)
            if(!json.ok) throw new Error(json.message);
            return (window.location.href = "/")
        }
        catch(error){
            alert(error);
        }
    }
}

if(login){
    login.onsubmit = async e =>{
        e.preventDefault();
        try{
            const body ={
                username: username.value,
                password: password.value
            }
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }) 
            const json = await res.json();
            console.log(json)
            if(!json.ok) throw new Error(json.message);
            return (window.location.href = "/")
        }
        catch(error){
            alert(error);
        }
}
}