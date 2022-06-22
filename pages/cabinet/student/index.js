import styles from './style.module.css'
import {default as axios} from "axios";
import globals from "../../../src/globals";
import React, {useEffect, useState} from "react";
import Head from "next/head";
import Header from "../../../src/components/Header/Header";
import Footer from "../../../src/components/Footer/Footer";
import StudentCabinetHeader from "../../../src/components/StudentCabinetHeader";
import CourseCard from "../../../src/components/CourseCard/CourseCard";
import ApplicationCard from "../../../src/components/ApplicationCard";

export default function StudentCabinet(){
    const [applications, setApplications] = useState([]);
    const [applicationsLoading, setApplicationsLoading] = useState(true)
    const [student, setStudent] = useState(null);

    const [imagesBase, setImagesBase] = useState([]);

    const ymetrica = () => {
        return (
            "<!-- Yandex.Metrika counter -->\n" +
            "<script type=\"text/javascript\" >\n" +
            "   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n" +
            "   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n" +
            "   (window, document, \"script\", \"https://mc.yandex.ru/metrika/tag.js\", \"ym\");\n" +
            "\n" +
            "   ym(78186067, \"init\", {\n" +
            "        clickmap:true,\n" +
            "        trackLinks:true,\n" +
            "        accurateTrackBounce:true,\n" +
            "        webvisor:true,\n" +
            "        ecommerce:\"dataLayer\"\n" +
            "   });\n" +
            "</script>\n" +
            "<noscript><div><img src=\"https://mc.yandex.ru/watch/78186067\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript>\n" +
            "<!-- /Yandex.Metrika counter -->"
        );
    }

    const loadData = async () => {
        let currentStudent = JSON.parse(localStorage.getItem(globals.localStorageKeys.currentStudent));

        const result = await axios.post(
            `${globals.productionServerDomain}/getStudentApplications`,
            {phone: currentStudent.phone}
        );
        setStudent(currentStudent);

        setApplications(result.data);
        setApplicationsLoading(false)
        console.log('applications', result.data)

        let imagesBaseResponse = await axios.get(`${globals.productionServerDomain}/imagesBase`);
        setImagesBase(imagesBaseResponse.data);
    }

    useEffect(() => {
        setApplicationsLoading(true)
        loadData();
    }, [])

    return(
        <div>
            <Head>
                <title>Кабинет</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: ymetrica()}}/>
            </Head>
            <Header white={true}/>

            {
                student === null ? null : (<StudentCabinetHeader student={student}/>)
            }

            <div className={styles.titleBlock}>
                <span className={styles.title}>Оставленные заявки</span>
            </div>

            <div className={styles.wrapper}>
                {
                    imagesBase.length!=0 && (
                        applications.length > 0 ?
                            applications.map(application => {
                                return (
                                    <div style={{margin: '0 3% 30px 3%'}}>
                                        <ApplicationCard coverImage={imagesBase[Math.floor(Math.random() * imagesBase.length)].src} application={application}/>
                                    </div>
                                )
                            })
                            :
                            (<p className={styles.message}>Ваш список заявок пуст</p>)
                    )
                }
            </div>

            <Footer/>
        </div>
    );
}