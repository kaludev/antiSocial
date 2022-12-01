import { IonIcon } from "@ionic/react";
import { Link, useNavigate } from "react-router-dom";
import {addOutline,chatbubblesOutline,logOutOutline,peopleOutline,personOutline} from "ionicons/icons";
import './Sidebar.css';
import {useStateContext} from '../../context/stateContext'
import { useEffect } from "react";
function Sidebar() {
    const navigate = useNavigate();

    const {user} = useStateContext();
    useEffect(() =>{ if(!user.username) {
        navigate('/login')
    }},[navigate, user]);
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
            <Link to={'/'+(user.username)?user.username:''}>
                <div className="second">
                    <IonIcon icon={personOutline}></IonIcon>
                </div>
            </Link>
            <div className="logout second">
                    <IonIcon icon={logOutOutline}></IonIcon>
            </div>
        </div>
    )
}

export default Sidebar;