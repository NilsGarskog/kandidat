import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useFetchTripData from '../hooks/FetchTripData'
import useFetchAct from '../hooks/FetchActivities'
import dayjs from 'dayjs'
import Calendar from '@/components/Calendar';
import CalendarContainer from '@/components/CalenderContainer';
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
    let [openIt, setOpenIt] = useState(false)
    const isMobile = window.innerWidth < 640;

    if (allData.loading === false && actData.loading === false) {
        const tripData = allData.tripData
        const actArr = actData.actArr
        let ItCreated = tripData.itCreated

        const algoData = { arrDate: tripData.arrDate, depDate: tripData.depDate, actArr: actArr, itineary: tripData.itineary, ItCreated: ItCreated, tripKey: tripKey }
        return (
            <div className='overflow-x-hidden'>

                {page === "activities" &&
                    <div>
                        <TripHeader tripData={tripData}>
                        </TripHeader>

                        <div className='ml-20 sm:ml-0 flex flex-col sm:flex-row  items-center justify-evenly mt-10'>
                            <CreateActivity tripKey={tripKey} actData={algoData.actArr} type='activity'></CreateActivity>
                            <CreateActivity tripKey={tripKey} actData={algoData.actArr} type='restaurant'></CreateActivity>
                        </div>
                    </div>
                }
                {(page === "calender" && ItCreated === false && openIt === false) &&
                    <div className='flex items-center flex-col p-3'>
                        <div className='flex flex-col items-center w-5/6 sm:w-2/3 select-none cursor-default'>
                            <h1 className="text-center text-5xl sm:text-7xl text-bold p-2 font-bold uppercase mt-10 sm:mt-28">Your itineary</h1>
                            <p className="text-md sm:text-lg text-center p-1 mt-4 sm:mt-0" > Here, you can generate your itinerary based on the activities you have planned so far.<br/>  {isMobile && <br/>}                       
                            If you would like to add more activities, you can always come back to this page later {!isMobile && <br/>}and regenerate the itinerary.</p>
                        </div>
                        <button className='mt-5 border w-auto bg-buttonGreen uppercase opacity-100 hover:opacity-80 duration-300 text-black text-2xl sm:text-2xl font-semibold rounded-xl px-10 py-3' onClick={() => setOpenIt(true)}>GENERATE!</button>
                    </div>
                }
                {(page === "calender" && (ItCreated === true || openIt === true)) &&
                    <div> 
                        <CalendarContainer data={algoData}></CalendarContainer>
                    </div>
                }
                {page === "settings" &&
                    <div className='flex items-center flex-col'>
                        <div className='flex flex-col items-center w-2/3'>
                            <h1 className="text-3xl text-bold p-2 font-bold">Settings</h1>
                            <p className="text-xl p-1" > Here you can edit the specifications of your trip. <br></br>Do not forget to save when you are done!</p>
                        </div>
                        <Settings data={tripData}></Settings>
                    </div>
                }
                <div className="min-h-[10ch]"></div>
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

