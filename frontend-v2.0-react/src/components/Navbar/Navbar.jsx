import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../images/logo.png'
import {IonIcon} from '@ionic/react'
import { homeOutline,person,logOutOutline} from 'ionicons/icons'
import { useStateContext } from '../../context/stateContext';
import { useNavigate } from 'react-router-dom';

function Navbar(){
    const {setUser} = useStateContext();
    const navigate = useNavigate();
    async function logout(){
        const res = await fetch('/api/users/logout',{
            method: 'POST'

        });
        const data = await res.json();
        if(!data.ok) throw new Error(data.message);
        setUser(null);
        navigate('/login')
    }
    return(
        <nav>
            <Link to="/">
                <img src={logo} alt="" />
            </Link>
            <div>
                <input type="text" id="search" placeholder="Search" />
                <ul id = "list"></ul>
            </div>
            <ul>
                <Link to="/">
                    <li>
                        <IonIcon icon={homeOutline}></IonIcon>
                    </li>
                </Link>
                <Link to="">
                    <li>
                        <IonIcon icon={person}></IonIcon>
                    </li>
                </Link>
                    <li onClick={logout} className="logout">
                        <IonIcon icon={logOutOutline}></IonIcon>
                    </li>
            </ul>
        </nav>
    )
}

export default Navbar;