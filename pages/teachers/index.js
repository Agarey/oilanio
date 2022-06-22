import styles from '../../styles/components/content/Teachers.module.css'
import Head from "next/head";
import Header from "../../src/components/Header/Header";

export default function Teachers(props) {
    return (
        <div>
            <Head>
                <title>Преподаватели</title>
                <link rel="icon" href="/atom-icon.png" />
            </Head>

            <Header/>

            <div className={styles.container}>
                <div className={styles.animatedCircle_1}></div>
                <div className={styles.animatedCircle_2}></div>
                <div className={styles.animatedCircle_3}></div>
            </div>
        </div>
    )
}