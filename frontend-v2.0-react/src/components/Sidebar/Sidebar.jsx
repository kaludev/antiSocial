import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";
import {AddOutline,chatbubbleOutline,logOutOutline,peopleOutline,personOutline} from "ionicons/icons";

function Sidebar() {

    return (
        <div className="mainMenu">
            <div>
                <IonIcon icon={AddOutline}></IonIcon>
            </div>
            <div className="openChat">
                <IonIcon icon={chatbubbleOutline}></IonIcon>
            </div>
            <div>
                <IonIcon icon={peopleOutline}></IonIcon>
            </div>
            <Link to="/public/profile.html">
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