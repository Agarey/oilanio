import { useState, useEffect } from "react";
import styles from "./CenterAccountSection.module.css";

const axios = require("axios").default;

const CenterAccountSection = () => {

    const [loading, setLoading] = useState(false)
    const [isLogged, setIsLogged] = useState(true)

    const [filters, setFilters] = useState([]);

    const [disableBtnForAcc, setDisableBtnForAcc] = useState(false)
    const [accountLogin, setAccountLogin] = useState('');
    const [accountPassword, setAccountPassword] = useState('');
    const [selectedCenterId, setSelectedCenterId] = useState(0);

    useEffect(async ()=>{
        document.title = 'Oilan - База данных'
        setLoading(false)
        setIsLogged(true)

        axios.get(`https://realibi.kz/filters`).then(res => {
            setFilters(res.data);
            console.log(res.data);
        })

        // loadData()
    }, [])

    const createUser = async () => {
        await axios({
            method: 'post',
            url: `https://realibi.kz/createCenterAccount`,
            data: {
                login: accountLogin,
                password: accountPassword,
                role_id: 4,
                center_id: selectedCenterId
            }
        }).then(function(res){
            alert("Аккаунт успешно добавлен")
            console.log("success");
        }).catch((err)=>{
            alert("Произошла ошибка")
            console.log("error")
        })
    }

    const loadData = () => {
        axios({
            method: 'post',
            url: `${globals.productionServerDomain}/courseCategories`,
        }).then(function(res){
            setCategories(res.data);
        }).catch((err)=>{
            alert("Произошла ошибка")
            console.log("error")
        })
    }






  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>Логин:</span> <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          onChange={(e) => setAccountLogin(e.target.value)}
        />
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>Пароль:</span> <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          onChange={(e) => setAccountPassword(e.target.value)}
        />
      </div>

      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>Центр:</span> <br />
        <select
          className={styles.wrapperItemInput}
          onChange={(e) => setSelectedCenterId(e.target.value)}
        >
          {filters[2] !== undefined
            ? filters[2].map((filterOption) =>
                filterOption.title !== "test" ? (
                  <option value={filterOption.id}>
                    {filterOption.title} ({filterOption.id})
                  </option>
                ) : null
              )
            : null}
        </select>
      </div>
      <br />
      <div className={styles.buttonBody}>
        <button
          disabled={disableBtnForAcc}
          onClick={() => {
            setDisableBtnForAcc(true);
            setTimeout(() => {
              setDisableBtnForAcc(false);
            }, 5000);
            createUser();
          }}
          className={styles.addButton}
        >
          Выдать аккаунт
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

export default CenterAccountSection;
