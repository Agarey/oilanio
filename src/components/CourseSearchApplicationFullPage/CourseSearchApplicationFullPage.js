import styles from './CourseSearchApplicationFullPage.module.css'
import classnames from 'classnames'
import PhoneInput from "react-phone-number-input/input";
import React, {useEffect, useState} from "react";
import 'react-phone-number-input/style.css'
import kz from 'react-phone-number-input/locale/ru.json'
import {Image} from "react-bootstrap";
import globals from "../../globals";
import ym from 'react-yandex-metrika';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import style from "../../../pages/direction/direction.module.css";
import CourseCard from "../CourseCard/CourseCard";
import TutorCourseCard from "../TutorCourseCard";
import ModalWindow from "../Modal/ModalWindow";
import {BecomeAPartner} from "../Forms/BecomeAPartnerForm/BecomeAPartner";
import CourseSearchResultIsNotDefind from "../CourseSearchResultIsNotDefind";
import {useRouter} from "next/router";

const axios = require('axios').default;

export default function CourseSearchApplicationFullPage(props){
    const [step, setStep] = useState(1)
    const [firstStepValidationState, setFirstStepValidationState] = useState(false)

    const [directions, setDirections] = useState(props.directions);

    const [directionId, setDirectionId] = useState(1);
    const [cityDistrict, setCityDistrict] = useState(0);
    const [price, setPrice] = useState('0');

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [cityId, setCityId] = useState('1');
    const [isOnline, setIsOnline] = useState(false);
    const [age, setAge] = useState(null);
    const [applicationMessage, setApplicationMessage] = useState('');

    const [messageForUser, setMessageForUser] = useState(null);
    const [subMessageForUser, setSubMessageForUser] = useState(null);
    const [submitButtonPressed, setSubmitButtonPressed] = useState(false);
    const [successfulApplication, setSuccessfulApplication] = useState(false);

    const [ofertaCheck, setOfertaCheck] = useState(false);

    const [data,setData]= useState({})
    const [courseCards, setCourseCards] = useState([])

    const [loading, setLoading] = useState(false)
    const [length, setLength] = useState(8)

    const [loadingModal, setLoadingModal] = useState(false);

    const [regions, setRegions] = useState([]);

    const [imagesBase, setImagesBase] = useState([]);

    const loadData = async () => {
        let regionsResponse = await axios.get(`${globals.productionServerDomain}/getRegions`);
        setRegions(regionsResponse.data);

        let imagesBaseLocalStorage = JSON.parse(localStorage.getItem(globals.localStorageKeys.imagesBase));
        if(imagesBaseLocalStorage == null){
            let imagesBaseResponse = await axios.get(`${globals.productionServerDomain}/imagesBase`);
            setImagesBase(imagesBaseResponse.data);
        }else{
            setImagesBase(imagesBaseLocalStorage);
        }
    }

    useEffect(() => {
        setLoading(true)
        loadData();

    }, [])

    function firstStepValidation(){
        if(!isOnline){
            if(cityDistrict === '0' || cityDistrict === null){
                setMessageForUser("?????????????????? ?????? ????????!");
                setSubMessageForUser("???????????????? ?????????? ????????????!");
                ym('reachGoal','send_application_button_pressed_unsuccessfully')
                return false
            }
        }

        if(directionId === '0' || directionId === null){
            setMessageForUser("?????????????????? ?????? ????????!");
            setSubMessageForUser("???????????????? ??????????????????????!");
            ym('reachGoal','send_application_button_pressed_unsuccessfully')
            return false
        }else if(price === null){
            setMessageForUser("?????????????????? ?????? ????????!");
            setSubMessageForUser("???????????????? ????????!");
            ym('reachGoal','send_application_button_pressed_unsuccessfully')
            return false
        }else{
            setFirstStepValidationState(true)
            return true
        }
    }
    const getCards = async () => {
        const data = {
            centerName: '',
            city: isOnline ? '0' : cityId,
            direction: directionId.toString(),
            price: price,
            center: '0',
            isOnline: isOnline ? 1 : 0,
            //individualLesson: individualLesson,
            sortType: '0'
        }

        console.log('data to request', data)

        router.push(`/third?city=${isOnline ? 0 : cityId}&direction=${directionId.toString()}&price=${price}&isOnline=${isOnline?1:0}&searchCenter=${props.searchCenter ? 1 : 0}`)

        // let postResult = await axios.post(`${globals.productionServerDomain}/${props.searchCenter ? 'courseCardsFilter' : 'tutorCourseCardsFilter'}/`, data);
        // console.log("RESULT CARDS", postResult.data);
        // setCourseCards(postResult.data);
        //
        // setLoading(false)
    }

    const router = useRouter();

    function Main(){
        return(
            <div className={styles.body}>
                <div className={styles.displayNoneOnMobile}>
                    <Image src={'Other05.png'} style={{left: 0, bottom: 0, position: 'absolute', height: 256}}/>
                </div>

                <div className={styles.header}>
                    <div className={styles.goBack} onClick={()=>{
                        router.back()
                    }}>
                        <Image src={'/left-arrow.png'} className={styles.goBackImg}/>
                    </div>
                    <h1 className={styles.main_title}>
                        {
                            step === 1 ? (
                                <>
                                    ?????????????? ???????????? ?? <span className={ styles.orange}>{props.searchCenter ? '??????????' : '????????????????????'}</span>
                                </>
                            ) : (
                                <>
                                    <span className={ styles.orange}>?????? 2 ???</span> ?????????????? ???????? ???????????????????????? ????????????
                                </>
                            )
                        }
                    </h1>
                </div>

                <div className={styles.wrapper}>
                    <div className={styles.techSupportInputsWrapper}>
                        {/*<select className={styles.selectBlock} onChange={e => setDirectionId(e.target.value)}>*/}
                        {/*    <option value="0">??????????</option>*/}
                        {/*        props.cities !== undefined*/}
                        {/*            ?*/}
                        {/*            (props.cities.map(filterOption => (*/}
                        {/*                filterOption.name !== "test"*/}
                        {/*                    ?*/}
                        {/*                    (<option value={filterOption.id}>{filterOption.name}</option>)*/}
                        {/*                    : null*/}
                        {/*            )))*/}
                        {/*            :*/}
                        {/*            null*/}
                        {/*    }*/}
                        {/*</select>*/}

                        {
                            step === 1 ? firstStep() : secondStep()
                        }

                    </div>
                    <div className={styles.imageBlock} >
                        {
                            step === 2 && <span className={styles.imageTitle}>
                                ?????????????????? - <span className={styles.orange}>????</span> <br/>
                                ?????????????????? - <span className={styles.orange}>????</span> <br/>
                            </span>
                        }

                        <Image className={styles.image} src={step === 1 ? '/Other11.png' : '/Other04.png'}/>
                    </div>
                </div>

            </div>
        )
    }
    function firstStep(){
        return(
            <>
                
                <select className={styles.selectBlock} onChange={e => {
                    if(Number(e.target.value)===0){
                        setIsOnline(false)
                    } else if(Number(e.target.value)===1){
                        setIsOnline(true)
                    }
                    console.log('isOnline: ', isOnline)
                }}>
                    <option value="0">????????????</option>
                    <option value="1">????????????</option>
                </select>

                {isOnline===false ? (
                    <>

                        <select className={styles.selectBlock} value={cityId} onChange={e => {
                            setCityId(e.target.value);
                        }}>
                            {props.cities.map(item => <option value={item.id}>{item.name}</option>)}
                        </select>
                        <select className={styles.selectBlock} value={cityDistrict} onChange={e => setCityDistrict(e.target.value)}>
                            <option value={0}>?????? ????????????</option>
                            {
                                regions.map(item => {
                                    if(item.city_id === +cityId){
                                        return (<option value={item.id}>{item.name} ??????????</option>);
                                    }
                                })
                            }
                        </select>
                    </>
                ) : null}
                <select className={styles.selectBlock} value={directionId} onChange={e => setDirectionId(e.target.value)}>
                    {
                        props.directions !== undefined
                            ?
                            (props.directions.map(filterOption => (
                                filterOption.name !== "test"
                                    ?
                                    (<option value={filterOption.id}>{filterOption.name}</option>)
                                    : null
                            )))
                            :
                            null
                    }
                    {/*<option value={1}>???????????????????? ????????</option>*/}
                    {/*<option value={2}>?????????????? ????????</option>*/}
                    {/*<option value={3}>???????????????? ????????</option>*/}
                    {/*<option value={7}>?????????????????? ????????</option>*/}
                    {/*<option value={8}>IELTS, TOEFL, SAT, NUFYPET</option>*/}
                    {/*<option value={13}>???????????????? ????????</option>*/}
                    {/*<option value={14}>???????????????????? ???????? ?????? ??????????</option>*/}
                </select>

                {/*<label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>*/}
                {/*    <input*/}
                {/*        type="radio"*/}
                {/*        name={'isOnline'}*/}
                {/*        value={'????????????'}*/}
                {/*        checked={!isOnline}*/}
                {/*        onClick={() => setIsOnline(!isOnline)}*/}
                {/*    />*/}
                {/*    <p*/}
                {/*        style={{margin: '0 0 0 10px'}}*/}
                {/*        className={styles.simple_text}*/}
                {/*    >*/}
                {/*        ????????????*/}
                {/*    </p>*/}
                {/*</label>*/}

                {/*<label style={{display: 'flex', alignItems: 'center', marginBottom: 10, cursor: 'pointer'}}>*/}
                {/*    <input*/}
                {/*        type="radio"*/}
                {/*        name={'isOnline'}*/}
                {/*        value={'????????????'}*/}
                {/*        checked={isOnline}*/}
                {/*        onClick={() => setIsOnline(!isOnline)}*/}
                {/*    />*/}
                {/*    <p*/}
                {/*        style={{margin: '0 0 0 10px'}}*/}
                {/*        className={styles.simple_text}*/}
                {/*    >*/}
                {/*        ????????????*/}
                {/*    </p>*/}
                {/*</label>*/}

                <select className={styles.selectBlock} value={price} onChange={e => setPrice(e.target.value)}>
                    <option value="0">????????</option>
                    <option value={'0-20000'}>0 - 20 000KZT</option>
                    <option value={'20000-40000'}>20 000 - 40 000KZT</option>
                    <option value={'40000-60000'}>40 000 - 60 000KZT</option>
                    <option value={'60000-80000'}>60 000 - 80 000KZT</option>
                    <option value={'80000-100000'}>80 000 - 100 000KZT</option>
                    <option value={'100000'}>100 000KZT +</option>
                </select>

                <button className={styles.button}
                        onClick={() => {
                            if(firstStepValidation()){
                                setMessageForUser("");
                                setSubMessageForUser("");
                                // setStep(3);
                                setLoading(true);
                                getCards();
                                ym('reachGoal','go-to-second-while-searching-button-pressed')
                            }
                        }}
                >?????????????????? {props.searchCenter ? '??????????' : '????????????????????'}</button>

                <span className={styles.message}>
                    {messageForUser}
                    <br/>
                    {subMessageForUser}
                </span>
            </>
        )
    }
    function secondStep(){
        return(
            <>
                <input type="text" placeholder={'??????'} value={name} onChange={(e)=>{
                    setName(e.target.value)
                }} className={styles.techSupportInput}/>
                <input
                    type="text"
                    className={styles.techSupportInput}
                    onKeyDown={e => {
                        if(e.keyCode === 8){
                            setPhone(phone.slice(0,-1));
                        }
                    }}
                    onChange={e => globals.checkPhoneMask(e.target.value, setPhone)}
                    placeholder='?????????? ????????????????'
                    value={phone}
                />
                <input type="email" value={email} placeholder={'?????????????????????? ??????????'} onChange={(e)=>{
                    setEmail(e.target.value)
                }} className={styles.techSupportInput}/>
                {/*<textarea*/}
                {/*    placeholder={`???????????????? ?????????? - ?????????????? ??????????????????, ???????????????? ?????????? ?? ?????? ??????????. ?????? ?????????????????? ????????????????, ?????? ?????????? ?????????? ??????????.`}*/}
                {/*    rows={4}*/}
                {/*    onChange={(e)=>{*/}
                {/*        setComment(e.target.value)*/}
                {/*    }}*/}
                {/*    className={styles.techSupportInput}*/}
                {/*    style={{resize:"none"}}*/}
                {/*>*/}
                {/*</textarea>*/}
                <label style={{fontFamily: 'Rubik Medium', color: 'white', marginTop: '5px', cursor: 'pointer'}}>
                    <input
                        type="checkbox"
                        onClick={() => {
                            setOfertaCheck(!ofertaCheck)
                        }}
                        checked={ofertaCheck ? true : false}
                    /> ?? ???????????????? ?????????????? <a href="/offer/student" style={{color: 'white', textDecoration: 'underline'}}>?????????????????? ????????????.</a>
                </label>
                <button className={styles.button}
                        onClick={() => {
                            if(name === ''){
                                setMessageForUser("?????????????????? ?????? ????????!");
                                setSubMessageForUser("?????????????? ??????!");
                                ym('reachGoal','send_application_button_pressed_unsuccessfully')
                            }
                            else if(phone === ''){
                                setMessageForUser("?????????????????? ?????? ????????!");
                                setSubMessageForUser("?????????????? ??????????????!");
                                ym('reachGoal','send_application_button_pressed_unsuccessfully')
                            }
                            else if(email === ''){
                                setMessageForUser("?????????????????? ?????? ????????!");
                                setSubMessageForUser("?????????????? ??????????!");
                                ym('reachGoal','send_application_button_pressed_unsuccessfully')
                            }
                            else if(ofertaCheck === false){
                                setMessageForUser("???????????? ???? ???????? ????????????????????!");
                                setSubMessageForUser("???????????????? ?????????????????? ???????????? ?? ?????????? ???????? ????????????????!");
                                ym('reachGoal','send_application_button_pressed_unsuccessfully')
                            }
                            else {
                                setData({
                                    city_id: cityId,
                                    direction_id: directionId,
                                    name: name,
                                    phone: phone,
                                    email: email,
                                    age: age,
                                    isOnline: isOnline,
                                    course_id: 0,
                                    role_id: props.searchCenter ? 4 : 6
                                })
                                setSuccessfulApplication(true);
                                setSubmitButtonPressed(true);
                                setStep(3)
                                setLoading(true)
                                ym('reachGoal','pick-course-or-tutor-button-pressed')
                                getCards()
                            }

                        }}
                >{submitButtonPressed ? ('?????????????????? ??????????!') : ('?????????????????? ??????????')}</button>
                <span className={styles.message}>
                    {messageForUser}
                    <br/>
                    {subMessageForUser}
                </span>
            </>
        )
    }

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
            role_id: props.searchCenter ? 4 : 6
        };

        axios({
            method: 'post',
            url: `${globals.productionServerDomain}/createCourseSearchTicket`,
            data: data,
            headers: {
                'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
            }
        }).then(function(res){

        }).catch(() => {
            alert('??????-???? ?????????? ??????????!');
        });
    }

    function lastStep(){
        return(
            <div className={styles.whiteBody}>
                <Header white={true} setStep={setStep} reload={true} close={props.close}/>

                <div className={styles.header}>
                    <div className={styles.goBack} onClick={()=>{
                        if(step === 1){
                            props.close(false)
                        }
                        if(step === 2){
                            setStep(1)
                        }
                        if(step === 3){
                            setStep(1)
                        }
                    }}>
                        <Image src={'/left-arrow-black.png'} className={styles.goBackImg}/>
                    </div>
                    <h1 className={styles.main_title} style={{color: 'black', marginLeft: 30}}>???? ?????????????????? ?????? {props.searchCenter ? '?????????????????? ??????????' : '?????????????????? ??????????????????????'}!</h1>
                </div>
                {
                    loading ? null : (
                        courseCards.length===0 && <CourseSearchResultIsNotDefind setStep={setStep}/>
                    )
                }
                <div className={styles.cards_block}>
                    {
                        loading ? (
                            <div className={styles.loading}>
                                <span>?????????? ????????????...</span>
                            </div>
                        ) : (
                            courseCards.length !== 0 ? (
                                courseCards.splice(0, courseCards.length).map(item => {
                                    if(props.searchCenter){
                                        if(item.title!='test'){
                                            return(
                                                <CourseCard coverImage={imagesBase[Math.floor(Math.random() * imagesBase.length)].src} showApplicationModal={true} sendApplicationCallback={sendApplication} setLoadingModal={setLoadingModal} direction={true} course={item}/>
                                            )
                                        }
                                    }else{
                                        return(
                                            <TutorCourseCard coverImage={imagesBase[Math.floor(Math.random() * imagesBase.length)].src} showApplicationModal={true} sendApplicationCallback={sendApplication} setLoadingModal={setLoadingModal} direction={true} course={item}/>
                                        )
                                    }
                                })
                            ) : null
                        )
                    }
                </div>
                {
                    length<courseCards.length && (
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '30px'}}>
                            <span className={styles.seeMore} onClick={()=>{
                                setLength(length+4)
                            }}>???????????????? ??????</span>
                        </div>
                    )
                }
            </div>
        )
    }

    return(
        step === 1 || step === 2 ? Main() : lastStep()
    )
}
