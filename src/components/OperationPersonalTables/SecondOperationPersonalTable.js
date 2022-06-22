import styles from '../../../styles/components/CallCenterElement.module.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import globals from "../../globals";
import classnames from 'classnames'

export default function SecondOperationPersonalTable(props){
    const [edited, setEdited] = useState(false)

    const [companyName, setCompanyName] = useState(props.card.center_name)
    const [phone, setPhone] = useState(props.card.center_phone)
    const [contactPerson, setContactPerson] = useState(props.card.contact_name)
    const [mail, setMail] = useState(props.card.center_email)

    const [contractSignedDate, setContractSignedDate] = useState(props.card.contract_sign_date !== null ? props.card.contract_sign_date : null)
    const [infoCollectionDate, setInfoCollectionDate] = useState(props.card.data_collection_date !== null ? props.card.data_collection_date : null)
    const [expectedResult, setExpectedResult] = useState(props.card.expected_result)
    const [startRequirements, setStartRequirements] = useState(props.card.start_requirements)
    const [courseDuration, setCourseDuration] = useState(props.card.duration)
    const [courseAges, setCourseAges] = useState(props.card.ages)
    const [courseType, setCourseType] = useState(props.card.type)
    const [courseFormat, setCourseFormat] = useState(props.card.format)
    const [courseDesc, setCourseDesc] = useState(props.card.course_description)
    const [coursePrice, setCoursePrice] = useState(props.card.price)
    const [courseSchedule, setCourseSchedule] = useState(props.card.schedule)
    const [courseTitle, setCourseTitle] = useState(props.card.title)
    // const [courseTeachersInfo, setCourseTeachersInfo] = useState('Олег - сто лет преподает, IELTS 3')
    const [centerDesc, setCenterDesc] = useState(props.card.center_description)
    const [centerAddress, setCenterAddress] = useState(props.card.address)
    const [centerInst, setCenterInst] = useState(props.card.instagram)
    const [centerFacebook, setCenterFacebook] = useState(props.card.facebook)
    const [centerWebsite, setCenterWebsite] = useState(props.card.website)
    const [centerPhone, setCenterPhone] = useState(props.card.phone)
    const [centerLogo, setCenterLogo] = useState(props.card.img_src)
    const [placementDate, setPlacementDate] = useState(props.card.placement_date !== null ? props.card.placement_date : null)


    const [disableBtn, setDisableBtn] = useState(false)

    const [category, setCategory] = useState(props.card.center_category_id)
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
                <select name="" id="" value={category} className={styles.tableInput} onChange={ e => { setCategory(e.target.value); setEdited(true) } }>
                    {
                        categories !== undefined ? categories.map(item => <option value={item.id}>{item.name}</option>) : null
                    }
                </select></td>
            <td><input className={styles.tableInput} type="text" value={contactPerson} onChange={ e => { setContactPerson(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={phone} onChange={ e => { setPhone(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={mail} onChange={ e => { setMail(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="date" value={contractSignedDate} onChange={ e => { setContractSignedDate(e.target.value); setEdited(true) } }/></td>
            <t><input className={styles.tableInput} type="date" value={infoCollectionDate} onChange={ e => { setInfoCollectionDate(e.target.value); setEdited(true) } }/></t>
            <td><input className={styles.tableInput} type="text" value={expectedResult} onChange={ e => { setExpectedResult(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={startRequirements} onChange={ e => { setStartRequirements(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={courseDuration} onChange={ e => { setCourseDuration(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={courseAges} onChange={ e => { setCourseAges(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={courseType} onChange={ e => { setCourseType(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={courseFormat} onChange={ e => { setCourseFormat(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={courseDesc} onChange={ e => { setCourseDesc(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={coursePrice} onChange={ e => { setCoursePrice(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={courseSchedule} onChange={ e => { setCourseSchedule(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={courseTitle} onChange={ e => { setCourseTitle(e.target.value); setEdited(true) } }/></td>
            {/*<td><input className={styles.tableInput} type="text" value={courseTeachersInfo} onChange={ e => { setCourseTeachersInfo(e.target.value); setEdited(true) } }/></td>*/}
            <td><input className={styles.tableInput} type="text" value={centerDesc} onChange={ e => { setCenterDesc(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={centerAddress} onChange={ e => { setCenterAddress(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={centerInst} onChange={ e => { setCenterInst(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={centerFacebook} onChange={ e => { setCenterFacebook(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={centerWebsite} onChange={ e => { setCenterWebsite(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={centerPhone} onChange={ e => { setCenterPhone(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={mail} onChange={ e => { setMail(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="text" value={centerLogo} onChange={ e => { setCenterLogo(e.target.value); setEdited(true) } }/></td>
            <td><input className={styles.tableInput} type="date" value={placementDate} onChange={ e => { setPlacementDate(e.target.value); setEdited(true) } }/></td>
            <td><button className={styles.saveBtn} disabled={disableBtn} onClick={async () => {
                setDisableBtn(true)
                setTimeout(() => {
                    setDisableBtn(false)
                }, 5000)

                let data = {
                    id: props.card.id,
                    companyName: companyName,
                    categoryId: category,
                    contactPerson: contactPerson,
                    phone: phone,
                    mail: mail,
                    contractSignedDate: contractSignedDate,
                    infoCollectionDate: infoCollectionDate,
                    expectedResult: expectedResult,
                    startRequirements: startRequirements,
                    courseDuration: courseDuration,
                    courseAges: courseAges,
                    courseType: courseType,
                    courseFormat: courseFormat,
                    courseDesc: courseDesc,
                    coursePrice: coursePrice,
                    courseSchedule: courseSchedule,
                    courseTitle: courseTitle,
                    centerDesc: centerDesc,
                    centerAddress: centerAddress,
                    centerInst: centerInst,
                    centerFacebook: centerFacebook,
                    centerWebsite: centerWebsite,
                    centerPhone: centerPhone,
                    centerLogo: centerLogo,
                    placementDate: placementDate
                }

                let token = localStorage.getItem("auth token");
                await axios({
                    method: 'post',
                    data: data,
                    url: `${globals.productionServerDomain}/updateOperationPersonal2Row`,
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
