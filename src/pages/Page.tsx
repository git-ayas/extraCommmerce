import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useContext } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { AppContext } from '../stores/AppContext';
import './Page.css';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const { state, dispatch } = useContext(AppContext);

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
            Sani
          </IonCol>
          <IonCol></IonCol>
          <IonCol></IonCol>
          <IonCol>
            <IonButton onClick={() => dispatch({
              type: 'setCount',
              payload: state.count + 1
            })}>
              Add to Order
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <h2>You have {state.count} in your cart</h2>
          </IonCol>
          
        </IonRow>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
