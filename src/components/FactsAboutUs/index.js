import styles from './style.module.css'
import {Image} from "react-bootstrap";
import {useState} from "react";
import SimpleSlider from "../SimpleSlider/SimpleSlider";

const FactsAboutUs = () => {

    const [facts, setFacts] = useState([
        {
            title: '10',
            subtitle: 'лет опыта в развитии классического бизнеса'
        },
        {
            title: '11',
            subtitle: 'человек в нашей крутой команде'
        },
        {
            title: '350+',
            subtitle: 'размещенных курсов на нашей платформе'
        },
        {
            title: '120+',
            subtitle: 'центров пярмо сейчас работают с нами'
        },
        {
            title: '107',
            subtitle: 'уникальных посещений платформы сегодня'
        },
        {
            title: '10',
            subtitle: 'лет опыта в развитии классического бизнеса'
        },
        {
            title: '11',
            subtitle: 'человек в нашей крутой команде'
        },
        {
            title: '350+',
            subtitle: 'размещенных курсов на нашей платформе'
        },
        {
            title: '120+',
            subtitle: 'центров прямо сейчас работают с нами'
        },
        {
            title: '107',
            subtitle: 'уникальных посещений платформы сегодня'
        },
    ])

    return (
        <div className={styles.container}>
            <div className={styles.titleBlock}>
                <Image src={'/facts.png'} className={styles.titleImage}/>
                <span className={styles.title}>Пару фактов о нас</span>
            </div>

            <SimpleSlider facts={facts}/>

        </div>
    )
}

export default FactsAboutUs;