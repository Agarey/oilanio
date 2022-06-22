import styles from './style.module.css'
import React, {useState} from "react";
import {SignupToCourseForm} from "../Forms/SignupToCourseForm/SignupToCourseForm";
import ModalWindow from "../Modal/ModalWindow";
import TechSupportButton from "../TechSupportButton";
import {TechSupportForm} from "../Forms/TechSupportForm";
import globals from "../../globals";
import {useRouter} from "next/router";

const StudentCabinetHeader = ({student, ...props}) => {

    const [disabled, setDisabled] = useState(true)

    const [exitingOut, setExitingOut] = useState(false)

    const router = useRouter();

    const [name, setName] = useState(student.name)
    const [phone, setPhone] = useState(student.phone)
    const [mail, setMail] = useState(student.email)
    //const [info, setInfo] = useState(student.info)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return(
        <div className={styles.container}>
            <ModalWindow show={show} handleClose={handleClose} heading={`Служба заботы о пользователях`} body={<TechSupportForm studentAccount={true}/>}/>
            <div className={styles.avatarBlock}>
                <div className={styles.avatar}></div>
            </div>
            <div className={styles.info} style={{marginLeft: 15}}>
                <div className={styles.top}>
                    <input className={styles.titleInput} value={name!=null ? name : 'Имя не указано'} onChange={e => setName(e.target.value)} disabled={disabled}/>
                    <div className={styles.infoList}>
                        <div className={styles.infoListItem}>
                            <span className={styles.subtitle}>Номер телефона:</span>
                            <input className={styles.subtitleInput} value={phone} onChange={e => setPhone(e.target.value)} disabled={disabled}/>
                        </div>
                        <div className={styles.infoListItem}>
                            <span className={styles.subtitle}>Электронная почта:</span>
                            {
                                mail!=null || disabled!=true
                                    ?
                                    <input className={styles.subtitleInput} value={mail} onChange={e => setMail(e.target.value)} disabled={disabled}/>
                                    :
                                    <span className={styles.add} onClick={()=> {
                                        setDisabled(!disabled)
                                    }}>Добавить</span>
                            }
                        </div>
                        {/*<div className={styles.infoListItem} style={{display: 'block'}}>*/}
                        {/*    <span className={styles.subtitle}>Краткая информация:</span>*/}
                        {/*    {*/}
                        {/*        info!=null || disabled!=true*/}
                        {/*            ?*/}
                        {/*            <>*/}
                        {/*                <br/>*/}
                        {/*                <textarea className={styles.textarea} value={info} onChange={e => setInfo(e.target.value)} disabled={disabled}/>*/}
                        {/*            </>*/}
                        {/*            :*/}
                        {/*            <span className={styles.add} onClick={()=> {*/}
                        {/*                setDisabled(!disabled)*/}
                        {/*            }}>Добавить</span>*/}
                        {/*    }*/}
                        {/*</div>*/}
                    </div>

                    {/*<button className={styles.btn} style={{background: disabled ? '#412FAE' : 'green'}} onClick={()=> {*/}
                    {/*    if(disabled!=true){*/}
                    {/*        // logika soxranenia*/}
                    {/*        setDisabled(!disabled)*/}
                    {/*    } else {*/}
                    {/*        setDisabled(!disabled)*/}
                    {/*    }*/}
                    {/*}}>{disabled ? 'Редактировать' : 'Сохранить'}</button>*/}
                </div>

                <button
                    className={styles.actionButton}
                    style={{marginBottom: 10, backgroundColor: '#0016D9'}}
                    onClick={()=>setShow(true)}
                >
                    Тех. поддержка
                </button>

                <button className={styles.actionButton} style={{marginBottom: 10, backgroundColor: '#be0404'}} onClick={()=>{
                    setExitingOut(true)

                    localStorage.removeItem(globals.localStorageKeys.currentStudent)

                    localStorage.removeItem(globals.localStorageKeys.authToken);
                    localStorage.removeItem(globals.localStorageKeys.centerId);
                    localStorage.removeItem(globals.localStorageKeys.currentUserId);
                    localStorage.removeItem(globals.localStorageKeys.roleId);

                    encodeURIComponent(router.push('/login'))
                }}>{exitingOut ? 'Выход...' : 'Выйти'}</button>
            </div>
        </div>
    )
}

export default StudentCabinetHeader;