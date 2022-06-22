import styles from './style.module.css'

const FactCard = ({fact, ...props}) => {
    return (
        <div className={styles.container}>
            <span className={styles.title}>{fact.title}</span>
            <span className={styles.subtitle}>{fact.subtitle}</span>
        </div>
    )
}

export default FactCard;