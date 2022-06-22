import React, {useEffect, useState} from "react";
import styles from '../../../styles/components/CourseCategoriesSliderIMG.module.css'
import classnames from 'classnames'
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";

const CourseCategoriesSliderIMG = (props) => {

    const [categories, setCategories] = useState(props.categories)

    const [categoriesFirstValue, setCategoriesFirstValue] = useState(0)
    const [categoriesSecondValue, setCategoriesSecondValue] = useState(6)

    useEffect(()=>{
        if (window.innerWidth <= 992){
            setCategoriesFirstValue(0)
            setCategoriesSecondValue(3)
        } else {
            setCategoriesFirstValue(0)
            setCategoriesSecondValue(6)
        }

    }, [])

    return(
        <div className={styles.container}>

            <button className={classnames(styles.arrow)} disabled={categoriesFirstValue===0 ? true : false} onClick={()=>{
                if(categoriesFirstValue!==0){
                    if (window.innerWidth <= 992){
                        setCategoriesFirstValue(categoriesFirstValue-3)
                        setCategoriesSecondValue(categoriesSecondValue-3)
                    } else {
                        setCategoriesFirstValue(categoriesFirstValue-6)
                        setCategoriesSecondValue(categoriesSecondValue-6)
                    }
                }
            }}> {'<'} </button>

            <div className={styles.categories}>
                {
                    categories.slice(categoriesFirstValue, categoriesSecondValue).map((category, idx)=>{
                        return (
                            category.id !== 0 ?
                                (
                                    <a href={`/courses?direction=${category.id}&city=0&price=0&isOnline=0&searchingCenter=1`} key={idx} className={styles.category}>
                                        <div className={styles.img}
                                            style={{backgroundImage: `url("${category.img_src}")`, marginBottom: 10}}
                                        >
                                        </div>
                                        <span>{category.name}</span>
                                    </a>
                                )
                                : null
                        )
                    })
                }
            </div>

            <button className={classnames(styles.arrow)} disabled={categoriesSecondValue >= categories.length ? true : false} onClick={()=>{
                if(categoriesSecondValue>=categories.length){
                } else {
                    if (window.innerWidth <= 992){
                        setCategoriesFirstValue(categoriesFirstValue+3)
                        setCategoriesSecondValue(categoriesSecondValue+3)
                    } else {
                        setCategoriesFirstValue(categoriesFirstValue+6)
                        setCategoriesSecondValue(categoriesSecondValue+6)
                    }
                }
            }}> > </button>

        </div>
    )
}

export default CourseCategoriesSliderIMG;