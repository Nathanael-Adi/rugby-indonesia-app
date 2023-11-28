import { IonCol, IonGrid, IonImg, IonRow } from "@ionic/react";
import { PhotoImages } from "./photoImages";
import React from "react";

type Props = {
    photos: PhotoImages[],
}

const PhotoGallery: React.FC<Props> =({photos}) => {
    return (
        <IonGrid>
            <IonRow>
                {photos.map((photo, idx) =>(
                    <IonCol size = "6" key={idx}>
                        <IonImg src={photo.webviewPath}/>
                    </IonCol>
                ))}
            </IonRow>
        </IonGrid>
    );
}

export default PhotoGallery;