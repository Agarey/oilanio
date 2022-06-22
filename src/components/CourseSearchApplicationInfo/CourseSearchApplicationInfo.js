import React, {useState} from "react";
import globals from "../../globals";

export default function CourseSearchApplicationInfo(props){
    return(
        <div>
            <div>
                <span>Номер заявки: </span>
                <span>{props.application.id}</span>
            </div>
            <div>
                <span>Дата создания заявки: </span>
                <span>{props.application.datetime}</span>
            </div>
            <div>
                <span>Дата деактивации заявки: </span>
                <span>{props.application.deactivated_date}</span>
            </div>
            <div>
                <span>Имя пользователя: </span>
                <span>{props.application.name}</span>
            </div>
            <div>
                <span>Телефон: </span>
                <span>{props.application.phone}</span>
            </div>
            <div>
                <span>Почта: </span>
                <span>{props.application.email}</span>
            </div>
            <div>
                <span>Направление: </span>
                <span>{props.application.direction_name}</span>
            </div>
            <div>
                <span>Ссылка на заявку: </span>
                <span><a href={globals.productionSiteDomain + "/application/" + props.application.uuid_string}>Ссылка</a></span>
            </div>
            <hr/>
        </div>
    )
}