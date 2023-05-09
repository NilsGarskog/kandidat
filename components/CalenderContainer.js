import useFetchAct from '@/hooks/FetchActivities'
import useFetchTripData from '../hooks/FetchTripData'
import React, { useEffect, useState } from 'react'
import Calendar from '@/components/Calendar';
import { useRouter } from "next/router";

async function regenerate(regen, setRegen, router, tripKey) {

    if (regen === true) {
        await setRegen(false)
    }
    await setRegen(true)

    // setTimeout(() => { window.location.href = `/${tripKey}`; }, 1000);
}


export default function ActivityContainer(props) {
    let [regen, setRegen] = useState(false)
    const router = useRouter();
    let algoData = props.data
    const tripKey = algoData.tripKey
    const activityData = useFetchAct(algoData.tripKey)
    const activities = activityData.actArr

    if (activityData.loading === false) {
        algoData.actArr = activities
        return (
            <div className='flex items-center flex-col'>
                <Calendar data={algoData} regen={regen}></Calendar>
                <i onClick={() => { regenerate(regen, setRegen, router, tripKey) }} className="fa-solid duration-300 hover:rotate-90 fa-arrows-rotate text-6xl -mt-40 cursor-pointer"></i>
            </div >
        )
    } else {
        return (

            <h1>LOADING</h1>
        )
    }

}



