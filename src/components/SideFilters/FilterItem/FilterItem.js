import React, {useState, useEffect} from "react";
import 'react-animated-slider/build/horizontal.css'
import style from './FilterItem.module.css'

const axios = require('axios').default;

export default function FilterItem(props) {
    const clickHandler = (value) => {
        props.setValue(value);
        console.log(`click on filter value:${props.value} text:${props.text}`);
    }

    return (
        <div className={style.container}>
            <input type="radio" name={props.name} onClick={event => clickHandler(props.value)}/> {props.text}
        </div>
    )
}
