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
                  <svg className={styles.desktop_logo} width="188" viewBox="0 0 188 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M168.759 59.594C165.245 59.594 162.049 58.8059 159.173 57.2295C156.343 55.653 154.106 53.4236 152.463 50.5412C150.865 47.6136 150.067 44.2357 150.067 40.4075C150.067 36.6242 150.888 33.2913 152.532 30.4089C154.221 27.4813 156.503 25.2519 159.379 23.7206C162.255 22.1442 165.473 21.3561 169.033 21.3561C172.594 21.3561 175.812 22.1442 178.688 23.7206C181.564 25.2519 183.823 27.4589 185.467 30.3413C187.155 33.2237 188 36.5793 188 40.4075C188 44.2357 187.133 47.6136 185.398 50.5412C183.709 53.4236 181.404 55.653 178.482 57.2295C175.561 58.8059 172.32 59.594 168.759 59.594ZM168.759 54.1894C170.996 54.1894 173.096 53.6715 175.059 52.6355C177.022 51.5996 178.596 50.0457 179.783 47.974C181.016 45.9023 181.632 43.3801 181.632 40.4075C181.632 37.4349 181.039 34.9127 179.852 32.841C178.665 30.7693 177.113 29.2378 175.196 28.247C173.279 27.2111 171.201 26.6932 168.965 26.6932C166.682 26.6932 164.583 27.2111 162.665 28.247C160.794 29.2378 159.287 30.7693 158.146 32.841C157.005 34.9127 156.434 37.4349 156.434 40.4075C156.434 43.425 156.982 45.9699 158.078 48.0416C159.219 50.1133 160.725 51.6671 162.597 52.7031C164.468 53.6939 166.523 54.1894 168.759 54.1894Z" fill="#F3F3F3"/>
                    <path d="M18.6928 59.5056C15.1779 59.5056 11.9826 58.7175 9.10676 57.1411C6.27658 55.5647 4.03984 53.3352 2.39652 50.4528C0.798832 47.5252 0 44.1473 0 40.3191C0 36.5359 0.821663 33.2029 2.46499 30.3205C4.15396 27.3929 6.43636 25.1635 9.31218 23.6322C12.188 22.0558 15.4062 21.2677 18.9667 21.2677C22.5273 21.2677 25.7454 22.0558 28.6213 23.6322C31.4971 25.1635 33.7567 27.3705 35.4 30.2529C37.0889 33.1354 37.9334 36.4909 37.9334 40.3191C37.9334 44.1473 37.0662 47.5252 35.3315 50.4528C33.6426 53.3352 31.3372 55.5647 28.4158 57.1411C25.4945 58.7175 22.2534 59.5056 18.6928 59.5056ZM18.6928 54.101C20.9295 54.101 23.0295 53.5831 24.9922 52.5471C26.955 51.5112 28.5299 49.9573 29.7168 47.8856C30.9493 45.8139 31.5656 43.2917 31.5656 40.3191C31.5656 37.3466 30.9722 34.8243 29.7853 32.7526C28.5984 30.6809 27.0464 29.1494 25.1292 28.1586C23.212 27.1227 21.1349 26.6048 18.8982 26.6048C16.6158 26.6048 14.516 27.1227 12.5988 28.1586C10.7273 29.1494 9.22088 30.6809 8.07969 32.7526C6.93849 34.8243 6.36789 37.3466 6.36789 40.3191C6.36789 43.3366 6.91566 45.8815 8.01121 47.9532C9.1524 50.0249 10.6588 51.5787 12.5304 52.6147C14.4019 53.6055 16.4561 54.101 18.6928 54.101Z" fill="#F3F3F3"/>
                    <path d="M46.2625 12.2194V59.4259H38.8918V12.2194H46.2625ZM49.28 41.6915C49.28 38.1617 50.0128 35.0358 51.4783 32.314C52.9871 29.5922 55.013 27.4871 57.5561 25.9986C60.1423 24.4675 62.9872 23.702 66.0906 23.702C68.8924 23.702 71.3277 24.2549 73.3967 25.3606C75.5088 26.4239 77.1898 27.7635 78.4398 29.3796V24.2762H85.8752V59.4259H78.4398V54.1949C77.1898 55.8535 75.4872 57.2357 73.332 58.3414C71.1769 59.4471 68.72 60 65.9613 60C62.901 60 60.0992 59.2345 57.5561 57.7035C55.013 56.1299 52.9871 53.961 51.4783 51.1966C50.0128 48.3898 49.28 45.2214 49.28 41.6915ZM78.4398 41.8191C78.4398 39.395 77.9226 37.2899 76.8881 35.5037C75.8967 33.7175 74.5821 32.3566 72.9441 31.4209C71.3062 30.4853 69.5389 30.0175 67.6424 30.0175C65.7458 30.0175 63.9786 30.4853 62.3406 31.4209C60.7027 32.314 59.3662 33.6537 58.3318 35.4399C57.3406 37.1835 56.8449 39.2674 56.8449 41.6915C56.8449 44.1157 57.3406 46.2421 58.3318 48.0708C59.3662 49.8995 60.7027 51.3029 62.3406 52.2811C64.0217 53.2167 65.7889 53.6845 67.6424 53.6845C69.5389 53.6845 71.3062 53.2167 72.9441 52.2811C74.5821 51.3455 75.8967 49.9846 76.8881 48.1984C77.9226 46.3697 78.4398 44.2432 78.4398 41.8191ZM109.328 23.702C112.13 23.702 114.63 24.2762 116.828 25.4244C119.069 26.5727 120.815 28.2738 122.065 30.5278C123.315 32.7818 123.94 35.5037 123.94 38.6933V59.4259H116.634V39.7778C116.634 36.6307 115.836 34.2278 114.242 32.5692C112.647 30.8681 110.47 30.0175 107.711 30.0175C104.953 30.0175 102.755 30.8681 101.117 32.5692C99.5218 34.2278 98.7243 36.6307 98.7243 39.7778V59.4259H91.3536V24.2762H98.7243V28.2951C99.9312 26.8491 101.461 25.7221 103.315 24.9141C105.211 24.1061 107.216 23.702 109.328 23.702Z" fill="#F3F3F3"/>
                    <path d="M142.631 21.0685C141.4 21.0685 140.367 20.6435 139.532 19.7934C138.698 18.9433 138.28 17.8908 138.28 16.636C138.28 15.3811 138.698 14.3287 139.532 13.4786C140.367 12.6285 141.4 12.2035 142.631 12.2035C143.824 12.2035 144.837 12.6285 145.671 13.4786C146.506 14.3287 146.923 15.3811 146.923 16.636C146.923 17.8908 146.506 18.9433 145.671 19.7934C144.837 20.6435 143.824 21.0685 142.631 21.0685ZM145.969 25.501V58.9573H139.174V25.501H145.969Z" fill="#F3F3F3"/>
                    <path d="M129.076 58.6737C128.466 58.054 128.16 57.3071 128.16 56.4332C128.16 55.5592 128.466 54.8204 129.076 54.2165C129.686 53.5968 130.425 53.287 131.292 53.287C132.159 53.287 132.898 53.5968 133.508 54.2165C134.119 54.8204 134.424 55.5592 134.424 56.4332C134.424 57.3071 134.119 58.054 133.508 58.6737C132.898 59.2775 132.159 59.5794 131.292 59.5794C130.425 59.5794 129.686 59.2775 129.076 58.6737Z" fill="#F3F3F3"/>
                    <path d="M18.8943 7.43804C17.8271 7.43804 16.9321 7.08142 16.2091 6.36818C15.4862 5.65495 15.1247 4.77188 15.1247 3.71902C15.1247 2.66615 15.4862 1.78309 16.2091 1.06986C16.9321 0.356619 17.8271 0 18.8943 0C19.9271 0 20.805 0.356619 21.5279 1.06986C22.2509 1.78309 22.6124 2.66615 22.6124 3.71902C22.6124 4.77188 22.2509 5.65495 21.5279 6.36818C20.805 7.08142 19.9271 7.43804 18.8943 7.43804ZM21.7861 11.1571V39.228H15.8993V11.1571H21.7861Z" fill="#F3F3F3"/>
                  </svg>
                  <svg className={styles.mobile_logo} width="104" viewBox="0 0 188 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M168.759 59.594C165.245 59.594 162.049 58.8059 159.173 57.2295C156.343 55.653 154.106 53.4236 152.463 50.5412C150.865 47.6136 150.067 44.2357 150.067 40.4075C150.067 36.6242 150.888 33.2913 152.532 30.4089C154.221 27.4813 156.503 25.2519 159.379 23.7206C162.255 22.1442 165.473 21.3561 169.033 21.3561C172.594 21.3561 175.812 22.1442 178.688 23.7206C181.564 25.2519 183.823 27.4589 185.467 30.3413C187.155 33.2237 188 36.5793 188 40.4075C188 44.2357 187.133 47.6136 185.398 50.5412C183.709 53.4236 181.404 55.653 178.482 57.2295C175.561 58.8059 172.32 59.594 168.759 59.594ZM168.759 54.1894C170.996 54.1894 173.096 53.6715 175.059 52.6355C177.022 51.5996 178.596 50.0457 179.783 47.974C181.016 45.9023 181.632 43.3801 181.632 40.4075C181.632 37.4349 181.039 34.9127 179.852 32.841C178.665 30.7693 177.113 29.2378 175.196 28.247C173.279 27.2111 171.201 26.6932 168.965 26.6932C166.682 26.6932 164.583 27.2111 162.665 28.247C160.794 29.2378 159.287 30.7693 158.146 32.841C157.005 34.9127 156.434 37.4349 156.434 40.4075C156.434 43.425 156.982 45.9699 158.078 48.0416C159.219 50.1133 160.725 51.6671 162.597 52.7031C164.468 53.6939 166.523 54.1894 168.759 54.1894Z" fill="#F3F3F3"/>
                    <path d="M18.6928 59.5056C15.1779 59.5056 11.9826 58.7175 9.10676 57.1411C6.27658 55.5647 4.03984 53.3352 2.39652 50.4528C0.798832 47.5252 0 44.1473 0 40.3191C0 36.5359 0.821663 33.2029 2.46499 30.3205C4.15396 27.3929 6.43636 25.1635 9.31218 23.6322C12.188 22.0558 15.4062 21.2677 18.9667 21.2677C22.5273 21.2677 25.7454 22.0558 28.6213 23.6322C31.4971 25.1635 33.7567 27.3705 35.4 30.2529C37.0889 33.1354 37.9334 36.4909 37.9334 40.3191C37.9334 44.1473 37.0662 47.5252 35.3315 50.4528C33.6426 53.3352 31.3372 55.5647 28.4158 57.1411C25.4945 58.7175 22.2534 59.5056 18.6928 59.5056ZM18.6928 54.101C20.9295 54.101 23.0295 53.5831 24.9922 52.5471C26.955 51.5112 28.5299 49.9573 29.7168 47.8856C30.9493 45.8139 31.5656 43.2917 31.5656 40.3191C31.5656 37.3466 30.9722 34.8243 29.7853 32.7526C28.5984 30.6809 27.0464 29.1494 25.1292 28.1586C23.212 27.1227 21.1349 26.6048 18.8982 26.6048C16.6158 26.6048 14.516 27.1227 12.5988 28.1586C10.7273 29.1494 9.22088 30.6809 8.07969 32.7526C6.93849 34.8243 6.36789 37.3466 6.36789 40.3191C6.36789 43.3366 6.91566 45.8815 8.01121 47.9532C9.1524 50.0249 10.6588 51.5787 12.5304 52.6147C14.4019 53.6055 16.4561 54.101 18.6928 54.101Z" fill="#F3F3F3"/>
                    <path d="M46.2625 12.2194V59.4259H38.8918V12.2194H46.2625ZM49.28 41.6915C49.28 38.1617 50.0128 35.0358 51.4783 32.314C52.9871 29.5922 55.013 27.4871 57.5561 25.9986C60.1423 24.4675 62.9872 23.702 66.0906 23.702C68.8924 23.702 71.3277 24.2549 73.3967 25.3606C75.5088 26.4239 77.1898 27.7635 78.4398 29.3796V24.2762H85.8752V59.4259H78.4398V54.1949C77.1898 55.8535 75.4872 57.2357 73.332 58.3414C71.1769 59.4471 68.72 60 65.9613 60C62.901 60 60.0992 59.2345 57.5561 57.7035C55.013 56.1299 52.9871 53.961 51.4783 51.1966C50.0128 48.3898 49.28 45.2214 49.28 41.6915ZM78.4398 41.8191C78.4398 39.395 77.9226 37.2899 76.8881 35.5037C75.8967 33.7175 74.5821 32.3566 72.9441 31.4209C71.3062 30.4853 69.5389 30.0175 67.6424 30.0175C65.7458 30.0175 63.9786 30.4853 62.3406 31.4209C60.7027 32.314 59.3662 33.6537 58.3318 35.4399C57.3406 37.1835 56.8449 39.2674 56.8449 41.6915C56.8449 44.1157 57.3406 46.2421 58.3318 48.0708C59.3662 49.8995 60.7027 51.3029 62.3406 52.2811C64.0217 53.2167 65.7889 53.6845 67.6424 53.6845C69.5389 53.6845 71.3062 53.2167 72.9441 52.2811C74.5821 51.3455 75.8967 49.9846 76.8881 48.1984C77.9226 46.3697 78.4398 44.2432 78.4398 41.8191ZM109.328 23.702C112.13 23.702 114.63 24.2762 116.828 25.4244C119.069 26.5727 120.815 28.2738 122.065 30.5278C123.315 32.7818 123.94 35.5037 123.94 38.6933V59.4259H116.634V39.7778C116.634 36.6307 115.836 34.2278 114.242 32.5692C112.647 30.8681 110.47 30.0175 107.711 30.0175C104.953 30.0175 102.755 30.8681 101.117 32.5692C99.5218 34.2278 98.7243 36.6307 98.7243 39.7778V59.4259H91.3536V24.2762H98.7243V28.2951C99.9312 26.8491 101.461 25.7221 103.315 24.9141C105.211 24.1061 107.216 23.702 109.328 23.702Z" fill="#F3F3F3"/>
                    <path d="M142.631 21.0685C141.4 21.0685 140.367 20.6435 139.532 19.7934C138.698 18.9433 138.28 17.8908 138.28 16.636C138.28 15.3811 138.698 14.3287 139.532 13.4786C140.367 12.6285 141.4 12.2035 142.631 12.2035C143.824 12.2035 144.837 12.6285 145.671 13.4786C146.506 14.3287 146.923 15.3811 146.923 16.636C146.923 17.8908 146.506 18.9433 145.671 19.7934C144.837 20.6435 143.824 21.0685 142.631 21.0685ZM145.969 25.501V58.9573H139.174V25.501H145.969Z" fill="#F3F3F3"/>
                    <path d="M129.076 58.6737C128.466 58.054 128.16 57.3071 128.16 56.4332C128.16 55.5592 128.466 54.8204 129.076 54.2165C129.686 53.5968 130.425 53.287 131.292 53.287C132.159 53.287 132.898 53.5968 133.508 54.2165C134.119 54.8204 134.424 55.5592 134.424 56.4332C134.424 57.3071 134.119 58.054 133.508 58.6737C132.898 59.2775 132.159 59.5794 131.292 59.5794C130.425 59.5794 129.686 59.2775 129.076 58.6737Z" fill="#F3F3F3"/>
                    <path d="M18.8943 7.43804C17.8271 7.43804 16.9321 7.08142 16.2091 6.36818C15.4862 5.65495 15.1247 4.77188 15.1247 3.71902C15.1247 2.66615 15.4862 1.78309 16.2091 1.06986C16.9321 0.356619 17.8271 0 18.8943 0C19.9271 0 20.805 0.356619 21.5279 1.06986C22.2509 1.78309 22.6124 2.66615 22.6124 3.71902C22.6124 4.77188 22.2509 5.65495 21.5279 6.36818C20.805 7.08142 19.9271 7.43804 18.8943 7.43804ZM21.7861 11.1571V39.228H15.8993V11.1571H21.7861Z" fill="#F3F3F3"/>
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

