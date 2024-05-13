import React, { useEffect, useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonBackButton, IonButton, IonIcon} from '@ionic/react';
import { Camera, Photo, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';

import './teammate_photos.css';

import bannerImage from '../../images/sub-header-photo.png';
import homeIcon from '../../images/home_icon.png';

import { PhotoImages } from "./photoImages";
import PhotoGallery from './photoGallery';
import { appsSharp, camera, menuSharp } from 'ionicons/icons';

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

    const uploadPhoto = async (photo: Photo) => {
        try {
            // Ambil identifikasi pengguna, Anda perlu menentukan cara mendapatkannya.
            const userId = "anonymous";

            // Ambil data base64 dari foto.
            const base64data = await base64FromPath(photo.webPath!);

            // Kirim permintaan POST ke endpoint untuk mengunggah foto.
            const response = await fetch('https://dnartworks.rugbyindonesia.or.id/indonesianrugby/photos/upload.json', {
                mode: 'no-cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify({
                    userId: userId,
                    photo: base64data,
                    frame: '' // Anda perlu menentukan frame jika diperlukan.
                })
            });
            console.log("Response: " + response.status)
            if (response.ok) {
                // Foto berhasil diunggah.
                console.log('Photo uploaded successfully!');
            } else {
                // Gagal mengunggah foto.
                console.error('Failed to upload photo:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

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

        await uploadPhoto(image);
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

                <IonButton color='primary' expand='block'>
                    <IonIcon slot="start" icon={appsSharp}></IonIcon>
                    Load from Library
                </IonButton>

                <PhotoGallery photos={images} />
            </IonContent>
        </IonPage>
    );
};

export default TeammatePage;
