import Head from 'next/head'
import styles from '../../styles/components/content/soon.module.css'
import Header from '../../src/components/Header/Header'
import Footer from "../../src/components/Footer/Footer";
import ContactButton from "../../src/components/ContactButton/ContactButton";

export default function Soon() {
    return (
        <div >
            <Head>
                <title>Oilan</title>
                <link rel="icon" href="/atom-icon.png" />
            </Head>

            <Header/>
            {/*<ContactButton/>*/}

                <div className={styles.soonBody}>
                    <div className={styles.container}>
                        <div className={styles.titleBlock}>
                            <span className={styles.main_text_big}>Эта страница скоро станет доступна!</span>
                        </div>
                        <div className={styles.illustrationBlock}>
                            <img src="/soon.png" alt="" className={styles.soonIllustration}/>
                        </div>
                    </div>

                </div>

            <Footer/>
        </div>
    )
}
