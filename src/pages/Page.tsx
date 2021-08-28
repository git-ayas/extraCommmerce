import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useContext } from 'react';
import { useParams } from 'react-router';
import { StoreContext } from '../stores/StoreContext';
import './Page.css';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const { state, action } = useContext(StoreContext);
  console.log(state, action)
 

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

          <IonCol></IonCol>
          <IonCol></IonCol>

        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton onClick={() => {
              action('GET', null)
            }}>
              Fetch Products
            </IonButton>
          </IonCol>
          <IonCol>
            {JSON.stringify(state)}
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Page;
