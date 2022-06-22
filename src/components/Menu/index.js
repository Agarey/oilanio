import styles from "./style.module.css"
import classnames from 'classnames'

export default function CabinetMenu(props){
    return(
        <div className={styles.container}>
            <ul className={styles.menuList}>
                {props.items.map(item => (
                    <li
                        key={item.index}
                        className={classnames(styles.menu_item, props.activeItemIndex === item.index ? styles.active : '')}
                        onClick={() => {
                            props.setActiveItemCallback(item.index);
                        }}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}