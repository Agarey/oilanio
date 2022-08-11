import { useState } from "react";
import AllApplications from "../AllApplications/AllApplications";
import Application from "../Application";
import styles from './style.module.css'

export default function ApplicationsBlock(props){
  const [allApplications, setAllApplications] = useState(true);
  const [active, setActive] = useState(false);
  const [deActive, setDeActive] = useState(false);

  return(
     <div>
      <h1>Заявки</h1>
      <br/>
      <div className={styles.applications_btn_container}>
          <span
            className={styles.applications_btn}
            style={allApplications ? {color: "black"} : {color: "#767676"}}
            onClick={() => {
              setAllApplications(true);
              setActive(false);
              setDeActive(false);
            }}
          >Все / </span>
          <span
            className={styles.applications_btn}
            style={active ? {color: "black"} : {color: "#767676"}}
            onClick={() => {
              setAllApplications(false);
              setActive(true);
              setDeActive(false);
            }}
          >Активные / </span>
          <span
            className={styles.applications_btn}
            style={deActive ? {color: "black"} : {color: "#767676"}}
            onClick={() => {
              setAllApplications(false);
              setActive(false);
              setDeActive(true);
            }}
          >Не активные</span>
        </div>
      <div className={styles.container}>
        {active ? <> {
          props.applications.map(item => {
            let isActive = (new Date(item.datetime).getTime() + 86400000) > (new Date().getTime());
            if (isActive) {
              return ( <>
                <div key={item.id} className={styles.application}>
                <Application 
                  isTutors={props.isTutors} 
                  center={props.courseInfo} 
                  courseCards={props.courseCards} 
                  subscriptionInfo={props.subscriptionInfo} 
                  application={item} 
                  active={active}
                  deActive={deActive}
                />
              </div>
            </>)}
          })} </> : deActive ?  <>
            {props.applications.map((item, i) => {
              let isActive = (new Date(item.datetime).getTime() + 86400000) > (new Date().getTime());
              if (!isActive) {
                let categoryName = props.categories.filter(category => category.id === item.direction_id)[0].name;
                return ( <>
                  <div key={item.id} className={styles.application}>
                    <Application 
                      isTutors={props.isTutors} 
                      center={props.courseInfo} 
                      courseCards={props.courseCards} 
                      subscriptionInfo={props.subscriptionInfo} 
                      application={item} 
                      active={active}
                      deActive={deActive}
                    />
                  </div>
                </>)
              }
            })}
          </> : allApplications ? <>
            {props.applications.map((item, i) => {
              return (
                <div key={item.id} className={styles.application}>
                  <AllApplications
                    isTutors={props.isTutors} 
                    center={props.courseInfo} 
                    courseCards={props.courseCards} 
                    subscriptionInfo={props.subscriptionInfo} 
                    application={item} 
                  />
                </div>
              )        
            })}
          </> : <></>} 
      </div>
    </div>
  );
}