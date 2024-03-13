import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent} from '@ionic/react';
import { useEffect, useState } from 'react';
import './latest_news.css';

import bannerImage from '../../images/sub-header-news.png';
import latestNews1 from '../../images/latest_news_image_1.jpeg';
import homeIcon from '../../images/home_icon.png';

const Page: React.FC = () => {
    //membuat state untuk menyimpan data json dari url
    const [jsonItems, setJsonItems] = useState(null);
    const [title, setTitle] = useState('');

    //menggunakan useEffect untuk melakukan fetch data saat komponen dimuat
    useEffect(() => {
        //membuat fungsi async untuk melakukan fetch data dari URL
        const fetchData = async () => {
            try {
              //mengambil data dari URL menggunakan fetch
              const response = await fetch('https://dnartworks.rugbyindonesia.or.id/indonesianrugby/news/list.xml');
              const data = await response.json();
              setJsonItems(data);
              
              const extractedTitle = data?.title ?? '';
              setTitle(extractedTitle);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

        fetchData();
    }, []);

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
                <div className="news section">
                    <img src = {bannerImage} alt='latest-news-banner'/>
                </div>
                
                <IonCard>
                    <img alt='latest-news-image-1' src={latestNews1}/>
                    <IonCardHeader>
                        <IonCardTitle>{title}</IonCardTitle>
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
