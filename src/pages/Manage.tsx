import React, { useContext, useState } from "react";
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonRow,
    IonTextarea,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { StoreContext } from "../stores/StoreContext";

const Manage: React.FC = () => {

    const { state: storeState, action: storeAction } = useContext(StoreContext);

    const [Name, setName] = useState("")
    const [Price, setPrice] = useState(0)
    const [Description, setDescription] = useState("")


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Manage Shop</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Manage Shop</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonRow>
                    <IonCol>
                        <IonList>
                            <IonItem>
                                <IonLabel position="stacked">Name</IonLabel>
                                <IonInput value={Name} placeholder="Enter name of product" onIonChange={e => setName(e.detail.value!)}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Price (₹)</IonLabel>
                                <IonInput value={Price} min={"0"} type={"number"} placeholder="Enter Price" onIonChange={e => setPrice(parseFloat(e.detail.value!))}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Description</IonLabel>
                                <IonTextarea
                                    value={Description} onIonChange={e => setDescription(e.detail.value!)}>
                                </IonTextarea>
                            </IonItem>
                            <IonItem>
                                <IonButton onClick={()=>{storeAction("addProduct",{name:Name,price:Price,description:Description})}}>
                                    Add Product
                                </IonButton>
                            </IonItem>
                        </IonList>

                    </IonCol>
                </IonRow>

            </IonContent>
        </IonPage>
    );
};

export default Manage;
