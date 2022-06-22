import styles from '../styles/components/content/CreateApplication.module.css'
import Header from "../src/components/Header/Header";
import ContactButton from "../src/components/ContactButton/ContactButton";
import ym from 'react-yandex-metrika';
import {Image} from "react-bootstrap";
import CourseSearchApplicationFullPage
    from "../src/components/CourseSearchApplicationFullPage/CourseSearchApplicationFullPage";
import React, {useState, useEffect} from "react";
import {default as axios} from "axios";
import globals from "../src/globals";
import BecomeAPartnerFullPage from "../src/components/BecomeAPartnerFormFullPage/BecomeAPartnerFullPage";
import Head from "next/head";
import { useRouter } from 'next/router'

const CreateApplication = (props) => {
    const [showSecondSlide, setShowSecondSlide] = useState(false)
    const [filters, setFilters] = useState([[],[],[]])
    const [directions, setDirections] = useState([]);
    const [showFormForStudent, setShowFormForStudent] = useState(true)
    const [searchCenter, setSearchCenter] = useState(true)

    const router = useRouter();

    useEffect(()=>{
        setShowSecondSlide(false)
        axios.get(`${globals.productionServerDomain}/filters`).then(res => {
            setFilters(res.data);
            console.log(res);
        })
    }, [])

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

    const loadCategories = (searchCenter) => {
        setDirections([{ name: 'Загружаем направления...', id: 0 }]);
        axios.post(`${globals.productionServerDomain}/getFilteredCategories`, {
            searchingCenter: searchCenter,
        }).then(res => {
            console.log("FILTERS", res.data);
            setDirections(res.data)
        })
    }

    return(
        <div className={styles.body}
             style={{background: 'linear-gradient(90deg, #7365C6 1.99%, #6657BF 46.33%, #412FAE 98.22%)', minHeight: '100vh', position: 'relative'}}
        >
            <div className={styles.displayNoneOnMobile}>
                <Image src={'/Other13.png'} style={{position: 'absolute', top: '20%', left: '-2%', height: 156}}/>
                <Image src={'/Other19.png'} style={{position: 'absolute', bottom: '30%', left: '5%', height: 156}}/>
                <Image src={'/Other06.png'} style={{position: 'absolute', top: '20%', right: '0%', height: 164}}/>
                <Image src={'/Other18.png'} style={{position: 'absolute', bottom: '25%', right: '5%', height: 156}}/>
            </div>


            <Head>
                <title>Oilan</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: ymetrica()}}/>
            </Head>
            <div style={{position: 'relative', width: '100%'}}>
                <div className={showSecondSlide ? styles.slideHide : styles.slide}>
                    {
                        showFormForStudent ? (
                            <CourseSearchApplicationFullPage searchCenter={searchCenter} close={setShowSecondSlide} cities={filters[0]} directions={directions}/>
                        ) : (
                            <BecomeAPartnerFullPage close={setShowSecondSlide}/>
                        )
                    }

                </div>
            </div>

            <Header/>

            {/*<ContactButton/>*/}
            <div className={styles.container}>
                <Image className={styles.img} src={'/Saly-16.png'}/>
                <div className={styles.titleBlock}>
                    <span className={styles.title}>Oilan.io</span>
                    {/*<span className={styles.subtitle}>Маркетплейс образовательных центров и репетиторов</span>*/}
                </div>
                <span className={styles.subtitleBottom} style={{fontSize: 16}}>Платформа для быстрого поиска и подбора образовательных курсов и репетиторов</span>
                <div className={styles.buttons_block}>
                    <button className={styles.button}
                            onClick={()=>{
                                // setSearchCenter(true);
                                // setShowFormForStudent(true);
                                // setShowSecondSlide(!showSecondSlide);
                                // loadCategories(true);
                                router.push(`/second?searchCenter=1&loadCategories=1`)
                                ym('reachGoal','search-centers-button-pressed');
                            }}
                    >Подобрать курс</button>
                    <button className={styles.button}
                            onClick={()=>{
                                // setSearchCenter(false);
                                // setShowFormForStudent(true);
                                // setShowSecondSlide(!showSecondSlide);
                                // loadCategories(false);
                                router.push(`/second?searchCenter=0&loadCategories=0`)
                                ym('reachGoal','search-tutors-button-pressed');
                            }}
                    >Подобрать репетитора</button>
                    {/*<span className={styles.subtitle}*/}
                    {/*      style={{marginTop: 20,fontSize: 14, textDecoration: 'underline', cursor: 'pointer', display: showSecondSlide ? 'none' : 'block'}}*/}
                    {/*      onClick={()=>{*/}
                    {/*          setShowFormForStudent(false)*/}
                    {/*          setShowSecondSlide(!showSecondSlide)*/}
                    {/*      }}*/}
                    {/*>Я образовательный центр</span>*/}
                </div>
            </div>

            <style jsx global>
                {`
                  body {
                    overflow-x: hidden;
                    -ms-overflow-style: none;
                  }
                `}
            </style>
        </div>
    )
}

export default CreateApplication;
