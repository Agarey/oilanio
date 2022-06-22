import styles from './LurkingFilterBLock.module.css'
import React, {useState} from "react";
import {Image} from "react-bootstrap";
import classnames from 'classnames'
import {default as axios} from "axios";
import globals from "../../globals";

const LurkingFilterBlock = ({cities, directions, setCoursesLoading, setCourseCards, ...props}) => {

    const [show, setShow] = useState(false)

    const [isOnline, setIsOnline] = useState(false);
    const [price, setPrice] = useState('0');
    const [cityId, setCityId] = useState('1');
    const [directionId, setDirectionId] = useState(1);

    const getCards = async () => {
        const data = {
            centerName: '',
            city: cityId,
            direction: directionId.toString(),
            price: price,
            center: '0',
            isOnline: isOnline,
            //individualLesson: individualLesson,
            sortType: '0'
        }

        let postResult = await axios.post(`${globals.productionServerDomain}/courseCardsFilter/`, data);
        setCourseCards(postResult.data);
        setCoursesLoading(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={classnames(styles.btn)}
                    onClick={()=>{
                        setShow(!show)
                    }}
                >Фильтр <Image src={'/Vector-4.png'} style={{height: 8}} className={show ? styles.rotateBtn : null}/></span>
            </div>

            <div className={classnames(styles.list, show ? styles.listShow : null)}>
                <select className={styles.select} onChange={e => setCityId(e.target.value)}>
                    <option value="0">Город</option>
                    {cities.map(item => {
                            if(item.name!='test'){
                                return (
                                <option value={item.id}>{item.name}</option>
                            )
                        }
                    })}
                </select>
                <select className={styles.select} onChange={e => setDirectionId(e.target.value)}>
                    <option value="1">Направления</option>
                    {directions.map(item => {
                        if(item.name!='test'){
                            return (
                                <option value={item.id}>{item.name}</option>
                            )
                        }
                    })}
                </select>
                <select className={styles.select} onChange={e => setIsOnline(e.target.value)}>
                    <option value={false}>Формат занятий</option>
                    <option value={true}>Онлайн</option>
                    <option value={false}>Офлайн</option>
                </select>
                <select className={styles.select} onChange={e => setPrice(e.target.value)}>
                    <option value="0">Цена</option>
                    <option value={'0-20000'}>0 - 20 000KZT</option>
                    <option value={'20000-40000'}>20 000 - 40 000KZT</option>
                    <option value={'40000-60000'}>40 000 - 60 000KZT</option>
                    <option value={'60000-80000'}>60 000 - 80 000KZT</option>
                    <option value={'80000-100000'}>80 000 - 100 000KZT</option>
                    <option value={'100000'}>100 000KZT +</option>
                </select>
                <button className={styles.button} onClick={()=>{
                    props.setCardsToShow(8)
                    setCoursesLoading(true)
                    getCards()
                }}>Найти курс</button>
            </div>

        </div>
    )
}

export default LurkingFilterBlock;