import React, {useState} from "react";
import 'react-animated-slider/build/horizontal.css'
import styles from './TutorCourseCard.module.css'
import {default as axios} from "axios";
import globals from "../../globals";

function TutorCourseCardEdit(props){
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.course.title);
    const [categoryId, setCategoryId] = useState(props.course.category_id);
    const [minAge, setMinAge] = useState(props.course.min_age);
    const [maxAge, setMaxAge] = useState(props.course.max_age);
    const [startRequirements, setStartRequirements] = useState(props.course.start_requirements);
    const [expectingResults, setExpectingResults] = useState(props.course.expecting_results);
    const [durationWord, setDurationWord] = useState(props.course.duration_word);
    const [durationValue, setDurationValue] = useState(props.course.duration_value);
    const [schedule, setSchedule] = useState(props.course.schedule);
    const [price, setPrice] = useState(props.course.price);
    const [currency, setCurrency] = useState(props.course.currency);
    const [unitOfTime, setUnitOfTime] = useState(props.course.unit_of_time);

    const [hide, setHide] = useState(false);

    console.log(props.course);

    const editData = () => {
        const data = {
            title,
            categoryId,
            minAge,
            maxAge,
            startRequirements,
            expectingResults,
            durationWord,
            durationValue,
            schedule,
            price,
            currency,
            unitOfTime,
            tutorId: props.course.tutor_id,
            cardId: props.course.id
        };

        axios({
            method: 'post',
            url: `${globals.productionServerDomain}/updateTutorCourseCard`,
            data: data,
            headers: {
                'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
            }
        }).then(function(res){
            alert('Данные карточки успешно обновлены!');
            setEditMode(false);
        }).catch(() => {
            alert('Что-то пошло нетак!');
        });
    }

    const deleteCard = () => {
        axios({
            method: 'post',
            url: `${globals.productionServerDomain}/deleteTutorCourseCard`,
            data: {
                id: props.course.id
            },
            headers: {
                'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
            }
        }).then(function(res){
            alert('Карточка успешно удалена!');
            location.reload();
            setEditMode(false);
        }).catch(() => {
            alert('Что-то пошло нетак!');
        });
    }

    return (
        <div className={styles.container}>
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
                    backgroundImage: `url(${props.courseInfo.img_src})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundColor: 'white',
                    border: '1px solid white'
                }}>
                </div>
            </div>
            <div className={styles.row}>
                <p className={styles.row_title}>Название курса</p>
                    <div style={{display: 'flex'}}>
                        <input
                            type={'text'}
                            className={styles.row_input}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            disabled={!editMode}
                        />
                    </div>
                <p className={styles.row_title}>Направление</p>
                <select
                    className={styles.row_input}
                    onChange={e => setCategoryId(e.target.value)}
                    disabled={!editMode}
                    value={categoryId}
                >
                    {props.directions.map(item => <option value={item.id}>{item.name}</option>)}
                </select>

                
            </div>

            <div style={{width: '100%', display: hide ? 'block' : 'none'}}>
                <div className={styles.row}>
                    <p className={styles.row_title}>Минимальный возраст</p>
                    <div style={{display: 'flex'}}>
                        <input
                            type={'number'}
                            className={styles.row_input}
                            value={minAge}
                            onChange={e => setMinAge(e.target.value)}
                            disabled={!editMode}
                        />
                    </div>

                    <p className={styles.row_title}>Максимальный возраст</p>
                    <div style={{display: 'flex'}}>
                        <input
                            type={'number'}
                            className={styles.row_input}
                            value={maxAge}
                            onChange={e => setMaxAge(e.target.value)}
                            disabled={!editMode}
                        />
                    </div>

                    <p className={styles.row_title}>Расписание</p>
                    <div style={{display: 'flex'}}>
                        <input
                            type={'text'}
                            className={styles.row_input}
                            value={schedule}
                            onChange={e => setSchedule(e.target.value)}
                            disabled={!editMode}
                        />
                    </div>

                    <p className={styles.row_title}>Цена</p>
                    <div style={{display: 'flex'}}>
                        <input
                            type={'number'}
                            className={styles.row_input}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            disabled={!editMode}
                        />

                        <select
                            className={styles.row_input}
                            onChange={e => setCurrency(e.target.value)}
                            disabled={!editMode}
                            value={currency}
                        >
                            <option value={'KZT'}>KZT</option>
                            <option value={'Руб'}>Руб</option>
                            <option value={'USD'}>USD</option>
                        </select>

                        <select
                            className={styles.row_input}
                            onChange={e => setUnitOfTime(e.target.value)}
                            disabled={!editMode}
                            value={unitOfTime}
                        >
                            <option value={'Час'}>За час</option>
                            <option value={'Курс'}>За курс</option>
                            <option value={'Месяц'}>За месяц</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={styles.buttons_block}>
                <button className={styles.edit_button}
                        onClick={()=>setHide(!hide)}
                >{hide ? 'Скрыть' : 'Показать еще'}</button>
                {editMode ? (
                    <button
                        className={styles.edit_button}
                        onClick={() => {
                            setEditMode(false);
                            editData();
                        }}
                    >Сохранить</button>
                ) : (
                    <button
                        className={styles.edit_button}
                        onClick={() => {
                            setEditMode(true);
                        }}
                    >Редактировать</button>
                )}

                <button
                    className={styles.delete_button}
                    onClick={() => {
                        let sure = confirm(`Вы уверены что хотите удалить карточку "${title}"?`);
                        if(sure){
                            deleteCard();
                        }
                    }}
                >Удалить</button>
            </div>
        </div>
    )
}

export default TutorCourseCardEdit;
