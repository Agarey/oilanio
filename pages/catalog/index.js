import styles from './style.module.css'
import Head from 'next/head'
import Header from "../../src/components/Header/Header";
import React, {useEffect, useState} from "react";
import FilterBlock from "../../src/components/FilterBlock";
import {default as axios} from "axios";
import globals from "../../src/globals";
import {useRouter} from "next/router";
import {Image} from "react-bootstrap";
import SimpleSlider from "../../src/components/SimpleSlider/SimpleSlider";
import CourseCategoriesSliderIMG from "../../src/components/CourseCategoriesSliderIMG";
import LoadingBlock from "../../src/components/LoadingBlock";
import coursesStyles from "../../styles/components/content/Courses.module.css";
import CourseCard from "../../src/components/CourseCard/CourseCard";
import ContactBlock from "../../src/components/ContactBlock";
import Footer from "../../src/components/Footer/Footer";
import LurkingFilterBlock from "../../src/components/LurkingFilterBlock";
import CourseSearchResultIsNotDefind from "../../src/components/CourseSearchResultIsNotDefind";

const Catalog = () => {
    const router = useRouter();

    const [cardsToShow, setCardsToShow] = useState(8)

    const addCards = () => {
            setCardsToShow(cardsToShow+8)
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
    const filterBtnHandler = async (centerName, city, direction, price, isOnline, searchingCenter) => {

        const redirectUrl = `/courses?centerName=${centerName}&direction=${direction}&city=${city}&price=${price}&isOnline=${isOnline}&searchingCenter=${searchingCenter}`

        await router.push(redirectUrl)
        //
        // let postResult = await axios.post(`${globals.productionServerDomain}/courseCardsFilter/`, data);
        // setCourseCards(postResult['data']);
        // document.querySelector('#coursesBlock').scrollIntoView({
        //     behavior: 'smooth'
        // });
        //
        // setLoading(false);
        // setOpenMoreSort(true)
    }
    const [imagesBase, setImagesBase] = useState([]);
    const loadCourseCards = async (directionId) => {
        setCoursesLoading(true)
        let result = await axios.get(`${globals.productionServerDomain}/courseCards/`);
        setCourseCards(result.data);
        console.log('courseCards', result.data)
        setShowUps(true)
    }
    const loadFilters = async () => {
        setFiltersLoading(true)
        let result = await axios.get(`${globals.productionServerDomain}/filters`);
        setFilters(result.data)
        setFiltersLoading(false)
    }
    const loadStocks = async () => {
        setStocksLoading(true)
        let result = await axios.post(`${globals.productionServerDomain}/loadDirectionPromotions`, {direction_id: 0});
        setStocks(result.data);
    }

    const [stocksLoading, setStocksLoading] = useState(false);
    const [filtersLoading, setFiltersLoading] = useState(false);
    const [coursesLoading, setCoursesLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);

    const [showUps, setShowUps] = useState(false)

    const [filters, setFilters] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [courseCards, setCourseCards] = useState([]);

    useEffect(async () => {
        let imagesBaseResponse = await axios.get(`${globals.productionServerDomain}/imagesBase`);
        setImagesBase(imagesBaseResponse.data);
        setCoursesLoading(true);
        loadFilters();
        loadCourseCards().then(() => setCoursesLoading(false));
        loadStocks().then(() => setStocksLoading(false));
        window.scrollTo(0, 0);
    }, [])

    function componentDidMount() {
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <Header white={true}/>
            <Head>
                <title>Oilan - Каталог</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: ym()}}/>
            </Head>

            <div className={styles.filterBlockWrapper}>
                <FilterBlock filters={filters} filterBtnHandler={filterBtnHandler}/>
            </div>

            {/*<div className={styles.titleBlock}>
                <Image src={'/fire-dynamic-color.png'} className={styles.titleImg}/>
                <span className={styles.title} style={{marginTop: 10}}>Актуальные акции</span>
            </div>
            <div style={{padding: '20px 0 60px 0', width: '100%', boxSizing: 'border-box'}}>
                {
                    stocksLoading ? <LoadingBlock/> : (stocks.length != 0 ? <SimpleSlider stocks={stocks}/> : <LoadingBlock/>)
                }
                
            </div>
            <div className={styles.titleBlock} style={{marginTop: 20, marginBottom: 20}}>
                <Image src={'/cryptocurrency-certificate.png'} className={styles.titleImg}/>
                <span className={styles.title}>Ключевые направления</span>
            </div>
            {
                filtersLoading ? <LoadingBlock/> : (filters[1] !== undefined ? <CourseCategoriesSliderIMG categories={filters[1]}/> : null)
            }*/}
            
            <div className={styles.titleBlock} style={{marginTop: 20, marginBottom: 20}}>
                <Image src={'/notebook-dynamic-color.png'} className={styles.titleImg}/>
                <span className={styles.title}>Популярные курсы</span>
            </div>
            {
                filters[0] != undefined && (<LurkingFilterBlock setCardsToShow={setCardsToShow} cities={filters[0]} directions={filters[1]} setCourseCards={setCourseCards} setCoursesLoading={setCoursesLoading}/>)
            }

            {
                courseCards.length > 0 && (
                    <div className={styles.courses_block}>
                        {
                            courseCards.slice(0, cardsToShow).map(course => {
                                if(course.title !== 'test'){
                                    return (
                                        <div style={{marginLeft: '5%', marginRight: '5%'}}>
                                            <CourseCard coverImage={imagesBase[Math.floor(Math.random() * imagesBase.length)].src} setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                )
            }
            {
                coursesLoading ? (<LoadingBlock/> ) : (
                    showUps && (courseCards.length < 1 ? <CourseSearchResultIsNotDefind catalog={true}/> : null)
                )
            }



            <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '10px 0'}}>
                <a className={styles.link} onClick={()=> {
                    addCards()
                }}>Смотреть еще</a>
            </div>
            <ContactBlock/>
            <Footer/>
        </div>
    )
}

export default Catalog;
