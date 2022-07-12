import Head from "next/head";
import styles from "../style.module.css";
import React, {useState, useEffect, useLayoutEffect} from "react";
import 'react-animated-slider/build/horizontal.css'
import CabinetMenu from "../../../src/components/Menu";
import CabinetHeader from "../../../src/components/CabinetHeader";
import ApplicationsBlock from "../../../src/components/ApplicationsBlock";
import StatisticsBlock from "../../../src/components/StatisticsBlock";
import TutorInfoBlock from "../../../src/components/TutorInfoBlock";
import SubscriptionBlockTutor from "../../../src/components/SubscriptionBlockTutor";
import 'react-animated-slider/build/horizontal.css'
import globals from "../../../src/globals";
import {useRouter} from "next/router";
import Application from "../../../src/components/Application";

const axios = require('axios').default

function Cabinet(){
  let router = useRouter();
  const [editMode, setEditMode] = useState(false);

  const [tutor, setTutor] = useState({
    id: 0,
    fullname: 'Алиби Дуйсеналиев',
    img_src: 'https://image.freepik.com/free-photo/portrait-of-white-man-isolated_53876-40306.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    can_work_online: true,
    can_work_offline: true,
    phone_number: '87082744862',
    can_work_on_departure: false,
    address: 'Сейфуллина 38',
    city_id: 1,
    teaching_language: 'Русский'
  });

  const menuItems = [
    {title: 'Статистика', index: 0},
    {title: 'Заявки', index: 1},
    {title: 'Подписка', index: 2},
    {title: 'Моя информация', index: 3}
  ];

  const [fullname, setFullname] = useState(tutor.fullname);
  const [imgSrc, setImgSrc] = useState(tutor.img_src);
  const [description, setDescription] = useState(tutor.description);
  const [canWorkOnline, setCanWorkOnline] = useState(tutor.can_work_online);
  const [canWorkOffline, setCanWorkOffline] = useState(tutor.can_work_offline);
  const [phoneNumber, setPhoneNumber] = useState(tutor.phone_number);
  const [canWorkOnDeparture, setCanWorkOnDeparture] = useState(tutor.can_work_on_departure);
  const [address, setAddress] = useState(tutor.address);
  const [cityId, setCityId] = useState(tutor.city_id);
  const [teachingLanguage, setTeachingLanguage] = useState(tutor.teaching_language);
  const [filters, setFilters] = useState([[], [], []]);
  const [courseCards, setCourseCards] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [courseCategories, setCourseCategories] = useState([]);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [directionsArray, setDirectionsArray] = useState([]);
  const [courseInfo, setCourseInfo] = useState(null);
  const [clickStatistics, setClickStatistics] = useState([]);
  const [newApplicationsCount, setNewApplicationsCount] = useState(0);
  const [isTutors, setIsTutors] = useState(true);

  const editProfileData = () => {
    let data = {
      id: Number(localStorage.getItem('center id')),
      fullname,
      imgSrc,
      description,
      canWorkOffline,
      canWorkOnline,
      canWorkOnDeparture,
      phoneNumber,
      address,
      cityId,
      teachingLanguage
    };

    axios({
      method: 'post',
      url: `${globals.productionServerDomain}/updateTutorInfo`,
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

  const loadFilters = async () => {
    axios({
      method: 'get',
      url: `${globals.productionServerDomain}/filters`,
    }).then(function(res){
      setFilters(res.data);
    }).catch(() => {
      alert('Ошибка при загрузке фильтров!');
    });
  }

  const setProfileStates = (profileObject) => {
    setFullname(profileObject.fullname);
    setImgSrc(profileObject.img_src);
    setDescription(profileObject.description);
    setCanWorkOffline(profileObject.can_work_offline);
    setCanWorkOnline(profileObject.can_work_online);
    setCanWorkOnDeparture(profileObject.can_work_on_departure);
    setPhoneNumber(profileObject.phone_number);
    setAddress(profileObject.address);
    setCityId(profileObject.city_id);
    setTeachingLanguage(profileObject.teaching_language);
  }

  const setFullnameHandler = (e) => setFullname(e.target.value);

  const setPhoneNumberHandler = (e) => setPhoneNumber(e.target.value);

  const setCanWorkOfflineHandler = (e) => setCanWorkOffline(e.target.checked);

  const setCanWorkOnDepartureHandler = (e) => setCanWorkOnDeparture(e.target.value);

  const setCanWorkOnlineHandler = (e) => setCanWorkOnline(e.target.checked);

  const setAddressHandler = (e) => setAddress(e.target.value);

  const setTeachingLanguageHandler = (e) => setTeachingLanguage(e.target.value);

  const editProfileDataHandler = (e) => editProfileData(e.target.value);

  const setEditModeHandler = () => setEditMode(!editMode);

  const setDescriptionHandler = (e) => setDescription(e.target.value);

  const getActivePage = () => {
    switch(activeMenuIndex){
      case 0:
        return (<StatisticsBlock 
          applications={applications} 
          newApplicationsCount={newApplicationsCount} 
          clickStatistics={clickStatistics}
          courseCategories={courseCategories}
          isTutors={isTutors}
          courseInfo={courseInfo}
          courseCards={courseCards}
          subscriptionInfo={subscriptionInfo}
        />)
      case 1:
        return (<ApplicationsBlock 
          applications={applications} 
          courseInfo={courseInfo} 
          courseCards={courseCards} 
          directionsArray={directionsArray} 
          subscriptionInfo={subscriptionInfo} 
          categories={courseCategories}
          isTutors={isTutors}
        />);
      case 2:
        return (<SubscriptionBlockTutor 
          courseInfo={courseInfo}
        />)
      case 3:
        return (<TutorInfoBlock 
          courseCategories={courseCategories} 
          courseInfo={courseInfo} 
          courseCards={courseCards} 
          filters={filters}
          tutor={tutor}
          editMode={editMode}
          fullname={fullname}
          setFullnameHandler={setFullnameHandler}
          phoneNumber={phoneNumber}
          setPhoneNumberHandler={setPhoneNumberHandler}
          canWorkOnline={canWorkOnline}
          setCanWorkOnlineHandler={setCanWorkOnlineHandler}
          canWorkOffline={canWorkOffline}
          setCanWorkOfflineHandler={setCanWorkOfflineHandler}
          canWorkOnDeparture={canWorkOnDeparture}
          setCanWorkOnDepartureHandler={setCanWorkOnDepartureHandler}
          address={address}
          setAddressHandler={setAddressHandler}
          teachingLanguage={teachingLanguage}
          setTeachingLanguageHandler={setTeachingLanguageHandler}
          editProfileDataHandler={editProfileDataHandler}
          setEditModeHandler={setEditModeHandler}
          description={description}
          setDescriptionHandler={setDescriptionHandler}
        />);
      default:
        return(<></>);
    }
  };

  
  const loadData = async () => {
    let courseId = '';
    let token = '';

    if(localStorage.getItem(globals.localStorageKeys.centerId) !== null){
      courseId = +localStorage.getItem(globals.localStorageKeys.centerId);
      token = JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token;
      let applicationData = await axios.get(`${globals.productionServerDomain}/tutorApplications/${courseId}`);
      setApplications(applicationData.data);

      await axios({
        method: 'get',
        url: `${globals.productionServerDomain}/tutors/${+localStorage.getItem(globals.localStorageKeys.centerId)}`,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token}`
        }
      }).then(async function(res){
        await setCourseInfo(res.data);
      }).catch(() => {
        router.push('/login');
      });

      await axios({
        method: 'get',
        url: `${globals.productionServerDomain}/tutorsCourseCards/${courseId}`,
      }).then(async function(res){
        await setCourseCards(res.data);
      }).catch(() => {
        router.push('/login');
      });
          
      let directionsArrayTemp = [];
      
      await axios({
        method: 'get',
        url: `${globals.productionServerDomain}/tutorApplications/${courseId}`,
      }).then(async function(res){
        let applicationArray = [];
        let newApplicationsCount = 0;
        res.data.map(item => {
          if ((new Date(item.datetime).getTime() + 86400000) > (new Date().getTime())){
            newApplicationsCount++;
          }
          applicationArray.push(item);
        });
        setApplications(applicationArray);
        setNewApplicationsCount(newApplicationsCount);
      })

      await axios({
        method: 'post',
        url: `${globals.productionServerDomain}/courseCategories`,
      }).then(function(res){
        setCourseCategories(res.data)
      });

      await axios({
        method: 'get',
        url: `${globals.productionServerDomain}/filters`,
      }).then(function(res){
        setFilters(res.data);
      }).catch(() => {
        alert('Ошибка при загрузке фильтров!');
      });

      await axios({
        method: 'post',
        url: `${globals.productionServerDomain}/getClickStatistics`,
        data: {
          centerId: +localStorage.getItem(globals.localStorageKeys.centerId)
        }
      }).then(function(res) {
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
          if (a.clicksCount > b.clicksCount) {
            return -1;
          }else {
            return 1;
          }
        });
        setClickStatistics(uniqueCards);
      });

      let tutorId = Number(localStorage.getItem(globals.localStorageKeys.centerId));
      let tutorInfo = await axios.get(`${globals.productionServerDomain}/tutors/${tutorId}`);
      await setTutor(tutorInfo.data);
      setProfileStates(tutorInfo.data);
      let courseCardsData = await axios.get(`${globals.productionServerDomain}/tutorsCourseCards/${tutorId}`);
      setCourseCards(courseCardsData.data);
      let applicationData1 = await axios.get(`${globals.productionServerDomain}/tutorApplications/${tutorId}`);
      setApplications(applicationData1.data);
      await loadFilters();
    } else {
      router.push('/login');
    }
  }

  useLayoutEffect(() =>{
    if(localStorage.getItem(globals.localStorageKeys.centerId) != null) {
      let roleId = +localStorage.getItem(globals.localStorageKeys.roleId);
      if (roleId === 4) {
        router.push('/cabinet')
      }
    } 
  }, []);

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
        {
          getActivePage()
        }
      </div>
    </div>
  </div>
  )
};

export default Cabinet;
