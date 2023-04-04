import React from 'react'
import { useRouter } from 'next/router';
import useFetchTripData from '../components/DBfunctions'

function getData() {
    const router = useRouter()
    const { tripKey } = router.query
    const data = useFetchTripData(tripKey)

    return data
}


export default function Trip() {
    const router = useRouter()

    const allData = getData()
    console.log(allData)
    if (allData.loading === false) {
        const tripData = allData.tripData
        return (
            <div className='flex flex-row items-center'>
                <div className='flex pr-10'>
                    <i onClick={() => router.push('/')} className="fa-solid fa-square-caret-left bg-clip-content hover:opacity-40 cursor-pointer text-3xl sm:text-6xl"></i>
                </div>
                <div className='flex'>
                    <h1 className='text-2xl select-none sm:text-5xl font-latoBold uppercase'>{tripData.Name}</h1>
                </div>
            </div>
        )

    }
    else {
        return (
            <div className='flex-1 grid place-items-center '><i className="fa-solid fa-spinner animate-spin text-6xl"></i></div>
        )
    }

}
