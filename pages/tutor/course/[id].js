import React, { useState } from "react";
import styles from './course.module.css'
import Header from "../../../src/components/Header/Header";
import {Image} from "react-bootstrap";
import globals from "../../../src/globals";
const axios = require('axios').default;

function coursePage(props) {
    return (
        <div style={{ background: 'linear-gradient(90deg, rgba(60,88,185,1) 0%, rgba(119,148,248,1) 100%)' }}>
            <Header/>
            <div className={styles.container}>
                <div className={styles.tutor_info}>
                    <div className={styles.img_block}>
                        <Image />
                    </div>
                    <div className={styles.info_block}>

                    </div>
                    <div className={styles.info_block}>

                    </div>
                </div>
            </div>
        </div>
    )
}

coursePage.getInitialProps = async (ctx) => {
    if(ctx.query.id !== undefined) {
        let courseId = ctx.query.id;
        let course = await axios.get(`${globals.productionServerDomain}/tutors/course/${courseId}`);
        console.log(course);
        //let tutor = axios.get(`${globals.productionServerDomain}/tutor/`);

        return {};
    }else{
        return {};
    }
}

export default coursePage;
