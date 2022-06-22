import React, {useState} from "react";
import globals from "../../globals";

export default function TelegramBotUser(props){
    return(
        <div>
            <div>
                <span>id: </span>
                <span>{props.user.course_id}</span>
            </div>
            <div>
                <span>Название: </span>
                <span>{props.user.title}</span>
            </div>
            <hr/>
        </div>
    )
}