import styles from '../../../styles/components/CallCenterElement.module.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import globals from "../../globals";
import classnames from 'classnames'

export default function SalerCardTableElement(props){
    const [edited, setEdited] = useState(false)
    const [companyName, setCompanyName] = useState(props.card.center_name)
    const [phone, setPhone] = useState(props.card.center_phone)
    const [contactPerson, setContactPerson] = useState(props.card.contact_name)
    const [mail, setMail] = useState(props.card.center_email)
    const [meetingDate, setMeetingDate] = useState(props.card.meeting_date !== null ? props.card.meeting_date : null)
    const [meetingTime, setMeetingTime] = useState(props.card.meeting_time)
    const [meetingComitted, setMeetingComitted] = useState(props.card.meeting_comitted)
    const [meetingComment, setMeetingComment] = useState(props.card.meeting_comment)
    const [contractStatus, setContractStatus] = useState(props.card.will_conclude_contract)
    const [contractConclusionDate, setContractConclusionDate] = useState(props.card.contract_signing_start_date !== null ? props.card.contract_signing_start_date : null)
    const [category, setCategory] = useState(props.card.center_category_id)

    const [disableBtn, setDisableBtn] = useState(false)

    const [categories, setCategories] = useState()

    useEffect( () => {
        axios.post(`${globals.productionServerDomain}/crmCourseCategories`).then(res => {
            setCategories(res.data);
            console.log(res);
        })
    }, [])
    return(
        <tr className={classnames(styles.rows, edited ? styles.edited : null)}>
            <td>{props.card.id}</td>
            <td><input className={styles.tableInput} type="text" value={companyName} onChange={ e => { setCompanyName(e.target.value); setEdited(true) } }/></td>
            <td>
                <select className={styles.tableInput} name="" id="" value={category} onChange={ e => { setCategory(e.target.value); setEdited(true) } }>
                    {
                        categories !== undefined ? categories.map(item => <option value={item.id}>{item.name}</option>) : null
                    }
                </select></td>
            <td><input className={styles.tableInput} type="text" value={contactPerson} onChange={ e => { setContactPerson(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={phone} onChange={ e => { setPhone(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={mail} onChange={ e => { setMail(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="date" value={meetingDate} onChange={ e => { setMeetingDate(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="time" value={meetingTime} onChange={ e => { setMeetingTime(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="checkbox" checked={meetingComitted} onChange={ e => { setMeetingComitted(!meetingComitted); setEdited(true); } }/></td>
            <td><input className={styles.tableInputComment} type="text" defaultValue={meetingComment} onChange={ e => { setMeetingComment(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="checkbox" checked={contractStatus} onChange={ e => { setContractStatus(!contractStatus); setEdited(true); } }/></td>
            <td><input className={styles.tableInput} type="date" value={contractConclusionDate} onChange={ e => { setContractConclusionDate(e.target.value); setEdited(true) } }/></td>
            <td><button className={styles.saveBtn} disabled={disableBtn} onClick={async () => {
                setDisableBtn(true)
                setTimeout(() => {
                    setDisableBtn(false)
                }, 5000)
                let data ={
                    id: props.card.id,
                    companyName: companyName,
                    contactPerson: contactPerson,
                    phone: phone,
                    mail: mail,
                    meetingDate: meetingDate,
                    meetingTime: meetingTime,
                    meetingComitted: meetingComitted,
                    meetingComment: meetingComment,
                    contractStatus: contractStatus,
                    contractConclusionDate: contractConclusionDate,
                    categoryId: category
                }
                let token = localStorage.getItem("auth token");
                await axios({
                    method: 'post',
                    data: data,
                    url: `${globals.productionServerDomain}/updateSellerRow`,
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
 