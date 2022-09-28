import React, {useState} from "react";
import styles from "../../../styles/components/content/course.module.css";
import {default as axios} from "axios";
import globals from "../../globals";

export default function FeedbackForm(props){
    const [feedbackStars, setFeedbackStars] = useState(5);
    const [clickedFeedbackStars, setClickedFeedbackStars] = useState(5)
    const [fullname, setFullname] = useState('')
    const [feedbackMessage, setFeedbackMessage] = useState('')
    const [feedbackStarsOldState, setFeedbackStarsOldState] = useState(1);
    const [feedbackStarsComment, setFeedbackStarsComment] = useState('Ужасный курс')
    const [errorMessage, setErrorMessage] = useState('')

    return(
        <div className={styles.feedbackInputArea}>
            <div style={{width: '100%', marginBottom: 10}}>
                <p className={styles.feedbackSubtitle} style={{fontSize: '18px'}}>Оставьте ваш персональный отзыв о данном курсе</p>
            </div>
            <div >
                <div className={styles.feedbackLeftBlock} style={{width: props.feedbackpage !== undefined ? '100%' : null}}>
                    {props.feedbackpage !== undefined ? null : (
                        <>
                            <input type="text" className={styles.feedbackInput} placeholder={'Имя Фамилия'} required={true}
                                   onChange={event => setFullname(event.target.value)}
                            />
                        </>
                    )}
                    <textarea className={styles.feedbackTextArea} placeholder={'Мне понравился/не понравился курс потому, что...'}
                              onChange={event => setFeedbackMessage(event.target.value)}
                              required={true}
                    >

                </textarea>
                </div>

                {props.feedbackpage !== undefined ? null : (
                    <>
                        <div className={styles.feedbackRightBlock}>

                            <p className={styles.blueSubtitle}>{props.course_name}</p>
                            <div className={styles.feedbackStarsBlock}>

                                <svg className={styles.feedbackStar}
                                     onMouseEnter={()=>{
                                         setFeedbackStarsOldState(feedbackStars)
                                         setFeedbackStars(1)
                                         setFeedbackStarsComment('Ужасный курс')
                                     }}
                                     onClick={()=>{
                                        setClickedFeedbackStars(1)
                                     }}
                                     height="24px" viewBox="0 -10 511.98685 511" width="24px" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"
                                          fill={feedbackStars>=1 ?  "#412FAE" : 'white'}

                                    />
                                </svg>
                                <svg className={styles.feedbackStar}
                                     onMouseEnter={()=>{
                                         setFeedbackStarsOldState(feedbackStars)
                                         setFeedbackStars(2)
                                         setFeedbackStarsComment('Плохой курс')
                                     }}
                                     onClick={()=>{
                                        setClickedFeedbackStars(2)
                                     }}
                                     height="24px" viewBox="0 -10 511.98685 511" width="24px" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"
                                          fill={feedbackStars>=2 ?  "#412FAE" : 'white'}
                                          stroke={"#412FAE"} stroke-width={"20"} stroke-linecap={"butt"}
                                    />
                                </svg>
                                <svg className={styles.feedbackStar}
                                     onMouseEnter={()=>{
                                         setFeedbackStarsOldState(feedbackStars)
                                         setFeedbackStars(3)
                                         setFeedbackStarsComment('Нормальный курс')
                                     }}
                                     onClick={()=>{
                                        setClickedFeedbackStars(3)
                                     }}
                                     height="24px" viewBox="0 -10 511.98685 511" width="24px" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"
                                          fill={feedbackStars>=3 ?  "#412FAE" : 'white'}
                                          stroke={"#412FAE"} stroke-width={"20"} stroke-linecap={"butt"}
                                    />
                                </svg>
                                <svg className={styles.feedbackStar}
                                     onMouseEnter={()=>{
                                         setFeedbackStarsOldState(feedbackStars)
                                         setFeedbackStars(4)
                                         setFeedbackStarsComment('Хороший курс')
                                     }}
                                     onClick={()=>{
                                        setClickedFeedbackStars(4)
                                     }}
                                     height="24px" viewBox="0 -10 511.98685 511" width="24px" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"
                                          fill={feedbackStars>=4 ?  "#412FAE" : 'white'}
                                          stroke={"#412FAE"} stroke-width={"20"} stroke-linecap={"butt"}
                                    />
                                </svg>
                                <svg className={styles.feedbackStar}
                                     onMouseEnter={()=>{
                                         setFeedbackStarsOldState(feedbackStars)
                                         setFeedbackStars(5)
                                         setFeedbackStarsComment('Отличный курс')
                                     }}
                                     onClick={()=>{
                                        setClickedFeedbackStars(5)
                                     }}
                                     height="24px" viewBox="0 -10 511.98685 511" width="24px" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"
                                          fill={feedbackStars>=5 ?  "#412FAE" : 'white'}
                                          stroke={"#412FAE"} stroke-width={"20"} stroke-linecap={"butt"}
                                    />
                                </svg>
                            </div>
                            <div style={{width: "100%", display: 'flex', marginTop: '20px'}}>
                            <span className={styles.feedbackBtn}
                                  onClick={()=>{
                                      if(fullname.length > 0 && feedbackMessage.length > 0){
                                          let data = {
                                              fullname: fullname,
                                              message: feedbackMessage,
                                              rating: clickedFeedbackStars,
                                              subcourse_id: props.subcourse_id,
                                              course_id: props.course_id,
                                              target_role: props.target_role
                                          }

                                          axios.post(`${globals.productionServerDomain}/feedbacks/`, data).then(
                                              res => {
                                                  if(res.status === 201){
                                                      location.reload()
                                                  }
                                              }
                                          );
                                      } else{
                                          setErrorMessage('Заполните все поля!')
                                      }
                                  }}
                            >
                                Оставить отзыв
                            </span>
                            </div>
                            <span><b>{errorMessage}</b></span>
                        </div>
                    </>
                )}
            </div>


            {props.feedbackpage !== undefined ?  (
                <>
                    <div className={styles.feedbackRightBlock}>
                        <div style={{width: "100%", display: 'flex', marginTop: '20px'}}>
                            <span className={styles.feedbackBtn}
                                  onClick={()=>{
                                      let data = {
                                          fullname: fullname,
                                          message: feedbackMessage,
                                          rating: clickedFeedbackStars,
                                          subcourse_id: props.subcourse_id,
                                          course_id: props.course_id,
                                          target_role: props.target_role
                                      }

                                      axios.post(`${globals.productionServerDomain}/feedbacks/`, data).then(
                                          res => {
                                              if(res.status === 201){
                                                  location.reload()
                                              }
                                          }
                                      );
                                  }}
                            >
                                Оставить отзыв
                            </span>
                        </div>
                    </div>
                </>
            ) : null}

        </div>
    )
}