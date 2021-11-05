import { IonModal, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from "@ionic/react"
import { ProductData } from "../models/storeModel"

interface ProductInfoModalPropType {
    show: boolean,
    showDeleteButton?: boolean,
    onCloseButtonClick: React.MouseEventHandler<HTMLIonButtonElement> | undefined,
    onDeleteButtonClick?: React.MouseEventHandler<HTMLIonButtonElement> | undefined,
    ProductInfo: ProductData
}

export const ProductInfoModal: React.FC<ProductInfoModalPropType> = (props: ProductInfoModalPropType) => {

    const { show, showDeleteButton, ProductInfo, onCloseButtonClick, onDeleteButtonClick } = props
    const { name, price, description } = ProductInfo

    return (
        <IonModal isOpen={show}>
            <IonCard>
                <img style={{ marginLeft: "auto", marginRight: "auto", display: "block" }} alt={`${name}`} src="https://via.placeholder.com/300/0000FF/FFFFFF/?text=Product+Image" />
                <IonCardHeader>
                    <IonCardTitle>{name}</IonCardTitle>
                    <IonCardSubtitle>₹{price}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    {description}
                </IonCardContent>
            </IonCard>
            <IonButton onClick={onCloseButtonClick}>Close</IonButton>
            {showDeleteButton ? (
                <IonButton color={"danger"} onClick={onDeleteButtonClick}>
                    Delete
                </IonButton>
            )
                : ""}
        </IonModal>
    )

}