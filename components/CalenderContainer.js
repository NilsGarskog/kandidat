import useFetchAct from '@/hooks/FetchActivities'
import useFetchTripData from '../hooks/FetchTripData'
import React, { useEffect, useState } from 'react'
import Calendar from '@/components/Calendar';

async function regenerate(regen, setRegen) {
    setRegen(Math.random())
}


export default function ActivityContainer(props) {
    let [regen, setRegen] = useState(null)
    let algoData = props.data
    const activityData = useFetchAct(algoData.tripKey)
    let allData = useFetchTripData(algoData.tripKey)
    const activities = activityData.actArr

    if (activityData.loading === false && allData.loading === false) {
        algoData.itineary = allData.tripData.itineary
        algoData.actArr = activities
        return (
            <div className='flex items-center flex-col'>
                <Calendar data={algoData} regen={regen}></Calendar>
                <i onClick={() => regenerate(regen, setRegen)} className="fa-solid duration-300 hover:rotate-90 fa-arrows-rotate text-6xl -mt-60 cursor-pointer"></i>
            </div>
        )
    } else {
        return (
            <div className='flex items-center h-screen justify-center content-center flex-col'>
                <i className="fa-solid fa-spinner animate-spin text-6xl text-black"></i>
            </div>
        )
    }

}



