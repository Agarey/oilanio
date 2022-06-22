import Head from 'next/head'
import Header from '../../src/components/Header/Header'
import React, {useState, useEffect} from "react";
import 'react-animated-slider/build/horizontal.css'
import ContactButton from "../../src/components/ContactButton/ContactButton";
import style from './direction.module.css'
import SideFilters from "../../src/components/SideFilters/SideFilters";
import globals from "../../src/globals";
import {useRouter} from "next/router";
import coursesStyles from "../../styles/components/content/Courses.module.css";
import SimpleSlider from "../../src/components/SimpleSlider/SimpleSlider";
import CourseCard from "../../src/components/CourseCard/CourseCard";
import coursePage from "../course/center/[coursename]";
import Footer from "../../src/components/Footer/Footer";
import CourseSearchFormBlock from "../../src/components/CourseSearchFormBlock";
import {CourseSearchForm} from "../../src/components/Forms/CourseSearchForm/CourseSearchForm";
import ModalWindow from "../../src/components/Modal/ModalWindow";

const axios = require('axios').default;

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

function direction(props) {
    const [showSideFilters, setShowSideFilters] = useState(false);

    const [showLinkModal, setShowLinkModal] = useState(false);
    const [showCourseSearchModal, setCourseSearchModal] = useState(false);

    const handleLinkModalClose = () => setShowLinkModal(false);
    const handleCourseSearchModalClose = () => setCourseSearchModal(false);


    const [filters, setFilters] = useState([]);

    console.log(props);

    useEffect(()=>{
        axios.get(`${globals.productionServerDomain}/filters`).then(res => {
            setFilters(res.data);
            console.log(res);
        })

        setTimeout(() => {
            setCourseSearchModal(true);
        }, 5000);
    }, []);

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
    };

    return (
        <div
            id={'page_top'}>

            <ModalWindow
                show={showCourseSearchModal}
                handleClose={handleCourseSearchModalClose}
                heading={''}
                body={<CourseSearchForm handleClose={handleCourseSearchModalClose} cities={filters[0]}
                                        directions={filters[1]}/>}/>

            <Head>
                <title>Курсы</title>
                <link rel="icon" href="/atom-icon.png"/>
                <div dangerouslySetInnerHTML={{__html: ym()}}/>
            </Head>

            <Header/>
            {/*<ContactButton/>*/}

            <div className={style.header_title_block}>
                <h1 className={style.header_title_text}>{props.categoryName}</h1>
            </div>

            <div className={style.title_block}>
                <p className={style.title_text}>Выберите курсы</p>
            </div>

            <div className={style.filterButtonBody}>
                <button
                    className={style.button}
                    onClick={() => setShowSideFilters(!showSideFilters)}
                >

                    {showSideFilters ? (<>Фильтры &#8592;</>) : (<>Фильтры &#8594;</>)}

                </button>
            </div>

            <div style={{position: 'relative'}}>
                <div className={showSideFilters ? style.mobileSideFilters_show : style.mobileSideFilters_hide}>
                    <SideFilters directionsList={props.directionsList} citiesList={props.citiesList} centersList={props.centersList}/>
                </div>
            </div>

            <div className={style.container_filter_cards}>
                <div className={style.filters_block}>
                    <SideFilters directionsList={props.directionsList} citiesList={props.citiesList} centersList={props.centersList}/>
                </div>
                <div className={style.cards_block}>
                    {
                        props.courseCards.map(item => <CourseCard direction={true} course={item}/>)
                    }
                </div>

            </div>

            {props.promotions.length > 0 ? (
                <div className={style.container_stocks}>
                    <div className={coursesStyles.img_title} style={{margin: '0 0'}}>
                        <img src="/discount.png" alt=""/>
                        <p>Актуальные акции</p>
                    </div>
                    <div style={{padding: '20px 0 60px 0', width: '100%'}}>
                        <SimpleSlider stocks={props.promotions}/>
                    </div>
                </div>
            ) : null}

            <div style={{paddingLeft: '2%', paddingRight: '2%'}}>
                <CourseSearchFormBlock directions={props.filters[1]}/>
            </div>


            <br/>
            <br/>

            <Footer/>
        </div>
    )
}

direction.getInitialProps = async (ctx) => {
    console.log("ctx")
    console.log(ctx)

    if(ctx.query.id !== undefined) {
        let citiesList = [];
        let directionsList = [];
        let centersList = [];
        let courseCards = [];
        let promotions=[];
        let filters = [];

        let filtersResult = await axios.get(`${globals.productionServerDomain}/filters`);
        filters = filtersResult.data;

        let directionId = ctx.query.id;
        let promotionsResult = await axios.post(`${globals.productionServerDomain}/loadDirectionPromotions`, {direction_id: directionId});
        promotions = promotionsResult.data;

        let categoryNameResult = await axios.post(`${globals.productionServerDomain}/courseCategory`, {id: directionId});

        let categoryName = categoryNameResult.data.name;

        let filtersData = await axios.get(`${globals.productionServerDomain}/filters`);
        citiesList = filtersData.data[0];
        directionsList = filtersData.data[1];
        centersList = filtersData.data[2];

        const data = {
            city: '0',
            direction: directionId.toString(),
            price: '0',
            center: '0',
            isOnline: '0',
            //individualLesson: individualLesson,
            sortType: '0'
        }

        let postResult = await axios.post(`${globals.productionServerDomain}/courseCardsFilter/`, data);
        courseCards = postResult.data;

        return {
            citiesList,
            directionsList,
            centersList,
            courseCards,
            categoryName,
            promotions,
            filters
        }
    }else{
        return {};
    }
}

export default direction;