import styles from '../../../styles/components/Sidebar.module.css'
import ReactDOM from 'react-dom';
import $ from 'jquery';
import React, {useContext, useEffect, useState} from "react";

export default function Sidebar(props){


    let [show, setShow] = useState(false)

    useEffect(()=>{
        let sidebar = document.querySelector('#sidebar')
    })


    return(
        <>
            <div className={styles.menuBody} id={'sidebar'} style={{width: show ? 256 : 64}}
                 onMouseEnter={()=>{
                     setShow(true)
                 }}
                 onMouseLeave={()=>{
                     setShow(false)
                 }}
            >
                <div className={styles.item}>
                    <div className={styles.img_block}>
                        <img src='/magnifying-glass.png' className={styles.img}/>
                    </div>

                    <span className={styles.item_title} style={{display: show ? 'block' : 'none'}}
                          onClick={() => {
                              document.querySelector('#filter').scrollIntoView({
                                  behavior: 'smooth'
                              });
                          }}
                    >Фильтр</span>
                </div>
                <div className={styles.item}>
                    <div className={styles.img_block}>
                        <img src='/info-button.png' className={styles.img}/>
                    </div>

                    <span className={styles.item_title} style={{display: show ? 'block' : 'none'}}
                          onClick={() => {
                              document.querySelector('#about_us').scrollIntoView({
                                  behavior: 'smooth'
                              });
                          }}
                    >О нас</span>
                </div>
                <div className={styles.item}>
                    <div className={styles.img_block}>
                        <img src='/discount_white.png' className={styles.img}/>
                    </div>

                    <span className={styles.item_title} style={{display: show ? 'block' : 'none'}}
                          onClick={() => {
                              document.querySelector('#akcii').scrollIntoView({
                                  behavior: 'smooth'
                              });
                          }}
                    >Актуальные акции</span>
                </div>
                <div className={styles.item}>
                    <div className={styles.img_block}>
                        <img src='/two-books-white.png' className={styles.img}/>
                    </div>

                    <span className={styles.item_title} style={{display: show ? 'block' : 'none'}}
                          onClick={() => {
                              document.querySelector('#coursesBlock').scrollIntoView({
                                  behavior: 'smooth'
                              });
                          }}
                    >Популярные курсы</span>
                </div>
                <div className={styles.item}>
                    <div className={styles.img_block}>
                        <img src='/school_white.png' className={styles.img}/>
                    </div>

                    <span className={styles.item_title} style={{display: show ? 'block' : 'none'}}
                          onClick={() => {
                              document.querySelector('#partners').scrollIntoView({
                                  behavior: 'smooth'
                              });
                          }}
                    >Наши партнеры</span>
                </div>
                <div className={styles.item}>
                    <div className={styles.img_block}>
                        <img src='/graduation-hat.png' className={styles.img}/>
                    </div>

                    <span className={styles.item_title} style={{display: show ? 'block' : 'none'}}
                          onClick={() => {
                              document.querySelector('#categories').scrollIntoView({
                                  behavior: 'smooth'
                              });
                          }}
                    >Популярные категории</span>
                </div>
            </div>
        </>
    )
}