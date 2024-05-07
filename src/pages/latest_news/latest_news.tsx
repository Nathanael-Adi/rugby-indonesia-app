import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { useEffect, useState } from 'react';
import './latest_news.css';

import bannerImage from '../../images/sub-header-news.png';
import homeIcon from '../../images/home_icon.png';
import axios from 'axios';
import xml2js from 'xml2js';

const Page: React.FC = () => {
    //membuat state untuk menyimpan data json dari url
    // const [jsonItems, setJsonItems] = useState(null);
    // const [title, setTitle] = useState();
    // const [description, setDescription] = useState('');
    // const [thumbnail, setThumbnail] = useState('');
    const [newsItems, setNewsItems] = useState([]);

    //menggunakan useEffect untuk melakukan fetch data saat komponen dimuat
    useEffect(() => {
        //membuat fungsi async untuk melakukan fetch data dari URL
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dnartworks.rugbyindonesia.or.id/indonesianrugby/news/list.xml');
                const xml = response.data;
                const result = await xml2js.parseStringPromise(xml);
                const data = result.rss.channel[0].item;
                //console.log(data);

                const extractedNews = data.map((item: { description: any[]; title: any[]; }) => {
                    const extractedContent = item.description[0];
                    //console.log("Data: " + extractedContent)
                    const regexThumbnail = /https:\/\/(.*?).jpg/;
                    const matchThumbnail = regexThumbnail.exec(extractedContent);
                    let getThumbnail = '';
                    if (matchThumbnail) {
                        getThumbnail = matchThumbnail[0];
                        //console.log("Thumbnail: " + getThumbnail);
                        // setThumbnail(getThumbnail);
                    }

                    let extractedTitle = item.title[0];
                    // setTitle(extractedTitle);

                    // const regexDescription = /<p>(.*?)<\/p>/;
                    // const matchDescription = regexDescription.exec(extractedContent);
                    // console.log("Description: " + matchDescription);
                    // let getDescription = '';
                    // if (matchDescription) {
                    //     getDescription = matchDescription[1];
                        
                    //     setDescription(getDescription);
                    // }

                    return {
                        thumbnail: getThumbnail,
                        title: extractedTitle,
                        description: extractedContent
                    };
                });
                setNewsItems(extractedNews);
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
                    <img src={bannerImage} alt='latest-news-banner' />
                </div>

                {newsItems.map((item, index) => (
                    <IonCard key={index}>
                        <img alt='latest-news-image' src={item.thumbnail} />
                        <IonCardHeader>
                            <IonCardTitle>{item.title}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonContent>
        </IonPage>
    );
};

export default Page;