import Head from "next/head";
import styles from "../../styles/Home.module.css";
import coursesStyles from "../../styles/components/content/Courses.module.css";
import contactFormStyles from "../../styles/components/form.module.css";
import Header from "../../src/components/Header/Header";
import HomeContent from "../../src/components/Content/HomeContent/HomeContent";
import Footer from "../../src/components/Footer/Footer";
import ContactButton from "../../src/components/ContactButton/ContactButton";
import React, { useContext, useEffect, useState } from "react";
import globals from "../../src/globals";
import UserContext from "../../src/userContext";
import classnames from "classnames";
import SimpleSlider from "../../src/components/SimpleSlider/SimpleSlider";
import CourseCard from "../../src/components/CourseCard/CourseCard";
import CourseMiniCard from "../../src/components/CourseMiniCard/CourseMiniCard";
import Sidebar from "../../src/components/Sidebar/Sidebar";
import $ from "jquery";
import { default as axios } from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import CourseCategoriesSliderIMG from "../../src/components/CourseCategoriesSliderIMG";
import CourseSearchFormBlock from "../../src/components/CourseSearchFormBlock";
import { CourseSearchForm } from "../../src/components/Forms/CourseSearchForm/CourseSearchForm";
import ModalWindow from "../../src/components/Modal/ModalWindow";
import { createBrowserHistory as dataLayer } from "history";

export default function Home() {
  const contextData = useContext(UserContext);
  const [courseCards, setCourseCards] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [currentCourseCategory, setCurrentCourseCategory] =
    useState("Популярные курсы");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [subMessage, setSubMessage] = useState("");
  const router = useRouter();

  const [sortType, setSortType] = useState(0);
  const [lessonType, setLessonType] = useState(0);

  const [openMoreSort, setOpenMoreSort] = useState(false);

  const [categoriesFirstValue, setCategoriesFirstValue] = useState(0);
  const [categoriesSecondValue, setCategoriesSecondValue] = useState(10);

  const [courseSearchName, setCourseSearchName] = useState("");
  const [courseSearchPhone, setCourseSearchPhone] = useState("");
  const [courseSearchEmail, setCourseSearchEmail] = useState("");
  const [courseSearchComment, setCourseSearchComment] = useState("");
  const [courseSearchCityId, setCourseSearchCityId] = useState(null);
  const [courseSearchIsOnline, setCourseSearchIsOnline] = useState(null);
  const [courseSearchAge, seCourseSearchAge] = useState(null);
  const [courseSearchDirectionId, setCourseSearchDirectionId] = useState(null);
  const [courseSearchMessageForUser, setCourseSearchMessageForUser] =
    useState(null);
  const [courseSearchSubMessageForUser, setCourseSearchSubMessageForUser] =
    useState(null);
  const [courseSearchSubmitButtonPressed, setCourseSearchSubmitButtonPressed] =
    useState(false);

  const [stocks, setStocks] = useState([]);

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showCourseSearchModal, setCourseSearchModal] = useState(false);

  const handleLinkModalClose = () => setShowLinkModal(false);
  const handleCourseSearchModalClose = () => setCourseSearchModal(false);

  const contactSubmit = async (evt) => {
    evt.preventDefault();
    let devDomain = "https://oilan-backend.herokuapp.com";
    await axios.post(`${devDomain}/callRequest/`, { phone: phone });
    setMessage("Ваш номер отправлен!");
    setSubMessage("С вами свяжутся в ближайшее время!");
  };

  const ym = () => {
    return (
      "<!-- Yandex.Metrika counter -->\n" +
      '<script type="text/javascript" >\n' +
      "   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n" +
      "   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n" +
      '   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");\n' +
      "\n" +
      '   ym(78186067, "init", {\n' +
      "        clickmap:true,\n" +
      "        trackLinks:true,\n" +
      "        accurateTrackBounce:true,\n" +
      "        webvisor:true,\n" +
      '        ecommerce:"dataLayer"\n' +
      "   });\n" +
      "</script>\n" +
      '<noscript><div><img src="https://mc.yandex.ru/watch/78186067" style="position:absolute; left:-9999px;" alt="" /></div></noscript>\n' +
      "<!-- /Yandex.Metrika counter -->"
    );
  };

  const googleAdds = () => {
    return (
      "<!-- Global site tag (gtag.js) - Google Analytics -->\n" +
      '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-210482103-1"></script>\n' +
      "<script>\n" +
      "  window.dataLayer = window.dataLayer || [];\n" +
      "  function gtag(){dataLayer.push(arguments);}\n" +
      "  gtag('js', new Date());\n" +
      "\n" +
      "  gtag('config', 'UA-210482103-1');\n" +
      "</script>" +
      "<!-- Google Tag Manager -->\n" +
      "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n" +
      "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n" +
      "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n" +
      "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n" +
      "})(window,document,'script','dataLayer','GTM-MFV3BJ3');</script>\n" +
      "<!-- End Google Tag Manager -->\n" +
      "\n" +
      "\n" +
      "<!-- Google Tag Manager (noscript) -->\n" +
      '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFV3BJ3"\n' +
      'height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n' +
      "<!-- End Google Tag Manager (noscript) -->"
    );
  };

  const axios = require("axios").default;

  const loadCourseCards = async (directionId) => {
    if (directionId !== undefined) {
      let result = await axios.get(
        `${globals.productionServerDomain}/courseCards/` + directionId
      );
      setCourseCards(result.data);
    } else {
      let result = await axios.get(
        `${globals.productionServerDomain}/courseCards/`
      );
      setCourseCards(result.data);
    }
  };

  useEffect(async () => {
    const params = new URLSearchParams(window.location.search);
    let direction = null;
    if (params.has("direction")) {
      direction = params.get("direction");
    }

    if (direction !== null) {
      await loadCourseCards(direction);
    } else {
      await loadCourseCards();
    }

    let promotionsResult = await axios.post(
      `${globals.productionServerDomain}/loadDirectionPromotions`,
      { direction_id: 0 }
    );
    setStocks(promotionsResult.data);

    axios.get(`${globals.productionServerDomain}/filters`).then((res) => {
      setFilters(res.data);
      console.log(res);
    });
    axios.get(`${globals.productionServerDomain}/courses`).then((res) => {
      setCourses(res.data);
      console.log("COURSES: " + JSON.stringify(res));
    });

    setLoading(false);
    setTimeout(() => {
      setCourseSearchModal(true);
    }, 5000);
  }, courseCards);

  const filterBtnHandler = async (city, direction, price, isOnline) => {
    setLoading(true);

    const redirectUrl = `${globals.productionSiteDomain}/courses?direction=${direction}&city=${city}&price=${price}&isOnline=${isOnline}`;

    await router.push(redirectUrl);
    //
    // let postResult = await axios.post(`${globals.productionServerDomain}/courseCardsFilter/`, data);
    // setCourseCards(postResult['data']);
    // document.querySelector('#coursesBlock').scrollIntoView({
    //     behavior: 'smooth'
    // });
    //
    // setLoading(false);
    // setOpenMoreSort(true)
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(60,88,185,1) 0%, rgba(119,148,248,1) 100%)",
      }}
    >
      {/*<img src="/main-image.png" alt="" className={styles.boy_image}/>*/}

      <ModalWindow
        show={showCourseSearchModal}
        handleClose={handleCourseSearchModalClose}
        heading={""}
        body={
          <CourseSearchForm
            handleClose={handleCourseSearchModalClose}
            cities={filters[0]}
            directions={filters[1]}
          />
        }
      />

      <Head>
        <title>Oilan</title>
        <link rel="icon" href="/atom-icon.png" />
        {/*<div dangerouslySetInnerHTML={{__html: googleAdds()}}/>*/}
        <div dangerouslySetInnerHTML={{ __html: ym() }} />
      </Head>

      {/*<ContactButton/>*/}
      <Header />

      <br />

      <p className={styles.subtitle} style={{ marginTop: 10, color: "white" }}>
        Маркетплейс образовательных центров
      </p>

      <br />

      {/*<Sidebar/>*/}
      <div className={coursesStyles.topHeader} id={"filter"}>
        <div className={coursesStyles.topHeaderBody}>
          <img src="/yellow__.png" className={coursesStyles.RoundCube} alt="" />
          <img
            src="/Cone-Blue-Glossy.png"
            className={coursesStyles.ConeBlue}
            alt=""
          />
          <p className={coursesStyles.subtitle} style={{ margin: "0 0 5px 0" }}>
            выберите удобные настройки поиска
          </p>

          <div className={coursesStyles.filter}>
            <div className={coursesStyles.filterBlock}>
              <select
                name="citySelect"
                id="citySelect"
                className={coursesStyles.selectBlock}
              >
                <option value="0">Города</option>
                {filters[0] !== undefined
                  ? filters[0].map((filterOption) =>
                      filterOption.name !== "test" ? (
                        <option value={filterOption.id}>
                          {filterOption.name}
                        </option>
                      ) : null
                    )
                  : null}
              </select>
              <select
                name="isOnlineSelect"
                id="isOnlineSelect"
                className={coursesStyles.selectBlock}
              >
                <option value="0">Формат занятий</option>
                <option value="1">Онлайн</option>
                <option value="2">Оффлайн</option>
              </select>
              <select
                name="directionSelect"
                id="directionSelect"
                className={coursesStyles.selectBlock}
              >
                <option value="0">Направления</option>
                {filters[1] !== undefined
                  ? filters[1].map((filterOption) =>
                      filterOption.id !== 0 ? (
                        <option value={filterOption.id}>
                          {filterOption.name}
                        </option>
                      ) : null
                    )
                  : null}
              </select>
              <select
                name="priceSelect"
                id="priceSelect"
                className={coursesStyles.selectBlock}
              >
                <option value="0">Цена</option>
                <option value="0-20000">0-20.000KZT</option>
                <option value="20000-40000">20.000-40.000KZT</option>
                <option value="40000-60000">40.000-60.000KZT</option>
                <option value="60000-80000">60.000-80.000KZT</option>
                <option value="80000-100000">80.000-100.000KZT</option>
                <option value="100000">100.000KZT+</option>
              </select>
            </div>
            <div className={coursesStyles.search_btnBody}>
              <div className={coursesStyles.search_btnDIV}>
                <span
                  onClick={() => {
                    let city = null;
                    try {
                      city = Number(
                        document.getElementById("citySelect").value
                      );
                    } catch {
                      city = 0;
                    }

                    let direction = Number(
                      document.getElementById("directionSelect").value
                    );
                    let price = document.getElementById("priceSelect").value;
                    let isOnline =
                      document.getElementById("isOnlineSelect").value;

                    filterBtnHandler(city, direction, price, isOnline);
                  }}
                  className={styles.search_button}
                >
                  Поиск
                </span>
                {/*<img*/}
                {/*    src="/search.png"*/}
                {/*    alt=""*/}
                {/*    className={coursesStyles.search_btn}*/}
                {/*    onClick={()=>{*/}
                {/*        let city = null;*/}
                {/*        try{*/}
                {/*            city = Number(document.getElementById("citySelect").value);*/}
                {/*        }catch{*/}
                {/*            city = 0;*/}
                {/*        }*/}

                {/*        let direction = Number(document.getElementById("directionSelect").value);*/}
                {/*        let center = Number(document.getElementById("centerSelect").value);*/}
                {/*        let price = document.getElementById("priceSelect").value;*/}
                {/*        let isOnline = document.getElementById("isOnlineSelect").value;*/}
                {/*        let individualLessonSelect = document.getElementById("individualLessonSelect").value;*/}

                {/*        filterBtnHandler(city, direction, price, center, isOnline, individualLessonSelect);*/}
                {/*    }}/>*/}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={coursesStyles.sortBlock}
        style={{
          height: openMoreSort ? "auto" : 0,
          padding: openMoreSort ? "20px" : 0,
        }}
      >
        <div className={coursesStyles.sortItem}>
          <span className={classnames(coursesStyles.sortItemTitle)}>
            Сортировать по:
          </span>
          <span
            className={classnames(
              coursesStyles.sortValue,
              sortType === 1 ? coursesStyles.active : null
            )}
            onClick={() => {
              setSortType(1);
            }}
          >
            Цене (по возрастанию)
          </span>
          <span
            className={classnames(
              coursesStyles.sortValue,
              sortType === 2 ? coursesStyles.active : null
            )}
            onClick={() => {
              setSortType(2);
            }}
          >
            Цене (по убыванию)
          </span>
          <span
            className={classnames(
              coursesStyles.sortValue,
              sortType === 3 ? coursesStyles.active : null
            )}
            onClick={() => {
              setSortType(3);
            }}
          >
            Рейтингу
          </span>
          <span
            className={classnames(
              coursesStyles.sortValue,
              sortType === 4 ? coursesStyles.active : null
            )}
            onClick={() => {
              setSortType(4);
            }}
          >
            Популярности
          </span>
        </div>
        <div className={coursesStyles.sortItem}>
          <span className={coursesStyles.sortItemTitle}>Вид занятий:</span>
          <span
            className={classnames(
              coursesStyles.sortValue,
              lessonType === 1 ? coursesStyles.active : null
            )}
            onClick={() => {
              setLessonType(1);
            }}
          >
            Индивидуальные занятия
          </span>
          <span
            className={classnames(
              coursesStyles.sortValue,
              lessonType === 2 ? coursesStyles.active : null
            )}
            onClick={() => {
              setLessonType(2);
            }}
          >
            Групповые занятия
          </span>
        </div>
        <div style={{ marginTop: 20 }}>
          <span className={coursesStyles.sortBtn}>Применить фильтр</span>
        </div>
      </div>

      {/*<div className={coursesStyles.container} style={{marginTop: '30px'}} id={'categories'}>*/}
      {/*    <div className={coursesStyles.img_title}>*/}
      {/*        <img src="/two-books.png" alt=""/>*/}
      {/*        <p>Популярные категории</p>*/}
      {/*    </div>*/}

      {/*</div>*/}

      {/*<div className={styles.courseCollections}>*/}
      {/*    /!*<SimpleSlider collection={courseCollections}/>*!/*/}
      {/*    {*/}
      {/*        courseCollections.slice(0, 4).map(collection => {*/}
      {/*            return (*/}
      {/*                <Link href={collection.link}>*/}
      {/*                    <div className={styles.collectionBlock}>*/}
      {/*                        <img src={collection.bg_img} className={styles.collectionImg} alt=""/>*/}
      {/*                    </div>*/}
      {/*                </Link>*/}
      {/*            )*/}
      {/*        })*/}
      {/*    }*/}
      {/*</div>*/}

      <div id={"coursesBlock"} className={classnames(coursesStyles.container)}>
        {loading ? (
          <div className={coursesStyles.loader}>
            <img src="/loader.gif" alt=""></img>
          </div>
        ) : (
          <>
            <div
              className={coursesStyles.img_title}
              style={{ margin: "0 0" }}
              id={"akcii"}
            >
              <img src="/discount.png" alt="" />
              <p>Актуальные акции</p>
            </div>
            <div style={{ padding: "20px 0 60px 0", width: "100%" }}>
              <SimpleSlider stocks={stocks} />
            </div>
            {filters[1] !== undefined ? (
              <div style={{ width: "100%" }}>
                <div className={coursesStyles.img_title}>
                  <img src="/touchscreen.png" alt="" />
                  <p>Выберите направление</p>
                </div>
                <CourseCategoriesSliderIMG categories={filters[1]} />
              </div>
            ) : null}

            <br />
            <br />

            <div className={coursesStyles.img_title}>
              <img src="/two-books.png" alt="" />
              <p>{currentCourseCategory}</p>
            </div>
            <div className={coursesStyles.courses_block}>
              {courseCards.length > 0 ? (
                courseCards.slice(0, 8).map((course) => {
                  if (course.title !== "test") {
                    return (
                      <div style={{ marginLeft: "5%", marginRight: "5%" }}>
                        <CourseCard
                          setLoadingModal={setLoadingModal}
                          course={course}
                        />
                      </div>
                    );
                  }
                })
              ) : (
                <p className={styles.message}>
                  По данным фильтрам пока что нет курсов! :(
                </p>
              )}
            </div>
          </>
        )}
        {filters[1] !== undefined ? (
          <div style={{ width: "100%" }}>
            <div className={styles.courses}>
              {filters[1] !== undefined
                ? filters[1]
                    .slice(categoriesFirstValue, categoriesSecondValue)
                    .map((filterOption) =>
                      filterOption.id !== 0 ? (
                        <Link
                          href={`/?direction=${filterOption.id}&city=0&price=0&isOnline=0`}
                        >
                          <span className={styles.listItem}>
                            {filterOption.name}
                          </span>
                        </Link>
                      ) : null
                    )
                : null}
            </div>

            <div className={styles.centerTitleBlock} style={{ marginTop: 20 }}>
              <button
                className={classnames(styles.arrow)}
                disabled={categoriesFirstValue === 0 ? true : false}
                onClick={() => {
                  if (categoriesFirstValue !== 0) {
                    setCategoriesFirstValue(categoriesFirstValue - 10);
                    setCategoriesSecondValue(categoriesSecondValue - 10);
                  }
                }}
              >
                {" "}
                {"<"}{" "}
              </button>
              <span className={styles.centerTitle}>Смотреть больше тегов</span>
              <button
                className={classnames(styles.arrow)}
                disabled={
                  categoriesSecondValue >= filters[1].length ? true : false
                }
                onClick={() => {
                  if (categoriesSecondValue >= filters[1].length) {
                  } else {
                    setCategoriesFirstValue(categoriesFirstValue + 10);
                    setCategoriesSecondValue(categoriesSecondValue + 10);
                  }
                }}
              >
                {" "}
                {">"}{" "}
              </button>
            </div>
          </div>
        ) : null}
        <br />
        <CourseSearchFormBlock
          yandexMetricaFunction={ym}
          directions={filters[1]}
        />
      </div>

      <div className={coursesStyles.whyUs}>
        <div className={coursesStyles.whyUsHeader}>
          <span className={coursesStyles.whyUsTitle}>
            Почему лучше выбрать курс с Oilan
          </span>
        </div>

        <div
          className={coursesStyles.container}
          style={{ paddingBottom: 0, background: "transparent" }}
        >
          <div className={coursesStyles.whyUsContentBlock}>
            <div className={coursesStyles.whyUsCard}>
              <div className={coursesStyles.whyUsCardImg}>
                <img src="/whyus_filter.png" alt="" />
              </div>
              <div className={coursesStyles.whyUsCardDescBody}>
                <span className={coursesStyles.whyUsCardTitle}>
                  Система подбора
                </span>
                <span className={coursesStyles.whyUsCardDesc}>
                  Фильтрация позволяет найти любой курс за считанные секунды,
                  подходящие по цене, по месту и по рейтингу
                </span>
              </div>
            </div>

            <div className={coursesStyles.whyUsCard}>
              <div className={coursesStyles.whyUsCardImg}>
                <img src="/whyus_motivation.png" alt="" />
              </div>
              <div className={coursesStyles.whyUsCardDescBody}>
                <span className={coursesStyles.whyUsCardTitle}>Мотивация</span>
                <span className={coursesStyles.whyUsCardDesc}>
                  Скидки на разные курсы так же система геймификации в ходе
                  которой ученики будут получать валюту платформы и обменивать
                  ее на крутые призы
                </span>
              </div>
            </div>

            <div className={coursesStyles.whyUsCard}>
              <div className={coursesStyles.whyUsCardImg}>
                <img src="/whyus_content.png" alt="" />
              </div>
              <div className={coursesStyles.whyUsCardDescBody}>
                <span className={coursesStyles.whyUsCardTitle}>Контент</span>
                <span className={coursesStyles.whyUsCardDesc}>
                  Отзывы и оценки курсов позволят подобрать подходящие курсы и
                  преподавателей за короткий срок
                </span>
              </div>
            </div>

            <div className={coursesStyles.whyUsCard}>
              <div className={coursesStyles.whyUsCardImg}>
                <img src="/whyus_message.png" alt="" />
              </div>
              <div className={coursesStyles.whyUsCardDescBody}>
                <span className={coursesStyles.whyUsCardTitle}>
                  Система оповещений
                </span>
                <span className={coursesStyles.whyUsCardDesc}>
                  Telegram-бот для уведомления о новых добавленных клиентах и
                  всех обновлениях на онлайн-образовательной платформе и
                  мобильном приложении
                </span>
              </div>
            </div>

            <div className={coursesStyles.whyUsCard}>
              <div className={coursesStyles.whyUsCardImg}>
                <img src="/whyus_control.png" alt="" />
              </div>
              <div className={coursesStyles.whyUsCardDescBody}>
                <span className={coursesStyles.whyUsCardTitle}>
                  Контроль качества
                </span>
                <span className={coursesStyles.whyUsCardDesc}>
                  У каждого курса формируется рейтинг исходя из отзывов
                  студентов, благодаря которому курс будет подниматься выше в
                  списке
                </span>
              </div>
            </div>

            <div className={coursesStyles.whyUsCard}>
              <div className={coursesStyles.whyUsCardImg}>
                <img src="/whyus_goal.png" alt="" />
              </div>
              <div className={coursesStyles.whyUsCardDescBody}>
                <span className={coursesStyles.whyUsCardTitle}>
                  Новые навыки
                </span>
                <span className={coursesStyles.whyUsCardDesc}>
                  Получайте знания от ведущих образовательных центров вашего
                  города
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*<div className={styles.container} style={{}} id={'partners'}>*/}
      {/*    <div className={styles.titleBlock}>*/}
      {/*        <span>НАШИ ПАРТНЕРЫ</span>*/}
      {/*    </div>*/}
      {/*    <div className={styles.courses} style={{width: '90%', margin: '30px auto 0 auto'}}>*/}
      {/*        {*/}
      {/*            courses.slice(0, 24).map(course => {*/}
      {/*                if(course.title !== 'test'){*/}
      {/*                    return (*/}
      {/*                        <CourseMiniCard course={course}/>*/}
      {/*                    )*/}
      {/*                }*/}
      {/*            })*/}
      {/*        }*/}
      {/*    </div>*/}
      {/*</div>*/}
      {/*<div className={coursesStyles.container} style={{marginTop: '30px'}}>*/}
      {/*    <div className={styles.titleBlock} style={{justifyContent: 'start'}}>*/}
      {/*        <span style={{color: '#474747'}}>Курсы Oilan</span>*/}
      {/*    </div> <br/>*/}
      {/*    <div className={styles.wrapper}>*/}
      {/*        <div className={styles.list}>*/}
      {/*            <span className={styles.listTitle}>Все категории</span>*/}
      {/*            {*/}
      {/*                filters[1] !== undefined*/}
      {/*                    ?*/}
      {/*                    (filters[1].slice(0, 10).map(filterOption => ( filterOption.id !== 0 ? (*/}
      {/*                        <span className={styles.listItem}>{filterOption.name}</span>*/}
      {/*                    ) : null) ))*/}
      {/*                    :*/}
      {/*                    null*/}
      {/*            } <br/>*/}
      {/*            <a className={styles.listItem} href='/'>Все категории</a>*/}
      {/*        </div>*/}
      {/*        /!*<div className={styles.list}>*!/*/}
      {/*        /!*    <span className={styles.listTitle}>Все образовательные цетры</span>*!/*/}
      {/*        /!*    {*!/*/}
      {/*        /!*        courses.map(course => {*!/*/}
      {/*        /!*            if(course.title !== 'test'){*!/*/}
      {/*        /!*                return (*!/*/}
      {/*        /!*                    <span className={styles.listItem}>{course.title}</span>*!/*/}
      {/*        /!*                )*!/*/}
      {/*        /!*            }*!/*/}
      {/*        /!*        })*!/*/}
      {/*        /!*    }*!/*/}
      {/*        /!*</div>*!/*/}
      {/*        <div className={styles.contactForm}>*/}
      {/*            <div className={styles.contactFormTitleBlock}>*/}
      {/*                <span className={styles.contactFormTitle}>Остались вопросы?</span> <br/>*/}
      {/*            </div>*/}
      {/*            <form className={styles.contactFormPhoneInputBody} onSubmit={contactSubmit}>*/}
      {/*                <span className={styles.contactFormDesc}>Поможем выбрать вам курс!</span>*/}
      {/*                <div className={styles.contactFormInputsAreaBlock}>*/}
      {/*                    <div className={styles.contactFormPhoneInputBody}>*/}
      {/*                        <input onChange={e => setPhone(e.target.value)} type="tel" className={styles.contactFormPhoneInput} placeholder={"Номер телефона"}/>*/}
      {/*                        <input type="submit" value="Жду звонка" className={styles.contactFormButton}/>*/}
      {/*                    </div>*/}
      {/*                </div>*/}
      {/*            </form>*/}
      {/*            <div className={styles.contactFormSubtitleBody} style={{padding: '0 15px'}}>*/}
      {/*                {message} <br/>*/}
      {/*                {subMessage}*/}
      {/*            </div>*/}
      {/*            <div className={styles.contactFormFooter}>*/}
      {/*                <span className={styles.contactFormDesc}>Или кликните на номер, чтобы позвонить</span>*/}
      {/*                <div className={styles.contactFormFooterFlex}>*/}
      {/*                    <div><a href="tel:87088007177" className={styles.contactFormLink}>+7 (708) 800-71-77</a></div>*/}
      {/*                    <div><a href="mailto:oilanedu@gmail.com" className={styles.contactFormLink}>oilanedu@gmail.com</a></div>*/}
      {/*                </div>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</div>*/}

      <Footer />
    </div>
  );
}
