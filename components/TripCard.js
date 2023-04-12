import React from 'react'
import Link from 'next/link';
import dayjs from 'dayjs'
import { useRouter } from 'next/router';
import useFetchTripData from '../components/DBfunctions'
import Popup from 'reactjs-popup';
import { useState } from 'react';


export default function TripCard(props) {
  const { children, tripKey, handleDelete } = props;
  const allData = useFetchTripData(tripKey)
  const [open, setOpen] = useState(false);
  const contentStyle = { borderRadius: '20px', width: "30%" };
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };

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
          <Popup position="relative"
            open={open}
            modal
            {...{ contentStyle, overlayStyle }}
            trigger={<i className=" fa-solid fa-trash-can duration-300 hover:scale-125 cursor-pointer text-3xl "></i>} >
            {close => (
              <div className='flex p-1 flex-col items-center font-medium text-base rounded-lg w-full'>
                <h1 className="text-xl p-2">Are you sure you want to delete the trip to {children} ?</h1>
                <button className='border w-1/2 bg-black text-white rounded-xl p-4' onClick={() => { handleDelete(tripKey); close() }}>CONFIRM</button>
              </div>
            )}
          </Popup>
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