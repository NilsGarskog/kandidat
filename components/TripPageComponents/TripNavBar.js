import { React, useState } from 'react'

export default function TripNavBar(props) {
    let page = props.page
    let setPage = props.setPage
    return (
        <div className="b-0 sm:h-20 h-10 flex flex-row justify-center gap-20 sm:gap-40 ">
            <img onClick={() => setPage("activities")} className={`cursor-pointer ${page != "activities" ? "duration-300 opacity-50 hover:opacity-70" : ""}`} src="../icons/binoculars.png"></img>
            <img onClick={() => setPage("calender")} className={`cursor-pointer ${page != "calender" ? "duration-300 opacity-50 hover:opacity-70" : ""}`} src="../icons/calender.png"></img>
            <img onClick={() => setPage("settings")} className={`cursor-pointer ${page != "settings" ? "duration-300 opacity-50 hover:opacity-70" : ""}`} src="../icons/setting.png"></img>
        </div>
    );
}
