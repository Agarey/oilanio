import styles from '../../../styles/components/CallCenterElement.module.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import globals from "../../globals";
import classnames from 'classnames'

export default function ThirdOperationPersonalTable(props){
    const [edited, setEdited] = useState(false)

    const [companyName, setCompanyName] = useState(props.card.center_name)
    const [phone, setPhone] = useState(props.card.center_phone)
    const [contactPerson, setContactPerson] = useState(props.card.contact_name)
    const [mail, setMail] = useState(props.card.center_email)

    const [placementDate, setPlacementDate] = useState(props.card.placement_date !== null ? props.card.placement_date :null)
    const [reportSendingDate, setReportSandingDate] = useState(props.card.report_send_date !== null ? props.card.report_send_date :null)
    const [firstCallComments, setFirstCallComments] = useState(props.card.final_call_comment)
    const [secondCallComments, setSecondCallComments] = useState(props.card.repeated_final_call_comment)

    const [conclusionPaymentStatus, setConclusionPaymentStatus] = useState(props.card.will_pay)
    const [tariffPack, setTariffPack] = useState(props.card.tariff_id)
    const [sendingInvoiceForPaymentStatus, setSendingInvoiceForPaymentStatus] = useState(props.card.payment_invoice_sent)
    const [paymentReminderComments, setPaymentReminderComments] = useState(props.card.payment_reminder_comment)
    const [receivingPaymentStatus, setReceivingPaymentStatus] = useState(props.card.payment_received)
    const [providingAccessLKStatus, setProvidingAccessLKStatus] = useState(props.card.account_provided)
    const [paymentDate, setPaymentDate] = useState(props.card.payment_date !== null ? props.card.payment_date :null)

    const [category, setCategory] = useState(props.card.center_category_id)
    const [categories, setCategories] = useState()

    const [disableBtn, setDisableBtn] = useState(false)

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
                <select name="" id="" value={category} className={styles.tableInput} onChange={ e => { setCategory(e.target.value); setEdited(true) } }>
                    {
                        categories !== undefined ? categories.map(item => <option value={item.id}>{item.name}</option>) : null
                    }
                </select></td>
            <td><input className={styles.tableInput} type="text" value={contactPerson} onChange={ e => { setContactPerson(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={phone} onChange={ e => { setPhone(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={mail} onChange={ e => { setMail(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="date" value={placementDate} onChange={ e => { setPlacementDate(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="date" value={reportSendingDate} onChange={ e => { setReportSandingDate(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInputComment} type="text" defaultValue={firstCallComments} onChange={ e => { setFirstCallComments(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInputComment} type="text" defaultValue={secondCallComments} onChange={ e => { setSecondCallComments(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="checkbox" checked={conclusionPaymentStatus} onChange={ e => { setConclusionPaymentStatus(!conclusionPaymentStatus); setEdited(true); } }/></td>
            <td><input className={styles.tableInput} type="text" value={tariffPack} onChange={ e => { setTariffPack(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="checkbox" checked={sendingInvoiceForPaymentStatus} onChange={ e => { setSendingInvoiceForPaymentStatus(!conclusionPaymentStatus); setEdited(true); } }/></td>
            <td><input className={styles.tableInputComment} type="text" defaultValue={paymentReminderComments} onChange={ e => { setPaymentReminderComments(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="checkbox" checked={receivingPaymentStatus} onChange={ e => { setReceivingPaymentStatus(!receivingPaymentStatus); setEdited(true); } }/></td>
            <td><input className={styles.tableInput} type="checkbox" checked={providingAccessLKStatus} onChange={ e => { setProvidingAccessLKStatus(!providingAccessLKStatus); setEdited(true); } }/></td>
            <td><input className={styles.tableInput} type="date" value={paymentDate} onChange={ e => { setPaymentDate(e.target.value); setEdited(true) } }/></td>
            <td><button className={styles.saveBtn} disabled={disableBtn} onClick={async () => {
                setDisableBtn(true)
                setTimeout(() => {
                    setDisableBtn(false)
                }, 5000)
                let data ={
                    id: props.card.id,
                    companyName: companyName,
                    categoryId: category,
                    contactPerson: contactPerson,
                    phone: phone,
                    mail: mail,

                    reportSendingDate: reportSendingDate,
                    firstCallComments: firstCallComments,
                    secondCallComments: secondCallComments,
                    conclusionPaymentStatus: conclusionPaymentStatus,
                    tariffPack: tariffPack,
                    sendingInvoiceForPaymentStatus: sendingInvoiceForPaymentStatus,
                    paymentReminderComments: paymentReminderComments,
                    receivingPaymentStatus: receivingPaymentStatus,
                    providingAccessLKStatus: providingAccessLKStatus,
                    paymentDate: paymentDate
                }
                let token = localStorage.getItem("auth token");
                await axios({
                    method: 'post',
                    data: data,
                    url: `${globals.productionServerDomain}/updateOperationPersonal3Row`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    if(res.data === true){
                        setEdited(false);
                        location.reload()
                    }
                })
            }}>Сохранить</button></td>
        </tr>
    )
}
