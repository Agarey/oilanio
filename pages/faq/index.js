import styles from '../../styles/components/content/PrivacyPolicy.module.css'
import Head from "next/head";
import Header from "../../src/components/Header/Header";
import ContactButton from "../../src/components/ContactButton/ContactButton";
import React from "react";
import Link from "next/link";
import Footer from "../../src/components/Footer/Footer";

function Faq(){

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

    return(
        <div style={{background: 'linear-gradient(90deg, rgba(60,88,185,1) 0%, rgba(119,148,248,1) 100%)'}}>
            <Head>
                <title>FAQ</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: ym()}}/>
            </Head>

            <Header/>
            {/*<ContactButton/>*/}

            <div className={styles.container}>
                <span className={styles.title}>FAQ</span>
                <br/> <br/>
                <p className={styles.text}>

                    1. Для чего нужен личный кабинет? <br/>
                    Личный кабинет дает пользователю доступ к дополнительным функциям, которые недоступны незарегистрированным центрам(редактирование информации о курсе и центре, отклики на заявки клиентов, связь техподдержкой) <br/>
                    2. Зачем улучшать личный кабинет? <br/>
                    Подробно расписанная информация о центре влияет на выбор студента. Поэтому крайне рекомендуем вам улучшить данные о центре и карточки. <br/>
                    3. Как редактировать данные о центре? <br/> <br/>
                    Для редактирования информации о центре вам необходимо нажать на кнопку <b>“Редактировать”</b> <br/> <br/>

                    <p className={styles.textTitle}>Предлагаем вам примеры того, как можно заполнить страничку вашего центра:</p>
                    <ul>
                        <li>Описание вашего проекта (миссия, ценность центра, опыт работы на рынке, количество обучающихся студентов, личные достижения центра)</li>
                        <li>Описание актуальности вашей ниши (английский, танцы, стрельба и т.д.)</li>
                        <li>Преимущества центра и результаты учеников центра (статистика среднего балла по IELTS, SAT, NUFYPET, Медали, Звания, Разряды, Гранты)</li>
                        <li>Партнеры центра (Блогеры, школы, университеты)</li>
                    </ul>

                    4. Что такое карточка? <br/>
                    Карточка — это информация об определенном курсе, который вы предлагаете.<br/>
                    5. Как редактировать карточки?<br/>
                    В личном кабинете заходите в раздел “Ваши курсы” и нажимаете на кнопку “Редактировать” на нужной вам карточке.<br/>
                    6. Как добавлять новые карточки?<br/>
                    В личном кабинете заходите в раздел “Ваши курсы” и нажимаете на знак “+”.<br/>
                    7. Направления нет в списке, что делать?<br/>
                    Свяжитесь с менеджером или тех поддержкой.<br/>
                    8. "Карточка на модерации", что это означает?<br/>
                    Как только вы добавили карточку, менеджеры проверяют ее на корректность. При успешном прохождении модерации карточка высветится в вашем личном кабинете и на самой платформе.<br/>
                    9. Почему карточка не прошла модерацию? <br/>

                    <ul>
                        <li>Орфографическая ошибка</li>
                        <li>Неполное и не корректное заполнение полей</li>
                        <li>Дубликат существующей карточки</li>
                        <li>Недопустимый контент</li>
                    </ul>
                    <br/>

                    <b>Я не понимаю, как обработать заявку</b> <br/>
                    1. Что такое заявка? <br/>
                    Заявка - запрос клиента на обучение в определенном направлении.<br/>
                    2. Как я увижу поступающие заявки?<br/>
                    Первым делом уведомление о поступившей заявке придет через телеграм бот (@oilanio_bot) и рассылку на электронную почту.
                    Обработать заявку можно выполнив вход в личный кабинет (oilan.io/login) в разделе “Заявки на поиск курса”.<br/>
                    3. Как откликнуться на заявку?<br/>
                    Чтобы клиент увидел предложенные вами курсы необходимо откликнуться на заявку, нажав кнопку “Откликнуться” в разделе “Заявки на поиск курса”. На одну заявку можно откликнуться несколько раз разными карточками (курсами).<br/>
                    4. «Заявка деактивирована», что это значит?<br/>
                    “Заявка деактивирована” - значит клиент уже нашел курс или не нуждается в услугах данного направления и деактивировал свою заявку.<br/> <br/>
                    <b>Я не знаю как произвести оплату</b> <br/>
                    1. Как выбрать вид подписки? Какие есть? <br/>
                    Проект Oilan работает по модели подписки, где стоимость зависит от количества курсов (карточек), размещенных на платформе. Предлагаем выбрать один из следующих тарифов: <br/> <br/>

                    <b>Количество карточек 1:</b> <br/>
                    1 месяц - 6000тг <br/>
                    3 месяца - 15000тг, вместо 18000тг <br/>
                    6 месяцев - 24000тг, вместо 36000тг <br/> <br/>

                    <b>Количество карточек 5:</b> <br/>
                    1 месяц - 20000тг <br/>
                    3 месяца - 54000тг, вместо 60000тг  <br/>
                    6 месяцев - 96000тг, вместо 120000тг<br/> <br/>

                    <b>Количество карточек 10:</b> <br/>
                    1 месяц - 30000тг <br/>
                    3 месяца - 84000тг, вместо 90000тг  <br/>
                    6 месяцев - 156000тг, вместо 180000тг<br/> <br/>

                    <b>Количество карточек 20:</b> <br/>
                    1 месяц - 35000тг <br/>
                    3 месяца - 99000тг, вместо 105000тг  <br/>
                    6 месяцев - 186000тг, вместо 210000тг<br/> <br/>

                    2. Что входит в подписку? <br/>
                    Размещение ваших курсов на платформе является бесплатным.<br/>
                    Вы платите за возможность откликаться на поступающие заявки.<br/>
                    3. Как производить оплату?<br/>
                    В личном кабинете в разделе “Информация о центре” необходимо нажать кнопку “оплатить”, которая переадресует вас на заполнение данных вашей карты.<br/>
                    4. Как понять что оплата прошла?<br/>
                    После успешной оплаты вам придет уведомление в личном кабинете.<br/>
                    5. Деньги не списались во время оплаты. Что делать?<br/>
                    Попробуйте повторить оплату. При повторной ошибке обратитесь в тех поддержку.<br/>
                    6. Могу ли я менять тариф?<br/>
                    Нет, необходимо выбрать один из предложенных вариантов.<br/> <br/>

                    <b>Остались вопросы?</b> <br/>
                    Позвоните или напишите в службу поддержки.
                </p>
            </div>

            <br/><br/><br/><br/>

            <Footer/>
        </div>
    )
}

export default Faq;