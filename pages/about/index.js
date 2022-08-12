import NoizyWindow from "../../src/components/NoizyWindow/NoizyWindow";
import styles from './style.module.css'
import Header from "../../src/components/Header/Header";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import HomeContent from "../../src/components/Content/HomeContent/HomeContent";
import WhyUs from "../../src/components/WhyUs";
import ContactBlock from "../../src/components/ContactBlock";
import Footer from "../../src/components/Footer/Footer";
import PartnersBlock from "../../src/components/PartnersBlock";
import FactsAboutUs from "../../src/components/FactsAboutUs";
import {default as axios} from "axios";
import globals from "../../src/globals";

const About = () => {

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

    const [showNoizyWindow, setShowNoizyWindow] = useState(false)
    const [directions, setDirections] = useState([]);
    const [searchCenter, setSearchCenter] = useState(true)
    const [filters, setFilters] = useState([]);
    const [filtersLoading, setFiltersLoading] = useState(false);
    const [sec, setSec] = useState(true);
    const [min, setMin] = useState(false);

    const loadFilters = async () => {
        setFiltersLoading(true)
        loadCategories(true);
        let result = await axios.get(`${globals.productionServerDomain}/filters`);
        setFilters(result.data)
        setFiltersLoading(false)
    };
    
    useEffect(async () => {
        loadFilters();
    }, []);

    function loadCategories(searchCenter){
        setDirections([{ name: 'Загружаем направления...', id: 0 }]);
        axios.post(`${globals.productionServerDomain}/getFilteredCategories`, {
            searchingCenter: searchCenter,
        }).then(res => {
            // console.log("FILTERS", res.data);
            setDirections(res.data)
        })
    }

    function openNoize(){
        setShowNoizyWindow(true);
    }

    // if (sec) {
    //     setTimeout(openNoize, 30000);
    //     setSec(false);
    //     setMin(true);
    // };
    // if (min) {
    //     setInterval(openNoize, 300000);
    // };

    return(
        <div>
            <div className={styles.intro}>
                <Head>
                    <title>Oilan - О нас</title>
                    <link rel="icon" href="/atom-icon.png" />
                    <div dangerouslySetInnerHTML={{__html: ymetrica()}}/>
                </Head>
                { showNoizyWindow 
                    ? (
                    <NoizyWindow 
                        loadCategoriesCallback={loadCategories} 
                        setSearchCenterCallback={setSearchCenter} 
                        searchCenter={searchCenter} 
                        close={setShowNoizyWindow} 
                        cities={filters[0]} 
                        directions={directions}
                    />)
                    : <></>
                }
                <Header/>
                <HomeContent/>
                <FactsAboutUs/>
                <WhyUs/>
                <PartnersBlock/>
                <ContactBlock/>
                <Footer/>

            </div>

        </div>
    )
}

export default About;