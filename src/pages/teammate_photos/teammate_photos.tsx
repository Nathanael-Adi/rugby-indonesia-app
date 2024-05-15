import React, { useEffect, useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonBackButton, IonButton, IonIcon} from '@ionic/react';
import { Camera, Photo, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';

import './teammate_photos.css';

import bannerImage from '../../images/sub-header-photo.png';
import homeIcon from '../../images/home_icon.png';

import { PhotoImages } from "./photoImages";
import PhotoGallery from './photoGallery';
import { appsSharp, camera } from 'ionicons/icons';

import frame01 from '../../images/frame/frame01.png';
import frame02 from '../../images/frame/frame02.png';
import frame03 from '../../images/frame/frame03.png';
import frame04 from '../../images/frame/frame04.png';
import frame05 from '../../images/frame/frame05.png';
import frame06 from '../../images/frame/frame06.png';
import frame07 from '../../images/frame/frame07.png';
import frame08 from '../../images/frame/frame08.png';
import frame09 from '../../images/frame/frame09.png';
import frame10 from '../../images/frame/frame10.png';

const TeammatePage: React.FC = () => {
    const [images, setImages] = useState<PhotoImages[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {            
                const response = await fetch('https://dnartworks.rugbyindonesia.or.id/indonesianrugby/photos/list.json');
                const data = await response.json();
                const result = data.data;
                //console.log(result);
    
                if (!Array.isArray(result)) {
                    throw new Error('Data is not in expected format');
                }

                const photoUrls = result.map((item: any) =>{
                    const photoUrl = item;
                    const modPhotoUrl = photoUrl.replace("/images/", "/");
                    return modPhotoUrl;
                });
                const photoImages = photoUrls.map((url: string) => ({ webviewPath: url }));
                setImages(photoImages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.Base64
        });
    
        // Edit the photo and resize it to 400x400
        const editedBase64Data = await editPhoto(image.base64String!);
    
        await uploadPhoto({ ...image, base64String: editedBase64Data });
    };

    const choosePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Photos
        });
    
        // Edit the photo and resize it to 400x400
        const editedBase64Data = await editPhoto(image.base64String!);
    
        await uploadPhoto({ ...image, base64String: editedBase64Data });
    };
    

    const editPhoto = async (base64data: string): Promise<string> => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
    
            img.onload = () => {
                canvas.width = 400;
                canvas.height = 400;
                ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg'));
            };
    
            img.src = `data:image/jpeg;base64,${base64data}`;
        });
    };

    const uploadPhoto = async (photo: Photo) => {
        try {
            const userId = "anonymous";
            const base64data = photo.base64String;

            const response = await fetch('https://dnartworks.rugbyindonesia.or.id/indonesianrugby/photos/upload.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "userId=" + userId + "&photo=data:image/jpeg;base64," + base64data
            });

            if (response.ok) {
                console.log('Photo uploaded successfully!');
            } else {
                console.error('Failed to upload photo:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <a href='/latest_news'>
                            <img src={homeIcon} alt="home-icon" className='home-icon' />
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
                <IonButton color="primary" expand='block' onClick={onClick => takePicture()}>
                    <IonIcon slot="start" icon={camera}></IonIcon>
                    Take Photo
                </IonButton> {/* Use the onClick prop directly */}

                <IonButton color='primary' expand='block' onClick={choosePicture}>
                    <IonIcon slot="start" icon={appsSharp}></IonIcon>
                    Load from Library
                </IonButton>

                <PhotoGallery photos={images} />
            </IonContent>
        </IonPage>
    );
};

export default TeammatePage;
