import styles from '../../../styles/components/CallCenterElement.module.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import globals from "../../globals";
import classnames from 'classnames'

export default function CallCenterTableElement(props){
    const [edited, setEdited] = useState(false)
    const [companyName, setCompanyName] = useState(props.card.center_name)
    const [phone, setPhone] = useState(props.card.center_phone)
    const [contactPerson, setContactPerson] = useState(props.card.contact_name)
    const [mail, setMail] = useState(props.card.center_email)
    const [sendKPDate, setSendKPDate] = useState(props.card.kp_send_date)
    const [firstCallComment, setFirstCallComment] = useState(props.card.first_call_comment)
    const [secondCallComment, setSecondCallComment] = useState(props.card.second_call_comment)
    const [meetingDate, setMeetingDate] = useState(props.card.meeting_date)
    const [meetingTime, setMeetingTime] = useState(props.card.meeting_time)

    const [firstCall, setFirstCall] = useState(props.card.first_call_date)
    const [firstCallTime, setFirstCallTime] = useState(props.card.first_call_time)
    const [secondCallTime, setSecondCallTime] = useState(props.card.second_call_time)
    const [secondCall, setSecondCall] = useState(props.card.second_call_date)
    const [category, setCategory] = useState(props.card.center_category_id)

    const [disableBtn, setDisableBtn] = useState(false)

    return(
        <tr className={classnames(styles.rows, edited ? styles.edited : null)}>
            <td>{props.card.id}</td>
            <td><input className={styles.tableInput} type="text" value={companyName} onChange={ e => { setCompanyName(e.target.value); setEdited(true) } }/></td>
            <td>
                <select className={styles.tableInput} name="" id="" value={category} onChange={ e => { setCategory(e.target.value); setEdited(true) } }>
                    {
                        props.categories !== undefined ? props.categories.map(item => <option value={item.id}>{item.name}</option>) : null
                    }
                </select></td>
            <td><input className={styles.tableInput} type="text" value={contactPerson} onChange={ e => { setContactPerson(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={phone} onChange={ e => { setPhone(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={mail} onChange={ e => { setMail(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="date" value={firstCall} onChange={ e => { setFirstCall(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="time" value={firstCallTime} onChange={ e => { setFirstCallTime(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInputComment} type="text" defaultValue={firstCallComment} onChange={ e => { setFirstCallComment(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="date" value={sendKPDate} onChange={ e => { setSendKPDate(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="date" value={secondCall} onChange={ e => { setSecondCall(e.target.value); setEdited(true) } } style={{marginRight: 5}}/></td>
            <td><input className={styles.tableInput} type="time" value={secondCallTime} onChange={ e => { setSecondCallTime(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInputComment} type="text" defaultValue={secondCallComment} onChange={ e => { setSecondCallComment(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="date" value={meetingDate} onChange={ e => { setMeetingDate(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="time" value={meetingTime} onChange={ e => { setMeetingTime(e.target.value); setEdited(true) } }/></td>
            <td><button className={styles.saveBtn} disabled={disableBtn} onClick={async () => {
                setDisableBtn(true)
                setTimeout(() => {
                    setDisableBtn(false)
                }, 5000)

                let data = {
                    id: props.card.id,
                    companyName: companyName,
                    phone: phone,
                    contactPerson: contactPerson,
                    mail: mail,
                    sendKPDate: sendKPDate,
                    firstCallComment: firstCallComment,
                    secondCallComment: secondCallComment,
                    meetingDate: meetingDate,
                    meetingTime: meetingTime,
                    firstCall: firstCall,
                    firstCallTime: firstCallTime,
                    secondCallTime: secondCallTime,
                    secondCall: secondCall,
                    categoryId: category,
                    userId: Number(localStorage.getItem('user id'))
                };

                let token = localStorage.getItem("auth token");
                await axios({
                    method: 'post',
                    data: data,
                    url: `${globals.productionServerDomain}/updateCallCenterRow`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    if(res.data === true){
                        setEdited(false);
                    }
                })
            }}>Сохранить</button></td>
        </tr>
    )
}
