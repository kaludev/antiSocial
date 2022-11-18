import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../images/logo.png'
import {IonIcon} from '@ionic/react'
import { homeOutline,person,logOutOutline} from 'ionicons/icons'

function Navbar(){
    function logout(){
        
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