import styles from '../../../styles/components/CabinetMessagesWrapper.module.css'
import {useState} from "react";
import globals from "../../globals";
import axios from "axios";

const CabinetMessagesWrapper = (props) => {

    const [show, setShow] = useState(true)

    console.log("Notifications:");
    console.log(props.notifications)

    return (
    //     <div className={styles.body} style={{display: show ? 'block' : 'none'}}>
    //         <div className={styles.header}>
    //             <span>Оповещения от администрации</span>
    //             <span
    //                 style={{color: 'red', cursor: 'pointer', fontWeight: 'bold'}}
    //                 onClick={()=>{
    //                     setShow(false)
    //                 }}
    //             >x</span>
    //         </div>

    //

        <>
            {
                props.notifications.map((message)=>{
                    let text = message.message;
                    let date = message.datetime.split('T')[0];
                    let [checked, setChecked] = useState(message.checked)
                    return(
                        <div className={styles.message}>
                        <span>
                            {text}
                        </span> <br/>
                            <span style={{color: '#8d8d8d', fontSize: '12px'}}>{date}</span>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap'}}>
                                {checked ? (
                                    <span style={{fontSize: '14px', color: 'grey', cursor: 'pointer'}}>Старое</span>
                                ) : (
                                    <span style={{fontSize: '14px', color: 'blue', cursor: 'pointer'}}
                                          onClick={async ()=>{
                                              await axios({
                                                  method: 'post',
                                                  url: `${globals.productionServerDomain}/checkCourseNotification`,
                                                  data: {
                                                      notification_id: message.id
                                                  },
                                                  headers: {
                                                      'Authorization': `Bearer ${localStorage.getItem("auth token")}`
                                                  }
                                              }).then(function(res){
                                                  setChecked(true)
                                              });
                                          }}
                                    >
                                    Я ознакомился(-ась)
                                </span>
                                )}

                            </div>
                        </div>
                    )
                })}
        </>

        // </div>
    )
}
export default CabinetMessagesWrapper