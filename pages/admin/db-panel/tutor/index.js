import React, {useEffect, useState} from "react"
import styles from './style.module.css'
import Header from "../../../../src/components/Header/Header";
import globals from "../../../../src/globals";
import PhoneInput from "react-phone-number-input/input";

const axios = require("axios").default;

const DbPanelTutor = () => {
    const [fullname, setFullname] = useState('');
    const [img_src, setImg_src] = useState(null);
    const [description, setDescription] = useState('');
    const [canWorkOnline, setCanWorkOnline] = useState(false);
    const [canWorkOffline, setCanWorkOffline] = useState(false);
    const [phone, setPhone] = useState('');
    const [cityId, setCityId] = useState(1);
    const [canWorkOnDeparture, setCanWorkOnDeparture] = useState(false);
    const [teachingLanguage, setTeachingLanguage] = useState('');
    const [workingAddress, setWorkingAddress] = useState('');

    const [tutorsList, setTutorsList] = useState([]);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [selectedTutorId, setSelectedTutorId] = useState(1);

    const [filters, setFilters] = useState([[],[],[]]);

    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState(1);
    const [minAge, setMinAge] = useState(1);
    const [maxAge, setMaxAge] = useState(60);
    const [startRequirements, setStartRequirements] = useState('');
    const [expectingResults, setExpectingResults] = useState('');
    const [durationValue, setDurationValue] = useState(1);
    const [price, setPrice] = useState(1000);
    const [unitOfTime, setUnitOfTime] = useState('Час');
    const [schedule, setSchedule] = useState('');
    const [durationWord, setDurationWord] = useState('Месяцев');
    const [currency, setCurrency] = useState('KZT');

    useEffect(async ()=>{
        document.title = 'Oilan - База данных'

        axios.get(`${globals.productionServerDomain}/filters`).then(res => {
            setFilters(res.data);
        })

        loadTutors();
    }, [])

    const createTutor = async () => {
        const data = {
            fullname,
            img_src,
            description,
            canWorkOnline,
            canWorkOffline,
            phone,
            cityId,
            canWorkOnDeparture,
            teachingLanguage,
            workingAddress
        }

        await axios({
            method: 'post',
            url: `${globals.productionServerDomain}/createTutor`,
            data: data
        }).then(function(res){
            alert("Репетитор успешно создан")
        }).catch((err)=>{
            alert("Произошла ошибка")
        })
    }

    const loadTutors = async () => {
        await axios({
            method: 'get',
            url: `${globals.productionServerDomain}/tutors`,
        }).then(function(res){
            setSelectedTutorId(res.data[0].id);
            setTutorsList(res.data);
        }).catch((err)=>{
            alert("Произошла ошибка при загрузке списка репетиторов!")
        })
    }

    const createTutorAccount = async () => {
        const data = {
            login,
            password,
            selectedTutorId
        }

        await axios({
            method: 'post',
            url: `${globals.productionServerDomain}/createTutorAccount`,
            data: data
        }).then(function(res){
            alert(`Аккаунт репетитора ${fullname} успешно создан!`)
        }).catch((err)=>{
            alert("Произошла ошибка")
        })
    }

    const createTutorCourseCard = async () => {
        const data = {
            title,
            categoryId,
            minAge,
            maxAge,
            schedule,
            startRequirements,
            expectingResults,
            durationValue,
            price,
            unitOfTime,
            schedule,
            durationWord,
            tutorId: selectedTutorId,
            currency
        }

        await axios({
            method: 'post',
            url: `${globals.productionServerDomain}/createTutorCourseCard`,
            data: data
        }).then(function(res){
            alert(`Карточка курса репетитора ${fullname} успешно создана!`)
        }).catch((err)=>{
            alert("Произошла ошибка")
        })
    }

    return(
        <div>
            <Header/>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '3%',
                fontSize: 28,
                fontWeight: 700
            }}>
                Страница создания репетиторов
            </div>

            <div className={styles.wrapper}>
                <div className={styles.inputsBlock}>
                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>ФИО</p>
                        <input
                            type="text"
                            className={styles.input}
                            value={fullname}
                            onChange={e => setFullname(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>О репетиторе</p>
                        <input
                            type="text"
                            className={styles.input}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Ссылка на фото:</p>
                        <input 
                            type="text" 
                            className={styles.input} 
                            onChange={e => setImg_src(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <div style={{display: 'flex'}}>
                            <p className={styles.inputTitle}>Может работать онлайн</p>
                            <input
                                style={{marginLeft: 10}}
                                type="checkbox"
                                className={styles.checkbox}
                                value={canWorkOnline}
                                onClick={e => setCanWorkOnline(e.target.checked)}
                            />
                        </div>
                    </div>

                    <div className={styles.inputRow}>
                        <div style={{display: 'flex'}}>
                            <p className={styles.inputTitle}>Может работать офлайн</p>
                            <input
                                style={{marginLeft: 10}}
                                type="checkbox"
                                className={styles.checkbox}
                                value={canWorkOffline}
                                onClick={e => setCanWorkOffline(e.target.checked)}
                            />
                        </div>
                    </div>

                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Адрес офлайн работы</p>
                        <input
                            type="text"
                            className={styles.input}
                            value={workingAddress}
                            disabled={!canWorkOffline}
                            onChange={e => setWorkingAddress(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <div style={{display: 'flex'}}>
                            <p className={styles.inputTitle}>Может работать на выезд (дома у студента)</p>
                            <input
                                style={{marginLeft: 10}}
                                type="checkbox"
                                className={styles.checkbox}
                                value={canWorkOnDeparture}
                                onClick={e => setCanWorkOnDeparture(e.target.checked)}
                            />
                        </div>
                    </div>

                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Номер телефона</p>
                        <PhoneInput
                            className={styles.input}
                            international={false}
                            defaultCountry="KZ"
                            value={phone}
                            onChange={setPhone}/>
                    </div>

                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Город</p>
                        <select
                            onChange={e => setCityId(e.target.value)}
                            value={cityId}
                        >
                            {filters[0].map(item => <option value={item.id}>{item.name}</option>)}
                        </select>
                    </div>

                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Язык обучения</p>
                        <select
                            onChange={e => setTeachingLanguage(e.target.value)}
                            value={teachingLanguage}
                        >
                            <option value={'Английский'}>Английский</option>
                            <option value={'Русский'}>Русский</option>
                            <option value={'Казахский'}>Казахский</option>
                            <option value={'Русский, Казахский'}>Русский, Казахский</option>
                            <option value={'Русский, Английский'}>Русский, Английский</option>
                            <option value={'Казахский, Английский'}>Казахский, Английский</option>
                            <option value={'Все языки'}>Все языки</option>
                        </select>
                    </div>

                    <div className={styles.buttonBlock}>
                        <button
                            onClick={() => {
                                createTutor();
                                loadTutors();
                            }}
                        >Добавить репетитора</button>
                    </div>
                </div>

                <div className={styles.inputsBlock}>
                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Репетитор</p>
                        <select
                            onChange={e => {
                                setSelectedTutorId(e.target.value);
                            }}
                            value={selectedTutorId}
                        >
                            {tutorsList.map(item => <option value={item.id}>{item.fullname} (id: {item.id})</option>)}
                        </select>
                    </div>

                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Логин</p>
                        <input
                            type="text"
                            className={styles.input}
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Пароль</p>
                        <input
                            type="text"
                            className={styles.input}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.buttonBlock}>
                        <button
                            onClick={() => createTutorAccount()}
                        >Создать аккаунт репетитора (id {selectedTutorId})</button>
                    </div>
                </div>

                <div className={styles.inputsBlock}>
                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Репетитор</p>
                        <select
                            onChange={e => {
                                setSelectedTutorId(e.target.value);
                            }}
                            value={selectedTutorId}
                        >
                            {tutorsList.map(item => <option value={item.id}>{item.fullname} (id: {item.id})</option>)}
                        </select>
                    </div>

                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Название курса</p>
                        <input
                            type="text"
                            className={styles.input}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Минимальный возраст</p>
                        <input
                            type="number"
                            className={styles.input}
                            value={minAge}
                            onChange={e => setMinAge(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Максимальный возраст</p>
                        <input
                            type="number"
                            className={styles.input}
                            value={maxAge}
                            onChange={e => setMaxAge(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Расписание</p>
                        <input
                            type="text"
                            className={styles.input}
                            value={schedule}
                            onChange={e => setSchedule(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Направление</p>
                        <select
                            onChange={e => setCategoryId(e.target.value)}
                            value={categoryId}
                        >
                            {filters[1].map(item => <option value={item.id}>{item.name}</option>)}
                        </select>
                    </div>

                    <div className={styles.inputRow}>
                        <p className={styles.inputTitle}>Цена</p>
                        <div>
                            <input
                                type="number"
                                className={styles.input}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />

                            <select onChange={e => setUnitOfTime(e.target.value)}>
                                <option value="Час">За час</option>
                                <option value="Курс">За курс</option>
                                <option value="Месяц">За месяц</option>
                            </select>
                        </div>

                    </div>

                    <div className={styles.buttonBlock}>
                        <button
                            onClick={() => createTutorCourseCard()}
                        >Создать курс репетитора ({selectedTutorId})</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DbPanelTutor
