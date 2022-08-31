import Head from 'next/head'
import React from "react";
import {useRouter} from "next/router";

import styles from "./Stock.module.css";
import { useState } from "react";
import globals from "../../globals";
import { useEffect } from "react";
const axios = require('axios').default;

const Stock = () => {
    let [categories, setCategories] = useState([]);
    let [subcourses, setSubcourses] = useState([]);
    let [selectedCategoryId, setSelectedCategoryId] = useState(0);
    let [selectedSubcourseId, setSelectedSubcourseId] = useState(0);
    let [promotionText, setPromotionText] = useState('');
    let [promotionDateTill, setPromotionDateTill] = useState('');
    let [course_id, setCourse_id] = useState('')
    let [courseSearchApplications, setCourseSearchApplications] = useState([]);
    let [courses, setCourses] = useState([]);

    const loadInfo = async () => {
        let token = '';
        if(localStorage.getItem(globals.localStorageKeys.authToken) !== null){
            token = JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token;
        }else{
            router.push('/login');
        }

        await axios({
            method: 'post',
            url: `${globals.productionServerDomain}/courseCategories`,
        }).then(res => {
            setCategories(res.data);
        })

        axios.get(`${globals.productionServerDomain}/courses`).then(res => { setCourses(res.data) })

        // await axios({
        //     method: 'post',
        //     url: `${globals.productionServerDomain}/getCourseSearchApplicationStatistics`,
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }).then(function(res){
        //     console.log("getCourseSearchApplicationStatistics:");
        //     setCourseSearchApplications(res.data.applications);

        //     let activeCount = 0;

        //     res.data.applications.map(item => {
        //         if(item.is_active){
        //             activeCount++
        //         }
        //     });
        //     setActiveApplicationsCount(activeCount);

        //     setApplicationResponses(res.data.responses);
        //     console.log(courseSearchApplications)
        // }).catch(() => {
        //     router.push('/login');
        // })
    }

    const findCourseId = (categoryId) => {
        let categoryIdNumber = Number(categoryId)
        let courseId = (subcourses.find(el => el.id === categoryIdNumber))
        console.log(courseId)
        courseId = courseId.course_id
        setCourse_id(courseId)
        
    }

    useEffect( () => {
        loadInfo()
    }, [])

    return (
        <div className={styles.container}>
<div className={styles.title_block} >
    <img src="/two-books.png" style={{height: '18px'}} alt=""/>
    <span style={{
        fontSize: 24,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        marginLeft: 10
    }}>Создать акцию</span>
</div>
<div>
    <select
        onChange={e => {
            setSelectedCategoryId(e.target.value);
            console.log(selectedCategoryId)
            axios({
                method: 'post',
                url: `${globals.productionServerDomain}/subcoursesByCategory`,
                data: {
                    categoryId: e.target.value
                }
            }).then(res => {
                setSubcourses(res.data);
                console.log(res.data)
            })
        }} 
    >
        <option value={0}>Все категории</option>
        {categories.map(item => (
            <option value={item.id}>{item.name}</option>
        ))}
    </select>

    <br/><br/>

    <select
        onChange={e => {
            setSelectedSubcourseId(e.target.value)
            findCourseId(e.target.value)
            // console.log(course_id)
            console.log(selectedSubcourseId)
        }}
    >
        {subcourses.map(item => (
            <option value={item.id}>{`${item.center_title}. ${item.subcourse_title}`}</option>
        ))}
    </select>

    <br/><br/>

    <textarea cols="40" rows="5" onChange={e => setPromotionText(e.target.value)}>
        {promotionText}
    </textarea>
    
    <br/><br/>

    <p>Акция действует до:</p>
    <input type="date" onChange={e => setPromotionDateTill(e.target.value)}/>

    <br/><br/>

    <button
        onClick={() => {
            let data = {
                selectedSubcourseId,
                selectedCategoryId,
                promotionText,
                promotionDateTill,
                course_id
            }
            console.log(data);

            axios({
                method: 'post',
                url: `${globals.productionServerDomain}/createPromotion`,
                data: data,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth token')}`
                }
            }).then(function(res){
                alert('Акция создана успешно!');
            }).catch((err)=>{
                alert('Что-то пошло нетак!')
            })
            console.log(course_id)
        }}
    >Создать акцию</button>
</div>
</div>
    )
}

export default Stock