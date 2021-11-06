import { IonButtons, IonCol, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ProductInfoModal } from '../components/ProductInfoModal';
import { ProductData } from '../models/storeModel';
import { StoreContext } from '../stores/StoreContext';



const Products: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const { state: storeState, action: storeAction } = useContext(StoreContext);
  const { fetchedProducts } = storeState

  const [showModal, setShowModal] = useState(false);
  const [CurrentlyViewingProduct, setCurrentlyViewingProduct] = useState({} as ProductData)

  useEffect(() => {
    console.log("Mounted")
    storeAction('GET')
    return () => {
      console.log("unMounted")
      //cleanup

    }
  }, [storeState.fetchedProducts.length])

  const productListings = fetchedProducts && fetchedProducts.length > 0
    ? fetchedProducts.map((product: any, index: any) => {
      return (
        <IonItem
          key={`product_row_${index}_${Date.now() * Math.floor(Math.random() * 1024)}`}
          detail button
          onClick={() => { setCurrentlyViewingProduct(product); setShowModal(true) }}
          lines={'none'}
          style={{ border: "1px solid grey", borderRadius: "6px", margin: "0.5em 0" }}
        >
          <img slot="start" alt={`${product.name}`}
            style={{ width: "120px", height: "120px" }}
            src="https://via.placeholder.com/300/0000FF/FFFFFF/?text=Product+Image" />

          <IonLabel>
            <h2>{product.name}</h2>
            <h3>₹{product.price}</h3>
            <p>{product.description}</p>
          </IonLabel>
        </IonItem>
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
            <IonList>
              {productListings}
            </IonList>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <ProductInfoModal
              show={showModal}
              showDeleteButton={true} onDeleteButtonClick={() => {
                storeAction('deleteProduct', CurrentlyViewingProduct);
                setShowModal(false);
              }}
              onCloseButtonClick={() => setShowModal(false)}
              ProductInfo={CurrentlyViewingProduct}
            ></ProductInfoModal>

          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Products;
