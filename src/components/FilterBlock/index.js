import styles from './FilterBlock.module.css'
import React from "react";
import {Image} from "react-bootstrap";

const FilterBlock = ({filters, filterBtnHandler, ...props}) => {
    return (
        <div className={styles.container}>
            <div className={styles.disableOnMobile}>
                <Image src={'/double-l-shape.png'} className={styles.firstPng}/>
                <Image src={'/robmik-tuda-suda.png'} className={styles.secondPng}/>
            </div>

            <div className={styles.header}>
                <span className={styles.title}>ВЫБЕРИТЕ УДОБНЫЕ НАСТРОЙКИ ПОИСКА</span>
            </div>
            {/*<div className={styles.wrapper}>*/}
            {/*    <input type="text" className={styles.input} placeholder={'Введите название центра или курса'} style={{width: '100%'}}/>*/}
            {/*</div>*/}
            <div className={styles.wrapper_main}>
                <div className={styles.search_by_name_input_wrapper}>
                    <input
                        className={styles.input}
                        style={{
                            margin: 10,
                            width: '90%'
                        }}
                        id={'centerName'}
                        type="text"
                        placeholder={'Введите название центра или имя репетитора'}
                    />
                </div>
                <div className={styles.wrapper}>
                    <select className={styles.input} style={{cursor: 'pointer'}}
                            name="citySelect" id="citySelect"
                    >
                        <option value="0">Город</option>
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
                    <select className={styles.input} style={{cursor: 'pointer'}}
                            name="directionSelect"
                            id="directionSelect"
                    >
                        <option value="0">Направление</option>
                        {
                            filters[1] !== undefined
                                ?
                                (filters[1].map(filterOption => ( filterOption.id !== 0 ? (<option value={filterOption.id}>{filterOption.name}</option>) : null) ))
                                :
                                null
                        }
                    </select>
                    <select className={styles.input} style={{cursor: 'pointer'}}
                            name="isOnlineSelect" id="isOnlineSelect"
                    >
                        <option value="0">Формат занятий</option>
                        <option value="1">Онлайн</option>
                        <option value="2">Оффлайн</option>
                    </select>
                    <select className={styles.input} style={{cursor: 'pointer'}}
                            name="priceSelect"
                            id="priceSelect"
                    >
                        <option value="0">Цена</option>
                        <option value="0-20000">0-20.000KZT</option>
                        <option value="20000-40000">20.000-40.000KZT</option>
                        <option value="40000-60000">40.000-60.000KZT</option>
                        <option value="60000-80000">60.000-80.000KZT</option>
                        <option value="80000-100000">80.000-100.000KZT</option>
                        <option value="100000">100.000KZT+</option>
                    </select>
                </div>
            </div>
            <div className={styles.header} style={{marginTop: 20}}>
                <span className={styles.btn} onClick={()=>{
                    let centerName = document.getElementById("centerName").value;
                    let city = null;
                    try{
                        city = Number(document.getElementById("citySelect").value);
                    }catch{
                        city = 0;
                    }

                    let direction = Number(document.getElementById("directionSelect").value);
                    let price = document.getElementById("priceSelect").value;
                    let isOnline = document.getElementById("isOnlineSelect").value;

                    filterBtnHandler(centerName, city, direction, price, isOnline, '1');
                }}>Найти курс</span>

                <span className={styles.btn} onClick={()=>{
                    let centerName = document.getElementById("centerName").value;

                    let city = null;
                    try{
                        city = Number(document.getElementById("citySelect").value);
                    }catch{
                        city = 0;
                    }

                    let direction = Number(document.getElementById("directionSelect").value);
                    let price = document.getElementById("priceSelect").value;
                    let isOnline = document.getElementById("isOnlineSelect").value;

                    filterBtnHandler(centerName, city, direction, price, isOnline, '0');
                }}>Найти репетитора</span>
            </div>
        </div>
    )
}

export default FilterBlock;
