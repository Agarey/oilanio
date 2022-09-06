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
    let result = await axios.get(`${globals.productionServerDomain}/courseCards/`);
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
  const [infoVar, setInfoVar] = useState("");
  const [language, setLanguage] = useState("");
  const [online, setOnline] = useState(true);
  const [offline, setOffline] = useState(false);
  const [typeClass, setTypeClass] = useState("");

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
      // alert("Произошла ошибка");
      // console.log("error");
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
    let imagesBaseResponse = await axios.get(`${globals.productionServerDomain}/imagesBase`);
    setImagesBase(imagesBaseResponse.data);
    setCoursesLoading(true);
    loadFilters();
    loadCourseCards().then(() => setCoursesLoading(false));
    loadTutorCourseCards().then(() => setCoursesLoading(false));
    loadStocks().then(() => setStocksLoading(false));
    compareDirectrion(searchInput);
    compareCourseName(searchInput);
    compareIsTutor(searchInput);
    window.scrollTo(0, 0);
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

  function componentDidMount() {
    window.scrollTo(0, 0);
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

  console.log(ticketId);
  return (
    <div>
      <div style={{
        transform: `translate(${showSend ? "-50%, -50%" : "-100%, -100%"})`,
        top: showSend ? "60%" : "0%",
        opacity: showSend ? 1 : 0
      }}
        className={styles.modal}
      >
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
            <option value="Казахский">Казахский</option>
            <option value="Русский">Русский</option>
          </select>

          <select
            onChange={(e) => {
              setInfoVar(e.target.value)
            }}
            value={infoVar}
            className={styles.info_select}
          >
            <option value="">Как удобней оставить информацию?</option>
            <option value={1}>Свяжитесь со мной по телефону</option>
            <option value={2}>Я заполню информацию самостоятельно</option>
          </select>
        </div>
        <div className={styles.modal_info} style={{display: nextInfo ? "flex" : "none"}}>
          <h3 style={{padding: "0 40px"}}>Оставить информацию для заявки</h3>
          <textarea 
            className={styles.info_select}
            value={goal}
            onChange={e => setGoal(e.target.value)}
            placeholder="Для чего мне нужен курс:"
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
            <option value="Казахский">Казахский</option>
            <option value="Русский">Русский</option>
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
          className={styles.button} 
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
          className={styles.button} 
          style={{display: nextInfo ? "block" : "none"}}
          onClick={() => {
            setNextInfo(false);
            setShowSend(false);
            sendDetailTicketInfo()
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
      <div className={styles.pageBackground}>
        <img src="https://realibi.kz/file/890922.png"/>
      </div>
      <div className={styles.pageBody}>
        <div className={styles.peopleBackground}></div>
        <div id={'header'} className={styles.whiteHeader}>
        {/*<YMInitializer accounts={[78186067]} options={{webvisor: true, defer: true}} version="2" />*/}
          <ModalWindow show={show} handleClose={handleClose} heading={''} body={<BecomeAPartner handleClose={handleClose}/>}/>
          <div className={styles.desktopHeader}>
            <div className={styles.logo}>
              <Link href={'/'}>
                <a 
                  onClick={async(ctx) => {
                    if(props.reload){
                      props.close(false);
                      props.setStep(1);
                    } else {
                      if(window.location.pathname === '/') {
                        router.reload();
                      } else {
                        await router.push("/");
                      }
                    }
                  }} style={{color: 'white',alignContent: 'center', alignItems: 'center', display: 'flex'}}
                >
                  <svg
                    className={styles.svg}
                    // viewBox="-30 30 640 389"
                    xmlns="http://www.w3.org/2000/svg"
                    width="250"
                    viewBox="0 0 181 55"
                    fill="none"
                    xmls="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.3031 55.0003C14.0496 55.0003 11.0918 54.2586 8.42974 52.7751C5.80996 51.2915 3.73951 49.1934 2.21835 46.4807C0.739444 43.7256 0 40.5466 0 36.9439C0 33.3835 0.760578 30.2469 2.28173 27.5342C3.84514 24.7791 5.95786 22.681 8.61988 21.2399C11.2819 19.7563 14.2608 19.0146 17.5567 19.0146C20.8525 19.0146 23.8314 19.7563 26.4935 21.2399C29.1555 22.681 31.2471 24.758 32.7682 27.4706C34.3316 30.1833 35.1133 33.3412 35.1133 36.9439C35.1133 40.5466 34.3106 43.7256 32.7048 46.4807C31.1415 49.1934 29.0075 51.2915 26.3033 52.7751C23.5991 54.2586 20.599 55.0003 17.3031 55.0003ZM17.3031 49.914C19.3735 49.914 21.3174 49.4266 23.1342 48.4517C24.9511 47.4767 26.4089 46.0144 27.5076 44.0647C28.6484 42.1151 29.2189 39.7414 29.2189 36.9439C29.2189 34.1464 28.6696 31.7727 27.5709 29.8231C26.4723 27.8734 25.0357 26.4321 23.261 25.4997C21.4863 24.5248 19.5637 24.0374 17.4933 24.0374C15.3806 24.0374 13.4369 24.5248 11.6622 25.4997C9.92976 26.4321 8.53537 27.8734 7.47901 29.8231C6.42266 31.7727 5.89448 34.1464 5.89448 36.9439C5.89448 39.7837 6.40153 42.1786 7.41563 44.1283C8.47198 46.078 9.86638 47.5403 11.5988 48.5153C13.3312 49.4477 15.2327 49.914 17.3031 49.914Z"
                      fill="#fff"
                    />
                    3
                    <path
                      d="M16.9308 6.99993C15.9429 6.99993 15.1144 6.66432 14.4452 5.99309C13.776 5.32187 13.4414 4.49082 13.4414 3.49997C13.4414 2.50911 13.776 1.67807 14.4452 1.00684C15.1144 0.335614 15.9429 0 16.9308 0C17.8868 0 18.6994 0.335614 19.3686 1.00684C20.0378 1.67807 20.3724 2.50911 20.3724 3.49997C20.3724 4.49082 20.0378 5.32187 19.3686 5.99309C18.6994 6.66432 17.8868 6.99993 16.9308 6.99993ZM19.6076 10.4999V36.9174H14.1584V10.4999H19.6076Z"
                      fill="#ffff"
                    />
                    <path
                      d="M42.4575 10.002V54.4279H35.6348V10.002H42.4575ZM45.2507 37.7382C45.2507 34.4162 45.929 31.4745 47.2855 28.913C48.6822 26.3515 50.5575 24.3704 52.9115 22.9695C55.3055 21.5287 57.9388 20.8083 60.8115 20.8083C63.405 20.8083 65.6593 21.3286 67.5745 22.3692C69.5295 23.3698 71.0856 24.6305 72.2426 26.1514V21.3486H79.1253V54.4279H72.2426V49.5051C71.0856 51.066 69.5096 52.3667 67.5146 53.4073C65.5196 54.448 63.2454 54.9683 60.6918 54.9683C57.859 54.9683 55.2656 54.2478 52.9115 52.807C50.5575 51.3261 48.6822 49.2849 47.2855 46.6834C45.929 44.0419 45.2507 41.0601 45.2507 37.7382ZM72.2426 37.8582C72.2426 35.5769 71.7639 33.5958 70.8063 31.9148C69.8886 30.2338 68.6717 28.953 67.1555 28.0725C65.6393 27.192 64.0035 26.7518 62.2479 26.7518C60.4923 26.7518 58.8565 27.192 57.3403 28.0725C55.8241 28.913 54.5871 30.1738 53.6295 31.8547C52.712 33.4957 52.2532 35.4568 52.2532 37.7382C52.2532 40.0195 52.712 42.0207 53.6295 43.7417C54.5871 45.4627 55.8241 46.7835 57.3403 47.704C58.8964 48.5845 60.5322 49.0248 62.2479 49.0248C64.0035 49.0248 65.6393 48.5845 67.1555 47.704C68.6717 46.8235 69.8886 45.5428 70.8063 43.8618C71.7639 42.1408 72.2426 40.1396 72.2426 37.8582ZM100.834 20.8083C103.428 20.8083 105.742 21.3486 107.777 22.4292C109.852 23.5099 111.467 25.1108 112.625 27.232C113.782 29.3533 114.36 31.9148 114.36 34.9165V54.4279H107.597V35.9371C107.597 32.9754 106.859 30.7141 105.383 29.1532C103.907 27.5522 101.892 26.7518 99.3381 26.7518C96.7846 26.7518 94.7497 27.5522 93.2336 29.1532C91.7573 30.7141 91.0191 32.9754 91.0191 35.9371V54.4279H84.1964V21.3486H91.0191V25.1308C92.1363 23.77 93.5527 22.7094 95.2684 21.9489C97.024 21.1885 98.8793 20.8083 100.834 20.8083Z"
                      fill="#fff"
                    />
                    <path
                      d="M160.303 54.0003C157.05 54.0003 154.092 53.2586 151.43 51.7751C148.81 50.2915 146.74 48.1934 145.218 45.4807C143.739 42.7256 143 39.5466 143 35.9439C143 32.3835 143.761 29.2469 145.282 26.5342C146.845 23.7791 148.958 21.681 151.62 20.2399C154.282 18.7563 157.261 18.0146 160.557 18.0146C163.853 18.0146 166.831 18.7563 169.493 20.2399C172.155 21.681 174.247 23.758 175.768 26.4706C177.332 29.1833 178.113 32.3412 178.113 35.9439C178.113 39.5466 177.311 42.7256 175.705 45.4807C174.142 48.1934 172.008 50.2915 169.303 51.7751C166.599 53.2586 163.599 54.0003 160.303 54.0003ZM160.303 48.914C162.374 48.914 164.317 48.4266 166.134 47.4517C167.951 46.4767 169.409 45.0144 170.508 43.0647C171.648 41.1151 172.219 38.7414 172.219 35.9439C172.219 33.1464 171.67 30.7727 170.571 28.8231C169.472 26.8734 168.036 25.4321 166.261 24.4997C164.486 23.5248 162.564 23.0374 160.493 23.0374C158.381 23.0374 156.437 23.5248 154.662 24.4997C152.93 25.4321 151.535 26.8734 150.479 28.8231C149.423 30.7727 148.894 33.1464 148.894 35.9439C148.894 38.7837 149.402 41.1786 150.416 43.1283C151.472 45.078 152.866 46.5403 154.599 47.5153C156.331 48.4477 158.233 48.914 160.303 48.914Z"
                      fill="#fff"
                    />
                    <path
                      d="M138.531 15.1013C137.248 15.1013 136.172 14.6649 135.303 13.7922C134.434 12.9195 134 11.839 134 10.5506C134 9.26235 134.434 8.18182 135.303 7.30909C136.172 6.43636 137.248 6 138.531 6C139.772 6 140.828 6.43636 141.697 7.30909C142.566 8.18182 143 9.26235 143 10.5506C143 11.839 142.566 12.9195 141.697 13.7922C140.828 14.6649 139.772 15.1013 138.531 15.1013ZM142.007 19.6519V54H134.931V19.6519H142.007Z"
                      fill="#fff"
                    />
                    <path d="M128 47.5H121V54.5H128V47.5Z" fill="#fff" /> 
                  </svg>
                </a>
              </Link>
            </div>
            <div className={styles.searchBlock}>
            </div>
              <div className={styles.menu}>
                <ul className={styles.menu_ul}>
                  <li>
                    <a
                      className={styles.link}
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
                      onClick={() => {
                        router.push('/');
                      }}
                    >
                      Каталог
                    </a>
                  </li>
                  {!isLogged && (
                    <li onClick={handleShow}>
                      <a
                        className={styles.link}
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
                        className={styles.buttonSingin}
                        onClick={() => {
                          if(!isLogged){
                            ym('reachGoal','log-in-button-pressed')
                            router.push('/login')
                          }
                        }}
                      >
                        {student.name !== undefined 
                          ? (
                            <div className={styles.studentCard}>
                              <Image src={'https://realibi.kz/file/624128.png'} className={styles.studentAvatar}/>
                              <div className={styles.studentInfo}>
                                <span 
                                  className={styles.studentName}
                                  onClick={()=>router.push('/cabinet/student')}
                                >
                                  {student.name}
                                </span>
                                <span 
                                  className={styles.exitBtn}        
                                  onClick={()=>{
                                    setExitingOut(true)
                                    router.push('/login');
                                  }}
                                >
                                  {exitingOut ? 'Выход...' : 'Выйти'}
                                </span>
                              </div>
                            </div>
                          ) : (center !== undefined && center.title !== undefined 
                            ? (
                              <div className={styles.studentCard}>
                                <Image src={center.img_src} className={styles.studentAvatar}/>
                                <div className={styles.studentInfo}>
                                  <span 
                                    className={styles.studentName} 
                                    onClick={()=>router.push('/cabinet')}
                                  >
                                    {center.title || center.fullname}
                                  </span>
                                  <span 
                                    className={styles.exitBtn} 
                                    onClick={()=>{
                                      setExitingOut(true)
                                      localStorage.removeItem(globals.localStorageKeys.currentStudent)
                                      localStorage.removeItem(globals.localStorageKeys.authToken);
                                      localStorage.removeItem(globals.localStorageKeys.centerId);
                                      localStorage.removeItem(globals.localStorageKeys.currentUserId);
                                      localStorage.removeItem(globals.localStorageKeys.roleId);
                                      encodeURIComponent(router.push('/login'))
                                    }}>
                                      {exitingOut ? 'Выход...' : 'Выйти'}
                                    </span>
                                  </div>
                                </div>
                              ) : (center !== undefined && center.fullname !== undefined 
                                ? (
                                  <div className={styles.studentCard}>
                                    <Image src={center.img_src || 'https://realibi.kz/file/624128.png'} className={styles.studentAvatar}/>
                                    <div className={styles.studentInfo}>
                                      <span 
                                        className={styles.studentName} 
                                        onClick={()=>router.push('/cabinet')}
                                      >
                                        {center.title || center.fullname}
                                      </span>
                                      <span 
                                        className={styles.exitBtn} 
                                        onClick={()=>{
                                          setExitingOut(true)
                                          encodeURIComponent(router.push('/login'))
                                        }}
                                      >
                                        {exitingOut ? 'Выход...' : 'Выйти'}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
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

              <div onClick={() => { setShowMobileMenu(!showMobileMenu) }} className={styles.menuButtonBody}>
                <svg width="30" height="18" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1H29" stroke="black" stroke-width="2" stroke-linecap="round"/>
                  <path d="M1 17H29" stroke="black" stroke-width="2" stroke-linecap="round"/>
                  <path d="M9 9H29" stroke="black" stroke-width="2" stroke-linecap="round"/>
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
                                  router.push('/');
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
                <span className={styles.clickMore}>В несколько кликов</span>
                <h1>Найди Образовательный Центр или Репетитора</h1>
                <p className={styles.choiseCourse}>Подберём вам лучший курс </p>
                <p className={styles.sendAppText}>Оставив заявку!</p>
                <div className={styles.infoContainer}>
                  
                  <div className={styles.applicationBlock}>
                    <div className={styles.selectContainer}>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.techSupportInput}
                        style={{ cursor: "text", color: "black" }}
                        placeholder="Имя"
                      />
                    </div>
                    <div className={styles.selectContainer}>
                      <input
                        type="text"
                        className={styles.techSupportInput}
                        style={{ cursor: "text" }}
                        onKeyDown={(e) => {
                          if (e.keyCode === 8) {
                            setPhone(phone.slice(0, -1));
                          }
                        }}
                        onChange={(e) => globals.checkPhoneMask(e.target.value, setPhone)}
                        placeholder="Телефон"
                        value={phone}
                      />
                    </div>
                    <div className={styles.selectContainer}>
                      <select 
                        className={styles.selectBlock} 
                        value={connection} 
                        onChange={e => setConnection(e.target.value)}
                      >
                        <option value="3">Способ связи</option>
                        <option value="0">Звонок</option>
                        <option value="1">Whatsapp</option>
                      </select>
                    </div> 
                    <button
                    className={styles.button}
                    onClick={() => {
                      if (name !== "" && phone !== "" && connection !== "" && connection !== "3" && connection !== 3) {
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
                      } else {
                        alert("Заполните пожалуйста все поля.")
                      }
                    }}
                  >
                    Оставить заявку
                  </button>
                {/* <div className={styles.searchBtn} style={{display:'block', textAlign:'center'}}> */}
                  <button  onClick={() => window.scrollTo(0, 1200)} className={styles.searchBtn}>Найди курс</button>
                {/* </div> */}
                  </div>
                  <div className={styles.rounds}>
                      <div className={styles.forRC}>
                        <h2>
                          <Odometer 
                            value={roundFilters[2].length} 
                            format='(,ddd).dd' 
                            theme="default" 
                            animation="count"
                          /> 
                          <span style={{marginLeft: "5px"}}>+</span>
                        </h2> 
                        <p>Учебных центров</p>
                      </div>
                      <div className={styles.forRC}>
                        <h2>
                          <Odometer 
                            value={tutors.length} 
                            format='(,ddd).dd' 
                            theme="default" 
                            animation="count"
                          />
                          <span style={{marginLeft: "5px"}}>+</span>
                        </h2>  
                        <p>Репетиторов</p>
                      </div>
                      <div className={styles.forRC}>
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
            </div>

            {/* <div className={styles.titleBlock} style={{marginTop: 20, marginBottom: 20}}>
                <span className={styles.title}>Топ репетиторов</span>
            </div>
            {
                filtersLoading ? <LoadingBlock/> : <TopTutorsSlider course={tutorsWithPhoto} categories={tutorsWithPhoto}/>
            } */}
            <div className={styles.titleBlock}>
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
                    filters[0] != undefined && (
                        <LurkingFilterBlock 
                            setCardsToShow={setCardsToShow} 
                            cities={filters[0]} 
                            directions={filters[1]} 
                            setCourseCards={setCourseCards} 
                            setTutorCards={setTutorCards}
                            setCoursesLoading={setCoursesLoading}
                        />)
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

