import styles from '../../../styles/components/CreateCourseCard.module.css'
import React, {useEffect, useState} from "react";
import classnames from 'classnames';
import globals from "../../globals";
import ModalWindow from "../Modal/ModalWindow";
import {SignupToCourseForm} from "../Forms/SignupToCourseForm/SignupToCourseForm";
import {CardCreationPermissionForm} from "../Forms/CardCreationLimitForm/CardCreationPermissionForm";

const axios = require('axios').default;


export default function CreateCourseCard(props) {
    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showContacts, setShowContacts] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [create, setCreate] = useState(false)

    let [permittedCardsCount, setPermittedCardsCount] = useState(0);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [expectedResult, setExpectedResult] = useState("");
    const [startRequirements, setStartRequirements] = useState("");
    const [durationValue, setDurationValue] = useState("");
    const [durationText, setDurationText] = useState("");
    const [agesFrom, setAgesFrom] = useState("");
    const [agesTo, setAgesTo] = useState("");
    const [type, setType] = useState("Групповые занятия");
    const [isonline, setIsonline] = useState("false");
    const [price, setPrice] = useState("");
    const [currency, setCurrency] = useState("KZT");
    const [unitOfTime, setUnitOfTime] = useState("Месяц");
    const [schedule, setSchedule] = useState("ПН, СР, ПТ");
    const [courseCategories, setCourseCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(null);

    useEffect(function(){
        axios.post(`${globals.productionServerDomain}/courseCategories`).then(function(res){
            console.log("course categories:")
            console.log(res.data);
            setCourseCategories(res.data);
        });
    }, [])

    const createCard = async () => {
        if(categoryId !== null){
            const data = {
                courseId: Number(props.course.id),
                title: title,
                description: description,
                expectedResult: expectedResult,
                startRequirements: startRequirements,
                duration: `${durationValue} ${durationText}`,
                ages: `${agesFrom} - ${agesTo}`,
                type: type,
                isonline: isonline,
                price: price,
                currency: currency,
                unitOfTime: unitOfTime,
                schedule: schedule,
                categoryId: categoryId
            }

            await axios({
                method: 'post',
                url: `${globals.productionServerDomain}/createCourseCard`,
                data: data,
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token}`
                }
            }).then(function(res){
                console.log("card send to admin")
            });
        }else {
            alert("Выберите направление для карточки!");
        }
    }

    async function getCreationPermission(centerId) {
        let creationPermissionResponse = await axios.get(`${globals.productionServerDomain}/cardCreationPermission/${centerId}`);
        setPermittedCardsCount(creationPermissionResponse.data.permittedCardsCount)
        return creationPermissionResponse.data.permitted;
    }

    return (
        <div className={styles.container}>
            <ModalWindow show={show} handleClose={handleClose} heading={'Лимит на создания карточек'} body={<CardCreationPermissionForm permittedCardsCount={permittedCardsCount} handleClose={handleClose}/>}/>
            <div className={styles.titleImage__Body}>
                <div className={styles.titleImageWrapper}>
                    {
                        props.course !== null ? (
                            <>
                                <div className={styles.titleImageBody}
                                   style={{
                                       backgroundImage: `url(${props.course.background_image_url})`
                                   }}
                                >
                                </div>
                                <div className={styles.image_block} style={{
                                    backgroundImage: `url(${props.course.img_src})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundColor: 'white',
                                    border: '1px solid white'
                                }}>
                                </div>
                            </>
                        ) :
                            null
                    }

                </div>

            </div>
            {create ? null : (
                <div className={styles.createBlock}
                    onClick={async ()=>{
                        if(await getCreationPermission(props.course.id)){
                            setCreate(!create)
                        }
                        else{
                            handleShow();
                        }
                    }}
                >
                    <button className={styles.createButton}>+</button>
                </div>
            ) }

            {create ? (
                <div className={styles.info_block}>
                    <div style={{}}>
                        <div className={styles.titleBlock}>
                            <div>
                                <p className={styles.course_title}>{props.course.title}</p>
                            </div>
                            <div className={styles.socnetBlock} style={{marginBottom: 5}}>
                                {props.course.instagram ? (
                                    <>
                                        <a href={`https://www.instagram.com/${props.course.instagram}/`}>
                                            <img src="/instagram.png" className={styles.icons} alt=""/>
                                        </a>
                                    </>
                                ) : null || undefined }
                                {props.course.website !== null ? (
                                    <>
                                        <a href={`${props.course.website}`}>
                                            <img src="/network.png" className={styles.icons} alt=""/>
                                        </a>
                                    </>
                                ) : null }
                            </div>
                        </div>
                        <div>

                        </div>

                        <div className={styles.inputBody}>
                            <input
                                type="text"
                                className={classnames(styles.select, styles.input)}
                                placeholder="Название курса"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        {/*<p className={styles.contactsButton}>Контакты и соц.сети</p>*/}

                        <div style={{}}>
                            <p className={styles.info_title}>Направление: </p>
                            <select
                                className={styles.select}
                                onChange={e => setCategoryId(e.target.value)}
                            >
                                <option value={null}>Выберите направление</option>
                                {courseCategories === undefined
                                    ?
                                    null
                                    :
                                    (courseCategories.map(category => category.name === "test" ? null : (<option value={category.id}>{category.name}</option>)))
                                }
                            </select>

                            <p className={styles.info_title}>Контакты: </p>
                            <div>
                                <span onClick={async () => {
                                    setShowPhoneNumber(!showPhoneNumber)
                                }} className={classnames(styles.info_small, styles.phone)}>
                                    {props.course.phones}
                                </span>
                            </div>

                            <p className={styles.info_title}>Описание курса:</p>
                            <div className={styles.inputBody}>
                                <textarea
                                    className={styles.textArea}
                                    onChange={e => setDescription(e.target.value)}>

                                </textarea>
                            </div>

                            <p className={styles.info_title}>Возрастная категория: </p>
                            <div className={classnames(styles.inputBody, styles.flexbox)}>
                                <input value={agesFrom} min={3} max={60} type="number" onChange={e => setAgesFrom(e.target.value)} className={classnames(styles.select, styles.input, styles.select50)} placeholder="От (число)"/>
                                <input value={agesTo} min={3} max={60} type="number" onChange={e => setAgesTo(e.target.value)} className={classnames(styles.select, styles.input, styles.select50)} placeholder="До (число)"/>
                            </div>

                            <p className={styles.info_title}>Вид занятий: </p>
                            <div className={styles.inputBody}>
                                <select
                                    className={styles.select}
                                    onChange={e => setType(e.target.value)}
                                    value={type}
                                >
                                    <option value="Групповые занятия">Вид занятий</option>
                                    <option value="Групповые занятия">Групповые занятия</option>
                                    <option value="Индивидуальные занятия">Индивидуальные занятия</option>
                                </select>
                            </div>

                            <p className={styles.info_title}>Формат занятий: </p>
                            <select
                                className={styles.select}
                                onChange={e => setIsonline(e.target.value)}
                                value={isonline}
                            >
                                <option value={"true"}>Online</option>
                                <option value={"false"}>Offline</option>
                            </select>

                            <p className={styles.info_title}>Цена: </p>
                            <div className={classnames(styles.inputBody, styles.flexbox)}>
                                <input minLength={3} value={price} type="number" onChange={e => setPrice(e.target.value)} className={classnames(styles.select, styles.input, styles.select50)} placeholder="Цена"/>
                                <select
                                    className={classnames(styles.select,styles.select50)}
                                    onChange={e => setCurrency(e.target.value)}
                                    value={currency}
                                >
                                    <option value="KZT">KZT</option>
                                    <option value="USD">US</option>
                                    <option value="RUB">RUB</option>
                                </select>
                            </div>

                            <p className={styles.info_title}>Цена за: </p>
                            <select
                                className={styles.select}
                                onChange={e => setUnitOfTime(e.target.value)}
                                value={unitOfTime}
                            >
                                <option value="Месяц">Месяц</option>
                                <option value="Час">Час</option>
                                <option value="День">День</option>
                                <option value="Курс">Курс</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.linkButtonBody}>
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <button className={classnames(styles.cancel_button)}
                                    onClick={async ()=>{
                                        await createCard();
                                        setCreate(!create);
                                        location.reload();
                                    }}
                            >Добавить</button>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <button className={styles.cancel_button}
                                    onClick={()=>{
                                        setCreate(!create)
                                    }}
                            >Отмена</button>
                        </div>
                    </div>

                </div>
            ) : null}

        </div>
    )
}
