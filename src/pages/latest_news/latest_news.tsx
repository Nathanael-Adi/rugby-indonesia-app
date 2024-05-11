import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonModal } from '@ionic/react';
import { useEffect, useState } from 'react';
import './latest_news.css';

import bannerImage from '../../images/sub-header-news.png';
import homeIcon from '../../images/home_icon.png';
import axios from 'axios';
import xml2js from 'xml2js';

const NewsPage: React.FC = () => {
    //membuat state untuk menyimpan data json dari url
    // const [jsonItems, setJsonItems] = useState(null);
    // const [title, setTitle] = useState();
    // const [description, setDescription] = useState('');
    // const [thumbnail, setThumbnail] = useState('');
    const [newsItems, setNewsItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1); // Index of the item being viewed in modal
    // const [content, setContent] = useState('');

    //menggunakan useEffect untuk melakukan fetch data saat komponen dimuat
    useEffect(() => {
        //membuat fungsi async untuk melakukan fetch data dari URL
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dnartworks.rugbyindonesia.or.id/indonesianrugby/news/list.xml');
                const xml = response.data;
                const result = await xml2js.parseStringPromise(xml);
                const data = result.rss.channel[0].item;
                console.log(data[0]['content:encoded'][0]);

                const extractedNews = data.map((item: { description: any[]; title: any[]; 'content:encoded': any[]; }) => {
                    const extractedContent = item.description[0];
                    //console.log("Data: " + extractedContent)
                    const regexThumbnail = /src=&quot;(.*?)&quot;/;
                    const matchThumbnail = regexThumbnail.exec(extractedContent);
                    //console.log("Thumbnail: " + matchThumbnail);
                    let getThumbnail = '';
                    if (matchThumbnail) {
                        getThumbnail = matchThumbnail[1];
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

                    const extractedContentEncoded = item['content:encoded'][0];
                    
                    return {
                        thumbnail: getThumbnail,
                        title: extractedTitle,
                        description: extractedContent,
                        content: extractedContentEncoded
                    };
                });
                setNewsItems(extractedNews);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        
    }, []);

    const openModal = (index: number) => {
        setSelectedItemIndex(index);
        setIsOpen(true);
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
                            {/* <a onClick={() => setIsOpen(true)}>Read More...</a> */}
                            <a onClick={() => openModal(index)}>Read More...</a>
                        </IonCardContent>
                    </IonCard>
                ))}
                <IonModal isOpen={isOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>{selectedItemIndex !== -1 ? newsItems[selectedItemIndex].title : ''}</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <img alt='latest-news-image' src={selectedItemIndex !== -1 ? newsItems[selectedItemIndex].thumbnail : ''} />
                        <h1>{selectedItemIndex !== -1 ? newsItems[selectedItemIndex].title : ''}</h1>
                        {selectedItemIndex !== -1 && (
                            <div dangerouslySetInnerHTML={{ __html: newsItems[selectedItemIndex].content }}></div>
                        )}
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default NewsPage;