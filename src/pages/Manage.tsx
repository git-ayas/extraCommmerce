import React from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";

const Manage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Manage Shop</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent
                fullscreen={true}
                scrollEvents={true}
                onIonScrollStart={() => { }}
                onIonScroll={() => { }}
                onIonScrollEnd={() => { }}>

            </IonContent>
        </IonPage>
    );
};

export default Manage;
