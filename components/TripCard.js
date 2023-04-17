import React from 'react'
import Link from 'next/link';
import dayjs from 'dayjs'
import { useRouter } from 'next/router';
import useFetchTripData from '../hooks/DBfunctions'
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
      <div className='duration-300 hover:bg-slate-100 drop-shadow-2xl flex bg-white text-black rounded-lg items-center p-1'>
        <div className='ml-3 h-20 w-20 border border-2 rounded-full overflow-hidden'>
        <img className='w-full h-full object-cover' src='../img/placeholder-image.png' ></img>
        </div>
      <div className='sm:p-3 grid grid-cols-12 '>
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