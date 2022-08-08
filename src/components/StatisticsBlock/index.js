import React, { useState } from 'react';
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
import styles from './style.module.css'
import {default as axios} from "axios";
import globals from "../../globals";
import classnames from 'classnames';
import CabinetPopularCard from "../CabinetPopularCard";
import ModalWindow from '../Modal/ModalWindow';
import Application from '../Application';

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
  const [showApplication, setShowApplication] = useState(false);
  const [selectValue, setSelectValue] = useState("");

  const showDetalApplication = () => setShowApplication(true);
  const handleApplModalClose = () => setShowApplication(false);
  
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

  const CountDown = ({ hours = 0, minutes = 0, seconds = 0 }) => {
    const [over, setOver] = React.useState(false);
    const [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);
    const tick = () => {
      if (over) return;
      if (h === 0 && m === 0 && s === 0) {
        setOver(true);
      } else if (m === 0 && s === 0) {
        setTime([h - 1, 59, 59]);
      } else if (s == 0) {
        setTime([h, m - 1, 59]);
      } else {
        setTime([h, m, s - 1]);
      }
    };

    React.useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    });

    return (
      <span>
        {`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
      </span>
    );
  };

  const changeSelectHandler = (e) => {
    setSelectValue(e.target.value)
  }

  return(
    <>
      <ModalWindow
        show={showApplication}
        handleClose={handleApplModalClose}
        heading={'Все заявки'}
        body={<div style={{color: "#000", maxHeight: "500px", overflow: "scroll"}}>
          <select className={styles.selectAppl} onChange={changeSelectHandler}>
            <option default>Все заявки</option>
            <option>Активные заявки</option>
            <option>Неактивные заявки</option>
          </select>
          {selectValue === "Активные заявки" ? <> {
            props.applications.map(item => {
              let isActive = (new Date(item.datetime).getTime() + 86400000) > (new Date().getTime());
              if (isActive) {
                return (
                  <div key={item.id} className={styles.application}>
                    <p className={styles.app_name}>
                      {item.name} <b 
                        style={(new Date(item.datetime).getTime() + 86400000) > (new Date().getTime())? {color: "green"} : {color: "red"}}
                      >
                        &#8226;
                      </b>
                    </p>
                    <p className={styles.app_direction}>{item.direction_name}</p>
                    {(new Date(item.datetime).getTime() + 86400000) > (new Date().getTime())? (
                      <>
                        <p>
                          <b>Активна с: </b>
                          {item.datetime.toLocaleString().replace(/^([^T]+)T(.+)$/,'$1').replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1')}
                        </p>
                        <p>
                          <b>Активна до: </b> {new Date((new Date(item.datetime).getTime() + 86400000)).toLocaleDateString()}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <b>Неактивна с: </b>
                          {new Date(new Date(item.datetime).getTime() + 86400000).toLocaleDateString().replace(/^([^T]+)T(.+)$/,'$1').replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1')}
                        </p>
                      </>
                    )}
                  </div>
                )
              }
            })
          } </> : selectValue === "Неактивные заявки" ?  <>
            {props.applications.map((item, i) => {
              let isActive = (new Date(item.datetime).getTime() + 86400000) > (new Date().getTime());
              if (!isActive) {
                return (
                  <div key={item.id} className={styles.application}>
                    <p className={styles.app_name}>
                      {item.name} <b 
                        style={(new Date(item.datetime).getTime() + 86400000) > (new Date().getTime())? {color: "green"} : {color: "red"}}
                      >
                        &#8226;
                      </b>
                    </p>
                    <p className={styles.app_direction}>{item.direction_name}</p>
                    {(new Date(item.datetime).getTime() + 86400000) > (new Date().getTime())? (
                      <>
                        <p>
                          <b>Активна с: </b>
                          {item.datetime.toLocaleString().replace(/^([^T]+)T(.+)$/,'$1').replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1')}
                        </p>
                        <p>
                          <b>Активна до: </b> {new Date((new Date(item.datetime).getTime() + 86400000)).toLocaleDateString()}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <b>Неактивна с: </b>
                          {new Date(new Date(item.datetime).getTime() + 86400000).toLocaleDateString().replace(/^([^T]+)T(.+)$/,'$1').replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1')}
                        </p>
                      </>
                    )}
                  </div>
                )
              }
            })}
          </> : <>
            {props.applications.map((item, i) => {
              return (
                <div key={item.id} className={styles.application}>
                  <p className={styles.app_name}>
                    {item.name} <b 
                      style={(new Date(item.datetime).getTime() + 86400000) > (new Date().getTime())? {color: "green"} : {color: "red"}}
                    >
                      &#8226;
                    </b>
                  </p>
                  <p className={styles.app_direction}>{item.direction_name}</p>
                  {(new Date(item.datetime).getTime() + 86400000) > (new Date().getTime())? (
                      <>
                        <p>
                          <b>Активна с: </b>
                          {item.datetime.toLocaleString().replace(/^([^T]+)T(.+)$/,'$1').replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1')}
                        </p>
                        <p>
                          <b>Активна до: </b> {new Date((new Date(item.datetime).getTime() + 86400000)).toLocaleDateString()}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <b>Неактивна с: </b>
                          {new Date(new Date(item.datetime).getTime() + 86400000).toLocaleDateString().replace(/^([^T]+)T(.+)$/,'$1').replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1')}
                        </p>
                      </>
                    )}
                </div>
              )        
            })}
          </>}
        </div>}
      />
      <div className={styles.container}>
        <div className={styles.container_1_3}>
          <p className={styles.block_title}> 
            Количество заявок - {props.applications.length} 
          </p>
          <div style={{height: '70%'}}>
            <Pie 
              data={data} 
              options={{responsive: true, maintainAspectRatio: false}}
            />
          </div>
          <button
            className={styles.btnApplication}
            onClick={showDetalApplication}
          >
            Детализация по заявкам
          </button>
        </div>
        <div className={styles.container_2_3}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItem: 'center', marginBottom: 30}}>
            <p className={styles.block_title}> 
              Популярные товары 
            </p>
            <p style={{fontSize: 14, color: 'grey', fontWeight: 'bold'}}>
              На текущий момент 
            </p>
          </div>
          <div className={styles.popularCardsList}>
            {
              props.clickStatistics.map(item => (
                <div key={item.id} className={styles.popularCardItem}>
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
};