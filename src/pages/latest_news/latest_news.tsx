import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent} from '@ionic/react';
import './latest_news.css';

import bannerImage from '../../images/sub-header-news.png';
import latestNews1 from '../../images/latest_news_image_1.jpeg';
import homeIcon from '../../images/home_icon.png';

const Page: React.FC = () => {

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
                <div className="news section">
                    <img src = {bannerImage} alt='latest-news-banner'/>
                </div>
                <IonCard>
                    <img alt='latest-news-image-1' src={latestNews1}/>
                    <IonCardHeader>
                        <IonCardTitle>Rugby Masuk Sekolah resmi dimulai di DKI Jakarta</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                    Program Rugby Masuk Sekolah resmi dimulai di DKI Jakarta dengan serah terima Bola dan Baju Pelatih Rugby Masuk Sekolah dari PB PRUI ke PRUI DKI Jakarta pada Hari Sabtu, 25 November 2023 di Lapangan Pondok Bambu, Jakarta. Wakil Ketua II PB PRUI, Pak Agus Djamhoer menyerahkan paket Rugby Masuk Sekolah ini kepada Pak Tito Vau selaku Ketua PRUI DKI Jakarta pada acara Kejuaraan Daerah Rugby tingkat Pelajar DKI Jakarta. 
                    <br></br><br></br>
                    DKI Jakarta memiliki 17 pelatih yang sudah mengikuti sertifikasi pelatih Rugby Masuk Sekolah dan siap mengajarkan T1 Rugby ke seluruh tingkatan sekolah di Jakarta. Pada saat ini tercatat sudah lebih dari 13 sekolah di Jakarta dan jumlah sekolah ini akan terus ditingkatkan seiring dengan waktu program ini berjalan.
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Page;
