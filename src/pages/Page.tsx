import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { StoreContext } from '../stores/StoreContext';
import './Page.css';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const { state: storeState, action: storeAction } = useContext(StoreContext);
  const { fetchedProducts } = storeState
  useEffect(() => {
    console.log("Mounted")
    storeAction('GET')
    return () => {
      //cleanup

    }
  },[storeState.fetchedProducts.length])

  const productListings = fetchedProducts && fetchedProducts.length > 0
    ? fetchedProducts.map((product: any, index: any) => {
      return (
        <IonRow key={`product_row_${index}_${Date.now() * Math.floor(Math.random() * 1024)}`}>
          <IonCol>{product.name}</IonCol>
          <IonCol>{product.price}</IonCol>
          <IonCol>{product.description}</IonCol>
        </IonRow>
      )
    })
    : null

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow>
          <IonCol>
            <IonButton onClick={() => {
              storeAction('GET')
            }}>
              {storeState.status === "fetching" ? "Fetching" : "Fetch Products"}
            </IonButton>
          </IonCol>
        </IonRow>
        {productListings}
      </IonContent>
    </IonPage>
  );
};

export default Page;
