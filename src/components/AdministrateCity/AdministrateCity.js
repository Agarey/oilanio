import styles from '../../../styles/components/CreateTeacherCard.module.css'
import Link from "next/link";
import React, {useState, useEffect} from "react";
import classnames from 'classnames';
import globals from "../../globals";

const axios = require('axios').default;

export default function AdministrateCity(props) {
    const [filters, setFilters] = useState([]);
    const [name, setName] = useState()
    const cities = filters[0]
    // const lastId = cities?.length
    // const newId = lastId + 1
    // const citiesId = cities?.id
    // const citiesSort = cities?.sort((a, b) => b - a)
    // const citiesLastElement = citiesSort?.[citiesSort?.length - 1]




    // const [showInfo, setShowInfo] = useState(false)
    // const [create, setCreate] = useState(false)
    // const [fullname, setFullname] = useState("");
    // const [description, setDescription] = useState("");
    // const [imgFile, setImgFile] = useState(null);
    // const [courseId, setCourseId] = useState([])
    // const [selectedCourseId, setSelectedCourseId] = useState()

    

    
    // const loadCourses = async () => {
    //     await axios({
    //       method: "get",
    //       url: `${globals.productionServerDomain}/courses`,
    //     })
    //       .then(function (res) {
    //         setCourseId(res.data);
    //         console.log(res.data)
    //       })
    //       .catch((err) => {
    //         alert("Произошла ошибка при загрузке списка центров!");
    //       });
    //   };
    const loadFilters = async () => {
        // setFiltersLoading(true)
        let result = await axios.get(`${globals.productionServerDomain}/filters`);
        setFilters(result.data)
        // setFiltersLoading(false)
    }

    let maxCityId = 0

    useEffect(async () => {
        loadFilters()


        
      }, []);

      cities?.forEach(city => {
        if (city.id > maxCityId){
            maxCityId = city.id
          }
        }
      );
      console.log('maxSerfId', maxCityId)
      console.log('tutorSerfs', cities)
      console.log('new id', id)
      let lastCity = cities?.slice(-1)
    //   console.log()
      let id = maxCityId + 1;
    //   let title = sertificateTitle;
    //   let tutor_id = props.tutor.id;

    //   let formData = new FormData();
    //   formData.append('file', imgFile);


      const CreateCity = () => {
        // let formData = new FormData();
        // formData.append('file', imgFile);

        // axios({
        //     method: "post",
        //     url: `${globals.ftpDomain}/CreateCity`,
        //     data: formData,
        //     headers: {"Content-Type": "multipart/form-data"},
        // })
        axios({
                    method: 'post',
                    url: `${globals.productionServerDomain}/CreateCity`,
                    // headers: {
                    //     'Authorization': `Bearer ${JSON.parse(localStorage.getItem("auth token")).token}`
                    // },
                    data: {
                        name: name,
                        id: id
                        // id: 999
                    },
                }).then(res => {
                    console.log('data',res.data),
                    console.log("Status:" + res.status);
                    location.reload()
                });
            }

    return (
        <div className={styles.teacherCard} >
            <div>
                <input
                    type="text"
                    className={styles.inputFile}
                    onChange={function(e){
                        setName(e.target.value);
                        // console.log(filters)
                        console.log(cities)
                        // console.log(citiesLastElement)
                        // console.log("citiesId>>>", citiesId)
                        // console.log(newId)
                        console.log('maxSerfId', maxCityId)
                        console.log('tutorSerfs', cities)
                        console.log('new id', id)
                    }}
                />
            </div>
            <div>
                <button onClick={() => {
                    CreateCity()
                }}>
                    Создать
                </button>
            </div>
        </div>
    )
            }
