import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import "./profileStyle.css"
import Navbar from "../../components/Navbar/Navbar";
import {IonIcon} from '@ionic/react'
import {cloudUploadOutline} from 'ionicons/icons'
function Profiles(){
    return (
    <>
        <Navbar />
        <div className="mainProfile">
            <div className="profile">
                <div className="profliePicDiv">
                    <div className="profilePicMain">
                        <div className="updateProfilePic">
                            <input type="file" id="inputFile" />
                            <label className="labelFile" htmlFor="inputFile"><IonIcon icon={cloudUploadOutline}></IonIcon></label>
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


export default Profiles;