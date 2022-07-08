import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
// import faker from 'faker';
import styles from './style.module.css'
import {default as axios} from "axios";
import globals from "../../globals";
import CabinetPopularCard from "../CabinetPopularCard";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const courseViewsOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: '',
        },
    },
};

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const courseViewsData = {
    labels,
    datasets: [
        {
            label: 'Общее',
            data: labels.map(() => 99999),
            // data: labels.map(() => faker.datatype.number({ min: 0, max: 99999 })),
            backgroundColor: '#412FAE',
        },
    ],
};

export default function StatisticsBlock(props){
    console.log(props);
    const data = {
        labels: ['Неактивные', 'Активные'],
        datasets: [
            {
                label: '# of Votes',
                data: [props.applications.length - props.newApplicationsCount, props.newApplicationsCount],
                backgroundColor: [
                    '#412FAE',
                    '#2FAE8F',
                ],
                borderColor: [
                    '#412FAE',
                    '#2FAE8F',
                ],
                borderWidth: 1,
            },
        ],
    };

    return(
        <>
            <div className={styles.container}>
                <div className={styles.container_1_3}>
                    <p className={styles.block_title}> Количество заявок - {props.applications.length} </p>

                    <div style={{height: '80%'}}>
                        <Pie data={data} options={{responsive: true, maintainAspectRatio: false}}/>
                    </div>
                </div>

                <div className={styles.container_2_3}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItem: 'center', marginBottom: 30}}>
                        <p className={styles.block_title}> Популярные товары </p>
                        <p style={{fontSize: 14, color: 'grey', fontWeight: 'bold'}}> На текущий момент </p>
                    </div>

                    <div className={styles.popularCardsList}>
                        {
                            props.clickStatistics.map(item => (
                                <div className={styles.popularCardItem}>
                                    <CabinetPopularCard card={item}/>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>

            <br/><br/>
        </>
    );
}