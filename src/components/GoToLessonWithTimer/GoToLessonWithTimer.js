import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./GoToLessonWithTimer.module.css";
import axios from "axios";
import globals from "../../globals";

function GoToLessonWithTimer({closerLesson, hours, minutes, seconds, isTeacher, startLessonLink, startNewLesson, prevCountRefHours, prevCountRefMinutes, prevCountRefSeconds, startLessonLinkStudent, startNewLessonStudent}) {
  const [hour, setHour] = useState()
  const [minute, setMinute] = useState()
  const [second, setSecond] = useState()

  useEffect(() => {
    //фикс дергающегося таймера, наверно
    const hour1 = document.getElementById('hour').textContent;
    const minute1 = document.getElementById('minute').textContent;
    const second1 = document.getElementById('second').textContent;
    setHour(parseInt(hour1, 10))
    setMinute(parseInt(minute1, 10))
    setSecond(parseInt(second1, 10))
    // console.log(hour, "hour");
  }, [seconds])
  return (
      <div className={styles.next_lesson}>
        <div className={styles.next_lesson_content}>
          <div>
            <p>
              Следующее занятие через <span id="hour">{hours ? hours.toString().padStart(2, "0") : prevCountRefHours.toString().padStart(2, "0")}:</span>
              <span id="minute">{minutes ? minutes.toString().padStart(2, "0") : prevCountRefMinutes.toString().padStart(2, "0")}</span>:
              <span id="second">{seconds ? seconds.toString().padStart(2, "0") : prevCountRefSeconds.toString().padStart(2, "0")}</span>
            </p>
            <p>
              Занятие №{closerLesson.lesson_number} {closerLesson.title}
            </p>
          </div>
          <button
            disabled={(hour * 60 + minute) * 60 + second >= 600}
            onClick={() => {
              isTeacher
                ? closerLesson.personal_lesson_link ||
                  closerLesson.default_lesson_link
                  ? startLessonLink(
                      closerLesson.personal_lesson_link
                        ? closerLesson.personal_lesson_link
                        : closerLesson.default_lesson_link
                    )
                  : startNewLesson()
                : (closerLesson.personal_lesson_link || closerLesson.default_lesson_link)?
                startLessonLinkStudent(closerLesson.personal_lesson_link?closerLesson.personal_lesson_link:closerLesson.default_lesson_link):
                startNewLessonStudent() ;
            }}
          >
            Перейти к занятию
          </button>
        </div>
        <img src="https://realibi.kz/file/948723.png" />
      </div>
  )
}

export default GoToLessonWithTimer;
