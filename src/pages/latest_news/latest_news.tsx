import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent} from '@ionic/react';
import { useEffect, useState } from 'react';
import './latest_news.css';

import bannerImage from '../../images/sub-header-news.png';
import latestNews1 from '../../images/latest_news_image_1.jpeg';
import homeIcon from '../../images/home_icon.png';
import axios from 'axios';
import xml2js from 'xml2js';

const Page: React.FC = () => {
    //membuat state untuk menyimpan data json dari url
    const [jsonItems, setJsonItems] = useState(null);
    const [title, setTitle] = useState('');
    const [descripstion, setDescription] = useState('');

    //menggunakan useEffect untuk melakukan fetch data saat komponen dimuat
    useEffect(() => {
        //membuat fungsi async untuk melakukan fetch data dari URL
        const fetchData = async () => {
            try {
              const response = await axios.get('https://dnartworks.rugbyindonesia.or.id/indonesianrugby/news/list.xml');
              const xml = response.data;
              const result = await xml2js.parseStringPromise(xml);
              const data = result.rss.channel[0].item;
              console.log(result.rss.channel[0].item);
              setJsonItems(data);

              const extractedTitle = data[0].title[0];
              console.log(extractedTitle);
              setTitle(extractedTitle);

              const extractedDescription = data[0].description[0];
              console.log(extractedDescription);
              setDescription(extractedDescription);

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
                <div className="news-section-image">
                    <img src = {bannerImage} alt='latest-news-banner'/>
                </div>
                
                <IonCard>
                    <img alt='latest-news-image' src={latestNews1}/>
                    <IonCardHeader>
                        <IonCardTitle>{title}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        {descripstion}
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Page;