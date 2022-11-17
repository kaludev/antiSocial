import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import "./profileStyle.css"

class Profile extends React.Component
{
    render(){
          return {
            <>
            <nav>
                <a href="/public/index.html">
                    <img src="./images/logo.png" alt="" />
                </a>
                <div>
                    <input type="text" id="search" placeholder="Search" />
                    <ul id = "list"></ul>
                </div>
                <ul>
                    <a href="/public/index.html">
                        <li>
                            </ion-icon><ion-icon name="home-outline"></ion-icon>
                        </li>
                    </a>
                    <a href="">
                        <li>
                            <ion-icon name="person"></ion-icon>
                        </li>
                    </a>
                        <li class="logout">
                            <ion-icon name="log-out-outline"></ion-icon>
                        </li>
                </ul>
            </nav>
            <div class="mainProfile">
                <div class="profile">
                    <div class="profliePicDiv">
                        <div class="profilePicMain">
                            <div class="updateProfilePic">
                                <input type="file" id="inputFile" />
                                <label class="labelFile" for="inputFile"><ion-icon name="cloud-upload-outline"></ion-icon></label>
                            </div>
                        </div>
                    </div>
                    <div class="profileDescDiv">
                        <div class="profileName">Nikola Milanovic</div>
                        <div class="profileUsername"><span class="statistics">@nikola.miilanovic</span></div>
                        <div class="profileData">
                            <div class="profileChats"><span class="statistics">23</span> likes</div>
                            <div class="profileFriends"><span class="statistics">117</span> friends</div>
                        </div>
                        <div class="profileData">
                            <button class="addFriend">Edit profile</button>
                        </div>
                    </div>
                </div>
                <div class="profileContent"> 
                </div>
            </div>
            </>
          };
    }
}

export default Profile;