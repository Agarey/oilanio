import styles from "./style.module.css";
import React, {useState, useEffect, useLayoutEffect} from "react";
import 'react-animated-slider/build/horizontal.css'
import CabinetMenu from "../../src/components/Menu";
import CabinetHeader from "../../src/components/CabinetHeader";
import ApplicationsBlock from "../../src/components/ApplicationsBlock";
import {default as axios} from "axios";
import globals from "../../src/globals";
import MyInfoBlock from "../../src/components/MyInfoBlock";
import StatisticsBlock from "../../src/components/StatisticsBlock";
import Head from "next/head";
import SubscriptionBlock from "../../src/components/SubscriptionBlock";
import {useRouter} from "next/router";
import style from "../direction/direction.module.css";

function Cabinet(){
  const menuItems = [
    {title: 'Статистика', index: 0},
    {title: 'Заявки', index: 1},
    {title: 'Подписка', index: 2},
    {title: 'Моя информация', index: 3}
  ];

  const [course, setCourse] = useState({
    id: 0,
    title: '',
    subtitle: '',
    img_src: 'https://image.freepik.com/free-photo/portrait-of-white-man-isolated_53876-40306.jpg',
    description: '',
    phones: '',
    email: '',
    website_url: '',
    instagram: '',
    addresses: '',
    city_id: 1,
  });

  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [courseCategories, setCourseCategories] = useState([]);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [courseCards, setCourseCards] = useState([]);
  const [directionsArray, setDirectionsArray] = useState([]);
  const [courseInfo, setCourseInfo] = useState(null);
  const [clickStatistics, setClickStatistics] = useState([]);
  const [applications, setApplications] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [newApplicationsCount, setNewApplicationsCount] = useState(0);
  const [isTutors, setIsTutors] = useState(false);

  const [title, setTitle] = useState(course.title);
  const [subtitle, setSubtitle] = useState(course.subtitle);
  const [description, setDescription] = useState(course.description);
  const [phones, setPhones] = useState(course.phones); 
  const [email, setEmail] = useState(course.email);
  const [website_url, setWebsiteUrl] = useState(course.website_url);
  const [instagram, setInstagram] = useState(course.instagram);
  const [addresses, setAddresses] = useState(course.addresses);
  const [city_id, setCityId] = useState(course.city_id);

  const setProfileStates = (profileObject) => {
    setTitle(profileObject.title);
    setSubtitle(profileObject.subtitle);
    setDescription(profileObject.description);
    setPhones(profileObject.phones);
    setEmail(profileObject.email);
    setWebsiteUrl(profileObject.website_url);
    setInstagram(profileObject.instagram);
    setAddresses(profileObject.addresses);
    setCityId(profileObject.city_id);
  }

  const editProfileData = () => {
    let data = {
      id: Number(localStorage.getItem('center id')),
      title,
      subtitle,
      description,
      phones,
      email,
      website_url,
      instagram,
      addresses,
      city_id,
    };

    axios({
      method: 'post',
      url: `${globals.productionServerDomain}/updateCourseInfo`,
      data: data,
      headers: {
        'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
      }
    }).then(function(res){
      alert('Ваши данные успешно обновлены!');
      setEditMode(false);
    }).catch(() => {
      router.push('/login');
    })
  }


  const setEditModeHandler = () => setEditMode(!editMode);

  const setTitleHandler = (e) => setTitle(e.target.value);
  const setSubtitleHandler = (e) => setSubtitle(e.target.value);
  const setDescriptionHandler = (e) => setDescription(e.target.value);
  const setPhonesHandler = (e) => setPhones(e.target.value);
  const setEmailHandler = (e) => setEmail(e.target.value);
  const setWebsiteUrlHandler = (e) => setWebsiteUrl(e.target.value);
  const setInstagramHandler = (e) => setInstagram(e.target.value);
  const setAddressesHandler = (e) => setAddresses(e.target.value);

  const editProfileDataHandler = (e) => editProfileData(e.target.value);

  const getActivePage = () => {
    switch(activeMenuIndex){
      case 0:
        return(<StatisticsBlock 
          applications={applications} 
          newApplicationsCount={newApplicationsCount} 
          clickStatistics={clickStatistics}
        />)
      case 1:
        return(<ApplicationsBlock 
          isTutors={isTutors} 
          applications={applications} 
          courseInfo={courseInfo} 
          courseCards={courseCards} 
          directionsArray={directionsArray} 
          subscriptionInfo={subscriptionInfo} 
          categories={courseCategories}
        />);
      case 2:
        return(<SubscriptionBlock courseInfo={courseInfo}/>)
      case 3:
        return(<MyInfoBlock 
          teachers={teachers} 
          courseCategories={courseCategories} 
          courseInfo={courseInfo} 
          courseCards={courseCards}
          editMode={editMode}
          setEditModeHandler={setEditModeHandler}
          title={title}
          setTitleHandler={setTitleHandler}
          subtitle={subtitle}
          setSubtitleHandler={setSubtitleHandler}
          description={description}
          setDescriptionHandler={setDescriptionHandler}
          phones={phones}
          setPhonesHandler={setPhonesHandler}
          email={email}
          setEmailHandler={setEmailHandler}
          website_url={website_url}
          setWebsiteUrlHandler={setWebsiteUrlHandler}
          instagram={instagram}
          setInstagramHandler={setInstagramHandler}
          addresses={addresses}
          setAddressesHandler={setAddressesHandler}
          editProfileDataHandler={(e) => editProfileDataHandler(e)}
        />);
      default:
        return(<></>);
    }
  }

  const loadData = async () => {
    let courseId = '';
    let token = '';

    if(localStorage.getItem(globals.localStorageKeys.centerId) != null){
      courseId = +localStorage.getItem(globals.localStorageKeys.centerId);
      token = JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token;
      await axios({
        method: 'get',
        url: `${globals.productionServerDomain}/courses/${+localStorage.getItem(globals.localStorageKeys.centerId)}`,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token}`
        }
      }).then(async function(res){
        await setCourse(res.data[0]);
        await setProfileStates(res.data[0]);
        console.log(res.data[0]);
        await setCourseInfo(res.data[0]);
      }).catch(() => {
        router.push('/login');
      });
      await axios({
        method: 'post',
        url: `${globals.productionServerDomain}/courseCategories`,
      }).then(function(res){
        setCourseCategories(res.data)
      });
      await axios({
        method: 'post',
        url: `${globals.productionServerDomain}/cabinetCourseTeachers`,
        data: {
          courseId: courseId
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("auth token")).token}`
        }
      }).then(function(res){
        setTeachers(res.data)
      });
      await axios({
        method: 'post',
        url: `${globals.productionServerDomain}/getApplicationResponsePermission`,
        data: {
          center_id: +localStorage.getItem(globals.localStorageKeys.centerId)
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("auth token")).token}`
        }
      }).then(function(res){
        setSubscriptionInfo(res.data);
      }).catch(() => {
        router.push('/login');
      });
      let directionsArrayTemp = [];
      await axios({
        method: 'post',
        url: `${globals.productionServerDomain}/cabinetCourseCards`,
        data: {
          courseId: +localStorage.getItem(globals.localStorageKeys.centerId)
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token}`
        }
      }).then(function(res){
        setCourseCards(res.data);
        res.data.map(item => {
          if(directionsArrayTemp.indexOf(item.card_category_id) === -1){
            directionsArrayTemp.push(item.card_category_id);
          }
        })
      }).finally(() => {
        axios({
          method: 'post',
          url: `${globals.productionServerDomain}/getCourseSearchApplications`,
          data: {
            role_id: +localStorage.getItem(globals.localStorageKeys.roleId),
            course_id: courseId
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(function(res){
          let applicationArray = [];
          let newApplicationsCount = 0;
          res.data.map(item => {
          if(directionsArrayTemp.includes(item.direction_id)){
            if((new Date(item.datetime).getTime() + 86400000) > (new Date().getTime())){
              newApplicationsCount++;
            }
              applicationArray.push(item);
            }
          })
          setApplications(applicationArray);
          setNewApplicationsCount(newApplicationsCount);
        }).catch((err)=>{
          setApplications([])
        })
      });
      await axios({
        method: 'post',
        url: `${globals.productionServerDomain}/getClickStatistics`,
        data: {
          centerId: +localStorage.getItem(globals.localStorageKeys.centerId)
        }
      }).then(function(res){
        let cardClicks = [];
        res.data.map((item) => {
          cardClicks.push(item.card_id);
        })
        let uniqueCards = [...new Set(cardClicks)];
        for(let i = 0; i < uniqueCards.length; i++){
          let count = 0;
          let cardTitle = null;
          let cardCategoryName = null;
          let cardId = uniqueCards[i];
          let cardPrice = null;
          let cardCurrency = null;
          let cardUnitOfTime = null;
          let cardIsOnline = null;
          for(let click of res.data){
            if(click.card_id === cardId){
              count++;
              cardTitle = click.title;
              cardCategoryName = click.name;
              cardPrice = click.price;
              cardCurrency = click.currency;
              cardUnitOfTime = click.unit_of_time;
              cardIsOnline = click.isonline;
            }
          }
          uniqueCards[i] = {
            id: cardId,
            title: cardTitle,
            categoryName: cardCategoryName,
            clicksCount: count,
            price: cardPrice,
            currency: cardCurrency,
            unitOfTime: cardUnitOfTime,
            isOnline: cardIsOnline
          }
        }
        uniqueCards = uniqueCards.sort((a, b) => {
          if(a.clicksCount > b.clicksCount){
            return -1;
          }else {
            return 1;
          }
        })
        setClickStatistics(uniqueCards);
      });
    } else{
      router.push('/login');
    }
  }

  useLayoutEffect(() =>{
    if(localStorage.getItem(globals.localStorageKeys.centerId) != null) {
      let roleId = +localStorage.getItem(globals.localStorageKeys.roleId);
      if(roleId === 6) {
      router.push('/cabinet/tutor')
      }
    }
  }, [])

  useEffect(async () => {
    await loadData();
  }, []);

  return (
    <div style={{backgroundColor: '#FAF8FF'}}>
      <Head>
        <title>Oilan - Кабинет</title>
        <link rel="icon" href="/atom-icon.png" />
      </Head>
      {courseInfo && (<CabinetHeader isTutors={isTutors} courseInfo={courseInfo}/>)}
      <div className={styles.container}>
        <div className={styles.menu}>
          <CabinetMenu 
            items={menuItems} 
            activeItemIndex={activeMenuIndex} 
            setActiveItemCallback={setActiveMenuIndex}
          />
        </div>
        <div className={styles.content}>
          {getActivePage()}
        </div>
      </div>
    </div>
  )
}

export default Cabinet;