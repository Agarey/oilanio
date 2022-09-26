import styles from '../styles/components/main.module.css'
import Head from 'next/head'
import React, {useEffect, useState} from "react";
import {default as axios} from "axios";
import globals from "../src/globals";
import {useRouter} from "next/router";
import {Image} from "react-bootstrap";
import TopTutorsSlider from "../src/components/TopTutorsSlider";
import LoadingBlock from "../src/components/LoadingBlock";
import CourseCard from "../src/components/CourseCard/CourseCard";
import ContactBlock from "../src/components/ContactBlock";
import Footer from "../src/components/Footer/Footer";
import LurkingFilterBlock from "../src/components/LurkingFilterBlock";
import CourseSearchResultIsNotDefind from "../src/components/CourseSearchResultIsNotDefind";
import Link from 'next/link'
import {BecomeAPartner} from "../src/components/Forms/BecomeAPartnerForm/BecomeAPartner";
import ModalWindow from "../src/components/Modal/ModalWindow";

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
import { Doughnut } from 'react-chartjs-2';
import dynamic from 'next/dynamic'
import TutorCourseCard from '../src/components/TutorCourseCard';
import Backdrop from '../src/components/Backdrop/Backdrop';
import CoursesFilters from '../src/components/CoursesFilters/CoursesFilters';

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

const Catalog = (props) => {
  const router = useRouter();

  const [cardsToShow, setCardsToShow] = useState(8);
  const [showNoizyWindow, setShowNoizyWindow] = useState(false);
  const [connection, setConnection] = useState(3);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [firstStepValidationState, setFirstStepValidationState] = useState(false);

  const addCards = () => {
    setCardsToShow(cardsToShow+8)
  };

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

  const filterBtnHandler = async (centerName, city, direction, price, isOnline, searchingCenter) => {
    const redirectUrl = `/courses?centerName=${centerName}&direction=${direction}&city=${city}&price=${price}&isOnline=${isOnline}&searchingCenter=${searchingCenter}`

    await router.push(redirectUrl);
  };

  function firstStepValidation() {
    if (name.length < 3) {
      alert("Заполните все поля!");
      ym("reachGoal", "send_application_button_pressed_unsuccessfully");
      return false;
    } else if (phone.length < 16) {
      alert("Заполните все поля!");
      ym("reachGoal", "send_application_button_pressed_unsuccessfully");
      return false;
    } else {
      setFirstStepValidationState(true);
      return true;
    }
  }
    
  const [imagesBase, setImagesBase] = useState([]);
  const loadCourseCards = async (directionId) => {
    setCoursesLoading(true);
    const result = await axios.get(`${globals.productionServerDomain}/courseCards`);
    setCourseCards(result.data);
    console.log('courseCards', result.data);
    setShowUps(true);
  }

  const loadTutorCourseCards = async (directionId) => {
    setCoursesLoading(true);
    let result = await axios.get(`${globals.productionServerDomain}/tutorCourseCards/`);
    setTutorCards(result.data);
    console.log('courseCards', result.data);
    setShowUps(true);
  };

  const loadFilters = async () => {
    setFiltersLoading(true);
    let result = await axios.get(`${globals.productionServerDomain}/filters`);
    setFilters(result.data);
    setFiltersLoading(false);
  };

  const loadStocks = async () => {
    setStocksLoading(true);
    let result = await axios.post(`${globals.productionServerDomain}/loadDirectionPromotions`, {direction_id: 0});
    setStocks(result.data);
  };

  const [stocksLoading, setStocksLoading] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [tutorsWithPhoto, setTutorsWithPhoto] = useState([]);
  const [showUps, setShowUps] = useState(false);
  const [roundFilters, setroundFilters] = useState([[],[],[]]);
  const [filters, setFilters] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [courseCards, setCourseCards] = useState([]);
  const [show, setShow] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [cabinetRoute, setCabinetRoute] = useState('/login');
  const [isSafari, setIsSafari] = useState(false);
  const [odometerValue, setOdometerValue] = useState(0);
  const browser = '';
  const [student, setStudent] = useState({});
  const [center, setCenter] = useState({});
  const [directions, setDirections] = useState([]);
  const [exitingOut, setExitingOut] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [courseCategories, setCourseCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [directionId, setDirectionId] = useState();
  const [courseId, setCourseId] = useState();
  const [searchFilter, setSearchFilter] = useState([]);
  const [tutorName, setTutorName] = useState();
  const [searchFilterTutors, setSearchFilterTutors] = useState([]);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [tutorCards, setTutorCards] = useState([]);
  const [isTutors, setIsTutors] = useState(false);
  const [searchFilterCourses, setSearchFilterCourses] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [nextInfo, setNextInfo] = useState(false);

  const [ticketId, setTicketId] = useState(null);
  const [goal, setGoal] = useState("");
  const [price, setPrice] = useState("");
  const [connectionLanguage, setConnectionLanguage] = useState("");
  const [infoVar, setInfoVar] = useState(2);
  const [language, setLanguage] = useState("");
  const [online, setOnline] = useState(true);
  const [offline, setOffline] = useState(false);
  const [typeClass, setTypeClass] = useState("");
  const [ofertaCheck, setOfertaCheck] = useState(false);

  const loadUserInfo = async () => {
    if(localStorage.getItem(globals.localStorageKeys.currentStudent) !== null){
      let currentStudent = JSON.parse(localStorage.getItem(globals.localStorageKeys.currentStudent));
      setStudent({
        name: currentStudent.name,
      });
      setCabinetRoute('/cabinet/student');
      setIsLogged(true);
      setLoadingData(false);
    } else if (localStorage.getItem(globals.localStorageKeys.centerId) !== null) {
      let centerId = +localStorage.getItem(globals.localStorageKeys.centerId);
      let roleId = +localStorage.getItem(globals.localStorageKeys.roleId);
      console.log('auth role id', roleId);
      if (roleId === 6) {
        await axios({
          method: 'get',
          url: `${globals.productionServerDomain}/tutors/${centerId}`,
        }).then(async function(res) {
          await setCenter(res.data);
          setCabinetRoute('/cabinet/tutor');
          console.log('cabinet route /cabinet/tutor', cabinetRoute);
          setIsLogged(true);
        });
      } else if (roleId === 4) {
        await axios({
          method: 'get',
          url: `${globals.productionServerDomain}/courses/${centerId}`,
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token}`
          }
        }).then(async function(res){
          await setCenter(res.data[0]);
          setCabinetRoute('/cabinet');
          console.log('cabinet route /cabinet', cabinetRoute);
          setIsLogged(true);
        });
      }
      setLoadingData(false);
    };
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSend = () => setShowSend(false);

  useEffect(function(){
    loadUserInfo();
    setLoadingData(false);
    console.log('pathname = ' + window.location.pathname);
  }, []);

  function loadCategories(searchCenter) {
    setDirections([{ name: 'Загружаем направления...', id: 0 }]);
    axios.post(`${globals.productionServerDomain}/getFilteredCategories`, {
      searchingCenter: searchCenter,
    }).then(res => {
      setDirections(res.data);
    });
  };

  useEffect(()=>{
    axios.get(`${globals.productionServerDomain}/tutors`).then(res => {
      setTutors(res.data);
    });
    axios.get(`${globals.productionServerDomain}/getTutorsWithPhoto`).then(res => {
      setTutorsWithPhoto(res.data);
      console.log('photos', res);
    });
    axios({
      method: 'get',
      url: `${globals.productionServerDomain}/courseCategories`,
    }).then(function(res){
      setCourseCategories(res.data);
    }).catch((err)=>{
    });
    axios.get(`${globals.productionServerDomain}/courses`).then(res => { setCourses(res.data) });
  }, []);

  useEffect(() => {
    axios.get(`${globals.productionServerDomain}/filters`).then(res => {
      setroundFilters(res.data);
      loadCategories(true);
      loadFilters();
      console.log("res.data", res.data);
    });
  }, []);

  useEffect(async () => {
    await loadCourseCards().then(() => setCoursesLoading(false));
  }, []);

  useEffect(async () => {
    let imagesBaseResponse = await axios.get(`${globals.productionServerDomain}/imagesBase`);
    setImagesBase(imagesBaseResponse.data);
    setCoursesLoading(true);
    loadFilters();
    await loadCourseCards().then(() => setCoursesLoading(false));
    loadTutorCourseCards().then(() => setCoursesLoading(false));
    loadStocks().then(() => setStocksLoading(false));
    compareDirectrion(searchInput);
    compareCourseName(searchInput);
    compareIsTutor(searchInput);
  }, []);
    
  useEffect(() => {
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
      setIsSafari(false);
    } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
      setIsSafari(false);
    } else if(navigator.userAgent.indexOf("Safari") != -1) {
      setIsSafari(false);
    } else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
      setIsSafari(false);
    } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
      setIsSafari(false);
    } else {
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
  
  const compareDirectrion =  (value) => {
    let direction_Id =  (courseCategories.find(el => el.name.toLowerCase() == value.toLowerCase()));
    if (!direction_Id) direction_Id = 0;
    (direction_Id == 0)? {} : direction_Id = direction_Id.id;
    setDirectionId(direction_Id);

    const filterDirections = courseCategories.filter(category => {
      return category.name.toLowerCase().includes(value.toLowerCase());
    });
    console.log("filterDirections", filterDirections);
    setSearchFilter(filterDirections);
  };

  const compareCourseName = (value) => {
    let course_name = (courses.find(el => el.title.toLowerCase() == value.toLowerCase()));
    if (!course_name) course_name = '';
    (course_name == '')? {} : course_name = course_name.title;
    setCourseId(course_name);
    console.log("COOURSE IDDDD", courseId);

    const filterCourses = courses.filter(course => {
      return course.title.toLowerCase().includes(value.toLowerCase());
      filterCourses.replace();
    })
    console.log("filterCourses", filterCourses);
    setSearchFilterCourses(filterCourses);
  };

  const compareIsTutor = (value) => {
    let tutor_name = (tutors.find(el => el.fullname.toLowerCase() == value.toLowerCase()));
    if (!tutor_name) tutor_name = '';
    (tutor_name == '')? {} : tutor_name = tutor_name.fullname;
    setTutorName(tutor_name);
    console.log("tutorName", tutorName);

    const filterTutors = tutors.filter(tutors => {
      return tutors.fullname.toLowerCase().includes(value.toLowerCase());
    });
    setSearchFilterTutors(filterTutors);
  };

  const searchItemClickHandler = (e) => {
    setSearchInput(e.target.textContent);
    setIsFilterOpen(false);
  };

  const inputClickHandler = () => {
    setIsFilterOpen(true);
  };

  useEffect(() => {
    compareDirectrion(searchInput);
    compareCourseName(searchInput);
    compareIsTutor(searchInput);
  }, [searchInput]);

  const getCards = async () => {
    console.log("Функция getCards");
    if (isTutors) {
      const data = {
        centerName: "",
        city: 1,
        direction: "1",
        priceFrom: "0",
        priceTo: "0",
        center: "0",
        isOnline: false,
      };
    
      let postResult = await axios.post(`${globals.productionServerDomain}/tutorCourseCardsFilter`, data);
      console.log("postResult равно", postResult.data);
      setTutorCards(postResult.data);
      setCoursesLoading(false);
    } else {
      const data = {
        centerName: "",
        city: 1,
        direction: "1",
        priceFrom: "0",
        priceTo: "0",
        center: "0",
        isOnline: false,
        sortType: "0",
      };
      let postResult = await axios.post(`${globals.productionServerDomain}/courseCardsFilter/`, data);
      console.log("postResult равно", postResult.data);
      setCourseCards(postResult.data);
      console.log('new Courses', postResult.data)
      setCoursesLoading(false);
    }
  };

  useEffect(() => {
    getCards();
  }, [isTutors]);

  function openNoize(){
    setShowNoizyWindow(true);
  };

    // if (sec) {
    //     setTimeout(openNoize, 30000);
    //     setSec(false);
    //     setMin(true);
    // };
    // if (min) {
    //     setInterval(openNoize, 300000);
    // };

  const sendApplication = async (courseId, userInfo) => {
    let data = {
      name: userInfo.fullName,
      phone: userInfo.phone,
      connection: userInfo.connection,
    };
  
    axios({
      method: "post",
      url: `${globals.productionServerDomain}/createCourseSearchLowTicket`,
      data: data,
      headers: {
        Authorization: `Bearer ${globals.localStorageKeys.authToken}`,
      },
    }).then((res) => {
        console.log(res);
        setTicketId(res.data)
      })
      .catch(() => {
        alert("Что-то пошло нетак!");
      });  
  };

  const optionsDon = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    cutout: "80%",
  };

  const getTicketId = async () => {
    const data = {
      name: name,
      phone: phone
    }

    await axios.get(`${globals.productionServerDomain}/getTicketId/`, {params: data})
    .then(res => {
      setTicketId(res.data[0].id)
    }) 
    .catch(() => {
      alert("Что-то пошло нетак!");
    });
  }

  const sendDetailTicketInfo = async () => {
    const data = {
      id: ticketId,
      name: name,
      phone: phone,
      connection: connection,
      goal: goal,
      price: price,
      connectionLanguage: connectionLanguage,
      infoVar: infoVar,
      language: language,
      online: online,
      offline: offline,
      typeClass: typeClass
    }

    axios({
      method: "post",
      url: `${globals.productionServerDomain}/createDetailTickets`,
      data: data,
      headers: {
        Authorization: `Bearer ${globals.localStorageKeys.authToken}`,
      },
    })
      .then(function (res) {})
      .catch(() => {
        alert("Что-то пошло нетак!");
      });  
  };

  return (
    <div>
      <div style={{
        transform: `translate(${showSend ? "-50%, -50%" : "-100%, -100%"})`,
        top: showSend ? "50%" : "0%",
        opacity: showSend ? 1 : 0
      }}
        className={styles.modal}
      >
        <span className={styles.close_modal} onClick={handleShowSend}></span>
        <div className={styles.modal_info} style={{display: nextInfo ? "none" : "flex"}}>
          <h3>Ваша заявка принята!</h3>
          <p>Для точного подбора курса/репетитора нужна более подробная информация. </p>
          <select
            onChange={(e) => {
              setConnectionLanguage(e.target.value)
            }}
            className={styles.info_select}
          >
            <option value="">Язык общения</option>
            <option value="Русский">Русский</option>
            <option value="Казахский">Казахский</option>
          </select>

          <select
            onChange={(e) => {
              setInfoVar(e.target.value)
            }}
            value={infoVar}
            className={styles.info_select}
          >
            <option value="">Как удобней оставить информацию?</option>
            <option value={2}>Я заполню информацию самостоятельно</option>
            <option value={1}>Свяжитесь со мной по телефону</option>
          </select>
        </div>
        <div className={styles.modal_info} style={{display: nextInfo ? "flex" : "none"}}>
          <h3>Оставить информацию для заявки</h3>
          <label className={styles.goal_title}>Для чего мне нужен курс ?</label>
          <textarea 
            className={styles.info_select}
            value={goal}
            onChange={e => setGoal(e.target.value)}
            placeholder="Хочу обучится английскому языку, чтобы успешно сдать ILSE"
          />
          <select 
            value={price} 
            className={styles.info_select}
            onChange={e => setPrice(e.target.value)}
          >
            <option value="0">Сколько хочу платить за час</option>
            <option value={'0-2000'}>0 - 2 000KZT</option>
            <option value={'2000-5000'}>2 000 - 5 000KZT</option>
            <option value={'5000'}>5 000 +</option>
          </select>
          <select
            className={styles.info_select}
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            <option value="">Язык преподавания</option>
            <option value="Русский">Русский</option>
            <option value="Казахский">Казахский</option>
          </select>
          <select
            className={styles.info_select}
            onChange={e => {
              if (e.target.value === "1" || e.target.value === "") {
                setOnline(true)
                setOffline(false)
              } else {
                setOnline(false)
                setOffline(true)
              }
            }}
          >
            <option value="">Формат преподавания</option>
            <option value="1">Онлайн</option>
            <option value="2">Офлайн</option>
          </select>
          <select
            className={styles.info_select}
            value={typeClass}
            onChange={e => setTypeClass(e.target.value)}
          >
            <option value="">Тип занятий</option>
            <option value="Индивидуальные">Индивидуальные</option>
            <option value="Групповые">Групповые</option>
          </select>
        </div>
        <button 
          className={styles.modal_button} 
          style={{display: nextInfo ? "none" : "block"}}
          onClick={() => {
            if (infoVar === 1 || infoVar === "1") {
              setShowSend(false);
              setNextInfo(false);
            } else {
              setNextInfo(true);
              getTicketId();
            }
          }}
        >
          Продолжить
        </button>
        <button 
          className={styles.modal_button} 
          style={{display: nextInfo ? "block" : "none"}}
          onClick={() => {
            if (goal.length > 0 && price != '' && language != '' && typeClass != '') {
              setNextInfo(false);
              setShowSend(false);
              sendDetailTicketInfo();
            } else {
              alert('Заполните все поля!');
            }
            
          }}
        >
          Отправить информацию
        </button>
      </div>
      <Backdrop show={showSend} />
      {/* { showNoizyWindow 
        ? (
          <NoizyWindow 
            loadCategoriesCallback={loadCategories} 
            setSearchCenterCallback={setSearchCenter} 
            searchCenter={searchCenter} 
            close={setShowNoizyWindow} 
            cities={filters[0]} 
            directions={directions}
          />
        ) : <></>
      } */}
      

      <div className={styles.pageBody_mobile}>
        <div id={'header'} className={styles.whiteHeader_mobile}>
          <ModalWindow show={show} handleClose={handleClose} heading={''} body={<BecomeAPartner handleClose={handleClose}/>}/>
          <div className={styles.desktopHeader_mobile}>
            <div className={styles.logo_mobile}>
              <Link href={'/'}>
                <a 
                  onClick={async(ctx) => {
                    if(window.location.pathname === '/') {
                      router.reload();
                    } else {
                      await router.push("/");
                    }
                  }} 
                  style={{color: 'white',alignContent: 'center', alignItems: 'center', display: 'flex'}}
                >
                  <svg width="150" height="48" viewBox="0 0 150 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M134.648 47.6752C131.844 47.6752 129.295 47.0447 127 45.7836C124.742 44.5224 122.957 42.7389 121.646 40.433C120.371 38.0909 119.734 35.3886 119.734 32.326C119.734 29.2994 120.39 26.633 121.701 24.3271C123.048 21.985 124.869 20.2015 127.164 18.9765C129.458 17.7154 132.026 17.0849 134.867 17.0849C137.708 17.0849 140.276 17.7154 142.57 18.9765C144.865 20.2015 146.667 21.9671 147.979 24.2731C149.326 26.579 150 29.2634 150 32.326C150 35.3886 149.308 38.0909 147.924 40.433C146.576 42.7389 144.737 44.5224 142.406 45.7836C140.075 47.0447 137.489 47.6752 134.648 47.6752ZM134.648 43.3515C136.433 43.3515 138.109 42.9372 139.675 42.1084C141.241 41.2796 142.497 40.0366 143.444 38.3792C144.428 36.7218 144.919 34.704 144.919 32.326C144.919 29.948 144.446 27.9302 143.499 26.2728C142.552 24.6154 141.314 23.3902 139.784 22.5976C138.254 21.7689 136.597 21.3546 134.812 21.3546C132.991 21.3546 131.316 21.7689 129.786 22.5976C128.293 23.3902 127.091 24.6154 126.181 26.2728C125.27 27.9302 124.815 29.948 124.815 32.326C124.815 34.74 125.252 36.7759 126.126 38.4333C127.036 40.0906 128.238 41.3337 129.732 42.1625C131.225 42.9551 132.864 43.3515 134.648 43.3515Z" fill="#F3F3F3"/>
                    <path d="M14.9145 47.6045C12.1101 47.6045 9.56057 46.974 7.26604 45.7129C5.00791 44.4517 3.22328 42.6682 1.91211 40.3623C0.637366 38.0202 0 35.3179 0 32.2553C0 29.2287 0.655582 26.5623 1.96675 24.2564C3.31433 21.9143 5.13539 20.1308 7.42993 18.9058C9.72447 17.6447 12.2922 17.0142 15.133 17.0142C17.9739 17.0142 20.5416 17.6447 22.8361 18.9058C25.1306 20.1308 26.9335 21.8964 28.2447 24.2024C29.5922 26.5083 30.266 29.1927 30.266 32.2553C30.266 35.3179 29.5741 38.0202 28.19 40.3623C26.8425 42.6682 25.0031 44.4517 22.6722 45.7129C20.3413 46.974 17.7554 47.6045 14.9145 47.6045ZM14.9145 43.2808C16.6991 43.2808 18.3746 42.8665 19.9406 42.0377C21.5067 41.2089 22.7632 39.9659 23.7102 38.3085C24.6936 36.6511 25.1853 34.6333 25.1853 32.2553C25.1853 29.8772 24.7119 27.8594 23.7649 26.2021C22.8178 24.5447 21.5796 23.3195 20.0499 22.5269C18.5202 21.6981 16.863 21.2838 15.0784 21.2838C13.2573 21.2838 11.582 21.6981 10.0523 22.5269C8.55898 23.3195 7.35708 24.5447 6.44656 26.2021C5.53603 27.8594 5.08076 29.8772 5.08076 32.2553C5.08076 34.6693 5.51782 36.7052 6.39193 38.3625C7.30245 40.0199 8.50435 41.263 9.99763 42.0918C11.4909 42.8844 13.1299 43.2808 14.9145 43.2808Z" fill="#F3F3F3"/>
                    <path d="M36.9116 9.7755V47.5407H31.0307V9.7755H36.9116ZM39.3191 33.3532C39.3191 30.5293 39.9038 28.0287 41.0731 25.8512C42.277 23.6738 43.8934 21.9897 45.9224 20.7989C47.9859 19.574 50.2557 18.9616 52.7319 18.9616C54.9673 18.9616 56.9104 19.4039 58.5612 20.2885C60.2464 21.1391 61.5876 22.2108 62.585 23.5037V19.4209H68.5174V47.5407H62.585V43.3559C61.5876 44.6828 60.2292 45.7885 58.5096 46.6731C56.79 47.5577 54.8297 48 52.6287 48C50.1869 48 47.9515 47.3876 45.9224 46.1628C43.8934 44.9039 42.277 43.1688 41.0731 40.9573C39.9038 38.7118 39.3191 36.1771 39.3191 33.3532ZM62.585 33.4553C62.585 31.516 62.1723 29.8319 61.3469 28.4029C60.5559 26.974 59.507 25.8852 58.2001 25.1367C56.8932 24.3883 55.4832 24.014 53.97 24.014C52.4568 24.014 51.0467 24.3883 49.7399 25.1367C48.433 25.8512 47.3667 26.9229 46.5413 28.3519C45.7505 29.7468 45.355 31.4139 45.355 33.3532C45.355 35.2925 45.7505 36.9937 46.5413 38.4566C47.3667 39.9196 48.433 41.0424 49.7399 41.8249C51.0811 42.5734 52.4911 42.9476 53.97 42.9476C55.4832 42.9476 56.8932 42.5734 58.2001 41.8249C59.507 41.0764 60.5559 39.9877 61.3469 38.5587C62.1723 37.0957 62.585 35.3946 62.585 33.4553ZM87.2297 18.9616C89.4651 18.9616 91.4598 19.4209 93.2137 20.3396C95.0021 21.2582 96.3949 22.6191 97.3923 24.4223C98.3896 26.2255 98.8883 28.4029 98.8883 30.9546V47.5407H93.059V31.8222C93.059 29.3045 92.4227 27.3822 91.1502 26.0554C89.8778 24.6945 88.141 24.014 85.94 24.014C83.7389 24.014 81.985 24.6945 80.6781 26.0554C79.4057 27.3822 78.7694 29.3045 78.7694 31.8222V47.5407H72.8885V19.4209H78.7694V22.6361C79.7324 21.4793 80.9533 20.5777 82.4321 19.9313C83.9453 19.2848 85.5445 18.9616 87.2297 18.9616Z" fill="#F3F3F3"/>
                    <path d="M113.802 16.8548C112.819 16.8548 111.995 16.5148 111.329 15.8347C110.663 15.1547 110.33 14.3127 110.33 13.3088C110.33 12.3049 110.663 11.4629 111.329 10.7829C111.995 10.1028 112.819 9.76279 113.802 9.76279C114.753 9.76279 115.561 10.1028 116.227 10.7829C116.893 11.4629 117.226 12.3049 117.226 13.3088C117.226 14.3127 116.893 15.1547 116.227 15.8347C115.561 16.5148 114.753 16.8548 113.802 16.8548ZM116.465 20.4008V47.1659H111.043V20.4008H116.465Z" fill="#F3F3F3"/>
                    <path d="M102.986 46.9389C102.499 46.4432 102.256 45.8457 102.256 45.1465C102.256 44.4474 102.499 43.8563 102.986 43.3732C103.473 42.8775 104.062 42.6296 104.754 42.6296C105.446 42.6296 106.036 42.8775 106.523 43.3732C107.01 43.8563 107.253 44.4474 107.253 45.1465C107.253 45.8457 107.01 46.4432 106.523 46.9389C106.036 47.422 105.446 47.6635 104.754 47.6635C104.062 47.6635 103.473 47.422 102.986 46.9389Z" fill="#F3F3F3"/>
                    <path d="M15.0753 5.95043C14.2238 5.95043 13.5096 5.66514 12.9328 5.09455C12.356 4.52396 12.0676 3.81751 12.0676 2.97522C12.0676 2.13292 12.356 1.42647 12.9328 0.855884C13.5096 0.285295 14.2238 0 15.0753 0C15.8993 0 16.5997 0.285295 17.1766 0.855884C17.7534 1.42647 18.0418 2.13292 18.0418 2.97522C18.0418 3.81751 17.7534 4.52396 17.1766 5.09455C16.5997 5.66514 15.8993 5.95043 15.0753 5.95043ZM17.3826 8.92564V31.3824H12.6856V8.92564H17.3826Z" fill="#F3F3F3"/>
                  </svg>
                </a>
              </Link>
            </div>
            <div className={styles.searchBlock_mobile}>
            </div>
            <div className={styles.menu_mobile}>
              <ul className={styles.menu_ul_mobile}>
                <li>
                  <a
                    className={styles.link_mobile}
                    onClick={() => {
                      router.push('/about');
                    }}
                  >
                    О нас
                  </a>
                </li>
                <li>
                  <a
                    className={styles.link_mobile}
                    onClick={() =>  window.scrollBy(0, 1200)}
                  >
                    Каталог
                  </a>
                </li>
                {!isLogged && (
                  <li onClick={handleShow}>
                    <a
                      className={styles.link_mobile}
                      onClick={() => {
                        ym("reachGoal", "partnership-button-pressed");
                      }}
                    >
                      Стать партнером
                    </a>
                  </li>
                )}
                {loadingData===false && (
                  <li>
                    <button
                      className={styles.buttonSingin_mobile}
                      onClick={() => {
                        if(!isLogged){
                          ym('reachGoal','log-in-button-pressed')
                          router.push('/login')
                        }
                      }}
                    >
                      {student.name !== undefined 
                        ? (
                          <div className={styles.studentCard_mobile}>
                            <Image 
                              src={'https://realibi.kz/file/624128.png'} 
                              className={styles.studentAvatar_mobile}
                            />
                            <div className={styles.studentInfo_mobile}>
                              <span 
                                className={styles.studentName_mobile}
                                onClick={()=>router.push('/cabinet/student')}
                              >
                                {student.name_mobile}
                              </span>
                              <span 
                                className={styles.exitBtn_mobile}        
                                onClick={() => {
                                  setExitingOut(true)
                                  router.push('/login');
                                }}
                              >
                                {exitingOut ? 'Выход...' : 'Выйти'}
                              </span>
                            </div>
                          </div>
                        ) 
                        : (center !== undefined && center.title !== undefined 
                          ? (
                            <div className={styles.studentCard_mobile}>
                              <Image 
                                src={center.img_src} 
                                className={styles.studentAvatar_mobile}
                              />
                              <div className={styles.studentInfo_mobile}>
                                <span 
                                  className={styles.studentName_mobile} 
                                  onClick={()=>router.push('/cabinet')}
                                >
                                  {center.title || center.fullname_mobile}
                                </span>
                                <span 
                                  className={styles.exitBtn_mobile_mobile} 
                                  onClick={()=>{
                                    setExitingOut(true)
                                    localStorage.removeItem(globals.localStorageKeys.currentStudent)
                                    localStorage.removeItem(globals.localStorageKeys.authToken);
                                    localStorage.removeItem(globals.localStorageKeys.centerId);
                                    localStorage.removeItem(globals.localStorageKeys.currentUserId);
                                    localStorage.removeItem(globals.localStorageKeys.roleId);
                                    encodeURIComponent(router.push('/login'))
                                  }}
                                >
                                  {exitingOut ? 'Выход...' : 'Выйти'}
                                </span>
                              </div>
                            </div>
                          ) 
                          : (center !== undefined && center.fullname !== undefined 
                            ? (
                              <div className={styles.studentCard_mobile}>
                                <Image 
                                  src={center.img_src || 'https://realibi.kz/file/624128.png'} 
                                  className={styles.studentAvatar_mobile}
                                />
                                <div className={styles.studentInfo_mobile}>
                                  <span 
                                    className={styles.studentName_mobile} 
                                    onClick={()=>router.push('/cabinet')}
                                  >
                                    {center.title || center.fullname}
                                  </span>
                                  <span 
                                    className={styles.exitBtn_mobile} 
                                    onClick={()=>{
                                      setExitingOut(true)
                                      encodeURIComponent(router.push('/login'))
                                    }}
                                  >
                                    {exitingOut ? 'Выход...' : 'Выйти'}
                                  </span>
                                </div>
                              </div>
                            ) 
                            : (
                              <span onClick={() => router.push('/login')}>
                                Войти
                              </span>
                            )
                          )
                        )
                      }
                    </button>
                  </li>
                )}
              </ul>
            </div>

            <div onClick={() => { setShowMobileMenu(!showMobileMenu) }} className={styles.menuButtonBody_mobile}>
                <svg width="34" height="40" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1H29" stroke="#F3F3F3" stroke-width="2" stroke-linecap="round" />
                  <path d="M1 17H29" stroke="#F3F3F3" stroke-width="2" stroke-linecap="round" />
                  <path d="M9 9H29" stroke="#F3F3F3" stroke-width="2" stroke-linecap="round" />
                </svg>
                <span style={{
                  fontFamily: 'Rubik Medium',
                  fontSize: '18px',
                  marginLeft: '10px',
                  color: 'black'
                }}>
                  Меню
                </span>
            </div>
          </div>

          {showMobileMenu 
            ? (
              <div className={styles.mobileMenu_mobile}>
                <ul className={styles.menu_ul_mobile}>
                  <li>
                    <a
                      className={styles.link_mobile}
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
                      className={styles.link_mobile}
                      style={{color: 'black'}}
                      onClick={() =>  window.scrollBy(0, 1200)}
                    >
                      Каталог
                    </a>
                  </li>
                  <li onClick={handleShow}>
                    <a className={styles.link_mobile} style={{color: 'black'}}>
                      Стать партнером
                    </a>
                  </li>
                  { isLogged 
                    ? (
                      <li style={{color: 'black'}}>
                        <Link href={cabinetRoute}>
                          <a style={{color: 'black'}}>Личный кабинет</a>
                        </Link>
                        <span 
                          className={styles.exitBtn_mobile} 
                          onClick={() => {
                            setExitingOut(true);
                            localStorage.removeItem(globals.localStorageKeys.currentStudent);
                            localStorage.removeItem(globals.localStorageKeys.authToken);
                            localStorage.removeItem(globals.localStorageKeys.centerId);
                            localStorage.removeItem(globals.localStorageKeys.currentUserId);
                            localStorage.removeItem(globals.localStorageKeys.roleId);
                            encodeURIComponent(router.push('/login'));
                          }}
                        >
                          {exitingOut ? 'Выход...' : 'Выйти'}
                        </span>
                      </li>
                    )
                    : (
                      <li>
                        <Link 
                          href={cabinetRoute} 
                          className={styles.link_mobile}
                        >
                          <a style={{color: 'black'}}>Войти</a>
                        </Link>
                      </li>
                    )
                  }
                </ul>
              </div>
            ) 
            : null
          }
        </div>
        <Head>
          <title>Oilan</title>
          <link rel="icon" href="/atom-icon.png" />
          <div dangerouslySetInnerHTML={{__html: ym()}}/>
        </Head>
        <div className={styles.mainImageTitleBlock_mobile}>
          <h1>Хочешь улучшить свои знания?</h1>
          <div className={styles.infoContainer_mobile}>              
            <div className={styles.applicationBlock_mobile}>
              <div className={styles.application_mobile} >
                <div className={styles.modal_info_mobile}>
                  <p>Оставь заявку и мы подберем тебе лучший вариант </p>
                  <div className={styles.info_select_mobile}>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.techSupportInput_mobile}
                      style={{ cursor: "text", color: "black" }}
                      placeholder="Имя"
                    />
                  </div>
                  <div className={styles.info_select_mobile}>
                    <input
                      type="text"
                      className={styles.techSupportInput_mobile}
                      style={{ cursor: "text" }}
                      onKeyDown={(e) => {
                        if (e.keyCode === 8) {
                          setPhone(phone.slice(0, -1));
                        }
                      }}
                      onChange={(e) => {
                        globals.checkPhoneMask(e.target.value, setPhone)
                      }}
                      placeholder="Телефон"
                      value={phone}
                    />
                  </div>
                  <div className={styles.info_select_mobile}>
                    <select 
                      className={styles.selectBlock_mobile} 
                      value={connection} 
                      onChange={e => setConnection(e.target.value)}
                    >
                      <option value="3">Способ связи</option>
                      <option value="0">Звонок</option>
                      <option value="1">Whatsapp</option>
                    </select>
                  </div> 
                  <button
                    className={styles.button_mobile}
                    onClick={() => {
                      if (name !== "" && phone !== "" && connection !== "" && connection !== "3" && connection !== 3) {
                        if (ofertaCheck === false) {
                          alert(
                            "Прочтите публичную оферту и дайте свое согласие!"
                          );
                          ym("reachGoal", "send_application_button_pressed_unsuccessfully");
                        } else {
                          if (firstStepValidation ()) {
                            sendApplication(0, {
                              fullName: name,
                              phone: phone,
                              connection: connection,
                            });
                            ym(
                              "reachGoal",
                              "go-to-second-step-while-searching-button-pressed"
                            );
                            setShowSend(true);
                          }
                        }
                      } else {
                        alert("Заполните пожалуйста все поля.")
                      }
                    }}
                  >
                    Оставить заявку
                  </button>
                  <label
                    style={{
                      fontFamily: "Rubik Medium",
                      color: "#4D4D4D",
                      marginTop: "5px",
                      marginBottom: "0",
                      cursor: "pointer",
                      fontSize: "13px"
                    }}
                  >
                    <input
                      type="checkbox"
                      onClick={() => {
                        setOfertaCheck(!ofertaCheck);
                      }}
                      checked={ofertaCheck ? true : false}
                    />{" "}
                    Я принимаю условия{" "}
                    <a
                      href="/offer/student"
                      style={{ color: "#4D4D4D", textDecoration: "underline" }}
                    >
                      публичной оферты.
                    </a>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.info_about_us_mobile}>
          <h2>Oilan.io - это</h2>
          <div className={styles.rounds_mobile}>
              <div className={styles.round_tutor_mobile}>
                <h2>
                  <Odometer 
                    value={tutors.length} 
                    format='(,ddd).dd' 
                    theme="default" 
                    animation="count"
                  />
                  <span style={{marginLeft: "5px"}}>+</span>
                </h2>  
                <p>Репетиторы</p>
              </div>
              <div className={styles.round_center_mobile}>
                <h2>
                  <Odometer 
                    value={roundFilters[2].length} 
                    format='(,ddd).dd' 
                    theme="default" 
                    animation="count"
                  /> 
                  <span style={{marginLeft: "5px"}}>+</span>
                </h2> 
                <p>Центры</p>
              </div>
              <div className={styles.round_direction_mobile}>
                <h2>
                  <Odometer 
                    value={roundFilters[1].length} 
                    format='(,ddd).dd' 
                    theme="default" 
                    animation="count"
                  />
                  <span style={{marginLeft: "5px"}}>+</span>
                </h2>    
                <p>Направлений</p>
              </div>
            </div>
        </div>
      </div>

      <CoursesFilters courseCards={courseCards} />
      <ContactBlock/>
      <Footer/>
    </div>
  )
}

export default Catalog;

