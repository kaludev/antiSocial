import { IonIcon } from "@ionic/react";
import { Link, useNavigate } from "react-router-dom";
import {addOutline,chatbubblesOutline,logOutOutline,peopleOutline,personOutline} from "ionicons/icons";
import './Sidebar.css';
import {useStateContext} from '../../context/stateContext'
import { useEffect, useState } from "react";
function Sidebar() {
    const navigate = useNavigate();

    const {user} = useStateContext();
    const [username,setUsername] = useState("");

    useEffect(() => {
        setTimeout(() =>{
            console.log(user)
            setUsername(user.username)
        },1*1000);
    },[]);
    return (
        <div className="mainMenu">
            <div>
                <IonIcon icon={addOutline}></IonIcon>
            </div>
            <div className="openChat">
                <IonIcon icon={chatbubblesOutline}></IonIcon>
            </div>
            <div>
                <IonIcon icon={peopleOutline}></IonIcon>
            </div>
            <div className="logout second">
                    <IonIcon icon={logOutOutline}></IonIcon>
            </div>
            <Link to={'/'+username}>
                <div className="second">
                    <IonIcon icon={personOutline}></IonIcon>
                </div>
            </Link>
            
        </div>
    )
}

export default Sidebar;