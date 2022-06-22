import {useEffect, useState} from "react"
import styles from '../../../styles/components/DbPanel.module.css'
import Header from "../../../src/components/Header/Header";
import Footer from "../../../src/components/Footer/Footer";
import globals from "../../../src/globals";

const axios = require("axios").default;

const DbPanel = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(new Date())

    const password = 'arlan.io'
    const [isLogged, setIsLogged] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [passwordValue, setPasswordValue] = useState(false)

    const [disableBtn, setDisableBtn] = useState(false)
    const [disableBtnForAcc, setDisableBtnForAcc] = useState(false)

    const [filters, setFilters] = useState([]);

    const [title, setTitle] = useState(null)
    const [img_src, setImg_src] = useState(null)
    const [website_url, setWebsite_url] = useState(null)
    const [twogis_link, setTwogis_link] = useState(null)
    const [addresses, setAddresses] = useState(null)
    const [phones, setPhones] = useState(null)
    const [description, setDescription] = useState(null)
    const [subtitle, setSubtitle] = useState(null)
    const [city_id, setCity_id] = useState(null)
    const [url, setUrl] = useState(null)
    const [background_image_url, setBsackground_image_url] = useState(null)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [instagram, setInstagram] = useState(null)
    const [email, setEmail] = useState(null)
    const [accountLogin, setAccountLogin] = useState('');
    const [accountPassword, setAccountPassword] = useState('');
    const [selectedCenterId, setSelectedCenterId] = useState(0);

    const [categories, setCategories] = useState([]);

    const [cardTitle, setCardTitle] = useState('');
    const [cardDescription, setCardDescription] = useState('');
    const [cardDirectionId, setCardDirectionId] = useState(1);
    const [cardPrice, setCardPrice] = useState(0);
    const [cardSchedule, setCardSchedule] = useState('');
    const [cardUnitOfTime, setCardUnitOfTime] = useState('Курс');
    const [cardAges, setCardAges] = useState('');
    const [cardIsOnline, setCardIsOnline] = useState(false);

    const loadData = () => {
        axios({
            method: 'post',
            url: `${globals.productionServerDomain}/courseCategories`,
        }).then(function(res){
            setCategories(res.data);
        }).catch((err)=>{
            alert("Произошла ошибка")
            console.log("error")
        })
    }

    const addCourseCard = async () => {
        const data = {
            cardTitle,
            cardDescription,
            cardDirectionId,
            cardPrice,
            cardSchedule,
            cardAges,
            cardUnitOfTime,
            cardIsOnline,
            courseId: selectedCenterId
        }
        
        await console.log(data);

        await axios({
            method: 'post',
            url: `${globals.productionServerDomain}/addCourseCard`,
            data: data
        }).then(function(res){
            alert("Карточка создана успешно!");
        }).catch((err)=>{
            alert("Произошла ошибка")
            console.log("error")
        })
    }

    const addCenter = async () => {
        const data = {
            title: title,
            img_src: img_src,
            rating: 5,
            subtitle: subtitle,
            website_url: website_url,
            addresses: addresses,
            phones: phones,
            description: description,
            course_category_id: 1,
            city_id: city_id,
            url: url,
            background_image_url: background_image_url,
            hasTeachersInfo: false,
            latitude: 0,
            longitude: 0,
            instagram: instagram,
            email: email,
            is_personal_bank_account: true,
            twogis_link: twogis_link
        }

        await axios({
            method: 'post',
            url: `https://realibi.kz/createCenter`,
            data: data
        }).then(function(res){
            alert("Центр успешно создан")
            console.log("success");
        }).catch((err)=>{
            alert("Произошла ошибка")
            console.log("error")
        })

        setLoading(false)
    }

    const createUser = async () => {
        await axios({
            method: 'post',
            url: `https://realibi.kz/createCenterAccount`,
            data: {
                login: accountLogin,
                password: accountPassword,
                role_id: 4,
                center_id: selectedCenterId
            }
        }).then(function(res){
            alert("Аккаунт успешно добавлен")
            console.log("success");
        }).catch((err)=>{
            alert("Произошла ошибка")
            console.log("error")
        })
    }

    useEffect(async ()=>{
        document.title = 'Oilan - База данных'
        setLoading(false)
        setIsLogged(true)

        axios.get(`https://realibi.kz/filters`).then(res => {
            setFilters(res.data);
            console.log(res.data);
        })

        loadData()
    }, [])

    return(
        <div style={{background: 'linear-gradient(90deg, rgba(60,88,185,1) 0%, rgba(119,148,248,1) 100%)'}}>
            <Header/>
            {
                isLogged
                    ?
                    <div className={styles.container}>
                        <div className={styles.titleBlock}>
                            <img src={'/server-storage.png'} alt="" style={{height: '18px', marginRight: '3px'}} />
                            <span className={styles.title}>База данных</span>
                        </div>

                        <div className={styles.wrapper}>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Наименование центра:</span> <br/>
                                <input type="text" className={styles.wrapperItemInput} onChange={e => setTitle(e.target.value)}/>
                            </div>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Ссылка на логотип:</span> <br/>
                                <input type="text" className={styles.wrapperItemInput} onChange={e => setImg_src(e.target.value)}/>
                            </div>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Ссылка на вебсайт (если имеется):</span> <br/>
                                <input type="text" className={styles.wrapperItemInput} onChange={e => setWebsite_url(e.target.value)}/>
                            </div>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Ссылка на 2gis (если имеется):</span> <br/>
                                <input type="text" className={styles.wrapperItemInput} onChange={e => setTwogis_link(e.target.value)}/>
                            </div>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Адреса:</span> <br/>
                                <input type="text" className={styles.wrapperItemInput} onChange={e => setAddresses(e.target.value)}/>
                            </div>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Контакты:</span> <br/>
                                <input type="text" className={styles.wrapperItemInput}
                                       placeholder={'+7 (000) 000-00-00'}
                                       onChange={e => setPhones(e.target.value)}/>
                            </div>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Краткое описание центра:</span> <br/>
                                <textarea style={{width: '50%',height:'100px'}} onChange={e => setSubtitle(e.target.value)}
                                          className={styles.wrapperItemInput}
                                >

                               </textarea>
                            </div>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Полное описание центра:</span> <br/>
                                <textarea style={{width: '50%',height:'100px'}} onChange={e => setDescription(e.target.value)}
                                          className={styles.wrapperItemInput}
                                >

                               </textarea>
                            </div>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Город:</span> <br/>
                                <select className={styles.wrapperItemInput} onChange={e => setCity_id(e.target.value)}>
                                    {
                                        filters[0] !== undefined
                                            ?
                                            (filters[0].map(filterOption => (
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
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Адрес для url-ссылки:</span> <br/>
                                <input type="text" className={styles.wrapperItemInput} onChange={e => setUrl(e.target.value)}/>
                            </div>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Ссылка на фоновую картинку для карточек:</span> <br/>
                                <input type="text" className={styles.wrapperItemInput} onChange={e => setBsackground_image_url(e.target.value)}/>
                            </div>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Координаты Яндекс.Карты:</span> <br/>
                                <input type="text" className={styles.wrapperItemInput} onChange={e => setLatitude(e.target.value)}
                                       placeholder={'latitude'}
                                /> <br/>
                                <input type="text" className={styles.wrapperItemInput} onChange={e => setLongitude(e.target.value)}
                                       placeholder={'longitude'}
                                />
                            </div>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Инстаграм (если есть):</span> <br/>
                                <input type="text" className={styles.wrapperItemInput} onChange={e => setInstagram(e.target.value)}/>
                            </div>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Адрес эл. почты для рассылки:</span> <br/>
                                <input type="text" className={styles.wrapperItemInput} onChange={e => setEmail(e.target.value)}/>
                            </div>

                            <br/>

                            <div className={styles.buttonBody} >
                                <button disabled={disableBtn}
                                        onClick={()=>{
                                            setDisableBtn(true)
                                            setTimeout(() => {
                                                setDisableBtn(false)
                                            }, 5000)
                                            setLoading(true)
                                            addCenter()
                                        }}
                                        className={styles.addButton}
                                >Добавить</button>

                                {
                                    loading ?
                                        <span className={styles.loadingMessage}>
                                            Обработка данных...
                                            <img src="/loading.png" alt="loading.png" className={styles.loadingImage}/>
                                       </span>
                                        : null
                                }

                            </div>
                        </div>


                        <div className={styles.wrapper}>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Логин:</span> <br/>
                                <input type="text" className={styles.wrapperItemInput} onChange={e => setAccountLogin(e.target.value)}/>
                            </div>
                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Пароль:</span> <br/>
                                <input type="text" className={styles.wrapperItemInput} onChange={e => setAccountPassword(e.target.value)}/>
                            </div>

                            <div className={styles.wrapperItem}>
                                <span className={styles.wrapperItemTitle}>Центр:</span> <br/>
                                <select className={styles.wrapperItemInput} onChange={e => setSelectedCenterId(e.target.value)}>
                                    {
                                        filters[2] !== undefined
                                            ?
                                            (filters[2].map(filterOption =>
                                                filterOption.title !== "test"
                                                    ?
                                                    (<option value={filterOption.id}>{filterOption.title} ({filterOption.id})</option>)
                                                    :
                                                    null
                                            ))
                                            :
                                            null
                                    }
                                </select>
                            </div>
                            <br/>
                            <div className={styles.buttonBody} >
                                <button disabled={disableBtn}
                                        onClick={()=>{
                                            setDisableBtnForAcc(true)
                                            setTimeout(() => {
                                                setDisableBtnForAcc(false)
                                            }, 5000)
                                            createUser()
                                        }}
                                        className={styles.addButton}
                                >Выдать аккаунт</button>

                                {
                                    loading ?
                                        <span className={styles.loadingMessage}>
                                            Обработка данных...
                                            <img src="/loading.png" alt="loading.png" className={styles.loadingImage}/>
                                       </span>
                                        : null
                                }

                            </div>
                        </div>

                        <div className={styles.wrapper}>
                            <div style={{display: 'flex', flexDirection: 'column', width: '40%'}}>
                                <br/><br/>

                                <span className={styles.wrapperItemTitle}>Центр:</span> <br/>
                                <select className={styles.wrapperItemInput} onChange={e => setSelectedCenterId(e.target.value)}>
                                    {
                                        filters[2] !== undefined
                                            ?
                                            (filters[2].map(filterOption =>
                                                filterOption.title !== "test"
                                                    ?
                                                    (<option value={filterOption.id}>{filterOption.title} ({filterOption.id})</option>)
                                                    :
                                                    null
                                            ))
                                            :
                                            null
                                    }
                                </select> <br/>

                                <span className={styles.wrapperItemTitle}>Название курса:</span> <br/>
                                <input type="text" onChange={e => setCardTitle(e.target.value)}/> <br/>

                                <span className={styles.wrapperItemTitle}>Описание курса:</span> <br/>
                                <input type="text" onChange={e => setCardDescription(e.target.value)}/> <br/>

                                <span className={styles.wrapperItemTitle}>Расписание:</span> <br/>
                                <input type="text" onChange={e => setCardSchedule(e.target.value)}/> <br/>

                                <span className={styles.wrapperItemTitle}>Возрастная категория:</span> <br/>
                                <input type="text" onChange={e => setCardAges(e.target.value)}/> <br/>

                                <span className={styles.wrapperItemTitle}>Направление:</span> <br/>
                                <select
                                    onChange={e => setCardDirectionId(e.target.value)}
                                >
                                    {
                                        categories.map(item => (<option value={item.id}>{item.name}</option>))
                                    }
                                </select>

                                <span className={styles.wrapperItemTitle}>Цена:</span> <br/>
                                <input type="number" onChange={e => setCardPrice(e.target.value)}/> <br/>

                                <span className={styles.wrapperItemTitle}>Цена за:</span> <br/>
                                <select
                                    onChange={e => setCardUnitOfTime(e.target.value)}
                                >
                                    <option value={'Курс'}>Курс</option>
                                    <option value={'Месяц'}>Месяц</option>
                                    <option value={'Час'}>Час</option>
                                </select>

                                <br/>

                                <input
                                    type="checkbox"
                                    onClick={() => {
                                        setCardIsOnline(!cardIsOnline);
                                    }
                                }/> Онлайн

                                <div className={styles.buttonBody} >
                                    <button disabled={disableBtn}
                                            onClick={ async () => {
                                                await addCourseCard();
                                            }}
                                            className={styles.addButton}
                                    >Создать карточку</button>

                                    {
                                        loading ?
                                            <span className={styles.loadingMessage}>
                                            Обработка данных...
                                            <img src="/loading.png" alt="loading.png" className={styles.loadingImage}/>
                                       </span>
                                            : null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={styles.password}>
                        <div className={styles.passwordBody}>
                            <span className={styles.passwordTitle}>Подтвердите личность</span>
                            {
                                error === 'password_value_is_empty'
                                    ?
                                    <span className={styles.passwordErrorMessage}>Введите пароль!</span>
                                    :
                                    null
                            }
                            {
                                error === 'password_value_is_wrong'
                                    ?
                                    <span className={styles.passwordErrorMessage}>Пароль неверный!</span>
                                    :
                                    null
                            }
                            <input type={showPassword ? 'text' : 'password'}
                                   className={styles.passwordInput}
                                   onChange={event => setPasswordValue(event.target.value)}
                            />
                            <span className={styles.showHidePassword}
                                  onClick={()=>{
                                      setShowPassword(!showPassword)
                                  }}
                            >{showPassword ? 'Скрыть' : 'Показать'} пароль</span>
                            <button className={styles.loginButton}
                                    onClick={()=>{
                                        if(passwordValue){
                                            setError('')
                                            if (passwordValue === password){
                                                setIsLogged(true)
                                                setError('')
                                            } else {
                                                setIsLogged(false)
                                                setError('password_value_is_wrong')
                                            }
                                        } else {
                                            setError('password_value_is_empty')
                                        }
                                    }}
                            >Войти</button>
                        </div>
                    </div>
            }

            <Footer/>

        </div>
    )
}

export default DbPanel
