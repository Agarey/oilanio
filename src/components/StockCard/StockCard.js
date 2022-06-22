import styles from "../../../styles/components/StockCard.module.css";
import Link from "next/link";
import React from "react";

function StockCard (props){
    return (
            <div className={styles.stockCard} >
                <div style={{width: '100%'}}>
                    <div className={styles.backgroundImage} style={{backgroundImage: `url("${props.image}")`}}></div>
                    <div className={styles.infoBlock}>
                        <span className={styles.title}>{props.stock.title}</span> <br/>
                        {/*<span className={styles.courseName}>{props.course.courseName}</span> <br/>*/}
                        <div className={styles.descriptionBody}>
                        <span className={styles.description}>
                            {props.stock.text.length < 48 ? (props.stock.text) : (props.stock.text.substr(0, 128).concat('...'))}
                        </span> <br/>
                            <span className={styles.description}>Промокод: <span className={styles.promocode}>Oilan2022</span> </span>
                        </div>
                    </div>
                     <div style={{width: '100%', height: 32}}>
                    <a href={`/course/center/${encodeURIComponent(props.stock.url)}?id=${encodeURIComponent(props.stock.subcourse_id)}`}
                       target="_blank"
                       className={styles.linkButton}
                    >Узнать больше</a>
                </div>
                </div>
               
            </div>
    // <Link href={`/${props.stock.url}?id=${props.stock.subcourse_id}`}>
    //         <div className={styles.stockCard} >
    //             <div className={styles.backgroundImage} style={{backgroundImage: `url("${props.image}")`}}>
    //                 <div className={styles.backHover}>
    //                     <div className={styles.infoBlock}>
    //                         <span className={styles.title}>{props.stock.title}</span> <br/>
    //                         {/*<span className={styles.courseName}>{props.course.courseName}</span> <br/>*/}
    //                         <div className={styles.descriptionBody}>
    //                             <span className={styles.description}>{props.stock.text}</span> <br/> <br/>
    //                             <span className={styles.description}>Промокод: <span className={styles.promocode}>OILAN</span> </span> <br/> <br/>
    //                             <span className={styles.courseName}>Для перехода нажмите в любом месте...</span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //
    //         </div>
    //     </Link>
        // <Link href={`/${props.stock.url}?id=${props.stock.subcourse_id}`}>
        //     <div className={styles.stockCard} >
        //         <div className={styles.backgroundImage} style={{backgroundImage: `url("${props.image}")`}}>
        //             <div className={styles.backHover}>
        //                 <div className={styles.infoBlock}>
        //                     <span className={styles.title}>{props.stock.title}</span> <br/>
        //                     {/*<span className={styles.courseName}>{props.course.courseName}</span> <br/>*/}
        //                     <div className={styles.descriptionBody}>
        //                         <span className={styles.description}>{props.stock.text}</span> <br/> <br/>
        //                         <span className={styles.description}>Промокод: <span className={styles.promocode}>OILAN</span> </span> <br/> <br/>
        //                         <span className={styles.courseName}>Для перехода нажмите в любом месте...</span>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //
        //     </div>
        // </Link>
    )
}

export default StockCard;
