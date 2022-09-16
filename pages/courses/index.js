import Head from 'next/head'
import Header from '../../src/components/Header/Header'
import styles from "../../styles/components/content/Courses.module.css";
import CourseCard from "../../src/components/CourseCard/CourseCard";
import HorizontalLine from "../../src/components/HorizontalLine/HorizaontalLine";
import Footer from "../../src/components/Footer/Footer";
import React, {useState, useEffect} from "react";
import Slider from 'react-animated-slider';
import NoizyWindow from "../../src/components/NoizyWindow/NoizyWindow";
import 'react-animated-slider/build/horizontal.css'
import SimpleSlider from "../../src/components/SimpleSlider/SimpleSlider";
import LoadingBlock from "../../src/components/LoadingBlock";
import StockCard from "../../src/components/StockCard/StockCard";
import ContactButton from "../../src/components/ContactButton/ContactButton";
import {useContext} from "react";
import UserContext from "../../src/userContext"
import globals from "../../src/globals";
import EditCourseCard from "../../src/components/EditCourseCard/EditCourseCard";
import Loading from "../../src/components/Loading/Loading"
import classnames from 'classnames'
import {useLongPress} from 'use-long-press';
import {ContactForm} from "../../src/components/Forms/ContactForm/ContactForm";
import ModalWindow from "../../src/components/Modal/ModalWindow";
import {SubscriptionPaymentForm} from "../../src/components/Forms/SubscriptionPaymentForm/SubscriptionPaymentForm";
import {CourseSearchForm} from "../../src/components/Forms/CourseSearchForm/CourseSearchForm";
import TutorCourseCard from "../../src/components/TutorCourseCard";
import CourseSearchResultIsNotDefind from "../../src/components/CourseSearchResultIsNotDefind";

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

const axios = require('axios').default;

function Courses() {
  const [cityId, setCityId] = useState(0);
  const [cities, setCities] = useState([]);
  const [courseCategories, setCourseCategories] = useState([]);
  const [directionId, setDirectionId] = useState(0);
  const [isOnline, setIsOnline] = useState(0);
  const [showNoizyWindow, setShowNoizyWindow] = useState(false);
  const [searchingTutors, setSearchingTutors] = useState(false);
  const [courseCards, setCourseCards] = useState(null);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [openMoreSort, setOpenMoreSort] = useState(false);
  const [directions, setDirections] = useState([]);
  const [searchCenter, setSearchCenter] = useState(true);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [currentCourseCategory, setCurrentCourseCategory] = useState("Найденные курсы");
  const [imagesBase, setImagesBase] = useState([]);
  const [centerName, setCenterName] = useState('');
  const [direction, setDirection] = useState('0');
  const [searchingCenter, setSearchingCenter] = useState()
  const [city, setCity] = useState('0')
  const [onOff, setOnOff] = useState('0')
  const [center, setCenter] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(8);
  const [isTutors, setIsTutors] = useState(false);
  const [catIds, setCatIds] = useState([]);
  const [priceFrom, setPriceFrom] = useState(null);
  const [priceTo, setPriceTo] = useState(null);

  const [searchingCenterState, setSearchingCenterState] = useState(true);
  const [directionParentId, setDirectionParentId] = useState(0);
  const [directionChildrenId, setDirectionChildrenId] = useState(0);
  const [directionChildren2Id, setDirectionChildren2Id] = useState(0);
  const [filterHide, setFilterHide] = useState(false);
  const [filterShow, setFilterShow] = useState(false);


  const addCards = () => {
    setCardsToShow(cardsToShow+8);
  };

  const loadCourseCards = async () => {
    setLoading(true);
    let imagesBaseResponse = await axios.get(`${globals.productionServerDomain}/imagesBase`);
    setImagesBase(imagesBaseResponse.data);
    let result = await axios.get(`${globals.productionServerDomain}/courseCards/`)
      .then(() => {
        setCourseCards(result.data);
        console.log(result.data);
      })
        .then(() => {
          setLoading(false);
        });
  };
    
  const filterBtnHandler = async (centerName, city, direction, priceFrom, priceTo, center, isOnline, sortType, searchingCenterValue) => {
    setCatIds([]);
    let currentCat;
    if (directionChildren2Id !== 0){
      currentCat = directionChildren2Id
    } else if (directionChildrenId !== 0){
      currentCat = directionChildrenId;
    } else if (directionParentId !== 0) {
      currentCat = directionParentId;
    } else {
      currentCat = directionId;
    };

    catIds.push(Number(currentCat));
    await directions.map((item) => {
      if (item.parent == currentCat){
        catIds.push(item.id);
      }
    });
    
    setLoading(true);
    searchingCenterValue = Boolean(Number(searchingCenterValue));
    let imagesBaseResponse = await axios.get(`${globals.productionServerDomain}/imagesBase`);
    setImagesBase(imagesBaseResponse.data);
    console.log('images', imagesBase)
    const data = {
      centerName: centerName,
      city: city.toString(),
      direction: catIds,
      priceFrom: priceFrom.toString(),
      priceTo: priceTo.toString(),
      center: center.toString(),
      isOnline: onOff.toString(),
      sortType: sortType.toString()
    };
    let query = await `${globals.productionServerDomain}/${(searchingCenterValue) ? 'courseCardsFilter' : 'tutorCourseCardsFilter'}/`;
    console.log('query', query);
    let postResult = await axios.post(query, data);
    console.log('course cards');
    console.log(postResult.data);
    setCourseCards(postResult.data);
    setLoading(false);
    setOpenMoreSort(true);
  };

  const reloadCourseCards = async () => {
    await setFiltersLoading(true);
    await loadCategories(true);
    await setLoading(true);
    await setSearchingCenterState(Boolean(searchingCenter));
    if (directionId !== null || city !== null || priceFrom !== null || onOff !== null || center !== null) {
      filterBtnHandler(centerName, city === null ? 0 : Number(city), directionId === null ? 0 : Number(directionId), priceFrom === null ? 0 : priceFrom, priceTo === null ? 0 : priceTo, center === null ? 0 : center, onOff === null ? 0 : onOff, 'price asc', searchingCenter)
      .then(() => {
        console.log('searching center', searchingCenter);
        if(searchingCenter === 0) {
          setSearchingTutors(true);
        } else {
          setSearchingTutors(false);
        }
        console.log("searching tutors", searchingTutors);
      });
    } else {
      loadCourseCards().then(()=>setLoading(false));
    }

    await axios.get(`${globals.productionServerDomain}/filters`).then(res => {
      setFilters(res.data);
      console.log(res);
    });

    document.querySelector('#page_top').scrollIntoView({
      behavior: 'smooth'
    });
    setLoading(false);
  };
    
  useEffect(async () => {
    await reloadCourseCards();
  }, [isTutors]);

  useEffect(async () => {
    await reloadCourseCards();
  }, [directionId]);

  useEffect(async () => {
    await reloadCourseCards();
  }, [onOff]);

  useEffect(async () => {
    await reloadCourseCards();
  }, [city]);

  useEffect(async () => {
    await reloadCourseCards();
  }, [priceFrom]);

  useEffect(async () => {
    await reloadCourseCards();
  }, [priceTo]);

  useEffect(async () => {
    axios.get(`${globals.productionServerDomain}/getCities`).then(res => {
      setCities(res.data);
      console.log(res);
    });
    axios.get(`${globals.productionServerDomain}/getCourseCategories`).then(res => {
      setCourseCategories(res.data);
      console.log(res);
    });
    setFiltersLoading(true);
    loadCategories(true);
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    console.log('params', params);
    setCenterName(params.get('centerName'));
    setSearchingCenter(Number(params.get('searchingCenter')));
    let category = params.get('direction');
    let primarySelect = Number(params.get('searchingCenter'));
    setSearchingCenterState(Boolean(primarySelect));
    if (params.has('direction')) {
      setDirection(params.get('direction'));
      setDirectionId(Number(category));
      await setCatIds([]);
      catIds.push(Number(category));
      await directions.map((item) => {
        if (item.parent == Number(category)){
          catIds.push(item.id);
        }
      });
    }
    if (params.has('city')) {
      setCity(params.get('city'));
      setCityId(Number(city));
    }
    if (params.has('price')) {
      setPriceFrom(params.get('price'));
      setDirectionId(Number(direction));
    }
    if (params.has('isOnline')) {
      setOnOff(params.get('isOnline'));
      setIsOnline(Number(onOff));
    }
    if (params.has('center')) {
      setCenter(params.get('center'));
    }
    if (direction !== null || city !== null || priceFrom !== null || priceTo !== null || onOff !== null || center !== null) {
      filterBtnHandler(centerName, city === null ? 0 : Number(city), direction === null ? 0 : Number(directionId) , priceFrom === null ? 0 : priceFrom,  priceTo === null ? 0 : priceTo, center === null ? 0 : center, onOff === null ? 0 : onOff, 'price asc', primarySelect)
        .then(() => {
          console.log('searching center', searchingCenter);
          if(searchingCenter === 0) {
            setSearchingTutors(true);
          } else {
            setSearchingTutors(false);
          }
          console.log("searching tutors", searchingTutors);
        })
    } else {
      loadCourseCards().then(()=>setLoading(false));
    };
    axios.get(`${globals.productionServerDomain}/filters`).then(res => {
      setFilters(res.data);
      console.log(res);
    });
    document.querySelector('#page_top').scrollIntoView({
      behavior: 'smooth'
    });
    setLoading(false);
  }, []);

  const longPressHandler = useLongPress(() => {
    setShowLinkModal(true);
  });

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showCourseSearchModal, setCourseSearchModal] = useState(false);

  const handleLinkModalClose = () => setShowLinkModal(false);
  const handleCourseSearchModalClose = () => setCourseSearchModal(false);

  let [linkForTarget, setLinkForTarget] = useState('');

  const sendApplication = (courseId, userInfo) => {
    let data = {
      city_id: cityId,
      direction_id: directionId,
      name: userInfo.fullName,
      phone: userInfo.phone,
      email: userInfo.email,
      promocode: userInfo.promocode,
      age: 0,
      isOnline: isOnline,
      course_id: courseId,
      role_id: searchingTutors ? 6 : 4
    };
    axios({
      method: 'post',
      url: `${globals.productionServerDomain}/createCourseSearchTicket`,
      data: data,
      headers: {
        'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
      }
    })
      .then(function(res){})
      .catch(() => {
        alert('Что-то пошло нетак!');
      });
  }

  function loadCategories(searchCenter){
    setDirections([{ name: 'Загружаем направления...', id: 0 }]);
    axios.post(`${globals.productionServerDomain}/getFilteredCategories`, {
      searchingCenter: searchCenter,
    })
      .then(res => {
        console.log(res.data);
        setDirections(res.data)
      })
  };


    // function openNoize(){
    //     // loadCategories(true);
    //     setShowNoizyWindow(true);
    // }
     
    // setInterval( openNoize, 300000 );
  return (
    <div id={'page_top'}>
      <ModalWindow
        show={showLinkModal}
        handleClose={handleLinkModalClose}
        contactForm={'contactForm'}
        body={
          <>
            <p style={{
              color: 'white',
              fontSize: 18,
              padding: 20,
              boxSizing: 'border-box',
              width: '100%',
              wordBreak: 'break-word'
            }}>
            <p>Ссылка: </p>
              {linkForTarget}
            </p>
          </>
        }
      />
      <Head>
        <title>Курсы</title>
        <link rel="icon" href="/atom-icon.png"/>
        <div dangerouslySetInnerHTML={{__html: ym()}}/>
      </Head>
      {
        showNoizyWindow 
        ? (<NoizyWindow 
            loadCategoriesCallback={loadCategories} 
            setSearchCenterCallback={setSearchCenter} 
            searchCenter={searchCenter} 
            close={setShowNoizyWindow} 
            cities={filters[0]} 
            directions={directions}
          />)
        : (<></>)
      }
      <Header white={true}/>
      <div id={'coursesBlock'}
        className={classnames(styles.container, styles.topBlock)}
      >
        <div style={filterHide ? {display: filterShow ? "block" : "none"} : undefined} className={styles.filtersSection}>
          <h1>Фильтры </h1>
          <div className={styles.filter_container}>
            <div className={styles.filterChapter}>
              <h3>Преподаватель</h3>
              <div>
                <span
                  className={isTutors ? styles.filterActive : styles.filter}
                  onClick={() => {
                  setIsTutors(true)
                  setSearchingTutors(true)
                  setSearchingCenterState(false)
                  setSearchingCenter(0)
                  }}
                >
                    Репетиторы
                  </span>
                  <span 
                    className={!isTutors ? styles.filterActive : styles.filter}
                    onClick={() => {
                      setIsTutors(false)
                      setSearchingTutors(false)
                      setSearchingCenterState(true)
                      setSearchingCenter(1)
                    }}
                  >
                    Центры
                  </span>
                </div>
              </div>
              <div className={styles.filterChapter}>
                <h3>Формат занятий</h3>
                <div
                  className={onOff === 2 ? styles.filterActive : styles.filter}
                  onClick={() => setOnOff(2)}
                >
                  Оффлайн (очный)
                </div>
                <div
                  className={onOff === 1 ? styles.filterActive : styles.filter}
                  onClick={() => setOnOff(1)}
                >
                  Онлайн (заочный)
                </div>
              </div>
              <div className={styles.filterChapter}>
                <h3>Город</h3>
                <div className={styles.filterChapterContent}>
                  {cities.map((item) => {
                    return <div
                      className={city === item.id ? styles.filterActive : styles.filter}
                      onClick={async () => await setCity(item.id)}
                    >
                      {item.name}
                    </div>
                  })}
                </div>
                
              </div>
              <div className={styles.filterChapter}>
                <h3>Направления</h3>
                <div className={styles.filterChapterContent}>
                  {courseCategories.map((item) => {
                    if (item.parent === 0) {
                      return <div>
                        <span
                          className={directionParentId === item.id ? styles.filterActive : styles.filter}
                          // style={directionParentId === item.id ? {color: "purple"} : {color: "black"}} 
                          onClick={() => {
                            setDirectionParentId(item.id)
                            setDirectionChildrenId(0)
                            setDirectionChildren2Id(0)
                            setDirectionId(item.id)
                          }}
                        >
                          {item.name}
                        </span>
                        <div>
                          {courseCategories.map((item2) => {
                            if (item2.parent === item.id) {
                              return <div
                                style={directionParentId === item2.parent ? {display: "block", marginLeft: "10px"} : {display: "none"}}
                              >
                                <span
                                  className={directionChildrenId === item2.id ? styles.filterActive : styles.filter}
                                  // style={directionChildrenId === item2.id ? {color: "green"} : {color: "black"}}
                                  onClick={() => {
                                    setDirectionChildrenId(item2.id)
                                    setDirectionChildren2Id(0)
                                    setDirectionId(item2.id)
                                  }}
                                >
                                  {item2.name}
                                </span>
                                <div>
                                  {courseCategories.map((item3) => {
                                    if (item3.parent === item2.id) {
                                      return <div
                                        style={directionChildrenId === item3.parent ? {display: "block", marginLeft: "20px"} : {display: "none"}}
                                      >
                                        <span
                                          className={directionChildren2Id === item3.id ? styles.filterActive : styles.filter}
                                          // style={directionChildren2Id === item3.id ? {color: "pink"} : {color: "black"}}
                                          onClick={() => {
                                            setDirectionChildren2Id(item3.id)
                                            setDirectionId(item3.id)
                                          }}
                                        >
                                          {item3.name}
                                        </span>
                                      </div>
                                    }
                                  })}
                                </div>
                              </div>
                            }
                          })}
                        </div>
                      </div>
                    }
                  })}
                </div>
                
              </div>
              
            </div>         
            
            <div className={styles.filterChapter}>
              <h3>Цена</h3>
              <div className={styles.price_content}>
                <input 
                  type="number" 
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                />
                <input 
                  type="number" 
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={styles.cardsSection}>
            <div 
              className={styles.filter_btn} 
              onClick={() => {
                setFilterHide(!filterHide);
                setFilterShow(!filterShow);
              }}
            ></div>
            {
              (
                <>
                  <div className={styles.img_title}>
                    <img src="/notebook-dynamic-color.png" style={{height: 48, width: 48}} alt=""/>
                    {searchingCenterState===false && (
                      <p>Найденные репетиторы</p>
                    )}
                    {searchingCenterState===true && (
                      <p>{currentCourseCategory}</p>
                    )}      
                  </div>
                  {
                    courseCards !== null ? (
                      imagesBase.length !== 0 && (
                        courseCards.length > 0 
                          ? (
                            <div className={classnames(styles.courses_block)}>
                              {
                                courseCards.slice(0, cardsToShow).map((course, idx) => {
                                  if (course.title !== 'test') {
                                    return (
                                      <>
                                        {searchingCenterState===false && (
                                          <TutorCourseCard key={idx} coverImage={course.img_src} sendApplicationCallback={sendApplication} setLoadingModal={setLoadingModal} course={course}/>
                                        )}
                                        {searchingCenterState===true && (
                                          <CourseCard key={idx} coverImage={imagesBase[Math.floor(Math.random() * imagesBase.length)].src} sendApplicationCallback={sendApplication} setLoadingModal={setLoadingModal} course={course}/>
                                        )}
                                      </>
                                    )
                                  }
                                })
                              }
                            </div>) 
                          : <CourseSearchResultIsNotDefind catalog={true}/>
                        )
                      ) 
                      : (
                        <div className={styles.loader}>
                          <img src="/loader.gif" alt=""></img>
                        </div>
                      )
                  }
                  <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '10px 0'}}>
                    <a 
                      className={styles.link} 
                      onClick={()=> {
                        addCards()
                      }}
                    >
                      Смотреть еще
                    </a>
                  </div>
                </>
              )
            }
          </div>
        </div>
      <Footer/>
    </div>
  )
}


export default Courses;
