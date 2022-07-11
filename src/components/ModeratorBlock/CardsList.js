import React from "react";
import styles from './ModeratorBlock.module.css'
import ModerateCourseCard from "../ModerateCourseCard/ModerateCourseCard";

export default function CardsList(props) {

    





  return (
      <div className={styles.courses_block}>
        {" "}
        {props.currentCards.map((course) => {
          if (course.title !== "test") {
            {/* console.log(course) */}
            return (
              <div style={{ marginLeft: "5%", marginRight: "5%" }}>
                <ModerateCourseCard
                  setLoadingModal={props.setLoadingModal}
                  course={course}
                  showApplicationModal={true}
                />
              </div>
            );
          }
        })}
      </div>
  )
}

 //                  <CardsList 
 //                    courseCards={currentCards} 
 //                    redCheck={redCheck} 
 //                    yellowCheck={yellowCheck}
 //                    verificatedCards={verificatedCards}
 //                    notVerificatedCards={notVerificatedCards}
 //                    findByCenter={findByCenter}
 //                    selectedCenterId={selectedCenterId}
 //                    allCards={allCards}
 //                    setLoadingModal={setLoadingModal} />


//  courseCards.length > 0 && (

//     <div className={styles.courses_block}>
//          {
//              courseCards.map(course => {
//                  const str = String(course.img_src);
//                  const substr = 'realibi';
//                  const checkLink = str.includes(substr);
//                  if(course.title !== 'test'){
//                      if (redCheck == true) {
//                          if (!course.title || !course.addresses || !course.ages || !course.category || !course.course_desc || !course.course_title || !course.description || !course.format || !course.img_src || !course.phones || !course.price || !course.schedule || !course.type){
//                              return (
//                                  <div style={{marginLeft: '5%', marginRight: '5%'}}>
//                                      <ModerateCourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
//                                  </div>
//                              )
//                          }
//                      }
//                      if (yellowCheck == true) {
//                          if (((course.title == course.description) && course.title) || ((course.title == course.course_desc) && course.title) || ((course.description == course.course_desc) && course.description) || course.ages == " - " || (course.img_src && !checkLink)){
//                              return (
//                                  <div style={{marginLeft: '5%', marginRight: '5%'}}>
//                                      <ModerateCourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
//                                  </div>
//                              )
//                          }
//                      }
//                      if (verificatedCards == true) {
//                          if (course.verificated){
//                              return (
//                                  <div style={{marginLeft: '5%', marginRight: '5%'}}>
//                                      <ModerateCourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
//                                  </div>
//                              )
//                          }
//                      }
//                      if (notVerificatedCards == true) {
//                          if (!course.verificated){
//                              return (
//                                  <div style={{marginLeft: '5%', marginRight: '5%'}}>
//                                      <ModerateCourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
//                                  </div>
//                              )
//                          }
//                      }
//                      if (findByCenter == true) {
//                          if (selectedCenterId == course.course_id){
//                              return (
//                                  <div style={{marginLeft: '5%', marginRight: '5%'}}>
//                                      <ModerateCourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
//                                  </div>
//                              )
//                          }
//                      }
//                      if (allCards == true) {
//                          return (
//                          <div style={{marginLeft: '5%', marginRight: '5%'}}>
//                              <ModerateCourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
//                          </div>
//                      )
//                  }


//                  }
//              })
//          }
//      </div>
//  )
// }
// {
//  coursesLoading ? (<LoadingBlock/> ) : (
//      showUps && (courseCards.length < 1 ? <CourseSearchResultIsNotDefind catalog={true}/> : null)
//  )
// }


// </div>
// )
 