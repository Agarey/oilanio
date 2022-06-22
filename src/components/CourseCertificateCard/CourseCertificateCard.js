import styles from "../../../styles/components/CourseCertificateCard.module.css";

function CourseCertificateCard (props){
    return (
        <div className={styles.tabCourseCard} >
            <div className={styles.image} style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80')",
                backgroundSize: 'cover',
            }}>

            </div>
        </div>
    )
}

export  default CourseCertificateCard;
