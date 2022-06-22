import React, {useEffect, useState} from "react";
import 'react-animated-slider/build/horizontal.css'
import styles from './tutor.module.css'
import Header from "../../../src/components/Header/Header";
import classnames from 'classnames';
import TutorCourseCardEdit from "../../../src/components/TutorCourseCardEdit/TutorCourseCardEdit";
import Footer from "../../../src/components/Footer/Footer";
import TutorCreateCourseCard from "../../../src/components/TutorCreateCourseCard";
import globals from "../../../src/globals";
import {useRouter} from "next/router";
import ModalWindow from "../../../src/components/Modal/ModalWindow";
import SubscriptionPaymentForm from "../../../src/components/Forms/SubscriptionPaymentForm/SubscriptionPaymentForm";
import Head from "next/head";

const axios = require('axios').default

function Cabinet(){
    let router = useRouter();
    const [editMode, setEditMode] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

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
    const CountDown = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  
    const [over, setOver] = React.useState(false);
    const [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);

    const tick = () => {
        if (over) return;

        if (h === 0 && m === 0 && s === 0) {
            setOver(true);
        } else if (m === 0 && s === 0) {
            setTime([h - 1, 59, 59]);
        } else if (s == 0) {
            setTime([h, m - 1, 59]);
        } else {
            setTime([h, m, s - 1]);
        }
    };


    React.useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    });

    return (
        <span>
            {`${h.toString().padStart(2, '0')}:${m
                .toString()
                .padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
        </span>
        );
    };
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

    const loadData = async () => {
        if(localStorage.getItem(globals.localStorageKeys.centerId) != null){
            let directionsArray = [];
            let tutorId = Number(localStorage.getItem(globals.localStorageKeys.centerId));
            let tutorInfo = await axios.get(`${globals.productionServerDomain}/tutors/${tutorId}`);
            await setTutor(tutorInfo.data);
            setProfileStates(tutorInfo.data);

            let courseCardsData = await axios.get(`${globals.productionServerDomain}/tutorsCourseCards/${tutorId}`);
            setCourseCards(courseCardsData.data);

            let applicationData = await axios.get(`${globals.productionServerDomain}/tutorApplications/${tutorId}`);
            setApplications(applicationData.data);
            console.log(applicationData.data)
            await loadFilters()
        }else{
            router.push('/login');
        }
    }

    const logout = () => {
        localStorage.removeItem(globals.localStorageKeys.centerId);
        localStorage.removeItem(globals.localStorageKeys.authToken);
        localStorage.removeItem(globals.localStorageKeys.currentUserId);

        router.push(`${globals.productionSiteDomain}/login`);
    }

    useEffect(() => {
        loadData();
        applications.map(item => (console.log(item)))
    }, [])


    return (
        <div>
            <Header white/>
            <Head>
                <title>Oilan - Кабинет</title>
                <link rel="icon" href="/atom-icon.png" />
            </Head>
            <ModalWindow show={show} handleClose={handleClose} heading={`Подключить подписку`} body={<SubscriptionPaymentForm/>}/>
            <div className={styles.container}>
                <div className={styles.tutor_info_block}>
                    <div className={styles.tutor_image} style={{
                        backgroundImage: `url(${tutor.img_src})`,
                    }}>

                    </div>
                    <div className={styles.tutor_info}>
                        <div className={styles.tutor_info_row}>
                            <div 
                                className={styles.FIOdiv}
                                style={!editMode?{display: 'flex'}:{display: 'none'}}
                            >{fullname}</div>
                            <input
                                className={classnames(styles.tutor_info_input, styles.FIO)}
                                disabled={!editMode}
                                type="text"
                                style={editMode?{display: 'flex'}:{display: 'none'}}
                                value={fullname}
                                onChange={e => setFullname(e.target.value)}
                            />
                        </div>
                        <div className={styles.tutor_info_row}>
                            <p className={styles.info_title}>Номер телефона</p>
                            <input
                                className={styles.tutor_info_input}
                                disabled={!editMode}
                                type="text"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className={styles.tutor_info_row}>
                            <p className={styles.info_title}>Работает онлайн</p>
                            {!editMode ? (
                                <input
                                    className={styles.tutor_info_input}
                                    disabled={!editMode}
                                    type='text'
                                    value={canWorkOnline ? 'Да' : 'Нет'}
                                />
                            ) : (
                                <div className={styles.checkDiv}><input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    checked={canWorkOnline}
                                    onClick={e => setCanWorkOnline(e.target.checked)}
                                /></div>
                            )}
                        </div>
                        <div className={styles.tutor_info_row}>
                            <p className={styles.info_title}>Работает офлайн</p>
                            {!editMode ? (
                                <input
                                    className={styles.tutor_info_input}
                                    disabled={!editMode}
                                    type='text'
                                    value={canWorkOffline ? 'Да' : 'Нет'}
                                />
                            ) : (
                                <div className={styles.checkDiv}><input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    checked={canWorkOffline}
                                    onClick={e => setCanWorkOffline(e.target.checked)}
                                /></div>
                            )}
                        </div>
                        <div className={styles.tutor_info_row}>
                            <p className={styles.info_title}>Работает на выезд</p>
                            {!editMode ? (
                                <input
                                    className={styles.tutor_info_input}
                                    disabled={!editMode}
                                    type='text'
                                    value={canWorkOnDeparture ? 'Да' : 'Нет'}
                                />
                            ) : (
                                <div className={styles.checkDiv}><input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    checked={canWorkOnDeparture}
                                    onClick={e => setCanWorkOnDeparture(e.target.checked)}
                                /></div>
                            )}
                        </div>
                        <div className={styles.tutor_info_row}>
                            <p className={styles.info_title}>Город</p>
                            <select
                                value={cityId}
                                disabled={!editMode}
                                onChange={e => setCityId(e.target.value)}
                                className={styles.tutor_info_input}
                            >
                                {filters[0].map(item => <option value={item.id}>{item.name}</option>)}
                            </select>
                        </div>
                        <div className={styles.tutor_info_row}>
                            <p className={styles.info_title}>Адрес</p>
                            <input
                                className={styles.tutor_info_input}
                                disabled={!editMode}
                                type="text"
                                value={address}
                                onChange={e => setAddress(e.target.value)}/>
                        </div>
                        <div className={styles.tutor_info_row}>
                            <p className={styles.info_title}>Язык препод.</p>
                            <input
                                className={styles.tutor_info_input}
                                disabled={!editMode}
                                type="text"
                                value={teachingLanguage}
                                onChange={e => setTeachingLanguage(e.target.value)}/>
                        </div>
                        <br/>
                        <div className={styles.tutor_info_row}>
                            <button
                                className={styles.logout_button}
                                onClick={() => {
                                    let sure = confirm('Вы уверены что хотите выйти?');
                                    if(sure){
                                        logout();
                                    }
                                }}
                            >Выйти из аккаунта</button>
                        </div>
                        <div className={styles.tutor_info_row} style={{marginTop: 10}}>
                            {editMode ? (
                                <>
                                    <button
                                        className={styles.edit_profile_button}
                                        onClick={() => editProfileData()}
                                    >Сохранить</button>
                                    <button
                                        className={styles.edit_profile_button}
                                        onClick={() => setEditMode(false)}
                                    >Отменить</button>
                                </>
                                )
                                :
                                <button
                                    className={styles.edit_profile_button}
                                    onClick={() => setEditMode(true)}
                                >Редактировать данные</button>
                            }
                        </div>
                    </div>
                    <div className={styles.tutor_description}>
                        <button className={styles.payment_button}
                            onClick={()=>setShow(!show)}
                        >Купить подписку</button>
                        <textarea
                            disabled={!editMode}
                            className={styles.tutor_description_textarea}
                            value={description === null ? '' : description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder={description === null ? 'Напишите информацию о своем опыте, стаже работы, образовании и достижениях' : null}
                        >

                        </textarea>
                    </div>
                </div>

                <br/>

                <div className={styles.block_title}>
                    Ваши заявки:
                </div>

                <div className={styles.applications}>
                    {applications.map(item => (new Date(item.datetime).getTime() + 86400000) > (new Date().getTime())?( 
                        <div className={styles.application_item}>
                            <div
                                className={styles.application_item_status_block}
                                style={{
                                    backgroundColor: item.deactivated_date === null ? '#008000FF' : '#a22e2e',
                                    color: '#fff'
                                }}
                            >
                                <p style={{margin: 0, width: '100%', textAlign: 'center'}}>{item.deactivated_date === null ? 'Заявка еще активна!' : 'Заявка не активна!'}</p>
                            </div>

                            <br/>
                            <p className={styles.application_item_text}>
                                <b>Активна с: </b>{item.datetime.toLocaleString().replace(/^([^T]+)T(.+)$/,'$1').replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1')}
                            </p>
                            <p className={styles.application_item_text}>
                                <b>Осталось: </b><CountDown 
                                hours={Math.floor((((new Date(item.datetime).getTime()) + 86400000)-(new Date().getTime()))/1000/60/60)} 
                                minutes={Math.floor((((new Date(item.datetime).getTime()) + 86400000)-(new Date().getTime()))/1000/60)%60}
                                seconds={Math.floor((((new Date(item.datetime).getTime()) + 86400000)-(new Date().getTime()))/1000)%60} />
                                
                            </p>
                            <p className={styles.application_item_name}>
                                {item.name}
                            </p>
                            <p className={styles.application_item_name}>
                                {item.direction_name} ({item.is_online ? 'Онлайн' : 'Офлайн'})
                            </p>
                            <p className={styles.application_item_text}>
                                {item.deactivated_date === null ? item.phone : 'Номер уже скрыт!'}
                            </p>
                            <p className={styles.application_item_text}>
                                {item.message}
                            </p>
                        </div>
                    ):(<></>))}
                </div>

                <div className={styles.block_title}>
                    Ваши курсы:
                </div>

                <div className={styles.coursecards_block}>
                    <div>
                        <TutorCreateCourseCard directions={filters[1]}/>
                    </div>
                    {courseCards.map(item => (
                        <div>
                            <TutorCourseCardEdit course={item} directions={filters[1]}/>
                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Cabinet;
