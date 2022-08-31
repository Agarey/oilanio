import { useState, useEffect } from "react";
import styles from "./CenterSection.module.css";
// import globals from "../../globals";

const axios = require("axios").default;

const CenterSection = () => {

    const [loading, setLoading] = useState(false);
    const [isLogged, setIsLogged] = useState(true)

    const [title, setTitle] = useState(null);
    const [img_src, setImg_src] = useState(null);
    const [website_url, setWebsite_url] = useState(null);
    const [twogis_link, setTwogis_link] = useState(null);
    const [addresses, setAddresses] = useState(null);
    const [phones, setPhones] = useState(null);
    const [description, setDescription] = useState(null);
    const [subtitle, setSubtitle] = useState(null);
    const [city_id, setCity_id] = useState(null);
    const [filters, setFilters] = useState([]);
    const [url, setUrl] = useState(null);
    const [background_image_url, setBsackground_image_url] = useState(null);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [instagram, setInstagram] = useState(null);
    const [email, setEmail] = useState(null);

    const [disableBtn, setDisableBtn] = useState(false);

    
    useEffect(async ()=>{
        document.title = 'Oilan - База данных'
        setLoading(false)
        setIsLogged(true)

        axios.get(`https://realibi.kz/filters`).then(res => {
            setFilters(res.data);
            // console.log(res.data);
        })

        // loadData()
    }, [])

    // const loadData = () => {
    //     axios({
    //         method: 'post',
    //         url: `${globals.productionServerDomain}/courseCategories`,
    //     }).then(function(res){
    //         setCategories(res.data);
    //     }).catch((err)=>{
    //         alert("Произошла ошибка")
    //         console.log("error")
    //     })
    // }

    const addCenter = async () => {
        const data = {
            title: title,
            img_src: img_src,
            rating: 5,
            subtitle: subtitle,
            website_url: website_url,
            addresses: addresses,
            phones: phones,
            description: description,
            course_category_id: 1,
            city_id: city_id,
            url: url,
            background_image_url: background_image_url,
            hasTeachersInfo: false,
            latitude: 0,
            longitude: 0,
            instagram: instagram,
            email: email,
            is_personal_bank_account: true,
            twogis_link: twogis_link
        }

        await axios({
            method: 'post',
            url: `https://realibi.kz/createCenter`,
            data: data
        }).then(function(res){
            // console.log(`data from server: ${res.data}`)
            alert(res.data)
            // alert("Центр успешно создан")
            console.log("success");
        }).catch((err)=>{
            alert("Произошла ошибка")
            console.log("error")
        })

        setLoading(false)
    }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>Наименование центра:</span>{" "}
        <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>Ссылка на логотип:</span>{" "}
        <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          value={img_src}
          onChange={(e) => setImg_src(e.target.value)}
        />
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>
          Ссылка на вебсайт (если имеется):
        </span>{" "}
        <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          onChange={(e) => setWebsite_url(e.target.value)}
        />
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>
          Ссылка на 2gis (если имеется):
        </span>{" "}
        <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          onChange={(e) => setTwogis_link(e.target.value)}
        />
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>Адреса:</span> <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          onChange={(e) => setAddresses(e.target.value)}
        />
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>Контакты:</span> <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          placeholder={"+7 (000) 000-00-00"}
          onChange={(e) => setPhones(e.target.value)}
        />
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>
          Краткое описание центра:
        </span>{" "}
        <br />
        <textarea
          style={{ width: "50%", height: "100px" }}
          onChange={(e) => setSubtitle(e.target.value)}
          className={styles.wrapperItemInput}
        ></textarea>
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>Полное описание центра:</span>{" "}
        <br />
        <textarea
          style={{ width: "50%", height: "100px" }}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.wrapperItemInput}
        ></textarea>
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>Город:</span> <br />
        <select
          className={styles.wrapperItemInput}
          onChange={(e) => setCity_id(e.target.value)}
        >
          {filters[0] !== undefined
            ? filters[0].map((filterOption) =>
                filterOption.name !== "test" ? (
                  <option value={filterOption.id}>{filterOption.name}</option>
                ) : null
              )
            : null}
        </select>
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>Адрес для url-ссылки:</span>{" "}
        <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>
          Ссылка на фоновую картинку для карточек:
        </span>{" "}
        <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          onChange={(e) => setBsackground_image_url(e.target.value)}
        />
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>
          Координаты Яндекс.Карты:
        </span>{" "}
        <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder={"latitude"}
        />{" "}
        <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder={"longitude"}
        />
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>Инстаграм (если есть):</span>{" "}
        <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>
          Адрес эл. почты для рассылки:
        </span>{" "}
        <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <br />

      <div className={styles.buttonBody}>
        <button
          disabled={disableBtn}
          onClick={() => {
            setDisableBtn(true);
            setTimeout(() => {
              setDisableBtn(false);
            }, 5000);
            setLoading(true);
            addCenter();
          }}
          className={styles.addButton}
        >
          Добавить
        </button>

        {loading ? (
          <span className={styles.loadingMessage}>
            Обработка данных...
            <img
              src="/loader.gif"
              alt="loading.png"
              className={styles.loadingImage}
            />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default CenterSection;
