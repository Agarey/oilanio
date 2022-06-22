import React, {useState} from "react";
import 'react-animated-slider/build/horizontal.css'
import styles from './style.module.css'
import {default as axios} from "axios";
import globals from "../../globals";

function TutorCreateCourseCard(props){
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState(1);
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [startRequirements, setStartRequirements] = useState('');
    const [expectingResults, setExpectingResults] = useState('');
    const [durationValue, setDurationValue] = useState(1);
    const [price, setPrice] = useState('');
    const [unitOfTime, setUnitOfTime] = useState('Час');
    const [schedule, setSchedule] = useState('');
    const [durationWord, setDurationWord] = useState('Дней');
    const [currency, setCurrency] = useState('KZT');

    const createCard = () => {
        let tutorId = +localStorage.getItem(globals.localStorageKeys.centerId);
        const data = {
            title,
            categoryId,
            minAge,
            maxAge,
            startRequirements,
            expectingResults,
            durationValue,
            price,
            unitOfTime,
            schedule,
            durationWord,
            tutorId,
            currency
        }

        axios({
            method: 'post',
            url: `${globals.productionServerDomain}/createTutorCourseCard`,
            data: data,
            headers: {
                'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
            }
        }).then(function(res){
            alert('Карточка успешно отправлена на модерацию!');
            location.reload();
        }).catch(() => {
            alert('Что-то пошло нетак!');
        });
    }

    return (
        <div className={styles.container}>
            {isEditing ? (
                <>
                    <div className={styles.editing_item}>
                        <b>Направление:</b>
                        <select
                            onChange={e => setCategoryId(e.target.value)}
                            value={categoryId}
                        >
                            {props.directions.map(item => <option value={item.id}>{item.name}</option>)}
                        </select>
                    </div>

                    <div className={styles.editing_item}>
                        <b>Цена:</b>
                        <div style={{display: 'flex'}}>
                            <input type="number" style={{width: '60%'}} onChange={e => setPrice(e.target.value)}/>
                            <select onChange={e => setCurrency(e.target.value)}>
                                <option value="KZT">KZT</option>
                                <option value="Руб">Руб</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>
                        <select onChange={e => setUnitOfTime(e.target.value)}>
                            <option value="Час">Час</option>
                            <option value="Курс">Курс</option>
                            <option value="Месяц">Месяц</option>
                        </select>
                    </div>

                    <div className={styles.buttons_block}>
                        <button
                            className={styles.edit_button}
                            onClick={() => createCard()}
                        >Создать</button>
                        <button
                            className={styles.delete_button}
                            onClick={() => setIsEditing(false)}
                        >Отмена</button>
                    </div>
                </>
            ) :
                <button onClick={() => {
                    setIsEditing(true)
                }}>+</button>
            }
        </div>
    )
}

export default TutorCreateCourseCard;
