import styles from '../../../styles/components/CallCenterElement.module.css'
import {useState} from "react";

export default function CallCenterElement(props){
    const [opened, setOpened] = useState(false)
    const [companyName, setCompanyName] = useState(props.card.center_name)
    const [phone, setPhone] = useState(props.card.center_phone)
    const [contactPerson, setContactPerson] = useState(props.card.contact_name)
    const [mail, setMail] = useState(props.card.center_email)
    const [firstCall, setFirstCall] = useState(props.card.first_call_date)
    const [firstCallTime, setFirstCallTime] = useState(props.card.first_call_time)
    const [secondCallTime, setSecondCallTime] = useState(props.card.second_call_time)
    const [secondCall, setSecondCall] = useState(props.card.second_call_date)
    const [sendKPDate, setSendKPDate] = useState(props.card.kp_send_date)
    const [firstCallComment, setFirstCallComment] = useState(props.card.first_call_comment)
    const [secondCallComment, setSecondCallComment] = useState(props.card.second_call_comment)
    const [meetingDate, setMeetingDate] = useState(props.card.first_call_comment)
    const [meetingTime, setMeetingTime] = useState(props.card.meeting_time)
    return(
        <div className={styles.body} >
            <div className={styles.header} style={{display: opened ? 'none' : 'flex'}}>
                <div className={styles.headerLeft}>
                    <span className={styles.title}>
                        №:<b>{props.card.id}</b>
                    </span>
                    <span className={styles.title}>
                        Наименование: <b>{companyName}</b>
                    </span>
                    <span className={styles.title}>
                        Номер телефона: <b>{phone}</b>
                    </span>
                </div>
                <img src="create-btn.png"
                     onClick={()=>{
                         setOpened(!opened)
                     }} style={{cursor: 'pointer'}}
                     alt=""/>
            </div>
            <div className={styles.content} style={{height: opened ? 'auto' : 0 }}>
                <div className={styles.closeBtnWrapper}>
                    <div className={styles.listItem}>
                        №:<b>1</b>
                    </div>
                    <img src="close-btn.png"
                         onClick={()=>{
                             setOpened(!opened)
                         }} style={{cursor: 'pointer'}}
                         alt=""/>
                </div>
                <div className={styles.list}>
                    <div className={styles.listItem}>
                        <span className={styles.listItemTitle}>Наименование компании:</span> <br/>
                        <input className={styles.listItemInput} type="text" value={companyName} onChange={ e => { setCompanyName(e.target.value) } }/>
                    </div>
                    <div className={styles.listItem}>
                        <span className={styles.listItemTitle}>Контактное лицо:</span> <br/>
                        <input className={styles.listItemInput} type="text" value={contactPerson} onChange={ e => { setContactPerson(e.target.value) } }/>
                    </div>
                    <div className={styles.listItem}>
                        <span className={styles.listItemTitle}>Номер телефона: </span> <br/>
                        <input className={styles.listItemInput} type="text" value={phone} onChange={ e => { setPhone(e.target.value) } }/>
                    </div>
                    <div className={styles.listItem}>
                        <span className={styles.listItemTitle}>Почта: </span> <br/>
                        <input className={styles.listItemInput} type="text" value={mail} onChange={ e => { setMail(e.target.value) } }/>
                    </div>
                    <br/>
                    <div className={styles.listItem}>
                        <span className={styles.listItemTitle}>Первый звонок: </span> <br/>
                        <input className={styles.listItemInput} type="date" value={firstCall} onChange={ e => { setFirstCall(e.target.value) } } style={{marginRight: 5}}/>
                        <input className={styles.listItemInput} type="time" value={firstCallTime} onChange={ e => { setFirstCallTime(e.target.value) } }/>
                    </div>
                    <div className={styles.listItem} style={{alignItems: 'flex-start'}}>
                        <span className={styles.listItemTitle}>Коментарии: </span> <br/>
                        <textarea name="" id="" className={styles.listItemTextarea} defaultValue={firstCallComment}>

                        </textarea>
                    </div>
                    <br/>
                    <div className={styles.listItem}>
                        <span className={styles.listItemTitle}>Отправка комерческого предложения: </span> <br/>
                        <input className={styles.listItemInput} type="date" value={sendKPDate} onChange={ e => { setSendKPDate(e.target.value) } } style={{marginRight: 5}}/>
                    </div>
                    <div className={styles.listItem}>
                        <span className={styles.listItemTitle}>Повторный звонок: </span> <br/>
                        <input className={styles.listItemInput} type="date" value={secondCall} onChange={ e => { setSecondCall(e.target.value) } } style={{marginRight: 5}}/>
                        <input className={styles.listItemInput} type="time" value={secondCallTime} onChange={ e => { setSecondCallTime(e.target.value) } }/>
                    </div>
                    <div className={styles.listItem} style={{alignItems: 'flex-start'}}>
                        <span className={styles.listItemTitle}>Коментарии: </span> <br/>
                        <textarea name="" id="" className={styles.listItemTextarea} defaultValue={secondCallComment}>

                        </textarea>
                    </div>
                    <br/>
                    <div className={styles.listItem}>
                        <span className={styles.listItemTitle}>Дата встречи: </span> <br/>
                        <input className={styles.listItemInput} type="date" value={meetingDate} onChange={ e => { setMeetingDate(e.target.value) } } style={{marginRight: 5}}/>
                        <input className={styles.listItemInput} type="time" value={meetingTime} onChange={ e => { setMeetingTime(e.target.value) } }/>
                    </div>

                    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                        <button className={styles.saveBtn}>Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
