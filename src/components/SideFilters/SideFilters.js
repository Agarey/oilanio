import React, {useState, useEffect} from "react";
import 'react-animated-slider/build/horizontal.css'
import style from './SideFilters.module.css'
import FilterItem from "./FilterItem/FilterItem";
import globals from "../../globals";
import {useRouter} from "next/router";


const axios = require('axios').default;

export default function SideFilters(props) {
    let router = useRouter();
    const [showAllDirections, setShowAllDirections] = useState(false);
    const [showAllCities, setShowAllCities] = useState(false);
    const [showAllCenters, setShowAllCenters] = useState(false);
    // ${direction}&city=${city}&price=${price}&isOnline=${isOnline}
    const [direction, setDirection] = useState(0);
    const [city, setCity] = useState(1);
    const [price, setPrice] = useState(0);
    const [isOnline, setIsOnline] = useState(0);


    const [pickedCity, setPickedCity] = useState(0)
    const [pickedDirection, setPickedDirection] = useState(0)

    return (
        <div className={style.container}>
            <div className={style.filter_block}>
                <p className={style.filter_title}>Город</p>
                {
                    showAllCities ?
                    props.citiesList.map(item => (<FilterItem setValue={setCity} name={'city'} value={item.id} text={item.name}/>)) :
                    props.citiesList.slice(0, 1).map(item => (<FilterItem setValue={setCity} name={'city'} value={item.id} text={item.name}/>))
                }
                <button className={style.show_more_button} onClick={event => setShowAllCities(!showAllCities)}>
                    {
                        showAllCities ? 'Скрыть' : 'Показать все'
                    }
                </button>
            </div>

            <div className={style.filter_block}>
                <p className={style.filter_title}>Направление</p>
                {
                    showAllDirections ?
                        props.directionsList.map(item =>{
                            if(item.name !== 'test'){
                                return (<FilterItem setValue={setDirection} name={'direction'} value={item.id} text={item.name}/>)
                            }
                        }) :
                        props.directionsList.slice(0, 10).map(item => {
                            if(item.name !== 'test'){
                                return (<FilterItem setValue={setDirection} name={'direction'} value={item.id} text={item.name}/>)
                            }
                        })
                }
                <button className={style.show_more_button} onClick={event => setShowAllDirections(!showAllDirections)}>
                    {
                        showAllDirections ? 'Скрыть' : 'Показать все'
                    }
                </button>
            </div>

            {/*<div className={style.filter_block}>*/}
            {/*    <p className={style.filter_title}>Центр</p>*/}
            {/*    {*/}
            {/*        showAllCenters ?*/}
            {/*            props.centersList.map(item => (<FilterItem name={'center'} value={item.id} text={item.title}/>)) :*/}
            {/*            props.centersList.slice(0, 10).map(item => (<FilterItem name={'center'} value={item.id} text={item.title}/>))*/}
            {/*    }*/}
            {/*    <button className={style.show_more_button} onClick={event => setShowAllCenters(!showAllCenters)}>*/}
            {/*        {*/}
            {/*            showAllCenters ? 'Скрыть' : 'Показать все'*/}
            {/*        }*/}
            {/*    </button>*/}
            {/*</div>*/}

            <div className={style.filter_block}>
                <p className={style.filter_title}>Формат занятий</p>

                <FilterItem setValue={setIsOnline} name={'format'} value={2} text={'Офлайн'}/>
                <FilterItem setValue={setIsOnline} name={'format'} value={1} text={'Онлайн'}/>
            </div>

            {/*<div className={style.filter_block}>*/}
            {/*    <p className={style.filter_title}>Сортировка</p>*/}

            {/*    <FilterItem name={'sort'} value={''} text={'Возрастание цены'}/>*/}
            {/*    <FilterItem name={'sort'} value={''} text={'Убывание цены'}/>*/}
            {/*</div>*/}

            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <button
                    className={style.filter_btn}
                    onClick={async () => {
                        const redirectUrl = `${globals.productionSiteDomain}/?direction=${direction}&city=${city}&price=${price}&isOnline=${isOnline}`
                        await router.push(redirectUrl)
                    }}
                >Применить фильтры</button>
            </div>
        </div>
    )
}
