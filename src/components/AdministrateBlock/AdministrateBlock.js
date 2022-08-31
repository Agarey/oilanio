

import {useEffect, useState} from 'react'
import CenterSection from '../CenterSection/CenterSection'
import CenterAccountSection from '../CenterAccountSection/CenterAccountSection'

import globals from "../../globals";
import CenterServiceSection from '../CenterServiceSection/CenterServiceSection';
import TutorSection from '../TutorSection/TutorSection';
import TutorAccountSection from '../TutorAccauntSection/TutorAccauntSection';
import TutorServiceSection from '../TutorServiceSection/TutorServiceSection';
import Stock from '../AdministrateStock/AdministrateStock';
import AdministrateCreateTeacher from '../AdministrateCreateTeacher/AdministrateCreateTeacher';
import AdministrateCity from '../AdministrateCity/AdministrateCity';
import AdministrateSertificates from '../AdministrateSertificates/AdministrateSertificates';

const AdministrateBlock = () => {

    const [currentSection, setCurrentSection] = useState();

    const getCurrentSection = () => {
        switch(currentSection){
            case 'choose':
                return(<></>)
            case 'center':
                return(<CenterSection/>)
            case 'center-account':
                return(<CenterAccountSection/>)
            case 'center-service':
                return(<CenterServiceSection/>)
            case 'tutor':
                return(<TutorSection/>)
            case 'tutor-account':
                return(<TutorAccountSection/>)
            case 'tutor-service':
                return(<TutorServiceSection/>)
            case 'stock':
                return(<Stock/>)
            case 'teacher':
                return(<AdministrateCreateTeacher/>)
            case 'cities':
                return(<AdministrateCity/>)
            case 'sertificates':
                return(<AdministrateSertificates/>)
            default:
                return(<></>)
        }
    }

    return (
        <div style={{width: '80%'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: '3%',
                fontSize: 28,
                fontWeight: 700
            }}>
                <h3>Страница создания</h3>
                <select value={currentSection} onChange={e => setCurrentSection(e.target.value)}>
                    <option value='choose'>Выберите направление</option>
                    <option value='center'>Центр</option>
                    <option value='center-account'>Учетка центра</option>
                    <option value='center-service'>Услуга центра</option>
                    <option value='tutor'>Репетитор</option>
                    <option value='tutor-account'>Учетка репетитора</option>
                    <option value='tutor-service'>Услуга репетитора</option>
                    <option value='stock'>Создать акцию</option>
                    <option value='teacher'>Создать карточку учителя</option>
                    <option value='cities'> Создать город </option>
                    <option value='sertificates'>Создать сертификат</option>
                </select>
            </div>

            <div>
                {
                    getCurrentSection()
                }
            </div>
        </div>
        
    )
}

export default AdministrateBlock;
