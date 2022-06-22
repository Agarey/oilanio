import styles from '../../styles/components/content/PrivacyPolicy.module.css'
import Head from "next/head";
import Header from "../../src/components/Header/Header";
import ContactButton from "../../src/components/ContactButton/ContactButton";
import Footer from "../../src/components/Footer/Footer";
import React from "react";
import {Image} from "react-bootstrap";

const Instruction = () => {
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
                <title>Личный кабинет - Интсрукция</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: ym()}}/>
            </Head>

            <Header/>
            {/*<ContactButton/>*/}

            <div className={styles.container} style={{background: 'white'}}>
                <span className={styles.title}>Инструкция по использованию личного кабинета Oilan.io</span>
                <br/> <br/>
                <p className={styles.text}>
                    <b>Как пользоваться личным кабинетом?</b> <br/>
                    Чтобы начать пользоваться личным кабинетом, нужно зарегистрироваться. Процесс займет всего минуту. Для вашего удобства мы подробно описали ниже процедуру регистрации, а также функционал личного кабинета, который будет вам доступен.<br/>
                    <br/>
                    <b>Шаг 1</b> <br/>
                    Перейдите по вкладке «Личный кабинет», расположенной в правом верхнем углу сайта или по ссылке oilan.io/login <br/> <br/>
                    <Image src={'/cabinet_instruction/1.png'} className={styles.image}/> <br/> <br/>
                    <b>Шаг 2</b> <br/>
                    В появившемся окне введите логин и пароль, который ранее вам скидывал менеджер. Если вы не знаете свой логин и пароль, свяжитесь с менеджером. <br/>
                    <br/> <Image src={'/cabinet_instruction/2.png'} className={styles.image}/> <br/> <br/>

                    <b>Функционал личного кабинета</b> <br/>
                    В личном кабинете вы можете: <br/>
                    1) Редактировать информацию о вашем центре <br/>
                    Если вы хотите отредактировать информацию про центр, вам необходимо нажать на кнопку <b>“Редактировать”</b> в правом верхнем углу. <br/> <br/>
                    <Image src={'/cabinet_instruction/3.png'} className={styles.image}/> <br/> <br/>
                    Нажав на эту кнопку, вы можете редактировать следующую информацию:
                    <br/><b>-> Название центра </b><br/>
                    <Image src={'/cabinet_instruction/4.png'} className={styles.image}/>
                    <br/><br/><b>-> Описание центра </b><br/>
                    <Image src={'/cabinet_instruction/5.png'} className={styles.image}/>
                    <br/><br/><b>-> Соц. сети </b><br/>
                    <Image src={'/cabinet_instruction/6.png'} className={styles.image}/> <br/> <br/>
                    После редактирования нажмите на кнопку <b>“Cохранить”</b> и обновите страницу. <br/>
                    <Image src={'/cabinet_instruction/7.png'} className={styles.image}/> <br/> <br/>
                    2) Добавлять новые карточки <br/>
                    Чтобы добавить новый курс/карточку, вам необходимо нажать на кнопку <b>“+”</b> в секции <b>“Ваши курсы”</b> <br/> <br/>
                    <Image src={'/cabinet_instruction/8.png'} className={styles.image}/>
                    <br/> <br/> У вас появится следующее окно: <br/>  <br/>
                    <Image src={'/cabinet_instruction/9.png'} className={styles.image}/> <br/> <br/>
                    После заполнения карточки нажмите на кнопку “Добавить” и карточка отправиться на модерацию. После успешного прохождения модерации ваша карточка появится в личном кабинете и на платформе.
                    <br/> <br/>
                    3) Редактировать карточки <br/>
                    Для редактирования карточки вам необходимо нажать на кнопку “Редактировать” на нужной карточке. <br/> <br/>
                    <Image src={'/cabinet_instruction/10.png'} className={styles.image}/> <br/> <br/>
                    Нажмите на кнопку  “сохранить” и все изменения сохранятся. <br/>
                    Вы также можете архивировать и разархивировать карточку при необходимости, нажав на соответствующие кнопки на карточке. <br/> <br/>

                    4) Добавлять информацию про учителей <br/>
                    Для добавлении информации о преподователях необходимо нажать на знак  “+” в секции “Ваши учителя” <br/> <br/>
                    <Image src={'/cabinet_instruction/11.png'} className={styles.image}/> <br/> <br/>
                    Вам нужно будет загрузить фотографию в вертикальном положение, заполнить ФИО преподавателя и информацию о них. <br/>
                    После этого нажмите на кнопку “Сохранить” и ваша карточка с преподавателем отправится на модерацию. После модерации карточка будет доступна для клиентов и вас. <br/>
                    При желании вы можете удалить не актуального учителя. <br/> <br/>

                    5) Откликаться на заявки
                    Заявка — это запрос клиента на обучение в определенном направлении. Когда приходит заявка по вашим направлениям, она появляется в личном кабинете в секции “Заявка на поиск курса” в следующем виде. <br/>
                    Если вы хотите откликнуться на заявку, и чтобы клиент увидел вашу карточку, вам нужно нажать на кнопку “Откликнуться на заявку”. <br/> <br/>
                    <Image src={'/cabinet_instruction/12.png'} className={styles.image}/>
                     <br/> <br/>
                    6) Производить оплату <br/>
                    Чтобы иметь возможность откликнуться на заявку, клиентов вам необходимо произвести оплату. Для этого нажмите на кнопку “Оплата”. <br/> <br/>
                    <Image src={'/cabinet_instruction/13.png'} className={styles.image}/> <br/> <br/>

                    У вас откроется окно, где вам предложено выбрать пакет и также количество месяцев для оплаты. <br/>
                    После этого вы попадете на страницу, где вам будет необходимо ввести данные карты и произвести оплату. <br/>
                    Если у вас проблемы с оплатой, свяжитесь с тех поддержкой.

                </p>
            </div>

            <br/><br/><br/><br/>

            <Footer/>
        </div>
    )
}

export default Instruction;