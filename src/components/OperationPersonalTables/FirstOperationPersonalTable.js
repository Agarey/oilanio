import styles from '../../../styles/components/CallCenterElement.module.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import globals from "../../globals";
import classnames from 'classnames'

export default function FirstOperationPersonalTable(props){
    const [edited, setEdited] = useState(false)
    const [companyName, setCompanyName] = useState(props.card.center_name)
    const [phone, setPhone] = useState(props.card.center_phone)
    const [contactPerson, setContactPerson] = useState(props.card.contact_name)
    const [mail, setMail] = useState(props.card.center_email)
    const [contractStatus, setContractStatus] = useState(props.card.will_conclude_contract)
    const [contractConclusionDate, setContractConclusionDate] = useState(props.card.contract_signing_start_date !== null ? props.card.contract_signing_start_date.split("T")[0] : null)
    const [infoCollectionDate, setInfoCollectionDate] = useState(props.card.data_collection_start_date !== null ? props.card.data_collection_start_date : null)
    const [sendContractStatus, setSendContractStatus] = useState(props.card.contract_send_status)
    const [sendContractComments, setSendContractComments] = useState(props.card.contract_send_comment)
    const [contractAgreedStatus, setContractAgreedStatus] = useState(props.card.contract_agreed)
    const [contractAgreedComments, setContractAgreedComments] = useState(props.card.contract_agreement_comment)
    const [contractSignedStatus, setContractSignedStatus] = useState(props.card.contract_signed)
    const [contractSignedComments, setContractSignedComments] = useState(props.card.contract_signed_comment)
    const [contractSignedDate, setContractSignedDate] = useState(props.card.contract_sign_date !== null ? props.card.contract_sign_date : null)

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
            <td><input className={styles.tableInput} type="checkbox" checked={contractStatus} onChange={ e => { setContractStatus(!contractStatus); setEdited(true); } }/></td>
            <td><input className={styles.tableInput} type="date" value={contractConclusionDate} onChange={ e => { setContractConclusionDate(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="date" value={infoCollectionDate} onChange={ e => { setInfoCollectionDate(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="checkbox" checked={sendContractStatus} onChange={ e => { setSendContractStatus(!setSendContractStatus); setEdited(true); } }/></td>
            <td><input className={styles.tableInputComment} type="text" defaultValue={sendContractComments} onChange={ e => { setSendContractComments(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="checkbox" checked={contractAgreedStatus} onChange={ e => { setContractAgreedStatus(!contractAgreedStatus); setEdited(true); } }/></td>
            <td><input className={styles.tableInputComment} type="text" defaultValue={contractAgreedComments} onChange={ e => { setContractAgreedComments(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="checkbox" checked={contractSignedStatus} onChange={ e => { setContractSignedStatus(!contractSignedStatus); setEdited(true); } }/></td>
            <td><input className={styles.tableInputComment} type="text" defaultValue={contractSignedComments} onChange={ e => { setContractSignedComments(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="date" value={contractSignedDate} onChange={ e => { setContractSignedDate(e.target.value); setEdited(true) } }/></td>
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
                    infoCollectionDate: infoCollectionDate,
                    sendContractStatus: sendContractStatus,
                    sendContractComments: sendContractComments,
                    contractAgreedStatus: contractAgreedStatus,
                    contractAgreedComments: contractAgreedComments,
                    contractSignedStatus: contractSignedStatus,
                    contractSignedComments: contractSignedComments,
                    contractSignedDate: contractSignedDate,
                }
                let token = localStorage.getItem("auth token");
                await axios({
                    method: 'post',
                    data: data,
                    url: `${globals.productionServerDomain}/updateOperationPersonal1Row`,
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
