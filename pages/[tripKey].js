import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useFetchTripData from '../hooks/FetchTripData'
import useFetchAct from '../hooks/FetchActivities'
import dayjs from 'dayjs'
import Calendar from '@/components/Calendar';
import CreateActivity from '../components/CreateActivity'
import TripNavBar from '../components/TripPageComponents/TripNavBar'
import Settings from '../components/TripPageComponents/Settings'



export default function Trip() {
    const router = useRouter()
    let [page, setPage] = useState("activities")
    const { tripKey } = router.query
    const allData = useFetchTripData(tripKey)
    const actData = useFetchAct(tripKey)
    if (allData.loading === false && actData.loading === false) {
        const tripData = allData.tripData
        const actArr = actData.actArr
        const algoData = { arrDate: tripData.arrDate, depDate: tripData.depDate, actArr: actArr }
        return (
            <div>
                <div className='flex flex-row items-center'>
                    <div className='flex pr-10'>
                        <i onClick={() => router.push('/')} className="text-black fa-solid fa-square-caret-left bg-clip-content hover:opacity-40 cursor-pointer text-3xl sm:text-6xl"></i>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-2xl select-none sm:text-5xl font-bold uppercase'>{tripData.Name}</h1>
                        <h1 className='text-1xl select-none sm:text-4xl font-bold uppercase'>{dayjs(tripData.arrDate).format('D-MMM-YYYY')} → {dayjs(tripData.depDate).format('D-MMM-YYYY')}</h1>
                    </div>

                </div>
                {page === "activities" &&
                    <div className='flex items-center'>
                        <CreateActivity tripKey={tripKey} actData={algoData.actArr} type='activity'></CreateActivity>
                        <CreateActivity tripKey={tripKey} actData={algoData.actArr} type='restaurant'></CreateActivity>
                    </div>
                }
                {page === "calender" &&
                    <div className='flex items-center'>
                        <Calendar data={algoData}></Calendar>
                    </div>
                }
                {page === "settings" &&
                    <div className='flex items-center'>
                        <Settings data={tripData}></Settings>
                    </div>
                }
                <div className="fixed bottom-10 left-0 right-0 z-10">
                    <TripNavBar page={page} setPage={setPage}></TripNavBar>
                </div>

            </div>


        )

    }
    else {
        return (
            <div className='flex-1 grid place-items-center '><i className="fa-solid fa-spinner animate-spin text-6xl"></i>

            </div>
        )
    }

}

