import React, { useEffect, useState } from "react";
import styles from '../../../styles/components/TopTutorsSlider.module.css'
import Slider from "react-slick";
import axios from "axios";
import globals from "../../globals";
import ModalWindow from "../Modal/ModalWindow";
import { SignupToCourseForm } from "../Forms/SignupToCourseForm/SignupToCourseForm";

const TopTutorsSlider2 = (props) => {

    // const [filters, setFilters] = useState([]);
    // const [directionsList, setDirectionsList] = useState([])

    // useEffect( async ()=>{
    //     await axios.get(`${globals.productionServerDomain}/filters`).then(res => {
    //         setFilters(res.data);
    //         console.log(res);
    //         setDirectionsList(filters[0]);
    //     })
    //     console.log("FILTEEEEEEEERS", filters)
    // }, []);

    // let cityId = props.course.city_id

    // const [cityName, setCityName] = useState([])

    // useEffect( async () => {
    //     let city = await filters[0]?.find(el => el.id == cityId)
    //     console.log("CITY>>>", city)
    //     setCityName(city?.name)
    // }, [citiesList])


    
  const [categories, setCategories] = useState(props.categories)
  

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2,
            infinite: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        }
      ]
  };

  console.log(categories);

  const sendApplication = (courseId, userInfo) => {

    let data = {
        city_id: cityId,
        direction_id: directionId,
        name: userInfo.fullName,
        phone: userInfo.phone,
        email: userInfo.email,
        age: age,
        isOnline: isOnline,
        course_id: courseId,
        role_id: Boolean(searchCenter) ? 4 : 6,
        message: comment,
    };
    console.log(props.searchCenter)
    axios({
        method: 'post',
        url: `${globals.productionServerDomain}/createCourseSearchTicket`,
        data: data,
        headers: {
            'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
        }
    }).then(function(res){

    }).catch(() => {
        alert('Что-то пошло нетак!');
    });
}

useEffect(async () => {
  await getCards();
}, []);

const [courseCards, setCourseCards] = useState([])
const searchCenter = 0

const getCards = async () => {
  const data = {
      centerName: '',
      city: "0",
      direction: "0",
      price: "0",
      center: '0',
      isOnline: "1",
      //individualLesson: individualLesson,
      sortType: '0'
  }

  let postResult = await axios.post(`${globals.productionServerDomain}/${searchCenter ? 'courseCardsFilter' : 'tutorCourseCardsFilter'}/`, data);
  console.log("RESULT CARDS", postResult);
  setCourseCards(postResult.data);

  console.log("courseCards", courseCards)
 
  // setLoading(false)
}
  

  return(
    <div className={styles.container}>
      <Slider {...settings}
        style={{width: "100%"}}
      >
        {
          categories.map((category, idx)=>{

            
            const [findedTutor, setFindedTutor] = useState([])
            
            useEffect( () => {
              const findTutorId  = courseCards.find(el => el.tutor_id === category.id)  
              setFindedTutor(findTutorId)
            }, [courseCards])



            console.log("findTutorId", findedTutor)

            const [show, setShow] = useState(false)
            const handleClose = () => setShow(false);
            return (
              category.img_src !== "https://realibi.kz/file/338803.png" 
                ? (
                  <a onClick={async () => {{setShow(!show)} 
                  console.log("findTutorId", findedTutor)}} key={idx} className={styles.category}>
                    <ModalWindow show={show} handleClose={handleClose} heading={'Оставить заявку репетитору'} body={<SignupToCourseForm sendApplicationCallback={sendApplication} course={findedTutor} tutor={findedTutor} handleClose={handleClose}/>}/>
                    <div className={styles.img}
                      style={{backgroundImage: `url("${category.img_src}")`, marginBottom: 10}}
                    >
                    </div>
                    <p
                      className={styles.fullname}
                    >
                      {category.fullname} 
                    </p>
                    <label style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                      <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.35 29.75H3.85C2.82827 29.75 2 28.9218 2 27.9V3.85C2 2.82827 2.82827 2 3.85 2H37.15C38.1718 2 39 2.82827 39 3.85V27.9C39 28.9218 38.1718 29.75 37.15 29.75H29.75" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M9.39917 9.40039H31.5992" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M9.39917 15.875H14.9492" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M9.39917 22.3496H13.0992" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M26.05 26.975C29.1152 26.975 31.6 24.4902 31.6 21.425C31.6 18.3598 29.1152 15.875 26.05 15.875C22.9848 15.875 20.5 18.3598 20.5 21.425C20.5 24.4902 22.9848 26.975 26.05 26.975Z" fill="#412FAE" stroke="black" stroke-width="3"/>
                      <path d="M26.0508 33.4497L29.7508 35.2997V25.5615C29.7508 25.5615 28.6958 26.9747 26.0508 26.9747C23.4059 26.9747 22.3508 25.5872 22.3508 25.5872V35.2997L26.0508 33.4497Z" fill="#412FAE" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <p style={{marginLeft: "3px"}}>
                      {findedTutor?.category_name}
                      </p>
                    </label>
                    <label style={{display: "flex", flexDirection: "row", justifyContent: "center"}} > <svg width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8844 13.9687C15.0656 15.6281 13.9563 17.2812 12.8219 18.7656C11.7458 20.165 10.5952 21.5055 9.375 22.7812C8.15482 21.5055 7.00419 20.165 5.92813 18.7656C4.79375 17.2812 3.68438 15.6281 2.86563 13.9687C2.0375 12.2922 1.5625 10.7219 1.5625 9.375C1.5625 7.303 2.3856 5.31586 3.85073 3.85073C5.31586 2.3856 7.303 1.5625 9.375 1.5625C11.447 1.5625 13.4341 2.3856 14.8993 3.85073C16.3644 5.31586 17.1875 7.303 17.1875 9.375C17.1875 10.7219 16.7109 12.2922 15.8844 13.9687ZM9.375 25C9.375 25 18.75 16.1156 18.75 9.375C18.75 6.8886 17.7623 4.50403 16.0041 2.74587C14.246 0.98772 11.8614 0 9.375 0C6.8886 0 4.50403 0.98772 2.74587 2.74587C0.98772 4.50403 3.70503e-08 6.8886 0 9.375C0 16.1156 9.375 25 9.375 25Z" fill="#6D5DD0"/>
                            <path d="M9.375 12.5C8.5462 12.5 7.75134 12.1708 7.16529 11.5847C6.57924 10.9987 6.25 10.2038 6.25 9.375C6.25 8.5462 6.57924 7.75134 7.16529 7.16529C7.75134 6.57924 8.5462 6.25 9.375 6.25C10.2038 6.25 10.9987 6.57924 11.5847 7.16529C12.1708 7.75134 12.5 8.5462 12.5 9.375C12.5 10.2038 12.1708 10.9987 11.5847 11.5847C10.9987 12.1708 10.2038 12.5 9.375 12.5ZM9.375 14.0625C10.6182 14.0625 11.8105 13.5686 12.6896 12.6896C13.5686 11.8105 14.0625 10.6182 14.0625 9.375C14.0625 8.1318 13.5686 6.93951 12.6896 6.06044C11.8105 5.18136 10.6182 4.6875 9.375 4.6875C8.1318 4.6875 6.93951 5.18136 6.06044 6.06044C5.18136 6.93951 4.6875 8.1318 4.6875 9.375C4.6875 10.6182 5.18136 11.8105 6.06044 12.6896C6.93951 13.5686 8.1318 14.0625 9.375 14.0625Z" fill="#6D5DD0"/>
                            </svg>
                        <p style={{marginLeft: "3px"}}
                        className={styles.city}
                        >
                      {category.city_name}
                    </p>
                    </label>
                  </a>
                )
                : null
            )
          })
        }
      </Slider>
    </div>
  )
};

export default TopTutorsSlider2;
