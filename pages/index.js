import styles from '../styles/components/content/CreateApplication.module.css'
import Header from "../src/components/Header/Header";
import ContactButton from "../src/components/ContactButton/ContactButton";
import ym from 'react-yandex-metrika';
import {Image} from "react-bootstrap";
import classnames from 'classnames';
import { useRouter } from 'next/router'

import CourseSearchApplicationFullPage
    from "../src/components/CourseSearchApplicationFullPage/CourseSearchApplicationFullPage";
import CourseHelpWithFullPage
    from "../src/components/CourseHelpWithFullPage/CourseHelpWithFullPage";
import React, {useState, useEffect} from "react";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {default as axios} from "axios";
import globals from "../src/globals";
import BecomeAPartnerFullPage from "../src/components/BecomeAPartnerFormFullPage/BecomeAPartnerFullPage";
import Head from "next/head";
import dynamic from 'next/dynamic'

const Odometer = dynamic(import('react-odometerjs'), {
    ssr: false,
    loading: () => 0
});
ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const CreateApplication = (props) => {
    const [showSecondSlide, setShowSecondSlide] = useState(false)
    const [showThirdSlide, setShowThirdSlide] = useState(false)
    const [showGide, setShowGide] = useState(false)
    const [primeHide, setPrimeHide] = useState(false)
    const [filters, setFilters] = useState([[],[],[]])
    const [directions, setDirections] = useState([]);
    const [showFormForStudent, setShowFormForStudent] = useState(true)
    const [searchCenter, setSearchCenter] = useState(true)
    const [tutors, setTutors] = useState([])
    const [clients, setClients] = useState([])
    const router = useRouter();
    const [odometerValue, setOdometerValue] = useState(0);
    const browser = ''
    const [isSafari, setIsSafari] = useState(false)
    useEffect(()=>{
        setShowSecondSlide(false)
        axios.get(`${globals.productionServerDomain}/filters`).then(res => {
            setFilters(res.data);
            loadFilters();
            // console.log(res.data);
        });
    }, [])

    useEffect(()=>{
        axios.get(`${globals.productionServerDomain}/tutors`).then(res => {
            setTutors(res.data);
            // console.log(res);
        });
    }, [])

    useEffect(()=>{
        axios.get(`${globals.productionServerDomain}/clients`).then(res => {
            setClients(res.data);
            console.log(res);
        });
    }, [])

    useEffect(()=>{
        setShowThirdSlide(false)
    }, [])

    useEffect(() => {
        if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
        {
            setIsSafari(false);
        }
        else if(navigator.userAgent.indexOf("Chrome") != -1 )
        {
            setIsSafari(false);
        }
        else if(navigator.userAgent.indexOf("Safari") != -1)
        {
            setIsSafari(true);
        }
        else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
        {
             setIsSafari(false);
        }
        else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
        {
          setIsSafari(false);
        }  
        else 
        {
           setIsSafari(false);
        }
            
        setTimeout(() => {
          setOdometerValue(300);
        }, 1000);
      }, []);
    const dataCenters = {
        datasets: [
            {
                data: [filters[2].length, 500-filters[2].length],
                backgroundColor: [
                    '#412FAE',
                    '#cad3ee',
                ],
                borderColor: [
                    '#412FAE',
                    '#cad3ee',
                ],
                borderWidth: 1,
            },
        ],
    };
    const dataTutors = {
        datasets: [
            {
                data: [tutors.length, 1000-tutors.length],
                backgroundColor: [
                    '#412FAE',
                    '#cad3ee',
                ],
                borderColor: [
                    '#412FAE',
                    '#cad3ee',
                ],
                borderWidth: 1,
            },
        ],
    };
    const dataCategories = {
        datasets: [
            {
                data: [filters[1].length, 100-filters[1].length],
                backgroundColor: [
                    '#412FAE',
                    '#cad3ee',
                ],
                borderColor: [
                    '#412FAE',
                    '#cad3ee',
                ],
                borderWidth: 1,
            },
        ],
    };
    const dataCities = {
        datasets: [
            {
                data: [filters[0].length, 25-filters[0].length],
                backgroundColor: [
                    '#412FAE',
                    '#cad3ee',
                ],
                borderColor: [
                    '#412FAE',
                    '#cad3ee',
                ],
                borderWidth: 1,
            },
        ],
    };

    const loadFilters = async () => {
        setFiltersLoading(true)
        let result = await axios.get(`${globals.productionServerDomain}/filters`);
        setFilters(result.data)
        setFiltersLoading(false)
    }
    const [filtersLoading, setFiltersLoading] = useState(false);
    // console.log(filters[0])
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

    function loadCategories(searchCenter){
        setDirections([{ name: 'Загружаем направления...', id: 0 }]);
        axios.post(`${globals.productionServerDomain}/getFilteredCategories`, {
            searchingCenter: searchCenter,
        }).then(res => {
            // console.log("FILTERS", res.data);
            setDirections(res.data)
        })
    }
    console.log('Safari', isSafari)
    return(
        <div className={styles.body}
             style={{ minHeight: '100vh', position: 'relative'}}
        >
            <div className={styles.displayNoneOnMobile}>
                <Image src={'https://realibi.kz/file/902932.png'} style={{position: 'absolute', top: '5%', left: '5%', height: 156, display: 'none'}}/>
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
                            <CourseSearchApplicationFullPage loadCategoriesCallback={loadCategories} setSearchCenterCallback={setSearchCenter} searchCenter={searchCenter} close={setShowSecondSlide} cities={filters[0]} directions={directions}/>
                        ) : (
                            <BecomeAPartnerFullPage close={setShowSecondSlide}/>
                        )
                    }

                </div>
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <div className={showThirdSlide ? styles.slideHide : styles.slide}>
                    {
                        showFormForStudent ? (
                            <CourseHelpWithFullPage close={setShowThirdSlide}/>
                        ) : (
                            <BecomeAPartnerFullPage close={setShowThirdSlide}/>
                        )
                    }

                </div>
            </div>

            <Header/>

            <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.mainLeft}>
                        <div className={styles.titleBlock}>
                            <span className={styles.title}>Нужно найти репетитора или образовательный центр?</span>
                        </div>
                    
                        <span 
                            className={styles.subtitleBottom} 
                            style={{fontSize: 30}}>
                            Сделайте это с Oilan за 15 минут
                        </span>
                    
                        <div className={styles.buttons_block}>
                            <button className={styles.button}
                                    onClick={()=>{
                                        setPrimeHide(true);
                                        setSearchCenter(false);
                                        setShowFormForStudent(true);
                                        setShowSecondSlide(!showSecondSlide);
                                        loadCategories(true);
                                        window.scrollBy(0,-10000);
                                        ym('reachGoal','ostavit-zayavku-button-pressed')
                                    }}
                            >Создать заявку</button>
                            {/*<button className={styles.button2}
                                    onClick={() => {
                                    router.push('/catalog');
                                }}>Перейти в каталог</button>*/}
                        </div>
                        <div className={styles.rounds}>
                            <div className={styles.forRC}>
                                <div className={styles.doughnut}>
                                    <div className={styles.counter}><Odometer value={filters[2].length} format='(,ddd).dd' theme="default" animation="count"/></div>
                                    {!isSafari?
                                    (<Doughnut className={styles.hole} data={dataCenters} options={{responsive: true, cutout: '80%'}}/>
                                    ):(<></>)}
                                </div>
                                <p>Учебных центров</p>
                            </div>
                            <div className={styles.forRC}>
                                <div className={styles.doughnut}>
                                    <div className={styles.counter}><Odometer value={tutors.length} format='(,ddd).dd' theme="default" animation="count"/></div>
                                    {!isSafari?
                                    (<Doughnut className={styles.hole} data={dataTutors} tooltips={false} options={{responsive: true, cutout: '80%',}}/>
                                    ):(<></>)}
                                </div>
                                <p>Репетиторов</p>
                            </div>
                            <div className={styles.forRC}>
                                <div className={styles.doughnut}>
                                    <div className={styles.counter}><Odometer value={filters[1].length} format='(,ddd).dd' theme="default" animation="count"/></div>
                                    {!isSafari?
                                    (<Doughnut className={styles.hole} data={dataCategories} options={{responsive: true, cutout: '80%',}}/>
                                    ):(<></>)}
                                </div>
                                <p>Направлений</p>
                            </div>
                            <div className={styles.forRC}>
                                <div className={styles.doughnut}>
                                    <div className={styles.counter}><Odometer value={filters[0].length} format='(,ddd).dd' theme="default" animation="count"/></div>
                                    {!isSafari?
                                    (<Doughnut className={styles.hole} data={dataCities} options={{responsive: true, cutout: '80%',}}/>
                                    ):(<></>)}
                                </div>
                                <p>Городов РК</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mainRight}>
                        <Image 
                            className={styles.img} 
                            src={'https://realibi.kz/file/800132.png'}
                        />
                    </div>
                </div>
                <div className={styles.mobileBlock}>
                    <div className={styles.rounds2}>
                            <div className={styles.forRC}>
                                <div className={styles.doughnut}>
                                    <div className={styles.counter}><Odometer value={filters[2].length} format='(,ddd).dd' theme="default" animation="count"/></div>
                                    {!isSafari?
                                    (<Doughnut className={styles.hole} data={dataCenters} options={{responsive: true, cutout: '80%'}}/>
                                    ):(<></>)}
                                </div>
                                <p>Учебных центров</p>
                            </div>
                            <div className={styles.forRC}>
                                <div className={styles.doughnut}>
                                    <div className={styles.counter}><Odometer value={tutors.length} format='(,ddd).dd' theme="default" animation="count"/></div>
                                    {!isSafari?
                                    (<Doughnut className={styles.hole} data={dataTutors} tooltips={false} options={{responsive: true, cutout: '80%',}}/>
                                    ):(<></>)}
                                </div>
                                <p>Репетиторов</p>
                            </div>
                            <div className={styles.forRC}>
                                <div className={styles.doughnut}>
                                    <div className={styles.counter}><Odometer value={filters[1].length} format='(,ddd).dd' theme="default" animation="count"/></div>
                                    {!isSafari?
                                    (<Doughnut className={styles.hole} data={dataCategories} options={{responsive: true, cutout: '80%',}}/>
                                    ):(<></>)}
                                </div>
                                <p>Направлений</p>
                            </div>
                            <div className={styles.forRC}>
                                <div className={styles.doughnut}>
                                    <div className={styles.counter}><Odometer value={filters[0].length} format='(,ddd).dd' theme="default" animation="count"/></div>
                                    {!isSafari?
                                    (<Doughnut className={styles.hole} data={dataCities} options={{responsive: true, cutout: '80%',}}/>
                                    ):(<></>)}
                                </div>
                                <p>Городов Р К</p>
                            </div>
                        </div>
                    <div className={styles.buttons_block2}>
                            <button className={styles.mobileButton1}
                                    onClick={()=>{
                                        setPrimeHide(true);
                                        setSearchCenter(false);
                                        setShowFormForStudent(true);
                                        setShowSecondSlide(!showSecondSlide);
                                        loadCategories(true);
                                        window.scrollBy(0,-10000);
                                        ym('reachGoal','ostavit-zayavku-button-pressed')
                                    }}
                            >Создать заявку</button>
                            {/*<button className={styles.mobileButton2}
                                    onClick={() => {
                                    router.push('/catalog');
                                }}>Перейти в каталог</button>*/}
                    </div>
                </div>
                <div className={styles.obenGide} 
                    onClick={()=>{setShowGide(!showGide); window.scrollTo(0, 1200)}}>
                    <button style={{marginRight: '0px'}} className={classnames(styles.button2, styles.hideButton)}>Как это работает</button>
                </div>
                
            </div>
            <Image className={styles.corner} style={{width: '5%'}} src={'https://realibi.kz/file/469063.png'}/>
            <div className={styles.downblock} style={{display: !showGide||showSecondSlide?"none":"flex", opacity: showSecondSlide?"0":"1"}}>
                <div className={styles.downtitleBlock}>
                    <span className={styles.downtitle}>Как это работает?</span>
                </div>
                <div className={styles.downRowsLeft}>
                    <Image src={'https://realibi.kz/file/811213.jpg'} className={styles.downImg}/>
                    <div className={styles.rowTextLeft}>
                        <span className={styles.downRowTitle}>Начало</span>
                        <p className={styles.downRowText}>Чтобы подать заявку центрам&#47;репетиторам, нажмите на кнопку <b>"Создать заявку"</b></p>
                    </div>
                </div>
                <div className={styles.downRowsRight}>
                    <div className={styles.rowTextRight}>
                        <span className={styles.downRowTitle}>Заявка</span>
                        <p className={styles.downRowText}>Заполните все необходимые для обучения поля, и нажмите на кнопку <b>"Создать заявку"</b></p>
                    </div>
                    <Image src={'https://realibi.kz/file/374313.jpg'} className={styles.downImg}/>
                </div>
                <div className={styles.downRowsLeft}>
                    <Image src={'https://realibi.kz/file/847800.jpg'} className={styles.downImg}/>
                    <div className={styles.rowTextLeft}>
                        <span className={styles.downRowTitle}>Обучение</span>
                        <p className={styles.downRowText}>В ближайшее время, наши партнеры свяжутся с вами. Вам лишь нужно будет выбрать самого подходящего для вас и начать обучение</p>
                    </div>
                </div>
                <div className={styles.downRowsRight}>
                    <div className={styles.rowTextRight}>
                        <span className={styles.downRowTitle}>Что-то не так?</span>
                        <p className={styles.downRowText}>Если что-то пошло не так, вы всегда можете сами найти себе курс на странице <a
                            className={styles.downlink}
                            onClick={() => {
                                router.push('/catalog');
                            }}
                            >
                                Каталога
                            </a></p>
                    </div>
                    <Image src={'https://realibi.kz/file/224362.jpg'} className={styles.downImg}/>
                </div>
                <button className={classnames(styles.downButton, styles.hideButton)}
                            onClick={()=>{
                                setShowGide(false);
                                setSearchCenter(false);
                                window.scrollBy(0,-10000);
                                setShowFormForStudent(true);
                                setShowSecondSlide(!showSecondSlide);
                                loadCategories(false);
                                ym(78186067,'reachGoal','ostavit-zayavku-button-pressed')
                            }}
                    >Создать заявку</button>
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
