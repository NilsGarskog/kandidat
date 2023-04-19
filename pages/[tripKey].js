import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useFetchTripData from '../hooks/FetchTripData'
import useFetchAct from '../hooks/FetchActivities'
import dayjs from 'dayjs'
import Calendar from '@/components/Calendar';
import CreateActivity from '../components/CreateActivity'
import TripHeader from '@/components/TripHeader';
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
                <TripHeader tripData={tripData}>
                    </TripHeader>

              <div className='flex items-center'>
                <CreateActivity tripKey={tripKey} actData={algoData.actArr} type='activity'></CreateActivity>
                <CreateActivity tripKey={tripKey} actData={algoData.actArr} type='restaurant'></CreateActivity>
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

