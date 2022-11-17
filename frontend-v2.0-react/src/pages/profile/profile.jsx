import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import "./profileStyle.css"


function Profile(){
    return (
    <>
        <nav>
            <Link to="/public/index.html">
                <img src="./images/logo.png" alt="" />
            </Link>
            <div>
                <input type="text" id="search" placeholder="Search" />
                <ul id = "list"></ul>
            </div>
            <ul>
                <Link to="/public/index.html">
                    <li>
                        <ion-icon name="home-outline"></ion-icon>
                    </li>
                </Link>
                <Link to="">
                    <li>
                        <ion-icon name="person"></ion-icon>
                    </li>
                </Link>
                    <li className="logout">
                        <ion-icon name="log-out-outline"></ion-icon>
                    </li>
            </ul>
        </nav>
        <div className="mainProfile">
            <div className="profile">
                <div className="profliePicDiv">
                    <div className="profilePicMain">
                        <div className="updateProfilePic">
                            <input type="file" id="inputFile" />
                            <label className="labelFile" for="inputFile"><ion-icon name="cloud-upload-outline"></ion-icon></label>
                        </div>
                    </div>
                </div>
                <div className="profileDescDiv">
                    <div className="profileName">Nikola Milanovic</div>
                    <div className="profileUsername"><span className="statistics">@nikola.miilanovic</span></div>
                    <div className="profileData">
                        <div className="profileChats"><span className="statistics">23</span> likes</div>
                        <div className="profileFriends"><span className="statistics">117</span> friends</div>
                    </div>
                    <div className="profileData">
                        <button className="addFriend">Edit profile</button>
                    </div>
                </div>
            </div>
            <div className="profileContent"> 
            </div>
        </div>
    </>
    )
}


export default Profile;