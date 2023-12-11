import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonBackButton} from '@ionic/react';
import './latest_news.css';

import bannerImage from '../../images/sub-header-news.png'
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
                <div className="news section">
                    <h2>Pengurus Besar Persatuan Rugby Union Indonesia dikukuhkan oleh Komite Olahraga Nasional Indonesia</h2>
                </div>

                <div className="news content">
                    <p>Komite Olahraga Nasional Indonesia (KONI) Pusat resmi mengukuhkan Pengurus Besar Persatuan Rugby Union Indonesia (PB PRUI) masa bakti 2021-2025 di Hotel Grand Century, Senayan, Jakarta pada Selasa (29/3/2022). Ini merupakan kepengurusan kedua Dr. Didik Mukrianto, SH., MH sebagai Ketua Umum PB PRUI.<br></br><br></br>

                        Tercatat ada 94 orang dalam kepengurusan masa bakti 2021 – 2025 dan 8 orang dewan Pembina, yang diketuai oleh Dr. Dede Yusuf Macan Effendi, ME., ST., MIPol, yang juga merupakan Wakil Ketua Komisi X di DPR RI. Kepengurusan PB PRUI memililki pengurus yang berasal dari berbagai latar belakang, dari politik hingga olahraga, menjadikan dinamika kepengurusan ini diharapkan akan berjalan dengan baik.<br></br><br></br>

                        Ketua Umum PB PRUI Didik Mukrianto menjelaskan bahwa PB PRUI langsung menyusun road map program yang akan dilakukan dari PRUI setiap daerah hingga pusat. “Tentu kami juga harus berkesinambungan dan terintegrasi dari pusat hingga daerah,” kata Didik. PB PRUI selalu menganggap serius perkembangan Rugby sebagai wujud dari nasionalisme. “Pengabdian kami ke Rugby ini merupakan bagian dari komitmen konkrit kita untuk negeri, menumbuhkembangkan idealisme, nasionalisme dan kecintaan kepada negeri tercinta. jangan pernah berhenti berjuang untuk negeri,” tutur Didik.<br></br><br></br>

                        Pelantikan ini menjadi momen penting, sekaligus awal yang baik bagi Didik Mukrianto. Hal senada dikatakan Ketua Umum KONI Pusat, Marciano Norman. Marciano meminta kepada PB PRUI untuk secara masif memperkenalkan olahraga rugby di Indonesia. Rugby yang merupakan salah satu cabang olahraga yang dipertandingkan di Olimpiade sudah seharusnya memiliki semangat lebih di Indonesia.</p>
                </div>
                <br></br>

            </IonContent>
        </IonPage>
    );
};

export default Page;
