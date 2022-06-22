import React from "react";
function YandexMetrika() {
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

export default YandexMetrika;