import { React, useState } from 'react'

export default function TripNavBar(props) {
    let page = props.page
    let setPage = props.setPage
    return (
        <div className="b-0 flex flex-row justify-center gap-40 ">
            <img onClick={() => setPage("activities")} className={`cursor-pointer ${page != "activities" ? "opacity-50" : ""}`} src="../icons/binoculars.png"></img>
            <img onClick={() => setPage("calender")} className={`cursor-pointer ${page != "calender" ? "opacity-50" : ""}`} src="../icons/calender.png"></img>
            <img onClick={() => setPage("settings")} className={`cursor-pointer ${page != "settings" ? "opacity-50" : ""}`} src="../icons/setting.png"></img>
        </div>
    );
}
