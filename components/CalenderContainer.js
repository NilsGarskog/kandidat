import useFetchAct from '@/hooks/FetchActivities'
import useFetchTripData from '../hooks/FetchTripData'
import React, { useEffect, useState } from 'react'
import Calendar from '@/components/Calendar';
import toast from "react-hot-toast";



async function regenerate(regen, setRegen) {
    setRegen(Math.random())
    toast.success('Regenerated itinerary!')
}


export default function ActivityContainer(props) {
    let [regen, setRegen] = useState(null)
    let algoData = props.data
    const activityData = useFetchAct(algoData.tripKey)
    let allData = useFetchTripData(algoData.tripKey)
    const activities = activityData.actArr
    const isMobile = window.innerWidth < 640;

    if (activityData.loading === false && allData.loading === false) {
        algoData.itineary = allData.tripData.itineary
        algoData.actArr = activities
        return (
            
            <div className='flex items-center flex-col overflow-y-hidden'>
                
                {!isMobile && <div>
          <h1 className='uppercase text-center text-7xl mt-0 font-bold cursor-default select-none'>
            YOUR Itinerary
          </h1>
        </div>}
              {!isMobile && <button onClick={() => regenerate(regen, setRegen)} className='rounded-lg p-1 px-3  sm:mt-3 bg-buttonGreen hover:opacity-70 duration-300 shadow-lg flex items-center gap-2 text-lg font-semibold uppercase'> <div>REGENERATE</div><i  className="fa-solid duration-300 hover:rotate-90 fa-arrows-rotate text-3xl  cursor-pointer"></i></button>}
                <Calendar data={algoData} regen={regen}></Calendar>
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



