import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {useStateContext} from "../../context/stateContext"
import Sidebar from "../../components/Sidebar/Sidebar";
import './Home.css';

function Home() {
    const navigate = useNavigate();
    
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