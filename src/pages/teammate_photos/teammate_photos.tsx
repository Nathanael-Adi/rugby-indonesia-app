import React, { useEffect, useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonModal, IonCol } from '@ionic/react';
import { Camera, Photo, CameraResultType, CameraSource } from '@capacitor/camera';

import './teammate_photos.css';

import bannerImage from '../../images/sub-header-photo.png';
import homeIcon from '../../images/home_icon.png';

import { PhotoImages } from "./photoImages";
import PhotoGallery from './photoGallery';
import { appsSharp, camera } from 'ionicons/icons';

import frame1 from '../../images/frame/frame01.png';
import frame2 from '../../images/frame/frame02.png';
import frame3 from '../../images/frame/frame03.png';
import frame4 from '../../images/frame/frame04.png';
import frame5 from '../../images/frame/frame05.png';
import frame6 from '../../images/frame/frame06.png';
import frame7 from '../../images/frame/frame07.png';
import frame8 from '../../images/frame/frame08.png';
import frame9 from '../../images/frame/frame09.png';
import frame10 from '../../images/frame/frame10.png';

const frames = [frame1, frame2, frame3, frame4, frame5, frame6, frame7, frame8, frame9, frame10];

const TeammatePhotosPage: React.FC = () => {
    const [images, setImages] = useState<PhotoImages[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [takenPhoto, setTakenPhoto] = useState<Photo | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dnartworks.rugbyindonesia.or.id/indonesianrugby/photos/list.json');
                const data = await response.json();
                const result = data.data;

                if (!Array.isArray(result)) {
                    throw new Error('Data is not in expected format');
                }

                const photoUrls = result.map((item: any) => {
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

        setTakenPhoto(image);
        setIsOpen(true);  // Buka modal setelah foto diambil
    };

    const choosePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Photos
        });

        setTakenPhoto(image);
        setIsOpen(true);  // Buka modal setelah foto dipilih
    };

    const editPhoto = async (base64data: string, frame: string): Promise<string> => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            const frameImg = new Image();

            img.onload = () => {
                canvas.width = 400;
                canvas.height = 400;
                ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
                frameImg.src = frame;
                frameImg.onload = () => {
                    ctx!.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/jpeg'));
                };
            };

            img.src = `data:image/jpeg;base64,${base64data}`;
        });
    };

    const uploadPhoto = async (base64data: string) => {
        try {
            const userId = "anonymous";

            const response = await fetch('https://dnartworks.rugbyindonesia.or.id/indonesianrugby/photos/upload.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `userId=${userId}&photo=${base64data}`
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

    const handleFrameSelection = async (frame: string) => {
        if (takenPhoto) {
            const editedBase64Data = await editPhoto(takenPhoto.base64String!, frame);
            await uploadPhoto(editedBase64Data);
            window.location.reload();
        }
        setIsOpen(false);
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
                <IonButton color="primary" expand='block' onClick={takePicture}>
                    <IonIcon slot="start" icon={camera}></IonIcon>
                    Take Photo
                </IonButton>

                <IonButton color='primary' expand='block' onClick={choosePicture}>
                    <IonIcon slot="start" icon={appsSharp}></IonIcon>
                    Load from Library
                </IonButton>

                <PhotoGallery photos={images} />

                <IonModal isOpen={isOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Select Frame</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <div className="frame-selection">
                            {frames.map((frame, index) => (
                                <IonCol size = "6" key={index}>
                                    <img
                                        key={index}
                                        src={frame}
                                        alt={`Frame ${index + 1}`}
                                        className="frame-option"
                                        onClick={() => handleFrameSelection(frame)}
                                        width={200}
                                        height={200}
                                    />
                                </IonCol>
                            ))}
                        </div>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default TeammatePhotosPage;
