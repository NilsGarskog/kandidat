import React from 'react'
import Link from 'next/link';
import dayjs from 'dayjs'
import { useRouter } from 'next/router';
import useFetchTripData from '../components/DBfunctions'


export default function TripCard(props) {
  const { children, tripKey, handleDelete } = props;
  const allData = useFetchTripData(tripKey)

  if (allData.loading === false) {
    const tripData = allData.tripData
    return (
      <div className='border rounded-lg border-2 sm:p-3 grid grid-cols-12 border-white border-solid items-center '>
        <a href={`/${tripKey}`} className='col-span-11'>
          <div className='flex flex-col'>
            <div className="flex text-4xl">
              {children}
            </div>
            <div className="flex text-2xl">
              {dayjs(tripData.arrDate).format('D MMM YYYY')} → {dayjs(tripData.depDate).format('D MMM YYYY')}
            </div>
          </div>
        </a >
        <div className=' '>
          <i onClick={handleDelete(tripKey)} className=" fa-solid fa-trash-can duration-300 hover:scale-125 cursor-pointer text-3xl "></i>
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