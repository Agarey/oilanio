import Head from 'next/head'
import styles from '../../styles/components/Feedbacks.module.css'
import Header from '../../src/components/Header/Header'
import Footer from "../../src/components/Footer/Footer";
import {Image} from "react-bootstrap";
import FeedbackForm from "../../src/components/FeedbackForm";
import NewFeedback from "../../src/components/NewFeedback";
import React, {useState} from "react";

export default function Feedbacks(props) {

    const [feedbacks, setFeedbacks] = useState(null)

    return (
        <div style={{background: 'linear-gradient(90deg, rgba(60,88,185,1) 0%, rgba(119,148,248,1) 100%)'}}>
            <Head>
                <title>Отзывы</title>
                <link rel="icon" href="/atom-icon.png" />
            </Head>

            <Header/>

            <div className={styles.main}>
                <div className={styles.leftBlock}>
                    <Image src={'/feedbacks-pic.png'} className={styles.image}/>
                </div>
                <div className={styles.rightBlock}>
                    <span className={styles.title}>Как вам Oilan?</span> <br/>
                    <span className={styles.description}>
                        Напишите отзыв о нашей платформе, чем она удобна <br/> и что вы бы хотели видеть в будущем.
                    </span>
                </div>
            </div>

            <br/>
            <br/>

            <div className={styles.container} style={{ padding: '20px', marginTop: 30 }}>
                <div className={styles.flex} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className={styles.title_block} >
                        <img src="/feedback.png" style={{ height: '18px' }} alt="" />
                        <span style={{
                            fontSize: 24,
                            fontFamily: 'sans-serif',
                            fontWeight: 'bold',
                            marginLeft: 10,
                            color: '#474747'
                        }}>Отзывы</span>
                    </div>
                </div>

                <FeedbackForm feedbackpage={'feedbackpage'} subcourseID={1337}/>

                <div className={styles.feedbacksWrapper}>
                    {
                        feedbacks !== null && feedbacks.length > 0 ?
                            feedbacks.map( item => <NewFeedback feedbackpage={'feedbackpage'} feedback={item}/>) : null
                    }
                </div>
            </div>

            <Footer/>

        </div>
    )
}