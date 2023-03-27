import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import styles from './index.module.css'
import globals from "../../../../../src/globals";
import axios from "axios";
import HeaderTeacher from "../../../../../src/components/new_HeaderTeacher/new_HeaderTeacher";
import { Image } from "react-bootstrap";
import GoToLessonWithTimerComponent from "../../../../../src/components/GoToLessonWithTimerComponent/GoToLessonWithTimerComponent";

const createCourse = () => {
  const router = useRouter();
  const teacherUrl = router.query.url
  const [teacher, setTeacher] = useState([])
  const [baseDataLoaded, setBaseDataLoaded] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])
  const [step, setStep] = useState(1)
  const [subject, setSubject] = useState(1)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [program, setProgram] = useState()
  const [programTitle, setProgramTitle] = useState('')
  const [programType, setProgramType] = useState('individual')
  const [programLessCount, setProgramLessCount] = useState('1 занятие')
  const [programSchedule, setProgramSchedule] = useState('Понедельник')
  const [programLessTime, setProgramLessTime] = useState('16:30 - 18:00')
  const [viewModal, setViewMidal] = useState(false)

  const isInMainPage = true;

  useEffect(() => {
    if (!baseDataLoaded || !teacher) {
      loadBaseData()
      setBaseDataLoaded(true)
    }
    console.log('teacherUrl', teacherUrl)
    console.log('teacher', teacher)

  }, [teacherUrl, teacher]);

  const loadBaseData = async () => {
    let data = teacherUrl
    let getTeacherByUrl = await axios.post(`${globals.productionServerDomain}/getTeacherByUrl/` + data)
    const teacherIdLocal = getTeacherByUrl['data'][0]?.id
    console.log('teacherIdLocal', teacherIdLocal)
    setTeacher(getTeacherByUrl['data'][0])
    let subjects = await axios.get(`${globals.productionServerDomain}/getCategories`)
    setCourseCategories(subjects.data);
  }

  const handleSubmit = () => {
    if (step === 1 && subject && title && description) {
      setStep(2)
    } else if (step === 2 && programTitle && programType) {
      setViewMidal(true)
      createNewCourse()

    }
  }

  const generateUrl = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let url = '';
    for (let i = 0; i < length; i++) {
      url += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return url;
  }

  const courseUrl = generateUrl(10);

  const createNewCourse = () => {
    const courseUrl = generateUrl(10);

    const courseData = {
      course: {
        title: title,
        description: description,
        courseUrl: courseUrl,
        teacherId: teacher?.id,
        categoryId: subject,
      },
      program: {
        programTitle: programTitle,
        programType: programType,
      }
    };

    console.log('courseData', courseData)

    axios.post(`${globals.productionServerDomain}/createCourseAndProgram/`, courseData)
      .then(response => {
        console.log(response.data);
        setProgram(response.data.programId)
        // handle success
      })
      .catch(error => {
        console.log(error.response.data);
        // handle error
      });

  }

  return <>
    <div className={styles.container}>
      <HeaderTeacher
        white={true}
        url={teacherUrl}
        teacher={teacher}
        isInMainPage={isInMainPage}
      />
      <GoToLessonWithTimerComponent isTeacher={true} url={router.query.url} />
      <div className={styles.modal} style={viewModal ? { display: 'flex' } : { display: 'none' }}>
        <h1>Поздравляем, вы создали новый курс</h1>
        <p>Теперь вам нужно добавить уроки к программе занятий и вы можете приступать к обучению</p>
        <div className={styles.modal_button__wrapper}>
          <button onClick={() => router.push(`/cabinet/teacher/${teacherUrl}/createLesson?program=${program}`)}>Добавить уроки</button>
          <span onClick={() => router.push(`/cabinet/teacher/${teacherUrl}/myCourses`)}>Спасибо, позже</span>
        </div>
      </div>
      <div className={styles.createCourse}>
        {step === 1 && (
          <>
            <div className={styles.stepOne}>
              <h1>Создание курса</h1>
              <div className={styles.contentWrapper}>
                <div className={styles.input_container}>
                  <p>Выберите предмет</p>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                    {courseCategories.map(category => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.input_container}>
                  <p>Название курса</p>
                  <input placeholder="пр. Математика для 9 класса" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className={styles.input_container}>
                  <p>Описание курса</p>
                  <textarea placeholder="пр. Проходим логарифмы и первообразные" onChange={(e) => setDescription(e.target.value)}></textarea>

                </div>
                <button className={styles.form_button} onClick={() => { handleSubmit() }}>Продолжить</button>
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className={styles.stepTwo}>
              <h1>Добавление программы занятий</h1>
              <div className={styles.contentWrapper}>
                <div className={styles.input_container}>
                  <p>Название программы</p>
                  <input placeholder="Для Алишера 9 класс" onChange={(e) => setProgramTitle(e.target.value)} />
                </div>
                <div className={styles.input_container}>
                  <p>Выберите формат</p>
                  <div className={styles.radio_wrapper}>
                    <div className={styles.wrapperLabel}>
                      <input
                        className={styles.custom_radio}
                        id='group'
                        type="radio"
                        name="programType"
                        value="group"
                        checked={programType === 'group'}
                        onChange={(e) => setProgramType(e.target.value)}
                      />
                      <label htmlFor="group">Групповая</label>
                    </div>
                    <div className={styles.wrapperLabel}>
                      <input
                        className={styles.custom_radio}
                        id='individual'
                        type="radio"
                        name="programType"
                        value="individual"
                        checked={programType === 'individual'}
                        onChange={(e) => setProgramType(e.target.value)}
                      />
                      <label htmlFor="individual"> Индивидуальная </label>
                    </div>
                  </div>
                </div>
                <div className={styles.input_container}>
                  <p>Количество занятий в неделю</p>
                  <div className={styles.input_with_checkbox}>
                    <select value="1">
                      <option value="1">{programLessCount}</option>
                    </select>
                    <div className={styles.wrapperLabelCheckbox}>
                      <input className={styles.custom_checkbox} id="skip_1" type="checkbox" />
                      <label htmlFor="skip_1">Пропустить</label>
                    </div>
                  </div>
                </div>
                <div className={styles.input_container}>
                  <p>Расписание занятий</p>
                  <div className={styles.input_with_checkbox}>
                    <input placeholder={programSchedule} />
                    <div className={styles.wrapperLabelCheckbox}>
                      <input className={styles.custom_checkbox} id="skip_2" type="checkbox" />
                      <label htmlFor="skip_2">Пропустить</label>
                    </div>
                  </div>
                </div>
                <div className={styles.input_container}>
                  <p>Время занятий</p>
                  <input placeholder={programLessTime} />
                </div>
                <button className={styles.form_button} onClick={() => { handleSubmit() }}>Создать курс</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  </>;
};

export default createCourse;