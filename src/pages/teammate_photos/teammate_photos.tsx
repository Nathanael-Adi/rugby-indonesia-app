import React, { useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonBackButton, IonButton} from '@ionic/react';
import { Camera, Photo, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';

import './teammate_photos.css';
import '../../rugby-app.css';

import bannerImage from '../../images/sub-header-photo.png';
import homeIcon from '../../images/home_icon.png';

import { PhotoImages } from "./photoImages";
import PhotoGallery from './photoGallery';

const Page: React.FC = () => {
    const [images, setImages] = useState<PhotoImages[]>([]);

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri
        });
    
        const fileName = new Date().getTime() + '.jpeg';
        
        const savedFileImage = await savePicture(image, fileName);
        var imageUrl = savedFileImage.filePath!;
        console.log(imageUrl);
        // Can be set to the src of an image now
        // imageElement.src = imageUrl;
        setImages([...images, savedFileImage]);

    };

    const savePicture = async(photo: Photo, fileName: string):Promise<PhotoImages> => {
        let base64data:string;
        base64data = await base64FromPath(photo.webPath!);

        const savedPicture = await Filesystem.writeFile({
            path: fileName,
            directory: Directory.Data,
            data: base64data
        });

        return{
            filePath: fileName,
            webviewPath: photo.webPath
        }
    }

    async function base64FromPath(path:string): Promise<string>{
        const response = await fetch(path);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                if (typeof reader.result === 'string')
                {
                    resolve(reader.result);
                }
                else
                {
                    reject('This method did not return a string');
                }
            };

            reader.readAsDataURL(blob);
        })
    }

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
                <IonButton color="primary" onClick={onClick => takePicture()}>Take Photo</IonButton> {/* Use the onClick prop directly */}

                <PhotoGallery photos={images} />
            </IonContent>
        </IonPage>
    );
};

export default Page;
