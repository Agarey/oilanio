import styles from '../../../styles/components/FooterLink.module.css'

export default function FooterLink(props) {
    return (
        <div className={styles.container}>
            <a href={props.route}>{props.name}</a>
        </div>
    )
}