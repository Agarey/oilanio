import React, {useEffect, useState} from "react";
import styles from "../../src/components/CourseSearchApplicationFullPage/CourseSearchApplicationFullPage.module.css";
import Header from "../../src/components/Header/Header";
import Image from "next/image";
import CourseSearchResultIsNotDefind from "../../src/components/CourseSearchResultIsNotDefind";
import CourseCard from "../../src/components/CourseCard/CourseCard";
import TutorCourseCard from "../../src/components/TutorCourseCard";
import Head from "next/head";

import { useRouter } from 'next/router'
import axios from "axios";
import globals from "../../src/globals";

const Third = (props) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [courseCards, setCourseCards] = useState([])
    const [length, setLength] = useState(8)

    const [searchCenter, setSearchCenter] = useState(true)

    const [isOnline, setIsOnline] = useState(false)

    const  getCards = async () => {
        const params = new URLSearchParams(window.location.search);
        const searchCenter = Boolean(+params.get('searchCenter'));
        setSearchCenter(Boolean(Number(searchCenter)))
        let isOnlineFormat = params.get('isOnline')
        setIsOnline(Boolean(Number(isOnlineFormat)))
        let cityId = params.get('city')
        let direction = params.get('direction')
        let price = params.get('price')

        const data = {
            centerName: '',
            city: isOnlineFormat === '1' ? '0' : cityId,
            direction: direction,
            price: price,
            center: '0',
            isOnline: Number(isOnlineFormat),
            sortType: '0'
        }

        console.log('data to request', data)

        let postResult = await axios.post(`${globals.productionServerDomain}/${searchCenter ? 'courseCardsFilter' : 'tutorCourseCardsFilter'}/`, data);
        console.log("RESULT CARDS (third step page)", postResult.data);
        setCourseCards(postResult.data);

        setLoading(false)
    }

    const ym = () => {
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

    const [imagesBase, setImagesBase] = useState([]);

    const loadData = async () => {
        let imagesBaseLocalStorage = JSON.parse(localStorage.getItem(globals.localStorageKeys.imagesBase));
        if(imagesBaseLocalStorage == null){
            let imagesBaseResponse = await axios.get(`${globals.productionServerDomain}/imagesBase`);
            setImagesBase(imagesBaseResponse.data);
        }else{
            setImagesBase(imagesBaseLocalStorage);
        }
    }

    useEffect(async ()=>{
        setLoading(true)
        await loadData()
        await getCards()
    }, []);

    const sendApplication = (courseId, userInfo) => {

        let data = {
            city_id: cityId,
            direction_id: directionId,
            name: userInfo.fullName,
            phone: userInfo.phone,
            email: userInfo.email,
            age: age,
            isOnline: isOnline,
            course_id: courseId,
            role_id: props.searchCenter ? 4 : 6
        };

        axios({
            method: 'post',
            url: `${globals.productionServerDomain}/createCourseSearchTicket`,
            data: data,
            headers: {
                'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
            }
        }).then(function(res){

        }).catch(() => {
            alert('Что-то пошло нетак!');
        });
    }

    return (
        <div>
            <Head>
                <title>Oilan - Шаг 3</title>
                <link rel="icon" href="/atom-icon.png"/>
                <div dangerouslySetInnerHTML={{__html: ym()}}/>
            </Head>
            <div className={styles.whiteBody}>
                <Header white={true} reload={true} close={props.close}/>

                <div className={styles.header}>
                    <div className={styles.goBack} onClick={()=>{
                        router.back()
                    }}>
                        <Image width={32} height={32} src={'/left-arrow-black.png'} className={styles.goBackImg}/>
                    </div>
                    <h1 className={styles.main_title} style={{color: 'black', marginLeft: 30}}>Мы подобрали вам {searchCenter ? 'следующие курсы' : 'следующих репетиторов'}!</h1>
                </div>
                {
                    loading ? null : (
                        courseCards.length===0 && <CourseSearchResultIsNotDefind/>
                    )
                }
                <div className={styles.cards_block}>
                    {
                        loading ? (
                            <div className={styles.loading}>
                                <span>Поиск курсов...</span>
                            </div>
                        ) : (
                            courseCards.length !== 0 ? (
                                courseCards.splice(0, courseCards.length).map(item => {
                                    if(searchCenter){
                                        if(item.title!='test'){
                                            return(
                                                <CourseCard coverImage={imagesBase[Math.floor(Math.random() * imagesBase.length)].src} showApplicationModal={true} sendApplicationCallback={sendApplication} direction={true} course={item}/>
                                            )
                                        }
                                    }else{
                                        return(
                                            <TutorCourseCard coverImage={imagesBase[Math.floor(Math.random() * imagesBase.length)].src} showApplicationModal={true} sendApplicationCallback={sendApplication} direction={true} course={item}/>
                                        )
                                    }
                                })
                            ) : null
                        )
                    }
                </div>
                {
                    length<courseCards.length && (
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '30px'}}>
                            <span className={styles.seeMore} onClick={()=>{
                                setLength(length+4)
                            }}>Показать еще</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Third;
