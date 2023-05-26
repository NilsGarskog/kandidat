import useFetchAct from '@/hooks/FetchActivities'
import useFetchTripData from '../hooks/FetchTripData'
import React, { useEffect, useState } from 'react'
import Calendar from '@/components/Calendar';
import toast from "react-hot-toast";





export default function ActivityContainer(props) {
    let algoData = props.data
    const activityData = useFetchAct(algoData.tripKey)
    let allData = useFetchTripData(algoData.tripKey)
    const activities = activityData.actArr
    const isMobile = window.innerWidth < 640;

    if (activityData.loading === false && allData.loading === false) {
        algoData.itineary = allData.tripData.itineary
        algoData.actArr = activities
        return (
            
            <div className='flex items-center flex-col'>
                

                {!isMobile && <div>
          <h1 className='uppercase text-center text-7xl mt-0 font-bold cursor-default select-none'>
            YOUR Itinerary
          </h1>
        </div>}
                <Calendar data={algoData} ></Calendar>

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



