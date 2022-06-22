import React, {useCallback, useEffect, useMemo, useState} from "react";
import styles from '../../../../styles/components/form.module.css'
const axios = require('axios').default;
import globals from "../../../globals";
import 'react-phone-number-input/style.css'
import ModalWindow from '../../Modal/ModalWindow'
import validator from 'validator'
import classnames from 'classnames'

export function CourseSearchForm(props) {
    const [directions, setDirections] = useState([]);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [cityId, setCityId] = useState(1);
    const [isOnline, setIsOnline] = useState(false);
    const [directionId, setDirectionId] = useState(directions.length !== 0 ? directions[0].id : 1);
    const [messageForUser, setMessageForUser] = useState(null);
    const [subMessageForUser, setSubMessageForUser] = useState(null);
    const [searchCenter, setSearchCenter] = useState(true);
    const [cityDistrict, setCityDistrict] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const sendApplication = (courseId, userInfo) => {

        let data = {
            city_id: cityId,
            direction_id: directionId,
            name: userInfo.fullName,
            phone: userInfo.phone,
            email: userInfo.email,
            isOnline: isOnline,
            course_id: courseId,
            role_id: searchCenter ? 4 : 6,
            message: comment
        };

        axios({
            method: 'post',
            url: `${globals.productionServerDomain}/createCourseSearchTicket`,
            data: data,
        }).then(function(res){

        }).catch(() => {
            alert('Что-то пошло нетак!');
        });
    }

    const loadCategories = (searchCenter) => {
        setDirections([{ name: 'Загружаем направления...', id: 0 }]);
        axios.post(`${globals.productionServerDomain}/getFilteredCategories`, {
            searchingCenter: searchCenter,
        }).then(res => {
            console.log("FILTERS", res.data);
            setDirections(res.data)
        })
    }

    function inputsValidation(){
        if(!isOnline){
            if(cityDistrict === '0' || cityDistrict === null){
                setMessageForUser("Заполните все поля!");
                setSubMessageForUser("Выберите район города!");
                ym('reachGoal','send_application_button_pressed_unsuccessfully')
                return false
            }
        }

        if(directionId === '0' || directionId === null){
            setMessageForUser("Заполните все поля!");
            setSubMessageForUser("Выберите направление!");
            ym('reachGoal','send_application_button_pressed_unsuccessfully')
            return false
        }else if(name.length < 3){
            setMessageForUser("Заполните все поля!");
            setSubMessageForUser("Заполните имя!");
            ym('reachGoal','send_application_button_pressed_unsuccessfully')
            return false
        }else if(phone.length < 16){
            setMessageForUser("Заполните все поля!");
            setSubMessageForUser("Заполните номер телефона!");
            ym('reachGoal','send_application_button_pressed_unsuccessfully')
            return false
        }else if(email.length < 1){
            setMessageForUser("Заполните все поля!");
            setSubMessageForUser("Заполните электронную почту!");
            ym('reachGoal','send_application_button_pressed_unsuccessfully')
            return false
        }else if(!validator.isEmail(email)){
            setMessageForUser("Заполните все поля!");
            setSubMessageForUser("Неверная электронная почта!");
            ym('reachGoal','send_application_button_pressed_unsuccessfully')
            return false
        }else if(comment.length < 3){
            setMessageForUser("Заполните все поля!");
            setSubMessageForUser("Заполните описание курса!");
            ym('reachGoal','send_application_button_pressed_unsuccessfully')
            return false
        }else{
            return true
        }
    }

    useEffect(() => {
        loadCategories(true);
    }, [])

    return (
        <div className={styles.contactFormBody}>
            <div className={styles.techSupportHeader}>
                <span className={styles.contactFormTitle}>Хотите быстро найти самый <br/> подходящий курс?</span>
                <span className={styles.contactFormDesc}>
                    Заполните информацию об обучении и <br/> ожидайте звонка от центра/репетитора!
                </span>
            </div>
            <div className={styles.techSupportInputsWrapper}>
                <ModalWindow show={show} handleClose={handleClose} heading={'Ваша заявка была отправлена'} body={(
                        <div style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
                            <p>Сообщение со входом в личный кабинет <br/> было отправлено на вашу почту. <br/>
                            В ближайшее время с вами свяжутся центры/репетиторы.</p>
                        </div>
                    )}/>

                <div className={styles.selectWrapper}>
                    <select className={classnames(styles.selectBlock, styles.select)} value={Number(searchCenter)} onChange={e => {
                        setSearchCenter(Boolean(+e.target.value));
                        loadCategories(Boolean(+e.target.value));
                    }}>
                        <option value={1}>Ищу центр</option>
                        <option value={0}>Ищу репетитора</option>
                    </select>
                </div>

                <div className={styles.selectWrapper}>
                    <select className={classnames(styles.selectBlock, styles.select)} value={directionId} onChange={e => setDirectionId(e.target.value)}>
                        {
                            directions !== undefined
                                ?
                                (directions.map(filterOption => (
                                    filterOption.name !== "test"
                                        ?
                                        (<option value={filterOption.id}>{filterOption.name}</option>)
                                        : null
                                )))
                                :
                                null
                        }
                    </select>
                </div>

                <div className={styles.selectWrapper}>
                    <select className={classnames(styles.selectBlock, styles.select)} onChange={e => {
                        if(Number(e.target.value)===0){
                            setIsOnline(false)
                        } else if(Number(e.target.value)===1){
                            setIsOnline(true)
                        }
                        console.log('isOnline: ', isOnline)
                    }}>
                        <option value="0">Офлайн</option>
                        <option value="1">Онлайн</option>
                    </select>
                </div>

                {isOnline===false ? (
                    <>
                        <div className={styles.selectWrapper}>
                            <select className={classnames(styles.selectBlock, styles.select)} value={cityId} onChange={e => {
                                setCityId(e.target.value);
                            }}>
                                {props.cities !== undefined ? props.cities.map(item => <option value={item.id}>{item.name}</option>): (<option value={null}>Загружаем города...</option>)}
                            </select>
                        </div>
                    </>
                ) : null}

                <input type="text" value={name} onChange={e => setName(e.target.value)} className={styles.selectBlock} placeholder={'Имя'}/>
                <input
                    type="text"
                    className={styles.selectBlock}
                    onKeyDown={e => {
                        if(e.keyCode === 8){
                            setPhone(phone.slice(0,-1));
                        }
                    }}
                    onChange={e => globals.checkPhoneMask(e.target.value, setPhone)}
                    placeholder='Номер телефона'
                    value={phone}
                />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={styles.selectBlock} placeholder={'Электронная почта'}/>

                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className={styles.selectBlock}
                    rows="3"
                    placeholder={'Например: Пишите на WhatsApp, не удобно говорить по телефону'}
                ></textarea>

                <button className={styles.selectBlock}
                        onClick={() => {
                            if(inputsValidation()){
                                sendApplication(0, {
                                    fullName: name,
                                    phone: phone,
                                    email: email
                                });
                                ym('reachGoal','go-to-second-step-while-searching-button-pressed');
                                setShow(true);
                            }
                        }}
                        style = {{
                            backgroundColor: '#5654bf',
                            color: '#fff'
                        }}
                >Отправить заявку</button>
            </div>
        </div>
    );
}
