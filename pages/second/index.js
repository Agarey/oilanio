import React, {useEffect, useState} from "react";
import CourseSearchApplicationFullPage
    from "../../src/components/CourseSearchApplicationFullPage/CourseSearchApplicationFullPage";
import BecomeAPartnerFullPage from "../../src/components/BecomeAPartnerFormFullPage/BecomeAPartnerFullPage";
import {default as axios} from "axios";
import globals from "../../src/globals";
import Head from "next/head";

function second(props) {

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

    const [showFormForStudent, setShowFormForStudent] = useState(false)
    const [searchCenter, setSearchCenter] = useState(true)
    const [showSecondSlide, setShowSecondSlide] = useState(false)
    const [directions, setDirections] = useState([]);
    const [filters, setFilters] = useState([[],[],[]])

    const loadPage = () => {
        const params = new URLSearchParams(window.location.search);
        const searchCenter = params.get('searchCenter');
        setSearchCenter(Boolean(Number(searchCenter)))

        loadCategories(Boolean(Number(searchCenter)))

        axios.get(`${globals.productionServerDomain}/filters`).then(res => {
            setFilters(res.data);
            console.log(res);
        })


        console.log('loaded')
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

    useEffect(() => {
        loadPage()
    },[])

    return (
        <div>
            <Head>
                <title>Oilan - Шаг 2</title>
                <link rel="icon" href="/atom-icon.png"/>
                <div dangerouslySetInnerHTML={{__html: ym()}}/>
            </Head>
            <CourseSearchApplicationFullPage searchCenter={searchCenter} close={setShowSecondSlide} cities={filters[0]} directions={directions}/>
        </div>
    )
}

export default second;