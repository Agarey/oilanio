import styles from './style.module.css'
import {Image} from "react-bootstrap";

const WhyUs = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.titleBlock}>
                    <Image src={'/bookmark-fav-dynamic-color.png'} className={styles.titleImg}/>
                    <span className={styles.title}>Почему мы?</span>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.wrapperItem}>
                        <Image src={'/whyus1.png'} className={styles.itemImage}/>
                        <div className={styles.itemContent}>
                            <span className={styles.itemTitle}>Система подбора</span> <br/>
                            <span className={styles.itemSubtitle}>Фильтрация позволяет найти любой курс за считанные секунды подходящие по цене, по месту и по рейтингу</span>
                        </div>
                    </div>
                    <div className={styles.wrapperItem}>
                        <Image src={'/whyus2.png'} className={styles.itemImage}/>
                        <div className={styles.itemContent}>
                            <span className={styles.itemTitle}>Отзывы</span> <br/>
                            <span className={styles.itemSubtitle}>Отзывы и оценки курсов позволят подобрать самые подходящие курсы и преподавателей за короткий срок</span>
                        </div>
                    </div>
                    <div className={styles.wrapperItem}>
                        <Image src={'/whyus3.png'} className={styles.itemImage}/>
                        <div className={styles.itemContent}>
                            <span className={styles.itemTitle}>Контроль качества</span> <br/>
                            <span className={styles.itemSubtitle}>У каждого курса формируется рейтинг исходя из отзывов студентов, благодаря которому курс будет подниматься выше в списке</span>
                        </div>
                    </div>
                    <div className={styles.wrapperItem}>
                        <Image src={'/whyus4.png'} className={styles.itemImage}/>
                        <div className={styles.itemContent}>
                            <span className={styles.itemTitle}>Система оповещений</span> <br/>
                            <span className={styles.itemSubtitle}>Telegram-бот для уведомления о новых клиентах и всех обновлениях на образовательной платформе</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.rightSide}>
                <Image src={'/whyus_hands.png'} className={styles.image}/>
            </div>
        </div>
    )
}

export default WhyUs;