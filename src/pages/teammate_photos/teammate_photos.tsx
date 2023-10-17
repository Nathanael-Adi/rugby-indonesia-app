import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonBackButton, IonButton} from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { Camera, CameraResultType } from '@capacitor/camera';
import './teammate_photos.css';
import '../../rugby-app.css';

import bannerImage from '../../images/sub-header-photo.png';
import homeIcon from '../../images/home_icon.png';

interface TeammatePhotosProps {
    onClick: () => Promise<void>;
}

const Page: React.FC = () => {
    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri
        });
    
        var imageUrl = image.webPath;
        console.log(imageUrl);
    };

    const { name } = useParams<{ name: string; }>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <a href='/latest_news'>
                            <div className='home-icon'>
                                <img src={homeIcon} alt="home-icon" />
                            </div>
                        </a>                     
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>
                        Persatuan Rugby
                        Union Indonesia
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className='teammate-photos-banner'>
                    <img src={bannerImage} alt="Teammate-Photos-Banner" />
                </div>
                <br></br>
                <IonButton onClick={onClick => takePicture()}>Take Photo</IonButton> {/* Use the onClick prop directly */}
            </IonContent>
        </IonPage>
    );
};

export default Page;
