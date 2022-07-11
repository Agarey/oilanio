import styles from './ModerateCourseCard.module.css'
import Link from "next/link";
import React, {useEffect, useState, useRef} from "react";
import ReactAvatarEditor from "react-avatar-editor";
import {SignupToCourseForm} from "../Forms/SignupToCourseForm/SignupToCourseForm";
import ModalWindow from "../Modal/ModalWindow";
import classnames from 'classnames';
import globals from "../../globals";
import {Image} from "react-bootstrap";

const axios = require('axios').default;

export default function ModerateCourseCard(props) {
    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showContacts, setShowContacts] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editCourseTitle, setEditCourseTitle] = useState(props.course.title);
    const [editCourseLogo, setEditCourseLogo] = useState(props.course.img_src);
    const [editCourseSchedule, setEditCourseSchedule] = useState(props.course.schedule);
    const [editCoursePrice, setEditCoursePrice] = useState(props.course.price);
    const [editCourseCurrency, setEditCourseCurrency] = useState(props.course.currency);
    const [editCourseUOT, setEditCourseUOT] = useState(props.course.unit_of_time);
    const [editCourseCategory, setEditCourseCategory] = useState(props.course.category);
    const [editCourseCategoryId, setEditCourseCategoryId] = useState(props.course.category_id);
    const [editCourseFormat, setEditCourseFormat] = useState(props.course.format);
    const [editCourseAges, setEditCourseAges] = useState(props.course.ages);
    const [editCourseType, setEditCourseType] = useState(props.course.type);
    const [editCourseAddresses, setEditCourseAddresses] = useState(props.course.addresses);
    const [editCourseDescription, setEditCourseDescription] = useState(props.course.description);
    const [editCourseCDescription, setEditCourseCDescription] = useState(props.course.course_desc);
    const [promotions, setPromotions] = useState([])
    const [stocks, setStocks] = useState([]);
    const [promotionsLoaded, setPromotionsLoaded] = useState(false)
    
    const [showPromotions, setShowPromotions] = useState(false)
    const [promotionIndex, setPromotionIndex] = useState(0)
    const [editMode, setEditMode] = useState(false)
    const [savedMode, setSavedMode] = useState(true)
    const [editLogo, setEditLogo] = useState(false)
    const [savedLogo, setSavedLogo] = useState(true)
    const [editSchedule, setEditSchedule] = useState(false)
    const [savedSchedule, setSavedSchedule] = useState(true)
    const [editPrice, setEditPrice] = useState(false)
    const [savedPrice, setSavedPrice] = useState(true)
    const [editCurrency, setEditCurrency] = useState(false)
    const [savedCurrency, setSavedCurrency] = useState(true)
    const [editUOT, setEditUOT] = useState(false)
    const [savedUOT, setSavedUOT] = useState(true)
    const [editCategory, setEditCategory] = useState(false)
    const [savedCategory, setSavedCategory] = useState(true)
    const [editCategoryId, setEditCategoryId] = useState(false)
    const [savedCategoryId, setSavedCategoryId] = useState(true)
    const [editFormat, setEditFormat] = useState(false)
    const [savedFormat, setSavedFormat] = useState(true)
    const [editAges, setEditAges] = useState(false)
    const [savedAges, setSavedAges] = useState(true)
    const [editType, setEditType] = useState(false)
    const [savedType, setSavedType] = useState(true)
    const [editAddresses, setEditAddresses] = useState(false)
    const [savedAddresses, setSavedAddresses] = useState(true)
    const [editDescription, setEditDescription] = useState(false)
    const [savedDescription, setSavedDescription] = useState(true)
    const [editCDescription, setEditCDescription] = useState(false)
    const [savedCDescription, setSavedCDescription] = useState(true)
    const [wordsToShowLength, setWordsToShowLength] = useState(10)
    const [heartValue, setHeartValue] = useState('\u2661')

    const [editAvatar, setEditAvatar] = useState(false);
    const [image, setImage] = useState(props.course.img_src);
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [borderRadius, setBorderRadius] = useState(0);
    const [preview, setPreview] = useState(null);
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(300);
    const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
    const [allowZoomOut, setAllowZoomOut] = useState(false);
    const editorRef = useRef(null);

    const handleNewImage = e => {
        setImage(e.target.files[0]);
    };

    const handleSave = data => {
        const editor = editorRef.current;
        const img = editor.getImageScaledToCanvas().toDataURL();
        const rect = editor.getCroppingRect();
        
        setPreview({
        img,
        rect,
        scale: scale,
        width: width,
        height: height,
        borderRadius: borderRadius
        });
    };

    const handleScale = e => {
        const scale = parseFloat(e.target.value);
        setScale(scale);
    };

    const handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
        setAllowZoomOut(allowZoomOut);
    };

    const rotateLeft = e => {
        e.preventDefault();
        setRotate(rotate - 90);
    };

    const rotateRight = e => {
        e.preventDefault();
        setRotate(rotate + 90);
    };

    const handleBorderRadius = e => {
        const borderRadius = parseInt(e.target.value, 10);
        setBorderRadius(borderRadius);
    };

    const handleXPosition = e => {
        const x = parseFloat(e.target.value);
        setPosition({ ...position, x });
    };

    const handleYPosition = e => {
        const y = parseFloat(e.target.value);
        setPosition({ ...position, y });
    };

    const handleWidth = e => {
        const width = parseInt(e.target.value, 10);
        setWidth(width);
    };

    const handleHeight = e => {
        const height = parseInt(e.target.value, 10);
        setHeight(height);
    };

    const handlePositionChange = position => {
        setPosition(position);
    };

    const [filters, setFilters] = useState([[],[],[]])
    const str = String(props.course.img_src);
    const substr = 'realibi';
    const checkLink = str.includes(substr);
    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    const coursePrice = prettify(props.course.price)
    const [courseDescription, setCourseDecription] = useState(props.course.description === undefined ? "" : props.course.description)
    const [verifyCheck, setVerifyCheck] = useState(props.course.verificated);
    const getCurrentDateTime = () => {
        let currentDate = new Date();

        let dd = currentDate.getDate();
        if(dd < 10) dd = '0' + dd;

        let mm = currentDate.getMonth()+1;
        if(mm < 10) mm = '0' + mm;

        let yy = currentDate.getFullYear();

        let hours = currentDate.getHours();
        let min = currentDate.getMinutes();
        let sec = currentDate.getSeconds();

        return yy + "-" + mm + "-" + dd + " " + hours + ":" + min + ":" + sec;
    }

    useEffect(()=>{
        axios.get(`${globals.productionServerDomain}/filters`).then(res => {
            setFilters(res.data);
            // console.log(res.data);
        });
    }, [])

    useEffect(() => {
        setEditCourseTitle(props.course.title)
        setEditCourseLogo(props.course.img_src)
        setEditCourseSchedule(props.course.schedule)
        setEditCoursePrice(props.course.price)
        setEditCourseCurrency(props.course.currency)
        setEditCourseUOT(props.course.unit_of_time)
        setEditCourseCategory(props.course.category)
        setEditCourseFormat(props.course.format)
        setEditCourseType(props.course.type)
        setEditCourseAges(props.course.ages)
        setEditCourseAddresses(props.course.addresses)
        setEditCourseDescription(props.course.description)
        setEditCourseCDescription(props.course.course_desc)
        setVerifyCheck(props.course.verificated)
    }, [props])

    const updateVerificated = (targetInfo) => {

        let data = {
            id: targetInfo.id,
            verificated: targetInfo.verificated,
        };
        console.log(data)
        axios.post(`${globals.productionServerDomain}/setVerificated/`, {id: targetInfo.id, verificated: targetInfo.verificated}).then(
                alert('Changes saved!')
            )
    }

    const updateSubcourseTitle = (targetInfo) => {

        let data = {
            id: targetInfo.id,
            title: targetInfo.title,
        };
        console.log(data)
        axios.post(`${globals.productionServerDomain}/updateSubcourseTitle/`, {id: targetInfo.id, title: targetInfo.title}).then(
                alert('Changes saved!')
            )
    }

    const updateSubcourseDescription = (targetInfo) => {

        let data = {
            id: targetInfo.id,
            description: targetInfo.description,
        };
        console.log(data)
        axios.post(`${globals.productionServerDomain}/updateSubcourseDescription/`, {id: targetInfo.id, description: targetInfo.description}).then(
                alert('Changes saved!')
            )
    }
    const [imgFile, setImgFile] = useState(null);
    const updateLogoFile = () => {
        let formData = new FormData();
        formData.append('file', imgFile);

        axios({
            method: "post",
            url: `${globals.ftpDomain}/file/upload`,
            data: formData,
            headers: {"Content-Type": "multipart/form-data"},
        })
    }
    const updateCourseDescription = (targetInfo) => {

        let data = {
            id: targetInfo.id,
            description: targetInfo.description,
        };
        console.log(data)
        axios.post(`${globals.productionServerDomain}/updateCourseDescription/`, {id: targetInfo.id, description: targetInfo.description}).then(
                alert('Changes saved!')
            )
    }

    const updateSubcourseLogo = (targetInfo) => {

        let data = {
            id: targetInfo.id,
            img_src: targetInfo.logo,
        };
        console.log(data)
        axios.post(`${globals.productionServerDomain}/updateSubcourseLogo/`, {id: targetInfo.id, img_src: targetInfo.logo}).then(
                alert('Changes saved!')
            )
    }

    const updateCourseAddresses = (targetInfo) => {

        let data = {
            id: targetInfo.id,
            addresses: targetInfo.addresses,
        };
        console.log(data)
        axios.post(`${globals.productionServerDomain}/updateCourseAddresses/`, {id: targetInfo.id, addresses: targetInfo.addresses}).then(
                alert('Changes saved!')
            )
    }

    const updateSubcourseSchedule = (targetInfo) => {

        let data = {
            id: targetInfo.id,
            schedule: targetInfo.schedule,
        };
        console.log(data)
        axios.post(`${globals.productionServerDomain}/updateSubcourseSchedule/`, {id: targetInfo.id, schedule: targetInfo.schedule}).then(
                alert('Changes saved!')
            )
    }

    const updateSubcoursePrice = (targetInfo) => {

        let data = {
            id: targetInfo.id,
            price: targetInfo.price,
            currency: targetInfo.currency,
            unit_of_time: targetInfo.UOT,
        };
        console.log(data)
        axios.post(`${globals.productionServerDomain}/updateSubcoursePrice/`, {id: targetInfo.id, price: targetInfo.price, currency: targetInfo.currency, unit_of_time: targetInfo.UOT}).then(
                alert('Changes saved!')
            )
    }

    const updateSubcourseCategory = (targetInfo) => {

        let data = {
            id: targetInfo.id,
            category_id: targetInfo.category_id,
        };
        console.log(data)
        axios.post(`${globals.productionServerDomain}/updateSubcourseCategory/`, {id: targetInfo.id, category_id: targetInfo.category_id}).then(
                alert('Changes saved!')
            )
    }

    const updateSubcourseFormat = (targetInfo) => {

        let data = {
            id: targetInfo.id,
            format: targetInfo.format,
        };
        console.log(data)
        axios.post(`${globals.productionServerDomain}/updateSubcourseFormat/`, {id: targetInfo.id, format: targetInfo.format}).then(
                alert('Changes saved!')
            )
    }

    const updateSubcourseAges = (targetInfo) => {

        let data = {
            id: targetInfo.id,
            ages: targetInfo.ages,
        };
        console.log(data)
        axios.post(`${globals.productionServerDomain}/updateSubcourseAges/`, {id: targetInfo.id, ages: targetInfo.ages}).then(
                alert('Changes saved!')
            )
    }

    const updateSubcourseType = (targetInfo) => {

        let data = {
            id: targetInfo.id,
            type: targetInfo.type,
        };
        console.log(data)
        axios.post(`${globals.productionServerDomain}/updateSubcourseType/`, {id: targetInfo.id, type: targetInfo.type}).then(
                alert('Changes saved!')
            )
    }

    return (
            <div className={styles.cardBlock}>
                <div className={styles.avatarEditor} style={editAvatar?{display: 'flex', flexDirection:'column',backgroundColor:'white'}:{display:'none'}}>
                  <button className={styles.avatarClose} onClick={() => {
                            setEditAvatar(false);
                        }} >Закрыть</button>
                  <ReactAvatarEditor
                    ref={editorRef}
                    image={image}
                    scale={scale}
                    rotate={0}
                    width={width}
                    height={height}
                    position={position}
                    onPositionChange={setPosition}
                    borderRadius={width / (100 / borderRadius)}
                    border={[125, 50]}
                    color={[0, 0, 0, 0.8]}
                    className="editor-canvas"
                  />
                  <br/>
                  Загрузить новый файл логотипа:
                  <input name="newImage" type="file" onChange={handleNewImage} />
                  <br />
                  Zoom:
                  <input
                    name="scale"
                    type="range"
                    onChange={handleScale}
                    min="0"
                    max="2"
                    step="0.01"
                    defaultValue="1"
                  />
                  <br />
                  
                  <input
                    style={{display:'none'}}
                    name="allowZoomOut"
                    type="checkbox"
                    onChange={handleAllowZoomOut}
                    checked={allowZoomOut}
                  />
                  <br style={{display:'none'}}/>
                  Border radius:
                  <input
                    name="scale"
                    type="range"
                    onChange={handleBorderRadius}
                    min="0"
                    max="50"
                    step="1"
                    defaultValue="0"
                  />
                  <input
                    style={{display:'none'}}
                    name="width"
                    type="number"
                    onChange={handleWidth}
                    min="50"
                    max="400"
                    step="10"
                    value={width}
                  />
                  <input
                    style={{display:'none'}}
                    name="height"
                    type="number"
                    onChange={handleHeight}
                    min="50"
                    max="400"
                    step="10"
                    value={height}
                  />
                  <input
                    style={{display:'none'}}
                    name="scale"
                    type="range"
                    onChange={handleXPosition}
                    min="0"
                    max="1"
                    step="0.01"
                    value={position.x}
                  />
                  <input
                    style={{display:'none'}}
                    name="scale"
                    type="range"
                    onChange={handleYPosition}
                    min="0"
                    max="1"
                    step="0.01"
                    value={position.y}
                  />
                  <div style={{display:'none'}}><button className={styles.modalButtons} onClick={rotateLeft}>&#x21ba;</button>
                  <button className={styles.modalButtons} onClick={rotateRight}>&#x21bb;</button></div>
                  <br />
                  <input className={styles.modalButtons} type="button" onClick={handleSave} value="Preview" />
                  {!!preview && (
                    <img
                      className={styles.previewLogo}
                      crossorigin="anonymous"
                      src={preview.img}
                      alt="avatar"
                      // style={{
                      //   borderRadius: `${(Math.min(preview.height, preview.width) + 10) *
                      //     (preview.borderRadius / 2 / 100)}px`
                      // }}
                    />
                    
                  )}
                  <br />
                  <input className={styles.avatarSave} type="button" onClick={() => {
                            setImgFile(preview.img);
                            updateLogoFile();
                        }}
                        value="Save" />
                  {/* {!!preview && (
                    <Preview
                      width={
                        preview.scale < 1 ? preview.width : (preview.height * 478) / 270
                      }
                      height={preview.height}
                      image="avatar.jpg"
                      rect={preview.rect}
                    />
                  )} */}
                </div>
                <div className={styles.primalBlock}>
                    <p><b>Id центра:</b> {props.course.course_id}</p> 
                    <p><b>Центр:</b> {props.course.course_title}</p>
                    <p><b>Id карточки:</b> {props.course.id}</p>
                    
                    <div className={styles.editRow}>
                        <p style={
                            props.course.title?
                                ((props.course.title == props.course.description) || (props.course.title == props.course.course_desc))?
                                    savedMode?
                                        {display:'block',backgroundColor: 'yellow'}:
                                        {display:'none',backgroundColor: 'yellow'}:
                                    savedMode?
                                        {display:'block'}:
                                        {display:'none'}:
                                    savedMode?
                                        {display:'block',backgroundColor: 'red'}:
                                        {display:'none',backgroundColor: 'red'}}>
                            <b>Название курса:</b> {editCourseTitle}
                        </p>
                        <button 
                            onClick={() => {setSavedMode(false);setEditMode(true)}} 
                            style={savedMode?{display:'block'}:{display:'none'}} 
                            className={styles.editButton}>&#128393;</button>
                        <input onChange={event => {
                                setEditCourseTitle(event.target.value);}}
                                style={editMode?{display:'block'}:{display:'none'}} 
                                className={styles.moderateRow} 
                                value={editCourseTitle}/>
                        <button onClick={() => {
                            setSavedMode(true);
                            setEditMode(false);
                            updateSubcourseTitle({
                                    id: props.course.id,
                                    title: editCourseTitle,
                                });
                        }} 
                            style={editMode?{display:'block'}:{display:'none'}}
                            className={styles.saveButton}>&#10003;</button>
                    </div>
                    <p><b>Лого:</b>
                    <div className={styles.image_block} style={editCourseLogo?
                        {
                            backgroundImage: `url(${editCourseLogo})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundColor: 'white',
                            border: '1px solid white',
                            width: '100%',
                            aspectRatio: '1/1'
                        }:{
                            backgroundColor: 'red',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            border: '1px solid white',
                            width: '100%',
                            aspectRatio: '1/1'
                    }}>
                    <Image style={{width: '100%', opacity: '0.5'}} src={'https://realibi.kz/file/694538.png'}/>
                    </div>
                    <button className={styles.avatarSave} onClick={() => {
                            setEditAvatar(true);
                        }} >Изменить</button>
                    </p>
                    <div className={styles.editRow}>
                        <p className={styles.link} 
                        style={
                            props.course.img_src?
                                checkLink?
                                    savedLogo?
                                        {display:'block'}:
                                        {display:'none'}:
                                    savedLogo?
                                        {display:'block',backgroundColor: 'yellow'}:
                                        {display:'none',backgroundColor: 'yellow'}:
                                    savedLogo?
                                        {display:'block',backgroundColor: 'red'}:
                                        {display:'none',backgroundColor: 'red'}}>
                            <b>Ссылка на лого:</b>
                            <a target="blank" href={props.course.img_src}>{editCourseLogo}</a>
                        </p>
                        <button 
                            className={styles.editButton} 
                            onClick={() => {
                            setSavedLogo(false);
                            setEditLogo(true);
                        
                        }} 
                            style={savedLogo?{display:'block'}:{display:'none'}}>&#128393;</button>
                        <input onChange={event => {
                                setEditCourseLogo(event.target.value);}}
                                style={editLogo?{display:'block'}:{display:'none'}} 
                                className={styles.moderateRow} 
                                value={editCourseLogo}/>
                        <button onClick={() => {
                            setSavedLogo(true);
                            setEditLogo(false);
                            updateSubcourseLogo({
                                    id: props.course.course_id,
                                    logo: editCourseLogo,
                                });
                        }} 
                            style={editLogo?{display:'block'}:{display:'none'}}
                            className={styles.saveButton}>&#10003;</button>
                    </div>
                </div>
                <div className={styles.paramsBlock}>
                    <div className={styles.editRow}>
                        <p style={
                            props.course.schedule?
                                savedSchedule?
                                        {display:'block'}:
                                        {display:'none'}:
                                savedSchedule?
                                        {display:'block',backgroundColor: 'red'}:
                                        {display:'none',backgroundColor: 'red'}}>
                                <b>Расписание:</b> {editCourseSchedule}</p>
                        <button 
                            onClick={() => {setSavedSchedule(false);setEditSchedule(true)}} 
                            style={savedSchedule?{display:'block'}:{display:'none'}} 
                            className={styles.editButton}>&#128393;</button>
                        <input onChange={event => {
                                setEditCourseSchedule(event.target.value);}}
                                style={editSchedule?{display:'block'}:{display:'none'}} 
                                className={styles.moderateRow} 
                                value={editCourseSchedule}/>
                        <button onClick={() => {
                            setSavedSchedule(true);
                            setEditSchedule(false);
                            updateSubcourseSchedule({
                                    id: props.course.id,
                                    schedule: editCourseSchedule,
                                });
                        }} 
                            style={editSchedule?{display:'block'}:{display:'none'}}
                            className={styles.saveButton}>&#10003;</button>
                    </div>
                    <div className={styles.editRow}>
                        <p style={
                            (props.course.price && props.course.currency && props.course.unit_of_time)?
                                (savedPrice && savedCurrency && savedUOT)?
                                        {display:'block'}:
                                        {display:'none'}:
                                (savedPrice && savedCurrency && savedUOT)?
                                        {display:'block',backgroundColor: 'red'}:
                                        {display:'none',backgroundColor: 'red'}}><b>Цена:</b> {editCoursePrice}{editCourseCurrency}/{editCourseUOT}</p>
                        
                        <button onClick={() => {
                            setSavedPrice(false);
                            setEditPrice(true);
                            setSavedCurrency(false);
                            setEditCurrency(true);
                            setSavedUOT(false);
                            setEditUOT(true);
                        }} 
                            style={(savedPrice && savedCurrency && savedUOT)?{display:'block'}:{display:'none'}} 
                            className={styles.editButton}>&#128393;</button>
                        <input className={styles.moderateRowPart1}
                            onChange={event => {
                                setEditCoursePrice(event.target.value);}}
                                style={editPrice?{display:'block'}:{display:'none'}} 
                                value={editCoursePrice}/>
                        <input className={styles.moderateRowPart2}
                            onChange={event => {
                                setEditCourseCurrency(event.target.value);}}
                                style={editCurrency?{display:'block'}:{display:'none'}} 
                                value={editCourseCurrency}/>
                        <input className={styles.moderateRowPart3}
                            onChange={event => {
                                setEditCourseUOT(event.target.value);}}
                                style={editUOT?{display:'block'}:{display:'none'}} 
                                value={editCourseUOT}/>
                        <button onClick={() => {
                            setSavedPrice(true);
                            setEditPrice(false);
                            setSavedCurrency(true);
                            setEditCurrency(false);
                            setSavedUOT(true);
                            setEditUOT(false);
                            updateSubcoursePrice({
                                    id: props.course.id,
                                    price: editCoursePrice,
                                    currency: editCourseCurrency,
                                    UOT: editCourseUOT,
                                });
                        }} 
                            style={(editPrice && editCurrency && editUOT)?{display:'block'}:{display:'none'}}
                            className={styles.saveButton}>&#10003;</button>
                    </div>
                    <div className={styles.editRow}>   
                        <p style={
                            props.course.category?
                                savedCategory?
                                        {display:'block'}:
                                        {display:'none'}:
                                savedCategory?
                                        {display:'block',backgroundColor: 'red'}:
                                        {display:'none',backgroundColor: 'red'}}>
                            <b>Направление:</b> {editCourseCategory}</p>
                        <button onClick={() => {
                            setSavedCategory(false);
                            setEditCategory(true);
                            setSavedCategoryId(false);
                            setEditCategoryId(true);
                        }} 
                            style={(savedCategory && savedCategoryId)?{display:'block'}:{display:'none'}} 
                            className={styles.editButton}>&#128393;</button>
                        <select className={styles.moderateRow} 
                            value={editCourseCategory} 
                            style={(editCategory && editCategoryId)?{display:'block'}:{display:'none'}}
                            onChange={e => setEditCourseCategoryId(e.target.value)}>
                            {
                                filters[1] !== undefined
                                    ?
                                    (filters[1].map(filterOption => (
                                        filterOption.name !== "test"
                                            ?
                                            (<option value={filterOption.id} selected={(filterOption.id == editCourseCategoryId)?true:false}>{filterOption.name}</option>)
                                            : null
                                    )))
                                    :
                                    null
                            }
                        </select>
                        <button onClick={() => {
                            setSavedCategory(true);
                            setEditCategory(false);
                            setSavedCategoryId(true);
                            setEditCategoryId(false);
                            updateSubcourseCategory({
                                    id: props.course.id,
                                    category_id: editCourseCategoryId,
                                });
                        }} 
                            style={(editCategory && editCategoryId)?{display:'block'}:{display:'none'}}
                            className={styles.saveButton}>&#10003;</button>
                    </div>
                    <div className={styles.editRow}>   
                        <p style={
                            props.course.format?
                                savedFormat?
                                        {display:'block'}:
                                        {display:'none'}:
                                savedFormat?
                                        {display:'block',backgroundColor: 'red'}:
                                        {display:'none',backgroundColor: 'red'}}>
                            <b>Формат:</b> {editCourseFormat}</p>
                        <button 
                            onClick={() => {
                                setSavedFormat(false);
                                setEditFormat(true)}} 
                            style={savedFormat?{display:'block'}:{display:'none'}} 
                            className={styles.editButton}>&#128393;</button>
                        <select className={styles.moderateRow} 
                            value={editCourseFormat} 
                            style={editFormat?{display:'block'}:{display:'none'}}
                            onChange={e => setEditCourseFormat(e.target.value)}>
                            <option value={'Online'}>Online</option>
                            <option value={'Offline'}>Offline</option>
                        </select>
                        <button 
                            onClick={() => {
                                setSavedFormat(true);
                                setEditFormat(false);
                                updateSubcourseFormat({
                                    id: props.course.id,
                                    format: editCourseFormat,
                                });
                            }} 
                            style={savedFormat?{display:'none'}:{display:'block'}} 
                            className={styles.editButton}>&#10003;</button>
                    </div>
                    <div className={styles.editRow}>    
                        <p style={
                            props.course.type?
                                savedType?
                                        {display:'block'}:
                                        {display:'none'}:
                                savedType?
                                        {display:'block',backgroundColor: 'red'}:
                                        {display:'none',backgroundColor: 'red'}}>
                            <b>Тип:</b> {editCourseType}</p>
                        <button 
                            onClick={() => {
                                setSavedType(false);
                                setEditType(true)}} 
                            style={savedType?{display:'block'}:{display:'none'}} 
                            className={styles.editButton}>&#128393;</button>
                        <select className={styles.moderateRow} 
                            value={editCourseType} 
                            style={editType?{display:'block'}:{display:'none'}}
                            onChange={e => setEditCourseType(e.target.value)}>
                            <option value={'Групповые занятия'}>Групповые занятия</option>
                            <option value={'Индивидуальные занятия'}>Индивидуальные занятия</option>
                            <option value={'Парные занятия'}>Парные занятия</option>
                            <option value={'Мини-групповые занятия'}>Мини-групповые занятия</option>
                        </select>
                        <button 
                            onClick={() => {
                                setSavedType(true);
                                setEditType(false);
                                updateSubcourseType({
                                    id: props.course.id,
                                    type: editCourseType,
                                });
                            }} 
                            style={savedType?{display:'none'}:{display:'block'}} 
                            className={styles.editButton}>&#10003;</button>
                    </div>
                    <div className={styles.editRow}>    
                        <p style={
                            props.course.ages?
                                (props.course.ages == " - ")?
                                    savedAges?
                                        {display:'block',backgroundColor: 'yellow'}:
                                        {display:'none',backgroundColor: 'yellow'}:
                                    savedAges?
                                        {display:'block'}:
                                        {display:'none'}:
                                    savedAges?
                                        {display:'block',backgroundColor: 'red'}:
                                        {display:'none',backgroundColor: 'red'}}>
                            <b>Возрастная категория:</b> {editCourseAges}</p>
                        <button 
                            onClick={() => {setSavedAges(false);setEditAges(true)}} 
                            style={savedAges?{display:'block'}:{display:'none'}} 
                            className={styles.editButton}>&#128393;</button>
                        <input onChange={event => {
                                setEditCourseAges(event.target.value);}}
                                style={editAges?{display:'block'}:{display:'none'}} 
                                className={styles.moderateRow} 
                                value={editCourseAges}/>
                        <button onClick={() => {
                            setSavedAges(true);
                            setEditAges(false);
                            updateSubcourseAges({
                                    id: props.course.id,
                                    ages: editCourseAges,
                                });
                        }} 
                            style={editAges?{display:'block'}:{display:'none'}}
                            className={styles.saveButton}>&#10003;</button>
                    </div>
                    <div className={styles.editRow}>    
                        <p style={
                            props.course.addresses?
                                savedAddresses?
                                        {display:'block'}:
                                        {display:'none'}:
                                savedAddresses?
                                        {display:'block',backgroundColor: 'red'}:
                                        {display:'none',backgroundColor: 'red'}}>
                                <b>Адрес:</b> {editCourseAddresses}</p>
                        <button 
                            onClick={() => {setSavedAddresses(false);setEditAddresses(true)}} 
                            style={savedAddresses?{display:'block'}:{display:'none'}} 
                            className={styles.editButton}>&#128393;</button>
                        <input onChange={event => {
                                setEditCourseAddresses(event.target.value);}}
                                style={editAddresses?{display:'block'}:{display:'none'}} 
                                className={styles.moderateRow} 
                                value={editCourseAddresses}/>
                        <button onClick={() => {
                            setSavedAddresses(true);
                            setEditAddresses(false);
                            updateCourseAddresses({
                                    id: props.course.course_id,
                                    addresses: editCourseAddresses,
                                });
                        }} 
                            style={editAddresses?{display:'block'}:{display:'none'}}
                            className={styles.saveButton}>&#10003;</button>
                    </div>
                </div>
                <div className={styles.aboutBlock}>
                    <div className={styles.editRow}>
                        <p style={
                            props.course.description?
                                ((props.course.title == props.course.description) || (props.course.description == props.course.course_desc))?
                                    savedDescription?
                                        {display:'block',backgroundColor: 'yellow'}:
                                        {display:'none',backgroundColor: 'yellow'}:
                                    savedDescription?
                                        {display:'block'}:
                                        {display:'none'}:
                                    savedDescription?
                                        {display:'block',backgroundColor: 'red'}:
                                        {display:'none',backgroundColor: 'red'}}>
                            <b>Описание курса:</b> {editCourseDescription}
                        </p>
                        <button 
                            onClick={() => {setSavedDescription(false);setEditDescription(true)}} 
                            style={savedDescription?{display:'block'}:{display:'none'}} 
                            className={styles.editButton}>&#128393;</button>
                        <textarea onChange={event => {
                                setEditCourseDescription(event.target.value);}}
                                style={editDescription?{display:'block'}:{display:'none'}} 
                                className={styles.moderateRow} 
                                value={editCourseDescription}></textarea>
                        <button onClick={() => {
                            setSavedDescription(true);
                            setEditDescription(false);
                            updateSubcourseDescription({
                                    id: props.course.id,
                                    description: editCourseDescription,
                                });
                        }} 
                            style={editDescription?{display:'block'}:{display:'none'}}
                            className={styles.saveButton}>&#10003;</button>
                    </div>
                    <div className={styles.editRow}>
                        <p style={
                            props.course.course_desc?
                                ((props.course.course_desc == props.course.description) || (props.course.title == props.course.course_desc))?
                                    savedCDescription?
                                        {display:'block',backgroundColor: 'yellow'}:
                                        {display:'none',backgroundColor: 'yellow'}:
                                    savedCDescription?
                                        {display:'block'}:
                                        {display:'none'}:
                                    savedCDescription?
                                        {display:'block',backgroundColor: 'red'}:
                                        {display:'none',backgroundColor: 'red'}}>
                            <b>Описание центра:</b> {editCourseCDescription}
                        </p>
                        <button 
                            onClick={() => {setSavedCDescription(false);setEditCDescription(true)}} 
                            style={savedCDescription?{display:'block'}:{display:'none'}} 
                            className={styles.editButton}>&#128393;</button>
                        <textarea onChange={event => {
                                setEditCourseCDescription(event.target.value);}}
                                style={editCDescription?{display:'block'}:{display:'none'}} 
                                className={styles.moderateRow} 
                                value={editCourseCDescription}></textarea>
                        <button onClick={() => {
                            setSavedCDescription(true);
                            setEditCDescription(false);
                            updateCourseDescription({
                                    id: props.course.course_id,
                                    description: editCourseCDescription,
                                });
                        }} 
                            style={editCDescription?{display:'block'}:{display:'none'}}
                            className={styles.saveButton}>&#10003;</button>
                    </div>
                    <p className={styles.moderate}><b>Одобрено:</b> <input
                            type="checkbox"
                            onClick={() => {
                                setVerifyCheck(!verifyCheck);
                                updateVerificated({
                                    id: props.course.id,
                                    verificated: !verifyCheck,
                                });
                            }}
                            checked={verifyCheck ? true : false}
                        />
                    </p>
                    
                </div>  
                <button className={styles.trash}>&#10007;</button>
            </div>

    )
}
