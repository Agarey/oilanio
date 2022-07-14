import styles from '../../../styles/components/EditCourseCard.module.css'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SignupToCourseForm } from "../Forms/SignupToCourseForm/SignupToCourseForm";
import ModalWindow from "../Modal/ModalWindow";
import classnames from 'classnames';
import globals from "../../globals";
import {CardCreationPermissionForm} from "../Forms/CardCreationLimitForm/CardCreationPermissionForm";

const axios = require('axios').default;

export default function EditCourseCard(props) {
    const [edit, setEdit] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showContacts, setShowContacts] = useState(false);

    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    const coursePrice = prettify(props.course.price)
    const [showControlPanel, setShowControlPanel] = useState(false)

    const [editCourseTitle, setEditCourseTitle] = useState(props.course.title);
    const [categoryId, setCategoryId] = useState(props.course.card_category_id);
    const [description, setDescription] = useState(props.course.description);
    const [expectedResult, setExpectedResult] = useState(props.course.expected_result);
    const [startRequirements, setStartRequirements] = useState(props.course.start_requirements);
    const [schedule, setSchedule] = useState(props.course.schedule);
    const [duration, setDuration] = useState(props.course.duration);
    const [durationNumber, setDurationNumber] = useState(props.course.duration !== null ? props.course.duration.slice(' ')[0] : ' ');
    const [durationWord, setDurationWord] = useState(props.course.duration !== null ? props.course.duration.slice(' ')[1] : ' ');
    const [agesMin, setAgesMin] = useState('1');
    const [agesMax, setAgesMax] = useState('60');
    const [format, setFormat] = useState(props.course.format);
    const [price, setPrice] = useState(props.course.price);
    const [type, setType] = useState(props.course.type);
    const [currency, setCurrency] = useState(props.course.currency)
    const [unitOfTime, setUnitOfTime] = useState(props.course.unit_of_time)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let [permittedCardsCount, setPermittedCardsCount] = useState(0);

    async function getCreationPermission(centerId) {
        let creationPermissionResponse = await axios.get(`${globals.productionServerDomain}/cardCreationPermission/${centerId}`);
        setPermittedCardsCount(creationPermissionResponse.data.permittedCardsCount)
        return creationPermissionResponse.data.permitted;
    }

    console.log("Edit card category", props.course.category_id);

    return (
        <div className={classnames(styles.container, props.course.approved ? null : styles.moderate, props.course.is_archived === true ? styles.moderate : null)}>
            <ModalWindow show={show} handleClose={handleClose} heading={'Лимит на создания карточек'} body={<CardCreationPermissionForm permittedCardsCount={permittedCardsCount} handleClose={handleClose}/>}/>
            <div className={styles.titleImage__Body}>
                <div className={styles.titleImageWrapper}>
                    <div className={styles.titleImageBody}
                        style={{
                            backgroundImage: `url(https://realibi.kz/file/138424.png)`
                        }}
                    >
                    </div>
                </div>
                <div className={styles.image_block} style={{
                    backgroundImage: `url(${props.course.img_src})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundColor: 'white',
                    border: '1px solid white'
                }}>
                </div>
            </div>

            <div className={styles.info_block}>
                <div style={{}}>
                    <span style={{color: '#FF8300', fontWeight: 'bold' }}>{props.course.approved ? null : 'Карта находится в модерации'}</span>
                    <span style={{color: '#FF8300', fontWeight: 'bold' }}>{props.course.is_archived === true ? 'Карта находится в архиве' : null }</span>
                    <div className={styles.info_smallBody}>
                        <div 
                            className={styles.Divtitle}
                            style={!edit?{display: 'flex'}:{display: 'none'}}
                        >{editCourseTitle}</div>
                        <input className={styles.title} 
                            disabled={edit ? false : true} 
                            style={edit?{display: 'flex'}:{display: 'none'}}
                            value={editCourseTitle}
                            onChange={event => {
                            setEditCourseTitle(event.target.value);
                        }} />
                    </div>

                    <select
                        className={styles.select}
                        onChange={e => setCategoryId(e.target.value)}
                        disabled={!edit}
                        value={categoryId}
                    >
                        {edit ? (props.courseCategories === undefined ? null : (props.courseCategories.map(category => category.name === "test" ? null : (<option value={category.id}>{category.name}</option>))))
                            : <option value={props.course.category_id}>{props.course.category_name}</option>}
                    </select>

                    <div style={{}}>
                        <p className={styles.info_small}>{props.course.is_online}</p>

                        <div className={classnames(showInfo ? styles.show : styles.hide)}>

                            <p className={styles.info_title}>Название курса:</p>
                            <input className={styles.title} 
                                disabled={edit ? false : true} 
                                value={editCourseTitle}
                                onChange={event => {
                                setEditCourseTitle(event.target.value);
                            }} />

                            <p className={styles.info_title}>Направление:</p>
                            <select
                                className={styles.select}
                                onChange={e => setCategoryId(e.target.value)}
                                disabled={!edit}
                                value={categoryId}
                            >
                                {edit ? (props.courseCategories === undefined ? null : (props.courseCategories.map(category => category.name === "test" ? null : (<option value={category.id}>{category.name}</option>))))
                                : <option value={props.course.category_id}>{props.course.category_name}</option>}
                            </select>


                            <p className={styles.info_title}>Описание курса:</p>
                            <div className={styles.info_smallBody}>
                                <textarea className={styles.textArea} disabled={edit ? false : true} onChange={e => setDescription(e.target.value)}>
                                    {description}
                                </textarea>
                            </div>

                            <p className={styles.info_title}>Вид занятий: </p>
                            <div className={styles.info_smallBody}>
                                <select className={styles.select} disabled={edit ? false : true} value={type} onChange={e => setType(e.target.value)}>
                                    <option value="" disabled>Выберите тип занятий</option>
                                    <option value="Групповые занятия">Групповые занятия</option>
                                    <option value="Индивидуальные занятия">Индивидуальные занятия</option>
                                    <option value="Парные занятия">Парные занятия</option>
                                    <option value="Мини-групповые занятия">Мини-групповые занятия</option>
                                </select>
                            </div>

                            <p className={styles.info_title}>Формат занятий: </p>
                            <div className={styles.info_smallBody}>
                                <select className={styles.select} disabled={edit ? false : true} value={format} onChange={e => setFormat(e.target.value)}>
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                </select>
                            </div>


                            <p className={styles.info_title}>Цена: </p>
                            <div className={classnames(styles.inputBody, styles.flexbox)}>
                                <input minLength={3} disabled={edit ? false : true} placeholder="Цена" value={price} onChange={e => setPrice(e.target.value)} className={classnames(styles.select, styles.input, styles.select50)} />
                                <select
                                    className={classnames(styles.select, styles.select50)}
                                    onChange={e => setCurrency(e.target.value)}
                                    disabled={edit ? false : true}
                                    value={currency}
                                >
                                    <option value="KZT">KZT</option>
                                    <option value="USD">USD</option>
                                    <option value="RUB">RUB</option>
                                </select>
                            </div>

                            <p className={styles.info_title}>Цена за: </p>
                            <select
                                className={styles.select}
                                onChange={e => setUnitOfTime(e.target.value)}
                                disabled={edit ? false : true}
                                value={unitOfTime}
                            >
                                <option value="Месяц">Месяц</option>
                                <option value="Час">Час</option>
                                <option value="День">День</option>
                                <option value="Курс">Курс</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={styles.linkButtonBody}>
                    <p className={styles.info_price}>Цена: {price} {currency} / {unitOfTime}</p>
                    <div className={styles.btnsWrapper}>
                        <button onClick={async () => {
                            if (!showInfo) {
                                setShowInfo(true);
                            } else {
                                setShowInfo(false);
                            }
                        }}
                            className={styles.info_button}>
                            {showInfo ? 'Скрыть' : 'Показать больше'}
                        </button>

                        <a className={styles.info_button}
                           onClick={() => {
                               if (edit) {
                                   setDuration(durationNumber + " " + durationWord);
                                   let savingData = {
                                       id: props.course.id,
                                       course_id: props.course.course_id,
                                       title: editCourseTitle,
                                       description: description,
                                       price: price,
                                       schedule: schedule,
                                       duration: `${durationNumber} ${durationWord}`,
                                       category_id: categoryId,
                                       ages: `${agesMin} - ${agesMax}`,
                                       format: format,
                                       expected_result: expectedResult,
                                       start_requirements: startRequirements,
                                       type: type,
                                       currency: currency,
                                       unit_of_time: unitOfTime
                                   }

                                   axios({
                                       method: 'post',
                                       url: `${globals.productionServerDomain}/sendEditCard`,
                                       data: savingData,
                                       headers: {
                                           'Authorization': `Bearer ${JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token}`
                                       }
                                   }).then(function(res){
                                       setEdit(!edit)
                                   }).catch((err)=>{
                                       setEdit(!edit)
                                   })

                               } else {
                                   setEdit(!edit)
                               }
                           }}
                        >{edit ? 'Сохранить изменения' : 'Редактировать'}</a>
                    </div>

                    <div className={styles.btnsWrapper}>
                        {props.course.is_archived === true ? (
                            <a
                                className={styles.info_button}
                                onClick={async ()=>{
                                    if(await getCreationPermission(props.course.course_id)){
                                        await axios({
                                            method: 'post',
                                            data: {card_id: props.course.id},
                                            url: `${globals.productionServerDomain}/unarchiveCard`,
                                            headers: {
                                                'Authorization': `Bearer ${JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token}`
                                            }
                                        }).then(function(res){
                                            location.reload()
                                        });
                                    }
                                    else{
                                        handleShow();
                                    }
                                }}
                            >
                                Разархивировать
                            </a>
                        ) : (
                            <a
                                className={styles.info_button}
                                onClick={async ()=>{
                                    await axios({
                                        method: 'post',
                                        data: {card_id: props.course.id},
                                        url: `${globals.productionServerDomain}/archiveCard`,
                                        headers: {
                                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token}`
                                        }
                                    }).then(function(res){
                                        location.reload()
                                    });
                                }}
                            >
                                Архивировать
                            </a>
                        )}

                        <a className={styles.info_button} onClick={async ()=>{
                            await axios({
                                method: 'post',
                                data: {courseCardId: props.course.id},
                                url: `${globals.productionServerDomain}/deleteCourseCard`,
                                headers: {
                                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token}`
                                }
                            }).then(function(res){
                                location.reload()
                            });
                        }}>Удалить</a>

                    </div>
                </div>

            </div>
        </div>
    )
}
