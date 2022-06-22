import styles from './style.module.css'

export default function CabinetPopularCard(props){
    let title = props.card.title;
    let titleMaxLength = 18;

    return(
        <div className={styles.container}>
            <div className={styles.image_block} style={{backgroundImage: "url('https://realibi.kz/file/606725.png'"}}>

            </div>
            <div className={styles.text_block}>
                <p className={styles.title}>{title.length > titleMaxLength ? title.substr(0, titleMaxLength).concat('...') : title}</p>
                <p className={styles.categoryName}>{props.card.categoryName} ({props.card.isOnline})</p>
                <p className={styles.price}><span className={styles.price_text}>{props.card.price}</span> {props.card.currency}/{props.card.unitOfTime}</p>
                <p className={styles.views_text}><b>{props.card.clicksCount}</b> просмотров(-а)</p>
            </div>
        </div>
    );
}