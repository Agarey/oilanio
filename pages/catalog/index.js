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
import TopTutorsSlider from "../../src/components/TopTutorsSlider";
import LoadingBlock from "../../src/components/LoadingBlock";
import coursesStyles from "../../styles/components/content/Courses.module.css";
import CourseCard from "../../src/components/CourseCard/CourseCard";
import ContactBlock from "../../src/components/ContactBlock";
import Footer from "../../src/components/Footer/Footer";
import LurkingFilterBlock from "../../src/components/LurkingFilterBlock";
import CourseSearchResultIsNotDefind from "../../src/components/CourseSearchResultIsNotDefind";
import Link from 'next/link'
import {BecomeAPartner} from "../../src/components/Forms/BecomeAPartnerForm/BecomeAPartner";
import ModalWindow from "../../src/components/Modal/ModalWindow";
import ym from 'react-yandex-metrika';
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
import dynamic from 'next/dynamic'
import CourseSearchApplicationFullPage from '../../src/components/CourseSearchApplicationFullPage/CourseSearchApplicationFullPage';
import classnames from 'classnames';
import TutorCourseCard from '../../src/components/TutorCourseCard';
import NoizyWindow from '../../src/components/NoizyWindow/NoizyWindow';

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
const Catalog = () => {
    const router = useRouter();

    const [cardsToShow, setCardsToShow] = useState(8);
    const [showNoizyWindow, setShowNoizyWindow] = useState(false);

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
    const [tutors, setTutors] = useState([])
    const [tutorsWithPhoto, setTutorsWithPhoto] = useState([])
    const [showUps, setShowUps] = useState(false)
    const [roundFilters, setroundFilters] = useState([[],[],[]])
    const [filters, setFilters] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [courseCards, setCourseCards] = useState([]);
    const [show, setShow] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [cabinetRoute, setCabinetRoute] = useState('/login');
    const [isSafari, setIsSafari] = useState(false)
    const [odometerValue, setOdometerValue] = useState(0);
    const browser = ''
    const [student, setStudent] = useState({})
    const [center, setCenter] = useState({});
    const [directions, setDirections] = useState([]);
    const [searchCenter, setSearchCenter] = useState(true)

    const [exitingOut, setExitingOut] = useState(false)

    const [loadingData, setLoadingData] = useState(true)

    const [courseCategories, setCourseCategories] = useState([])
    const [courses, setCourses] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [directionId, setDirectionId] = useState()
    const [courseId, setCourseId] = useState()
    const [searchFilter, setSearchFilter] = useState([])

    const [showAboutUs, setShowAboutUs] = useState(false)

    const [tutorCards, setTutorCards] = useState([]);
    const [isTutors, setIsTutors] = useState(false);

    const loadUserInfo = async () => {
        if(localStorage.getItem(globals.localStorageKeys.currentStudent) !== null){
            let currentStudent = JSON.parse(localStorage.getItem(globals.localStorageKeys.currentStudent));

            setStudent({
                name: currentStudent.name,
            });

            setCabinetRoute('/cabinet/student')
            setIsLogged(true)
            setLoadingData(false)
        }else if(localStorage.getItem(globals.localStorageKeys.centerId) !== null){
            let centerId = +localStorage.getItem(globals.localStorageKeys.centerId);
            let roleId = +localStorage.getItem(globals.localStorageKeys.roleId);
            console.log('auth role id', roleId)

            if(roleId === 6){
                await axios({
                    method: 'get',
                    url: `${globals.productionServerDomain}/tutors/${centerId}`,
                }).then(async function(res){
                    await setCenter(res.data);
                    setCabinetRoute('/cabinet/tutor');
                    console.log('cabinet route /cabinet/tutor', cabinetRoute)
                    setIsLogged(true);
                });
            } else if(roleId === 4){
                await axios({
                    method: 'get',
                    url: `${globals.productionServerDomain}/courses/${centerId}`,
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token}`
                    }
                }).then(async function(res){
                    await setCenter(res.data[0]);
                    setCabinetRoute('/cabinet');
                    console.log('cabinet route /cabinet', cabinetRoute)
                    setIsLogged(true);
                });
            }

            setLoadingData(false)
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(function(){
        loadUserInfo();
        setLoadingData(false)
        console.log('pathname = ' + window.location.pathname)
    }, [])

    function loadCategories(searchCenter){
        setDirections([{ name: 'Загружаем направления...', id: 0 }]);
        axios.post(`${globals.productionServerDomain}/getFilteredCategories`, {
            searchingCenter: searchCenter,
        }).then(res => {
            // console.log("FILTERS", res.data);
            setDirections(res.data)
        })
    }

    useEffect(()=>{
        axios.get(`${globals.productionServerDomain}/tutors`).then(res => {
            setTutors(res.data);
            // console.log(res);
        });
        axios.get(`${globals.productionServerDomain}/getTutorsWithPhoto`).then(res => {
            setTutorsWithPhoto(res.data);
            console.log('photos', res);
        });
        axios({
            method: 'post',
            url: `${globals.productionServerDomain}/courseCategories`,
        }).then(function(res){
            setCourseCategories(res.data);
        }).catch((err)=>{
            alert("Произошла ошибка")
            console.log("error")
        })
        axios.get(`${globals.productionServerDomain}/courses`).then(res => { setCourses(res.data) })
    }, [])

    useEffect(()=>{
        axios.get(`${globals.productionServerDomain}/filters`).then(res => {
            setroundFilters(res.data);
            loadCategories(true);
            loadFilters();
            // console.log(res.data);
        });
    }, [])

    useEffect(async () => {
        let imagesBaseResponse = await axios.get(`${globals.productionServerDomain}/imagesBase`);
        setImagesBase(imagesBaseResponse.data);
        setCoursesLoading(true);
        loadFilters();
        loadCourseCards().then(() => setCoursesLoading(false));
        loadStocks().then(() => setStocksLoading(false));
        compareDirectrion(searchInput)
        compareCourseName(searchInput)
        window.scrollTo(0, 0);
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
                data: [roundFilters[2].length, 500-roundFilters[2].length],
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
                data: [roundFilters[1].length, 100-roundFilters[1].length],
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
                data: [roundFilters[0].length, 25-roundFilters[0].length],
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

    // const loadFilters = async () => {
    //     setFiltersLoading(true)
    //     let result = await axios.get(`${globals.productionServerDomain}/filters`);
    //     setFilters(result.data)
    //     setFiltersLoading(false)
    // }
    // const [filtersLoading, setFiltersLoading] = useState(false);
    function componentDidMount() {
        window.scrollTo(0, 0);
    }

    const compareDirectrion =  (value) => {
        let direction_Id =  (courseCategories.find(el => el.name.toLowerCase() == value.toLowerCase())) 
        if (!direction_Id) {direction_Id = 0} 
        (direction_Id == 0)? {} : direction_Id = direction_Id.id
        setDirectionId(direction_Id)
        console.log(direction_Id)
        console.log("directionId", directionId)
        
        const filterDirections = courseCategories.filter(category => {
            return category.name.toLowerCase().includes(value.toLowerCase())
        })
        console.log("filterDirections", filterDirections)
        setSearchFilter(filterDirections)
    } 

    const compareCourseName = (value) => {
        let course_name = (courses.find(el => el.title.toLowerCase() == value.toLowerCase()))
        if (!course_name) {course_name = ''}
        (course_name == '')? {} : course_name = course_name.title
        setCourseId(course_name)
        console.log("COOURSE IDDDD", courseId)

        const filterCourses = courses.filter(course => {
            return course.title.toLowerCase().includes(value.toLowerCase())
            filterCourses.replace()
        })
        console.log("filterCourses", filterCourses)
        setSearchFilterCourses(filterCourses)
    }
    const [searchFilterCourses, setSearchFilterCourses] = useState([])

    const searchItemClickHandler = (e) => {
        setSearchInput(e.target.textContent)
        setIsFilterOpen(false)
    }

    const inputClickHandler = () => {
        setIsFilterOpen(true)
    }
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    useEffect(() => {
        compareDirectrion(searchInput)
        compareCourseName(searchInput)
    }, [searchInput])


    const getCards = async () => {
        console.log("Функция getCards");
        if (isTutors) {
          const data = {
            centerName: "",
            city: 1,
            direction: "1",
            price: "0",
            center: "0",
            isOnline: false,
          };
    
          let postResult = await axios.post(
            `${globals.productionServerDomain}/tutorCourseCardsFilter`,
            data
          );
    
          console.log("postResult равно", postResult.data);
          setTutorCards(postResult.data);
          setCoursesLoading(false);
        } else {
          const data = {
            centerName: "",
            city: 1,
            direction: "1",
            price: "0",
            center: "0",
            isOnline: false,
            //individualLesson: individualLesson,
            sortType: "0",
          };
    
          let postResult = await axios.post(
            `${globals.productionServerDomain}/courseCardsFilter/`,
            data
          );
    
          console.log("postResult равно", postResult.data);
          setCourseCards(postResult.data);
          setCoursesLoading(false);
        }
    };

    useEffect(() => {
        getCards();
    }, [isTutors]);

    function openNoize(){
        setShowNoizyWindow(true);
    }

    setTimeout(openNoize, 30000);
     
    setInterval(openNoize, 300000);

    const optionsDon = {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
        cutout: "80%",
      };

    return (
        <div>
            { showNoizyWindow 
                ? (
                    <NoizyWindow 
                        loadCategoriesCallback={loadCategories} 
                        setSearchCenterCallback={setSearchCenter} 
                        searchCenter={searchCenter} 
                        close={setShowNoizyWindow} 
                        cities={filters[0]} 
                        directions={directions}
                    />
                )
                : <></>
            }
            <div className={showAboutUs ? styles.slide : styles.slideHide}>
                    {showAboutUs ? <><div className={styles.downblock} style={{display: "flex"}}>
                    <div className={styles.aboutUsBack} onClick={() => setShowAboutUs(!showAboutUs)}></div>
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
            </div></> : ''}
                </div>
            <div className={styles.pageBody}>
            <div id={'header'} className={styles.whiteHeader}>
            {/*<YMInitializer accounts={[78186067]} options={{webvisor: true, defer: true}} version="2" />*/}
            <ModalWindow show={show} handleClose={handleClose} heading={''} body={<BecomeAPartner handleClose={handleClose}/>}/>

            <div className={styles.desktopHeader}>
                <div className={styles.logo}>
                    <Link href={'/'}>
                        <a onClick={async(ctx) => {
                            if(props.reload){
                                props.close(false)
                                props.setStep(1)
                            } else {
                                if(window.location.pathname === '/') {
                                    router.reload()
                                } else {
                                    await router.push("/")
                                }
                            }
                        }} style={{color: 'white',alignContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <svg className={styles.svg} width="100" height="50" viewBox="-30 30 640 389" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M96.38 338.745C80.7233 338.745 66.49 335.187 53.68 328.07C41.0733 320.953 31.11 310.888 23.79 297.875C16.6733 284.658 13.115 269.408 13.115 252.125C13.115 235.045 16.775 219.998 24.095 206.985C31.6183 193.768 41.785 183.703 54.595 176.79C67.405 169.673 81.74 166.115 97.6 166.115C113.46 166.115 127.795 169.673 140.605 176.79C153.415 183.703 163.48 193.667 170.8 206.68C178.323 219.693 182.085 234.842 182.085 252.125C182.085 269.408 178.222 284.658 170.495 297.875C162.972 310.888 152.703 320.953 139.69 328.07C126.677 335.187 112.24 338.745 96.38 338.745ZM96.38 314.345C106.343 314.345 115.697 312.007 124.44 307.33C133.183 302.653 140.198 295.638 145.485 286.285C150.975 276.932 153.72 265.545 153.72 252.125C153.72 238.705 151.077 227.318 145.79 217.965C140.503 208.612 133.59 201.698 125.05 197.225C116.51 192.548 107.258 190.21 97.295 190.21C87.1283 190.21 77.775 192.548 69.235 197.225C60.8983 201.698 54.1883 208.612 49.105 217.965C44.0217 227.318 41.48 238.705 41.48 252.125C41.48 265.748 43.92 277.237 48.8 286.59C53.8833 295.943 60.5933 302.958 68.93 307.635C77.2667 312.108 86.4167 314.345 96.38 314.345Z" fill={'white'}/>
                                <path className={styles.logoLetter} d="M94.59 108.48C89.8367 108.48 85.85 106.87 82.63 103.65C79.41 100.43 77.8 96.4433 77.8 91.69C77.8 86.9367 79.41 82.95 82.63 79.73C85.85 76.51 89.8367 74.9 94.59 74.9C99.19 74.9 103.1 76.51 106.32 79.73C109.54 82.95 111.15 86.9367 111.15 91.69C111.15 96.4433 109.54 100.43 106.32 103.65C103.1 106.87 99.19 108.48 94.59 108.48ZM107.47 125.27V252H81.25V125.27H107.47Z" fill={'white'}/>
                                <path d="M217.432 122.88V336H184.6V122.88H217.432ZM230.873 255.936C230.873 240 234.137 225.888 240.665 213.6C247.386 201.312 256.41 191.808 267.738 185.088C279.258 178.176 291.93 174.72 305.754 174.72C318.234 174.72 329.082 177.216 338.298 182.208C347.706 187.008 355.194 193.056 360.762 200.352V177.312H393.882V336H360.762V312.384C355.194 319.872 347.61 326.112 338.01 331.104C328.41 336.096 317.466 338.592 305.178 338.592C291.546 338.592 279.066 335.136 267.738 328.224C256.41 321.12 247.386 311.328 240.665 298.848C234.137 286.176 230.873 271.872 230.873 255.936ZM360.762 256.512C360.762 245.568 358.458 236.064 353.85 228C349.434 219.936 343.578 213.792 336.282 209.568C328.986 205.344 321.114 203.232 312.666 203.232C304.218 203.232 296.346 205.344 289.05 209.568C281.754 213.6 275.801 219.648 271.193 227.712C266.778 235.584 264.57 244.992 264.57 255.936C264.57 266.88 266.778 276.48 271.193 284.736C275.801 292.992 281.754 299.328 289.05 303.744C296.538 307.968 304.41 310.08 312.666 310.08C321.114 310.08 328.986 307.968 336.282 303.744C343.578 299.52 349.434 293.376 353.85 285.312C358.458 277.056 360.762 267.456 360.762 256.512ZM498.349 174.72C510.829 174.72 521.965 177.312 531.757 182.496C541.741 187.68 549.517 195.36 555.085 205.536C560.653 215.712 563.437 228 563.437 242.4V336H530.893V247.296C530.893 233.088 527.341 222.24 520.237 214.752C513.133 207.072 503.437 203.232 491.149 203.232C478.861 203.232 469.069 207.072 461.773 214.752C454.669 222.24 451.117 233.088 451.117 247.296V336H418.285V177.312H451.117V195.456C456.493 188.928 463.309 183.84 471.565 180.192C480.013 176.544 488.941 174.72 498.349 174.72Z" fill={'white'}/>
                            </svg>
                        </a>
                    </Link>
                </div>
                <div className={styles.searchBlock}>
                    {/*<input type="text" className={styles.searchInput} placeholder="Поиск"/>*/}
                    {/*<div className={styles.searchIconBody} >*/}
                    {/*    <img className={styles.searchIcon} src="/search-white.png" alt=""/>*/}
                    {/*</div>*/}
                </div>
                <div className={styles.menu}>
                    <ul className={styles.menu_ul}>
                        <li>
                            <a
                                className={styles.link}
                                style={{color: 'white'}}
                                onClick={() => {
                                    router.push('/about');
                                }}
                            >
                                О нас
                            </a>
                        </li>
                        <li>
                            <a
                                className={styles.link}
                                style={{color: 'white'}}
                                onClick={() => {
                                    router.push('/catalog');
                                }}
                            >
                                Каталог
                            </a>
                        </li>
                        <li onClick={handleShow}>
                            <a
                                className={styles.link}
                                style={{color: 'white'}}
                                onClick={() => {
                                    ym('reachGoal','partnership-button-pressed')
                                }}
                            >
                                Стать партнером
                            </a>
                        </li>

                        {loadingData===false && (
                            <li>
                                <a
                                    style={{color:'white'}}
                                    onClick={() => {
                                        if(!isLogged){
                                            ym('reachGoal','log-in-button-pressed')
                                            router.push('/login')
                                        }
                                    }}
                                >{
                                    student.name !== undefined ? (
                                        <div className={styles.studentCard}>
                                            <Image src={'https://realibi.kz/file/624128.png'} className={styles.studentAvatar}/>
                                            <div className={styles.studentInfo}>
                                                <span className={styles.studentName} onClick={()=>router.push('/cabinet/student')}>{student.name}</span>
                                                <span className={styles.exitBtn} onClick={()=>{
                                                    setExitingOut(true)
                                                    router.push('/login');
                                                }}>{exitingOut ? 'Выход...' : 'Выйти'}</span>
                                            </div>
                                        </div>
                                    ) : (center !== undefined && center.title !== undefined ? (
                                        <div className={styles.studentCard}>
                                            <Image src={center.img_src} className={styles.studentAvatar}/>
                                            <div className={styles.studentInfo}>
                                                <span className={styles.studentName} onClick={()=>router.push('/cabinet')}>{center.title || center.fullname}</span>
                                                <span className={styles.exitBtn} onClick={()=>{
                                                    setExitingOut(true)

                                                    localStorage.removeItem(globals.localStorageKeys.currentStudent)

                                                    localStorage.removeItem(globals.localStorageKeys.authToken);
                                                    localStorage.removeItem(globals.localStorageKeys.centerId);
                                                    localStorage.removeItem(globals.localStorageKeys.currentUserId);
                                                    localStorage.removeItem(globals.localStorageKeys.roleId);

                                                    encodeURIComponent(router.push('/login'))
                                                }}>{exitingOut ? 'Выход...' : 'Выйти'}</span>
                                            </div>
                                        </div>
                                    ) : (center !== undefined && center.fullname !== undefined ? (
                                        <div className={styles.studentCard}>
                                            <Image src={center.img_src || 'https://realibi.kz/file/624128.png'} className={styles.studentAvatar}/>
                                            <div className={styles.studentInfo}>
                                                <span className={styles.studentName} onClick={()=>router.push('/cabinet')}>{center.title || center.fullname}</span>
                                                <span className={styles.exitBtn} onClick={()=>{
                                                    setExitingOut(true)
                                                    encodeURIComponent(router.push('/login'))
                                                }}>{exitingOut ? 'Выход...' : 'Выйти'}</span>
                                            </div>
                                        </div>
                                    ) : (<a onClick={() => router.push('/login')}>
                                        Войти
                                    </a>)))
                                }</a>
                            </li>
                        )}
                    </ul>
                </div>

                <div onClick={() => { setShowMobileMenu(!showMobileMenu) }} className={styles.menuButtonBody}>
                    <svg width="30" height="18" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H29" stroke="white" stroke-width="2" stroke-linecap="round"/>
                        <path d="M1 17H29" stroke="white" stroke-width="2" stroke-linecap="round"/>
                        <path d="M9 9H29" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span style={{
                        fontFamily: 'Rubik Medium',
                        fontSize: '18px',
                        marginLeft: '10px',
                        color: 'white'
                    }}>Меню</span>
                </div>

            </div>

            {showMobileMenu ?
                (
                    <div style={{display: 'block'}} className={styles.mobileMenu}>
                        <ul className={styles.menu_ul}>
                            <li>
                                <a
                                    className={styles.link}
                                    style={{color: 'black'}}
                                    onClick={() => {
                                        router.push('/about');
                                    }}
                                >
                                    О нас
                                </a>
                            </li>
                            <li>
                                <a
                                    className={styles.link}
                                    style={{color: 'black'}}
                                    onClick={() => {
                                        router.push('/catalog');
                                    }}
                                >
                                    Каталог
                                </a>
                            </li>
                            <li onClick={handleShow}>
                                <a className={styles.link} style={{color: 'black'}}>Стать партнером</a>
                            </li>
                            {
                                isLogged ?
                                    (<li style={{color: 'black'}}>
                                        <Link href={cabinetRoute}>
                                            <a style={{color: 'black'}}>Личный кабинет</a>
                                        </Link>
                                        <span className={styles.exitBtn} onClick={()=>{
                                            setExitingOut(true)

                                            localStorage.removeItem(globals.localStorageKeys.currentStudent)

                                            localStorage.removeItem(globals.localStorageKeys.authToken);
                                            localStorage.removeItem(globals.localStorageKeys.centerId);
                                            localStorage.removeItem(globals.localStorageKeys.currentUserId);
                                            localStorage.removeItem(globals.localStorageKeys.roleId);

                                            encodeURIComponent(router.push('/login'))
                                        }}>{exitingOut ? 'Выход...' : 'Выйти'}</span>
                                    </li>)
                                    :
                                    (<li>
                                        <Link href={cabinetRoute} className={styles.link}>
                                            <a style={{color: 'black'}}>Войти</a>
                                        </Link>
                                    </li>)
                            }
                        </ul>
                    </div>
                ) : null
            }

        </div>
            <Head>
                <title>Oilan - Каталог</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: ym()}}/>
            </Head>

            <div className={styles.mainImageTitleBlock}>
                <h1>Нужен образовательный центр или репетитор?</h1>
                <p>Найдите лучший всего за 15 минут</p>
                <div className={styles.findCourseBlock}>
                <input onChange={(e) => {setSearchInput(e.target.value)
                compareDirectrion(searchInput)
                compareCourseName(searchInput)
                setIsFilterOpen(true)
            
                }} value={searchInput} style={{width: '80%'}} placeholder={'Название специальности или языка'}/>
                <button
                    onClick={()=>{
                        compareDirectrion(searchInput)
                        compareCourseName(searchInput)
                        let centerName = courseId;
                        let city = 0;
                        let direction = directionId;
                        let price = 0;
                        let isOnline = 0;
                        filterBtnHandler(centerName, city, direction, price, isOnline, '1');
                    }}
                style={{width: '20%'}}>Найти</button>
                <div className={styles.searchFilterWrapper}>
                <ul className={styles.searchFilter}>
                    {searchInput && isFilterOpen
                        ? searchFilter.map(items => {
                        return (
                            <li className={styles.searchFilterItem} onClick={searchItemClickHandler}>
                                {items.name}
                            </li>
                        )
                    }) : null}
                     {searchInput && isFilterOpen
                        ? searchFilterCourses.map(items => {
                        return (
                            <li className={styles.searchFilterItem} onClick={searchItemClickHandler}>
                                {items.title}
                            </li>
                        )
                    }) : null}
                </ul>
                </div>

                </div>   
                <div className={styles.priorityCategories}>
                <span onClick={() => {setSearchInput("IELTS")
                    let centerName = courseId;
                    let city = 0;
                    let direction = 8;
                    let price = 0;
                    let isOnline = 0;
                    filterBtnHandler(centerName, city, direction, price, isOnline, '1')}}>IELTS</span>
                <span onClick={() => {setSearchInput("TOEFL")
                    let centerName = courseId;
                    let city = 0;
                    let direction = 8;
                    let price = 0;
                    let isOnline = 0;
                    filterBtnHandler(centerName, city, direction, price, isOnline, '1')}}>TOEFL</span>
                    <span onClick={() => {setSearchInput("Программирование")
                    let centerName = courseId;
                    let city = 0;
                    let direction = 5;
                    let price = 0;
                    let isOnline = 0;
                    filterBtnHandler(centerName, city, direction, price, isOnline, '1')}}>Программирование</span>
                    <span onClick={() => {setSearchInput("Английский язык")
                    let centerName = courseId;
                    let city = 0;
                    let direction = 1;
                    let price = 0;
                    let isOnline = 0;
                    filterBtnHandler(centerName, city, direction, price, isOnline, '1')}}>Английский язык</span>
                </div>
                <div className={styles.rounds}>
                    <div className={styles.forRC}>
                        <div className={styles.doughnut}>
                            <div className={styles.counter}>
                                <Odometer 
                                    value={roundFilters[2].length} 
                                    format='(,ddd).dd' 
                                    theme="default" 
                                    animation="count"
                                />
                            </div>
                            {!isSafari
                                ? (<Doughnut 
                                    className={styles.hole} 
                                    data={dataCenters} 
                                    options={optionsDon}
                                />)
                                :(<></>)
                            }
                        </div>
                        <p>Учебных центров</p>
                    </div>
                    <div className={styles.forRC}>
                        <div className={styles.doughnut}>
                            <div className={styles.counter}>
                                <Odometer 
                                    value={tutors.length} 
                                    format='(,ddd).dd' 
                                    theme="default" 
                                    animation="count"
                                />
                            </div>
                            {!isSafari
                                ?(<Doughnut 
                                    className={styles.hole} 
                                    data={dataTutors} 
                                    tooltips={false} 
                                    options={optionsDon}
                                />)
                                :(<></>)
                            }
                        </div>
                        <p>Репетиторов</p>
                    </div>
                    <div className={styles.forRC}>
                        <div className={styles.doughnut}>
                            <div className={styles.counter}>
                                <Odometer 
                                    value={roundFilters[1].length} 
                                    format='(,ddd).dd' 
                                    theme="default" 
                                    animation="count"
                                />
                            </div>
                            {!isSafari
                                ? (<Doughnut 
                                    className={styles.hole} 
                                    data={dataCategories} 
                                    options={optionsDon}
                                />)
                                :(<></>)}
                        </div>
                        <p>Направлений</p>
                    </div>
                    <div className={styles.forRC}>
                        <div className={styles.doughnut}>
                            <div className={styles.counter}>
                                <Odometer 
                                    value={roundFilters[0].length} 
                                    format='(,ddd).dd' 
                                    theme="default" 
                                    animation="count"
                                />
                            </div>
                            {!isSafari
                                ?(<Doughnut 
                                    className={styles.hole} 
                                    data={dataCities} 
                                    options={optionsDon}
                                />)
                                :(<></>)
                            }
                        </div>
                        <p>Городов РК</p>
                    </div>
                </div>
                <div className={styles.howItWorksWrapper} style={{display:'block', textAlign:'center'}}>
                    <button onClick={() => {setShowAboutUs(!showAboutUs); window.scrollBy(0,-10000);}} className={styles.howItWorks}>Как это работает?</button>
                </div>
            </div>
            </div>

            <div className={styles.titleBlock} style={{marginTop: 20, marginBottom: 20}}>
                <span className={styles.title}>Топ репетиторов</span>
            </div>
            {
                filtersLoading ? <LoadingBlock/> : <TopTutorsSlider course={tutorsWithPhoto} categories={tutorsWithPhoto}/>
            }
            <div className={styles.titleBlock} style={{marginTop: 20, marginBottom: 20}}>
                <Image src={'/notebook-dynamic-color.png'} className={styles.titleImg}/>
                <span className={styles.title}>Популярные курсы</span>
                <div className={styles.course_btn_container}>
                    <span
                        className={styles.course_btn}
                        style={!isTutors ? {color: "black"} : {color: "#767676"}}
                        onClick={() => {
                            setIsTutors(false);
                        }}
                    >Центры / </span>
                    <span
                        className={styles.course_btn}
                        style={isTutors ? {color: "black"} : {color: "#767676"}}
                        onClick={() => {
                        setIsTutors(true);
                        }}
                    >Репетиторы</span>
                </div>
            </div>
            {isTutors 
                ? <>
                    {
                        filters[0] != undefined && (
                            <LurkingFilterBlock 
                                setCardsToShow={setCardsToShow} 
                                cities={filters[0]} 
                                directions={filters[1]} 
                                setCourseCards={setCourseCards}
                                setTutorCards={setTutorCards}
                                setCoursesLoading={setCoursesLoading}
                                isTutors={isTutors}
                            />)
                    }

                    {
                        tutorCards.length > 0 && (
                            <div className={styles.courses_block}>
                                {
                                    tutorCards.slice(0, cardsToShow).map((course, i)=> {
                                        if(course.title !== 'test'){
                                            // return (
                                            //     <div style={{marginLeft: '5%', marginRight: '5%'}}>
                                            if (course.title !== 'test') {
                                                return (
                                                    <div className={styles.courseCard_item}>
                                                        <TutorCourseCard 
                                                            key={i} 
                                                            coverImage={course.img_src} 
                                                            setLoadingModal={setLoadingModal} 
                                                            course={course}
                                                        />
                                                    </div>
                                                )
                                            }
                                        }
                                    })
                                }
                            </div>
                        )
                    }
                    {
                    coursesLoading ? (<LoadingBlock/> ) : (
                        showUps && (tutorCards.length < 1 ? <CourseSearchResultIsNotDefind catalog={true}/> : null)
                    )
                }
                </>

                : <>
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
                </>
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

