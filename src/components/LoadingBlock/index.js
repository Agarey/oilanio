import styles from './LoadingBlock.module.css'
import {Image} from "react-bootstrap";

const LoadingBlock = () => {
    return (
        <div className={styles.container}>
            <Image src={'/loader.gif'} style={{height: 64}}/>
        </div>
    )
}

export default LoadingBlock;