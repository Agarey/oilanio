import Head from "next/head";
import Header from "../Header/Header";
import styles from "../../../styles/components/CoursesListItem.module.css";
import Link from "next/link";

export default function CoursesListItem(props) {
    return (
        <div>
            <Link href={'/courses/' + props.url.toLowerCase()}>
                <div className={styles.container}>
                    <p className={styles.courseNameText}>{props.name}</p>
                </div>
            </Link>
        </div>
    )
}