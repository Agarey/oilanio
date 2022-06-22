import React from "react";
import Slider from "react-slick";
import factStyles from '../../components/FactCard/style.module.css'
import styles from '../../../styles/components/SimpleSlider.module.css'
import SubCourseCard from "../SubCourseCard/SubCourseCard";
import StockCard from "../StockCard/StockCard";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import CourseTeacherCard from "../CourseTeacherCard/CourseTeacherCard";
import homeStyles from '../../../styles/Home.module.css'
import FactCard from "../FactCard";
import {Image} from "react-bootstrap";
import classnames from 'classnames'

export default function SimpleSlider(props) {

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={classnames(styles.arrow)}
                style={{ ...style, display: "block",  right: 0, }}
                onClick={onClick}
            >
                <Image src={'/arrow-for-slider-black.png'} className={styles.arrowImg} style={{left: 14}}/>
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={classnames(styles.arrow)}
                style={{ ...style, display: "block", left: 0,  }}
                onClick={onClick}
            >
                <Image src={'/arrow-for-slider-black.png'} className={styles.arrowImg} style={{transform: 'rotate(180deg)', left: 10}}/>
            </div>
        );
    }

    let slidesCount = 0;

    if (props.stocks !== undefined){
        if (props.stocks.length < 5){
            slidesCount = props.stocks.length;
        } else{
            slidesCount = 5;
        }
    } else if(props.subcourses !== undefined){
        if (props.subcourses.length < 4){
            slidesCount = props.subcourses.length;
        }
        else{
            slidesCount = 4;
        }
    } else if(props.teachers !== undefined){
        if (props.teachers.length < 4){
            slidesCount = props.teachers.length;
        }
        else{
            slidesCount = 4;
        }
    } else if(props.collection !== undefined){
        slidesCount = 2;
    } else if(props.facts !== undefined){
        slidesCount = 5;
    }

    const settings = {
        dots: props.facts ? false : true,
        infinite: true,
        speed: 1000,
        slidesToShow: slidesCount,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 3500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        variableWidth: false,
        centerPadding: '120px',
        centerMode: true,
        pauseOnFocus: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 760,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    centerMode: false,
                    centerPadding: '0'
                }
            },
            {breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    centerMode: true,
                    centerPadding: '0'
                }
            }
        ],
    };


    // Должен быть элемент subcourses в пропсах

    if (props.subcourses !== undefined) {
        return (
            <div style={{width: '100%', height: '100%'}}>
                <Slider {...settings} style={{height: '100%'}}>
                    {props.subcourses.map(elem => <SubCourseCard course={elem}/>)}
                </Slider>
            </div>
        );
    } else if (props.stocks !== undefined) {
        let stockImages = [
            'https://realibi.kz/file/844307.png',
            'https://realibi.kz/file/493619.png',
            'https://realibi.kz/file/531074.png',
            'https://realibi.kz/file/339448.png',
            'https://realibi.kz/file/269125.png'
        ]
        let imageIndex = -1;
        return (
            <div style={{width: '100%'}}>
                <Slider {...settings} style={{height: '100%'}} className={styles.slider}>
                    {props.stocks.map(elem => {
                        imageIndex++;
                        if(imageIndex === 5){
                            imageIndex = 0;
                        }
                        return (<div className={styles.slider_item}><StockCard 
                            image={stockImages[imageIndex]} 
                            stock={elem}/></div>)
                    })}
                </Slider>
            </div>
        );
    } else if (props.teachers !== undefined) {
        return (
            <div style={{width: '100%'}}>
                <Slider {...settings}>
                    {props.teachers.map(elem => <CourseTeacherCard teacher={elem}/>)}
                </Slider>
            </div>
        )
    } else if (props.collection !== undefined){
        return (
            <div style={{width: '100%'}}>
                <Slider {...settings} style={{justifyContent: 'space-between'}}>
                    {props.collection.map(collectionItem => {
                        return(
                            <div className={homeStyles.collectionBlock}>
                                <img src={collectionItem.bg_img} className={homeStyles.collectionImg} alt=""/>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        );
    } else if (props.facts !== undefined) {
        return (
            <div style={{width: '100%', margin: '50px 0', padding: 0}}>
                <Slider {...settings} style={{padding: 0}}>
                    {
                        props.facts.map(fact => <FactCard fact={fact}/>)
                    }
                </Slider>
            </div>
        )
    }
}

