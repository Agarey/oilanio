
import styles from './style.module.css'
import Header from "../../src/components/Header/Header";
import Head from "next/head";
import React from "react";
import HomeContent from "../../src/components/Content/HomeContent/HomeContent";
import WhyUs from "../../src/components/WhyUs";
import ContactBlock from "../../src/components/ContactBlock";
import Footer from "../../src/components/Footer/Footer";
import PartnersBlock from "../../src/components/PartnersBlock";
import FactsAboutUs from "../../src/components/FactsAboutUs";

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

    return(
        <div>
            <div className={styles.intro}>
                <Head>
                    <title>Oilan - О нас</title>
                    <link rel="icon" href="/atom-icon.png" />
                    <div dangerouslySetInnerHTML={{__html: ymetrica()}}/>
                </Head>

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