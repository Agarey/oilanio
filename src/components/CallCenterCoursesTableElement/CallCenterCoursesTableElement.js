import styles from '../../../styles/components/CallCenterElement.module.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import globals from "../../globals";
import classnames from "classnames"

export default function CallCenterCoursesTableElement(props){
    const [edited, setEdited] = useState(false)
    const [companyName, setCompanyName] = useState()
    const [phone, setPhone] = useState()
    const [contactPerson, setContactPerson] = useState()
    const [mail, setMail] = useState()
    const [categories, setCategories] = useState()
    const [category, setCategory] = useState()
    const [disableBtn, setDisableBtn] = useState(false)


    useEffect( () => {
        axios.post(`${globals.productionServerDomain}/crmCourseCategories`).then(res => {
            setCategories(res.data);
            console.log(res);
        })
    }, [])
    return(
        <tr className={classnames(styles.rows, edited ? styles.edited : null)}>
            <td ><input className={styles.tableInput} type="text" value={companyName} onChange={ e => { setCompanyName(e.target.value); setEdited(true) } }/></td>
            <td >
                <select className={styles.tableInput} name="" id="" onChange={e => setCategory(e.target.value)}>
                    {
                        categories !== undefined ? categories.map(item => <option value={item.id}>{item.name}</option>) : null
                    }
                </select></td>
            <td ><input className={styles.tableInput} type="text" value={contactPerson} onChange={ e => { setContactPerson(e.target.value); setEdited(true) } }/></td>
            <td ><input className={styles.tableInput} type="text" value={phone} onChange={ e => { setPhone(e.target.value); setEdited(true) } }/></td>
            <td ><input className={styles.tableInput} type="text" value={mail} onChange={ e => { setMail(e.target.value); setEdited(true) } }/></td>
            <td ><button className={styles.saveBtn} disabled={disableBtn} onClick={async () => {
                setDisableBtn(true)
                setTimeout(() => {
                    setDisableBtn(false)
                }, 5000)
                let data = {
                    companyName: companyName,
                    phone: phone,
                    contactPerson: contactPerson,
                    mail: mail,
                    categoryId: category
                };

                let token = localStorage.getItem("auth token");

                await axios({
                    method: 'post',
                    url: `${globals.productionServerDomain}/callCenterAddCenter`,
                    data: data,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    if(res.data === true){
                        location.reload()
                    }
                });

            }}>Сохранить</button></td>
        </tr>
    )
}
