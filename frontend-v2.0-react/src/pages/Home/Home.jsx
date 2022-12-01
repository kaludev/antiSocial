import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {useStateContext} from "../../context/stateContext"
import Sidebar from "../../components/Sidebar/Sidebar";
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const {setUser} = useStateContext();
    async function showme(){
        try{
            const res = await fetch('/api/users/showme');
            const data = await res.json();
            if(!data.ok) throw new Error(data.message);
            if(!data.user){
                navigate("/login");
            }
            console.log(data.user)
            setUser(data.user);
            
        }catch(e){
            console.log(e.message);
            navigate('/login')
        }
    }
    
    useEffect(() =>{showme()},[])
    const {user} = useStateContext();
    
    return(
        <>
        <Navbar />
        <main>
            <Sidebar />
            <p>{JSON.stringify(user)}</p>
        </main>
        </>
    )
}

export default Home;