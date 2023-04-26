import useFetchAct from '@/hooks/FetchActivities'
import useFetchTripData from '../hooks/FetchTripData'
import React, { useEffect, useState } from 'react'
import Calendar from '@/components/Calendar';

// async function regenerate(regen, setRegen) {
//     if (regen === true) {
//         await setRegen(false)
//     }
//     setRegen(true)
// }


export default function ActivityContainer(props) {
    let [regen, setRegen] = useState(false)
    let algoData = props.data
    const activityData = useFetchAct(algoData.tripKey)
    // const allData = useFetchTripData(algoData.tripKey)
    const activities = activityData.actArr

    if (activityData.loading === false) {
        // const tripData = allData.tripData
        algoData.actArr = activities
        return (
            <div className='flex items-center flex-col'>
                <Calendar data={algoData} regen={regen}></Calendar>
                {/* <i onClick={() => regenerate(regen, setRegen)} className="fa-solid duration-300 hover:rotate-90 fa-arrows-rotate text-6xl -mt-40 cursor-pointer"></i> */}
            </div>
        )
    } else {
        return (

            <h1>LOADING</h1>
        )
    }

}



