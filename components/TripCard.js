import React from 'react'
import Link from 'next/link';
import dayjs from 'dayjs'
import { useRouter } from 'next/router';
import useFetchTripData from '../hooks/DBfunctions'
import Popup from 'reactjs-popup';
import { useState, useEffect } from 'react';


export default function TripCard(props) {
  const { children, tripKey, handleDelete } = props;
  const allData = useFetchTripData(tripKey)
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState('');
  const contentStyle = { borderRadius: '20px', width: "30%" };
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };

  if (allData.loading === false) {
    const tripData = allData.tripData
    return (


<div>
  
    <div className='sm:max-w-sm max-w-xs duration-300 hover:bg-gray-100 shadow-xl bg-white text-black rounded-xl items-center'>
    <Link href={`/${tripKey}`} className='flex items-center p-3 pt-4 pb-4'>
        <div className='ml-3 h-20 w-20 border border-2 rounded-full overflow-hidden'>
                <img className='w-full h-full object-cover' src={tripData.tripImageUrl && tripData.tripImageUrl[0] ? tripData.tripImageUrl[0] : '../img/placeholder-image.png'} />
        </div>
        <div className='flex flex-col ml-4'>
          <div className='uppercase text-2xl font-semibold'>
          {children}
          </div>
          <div className='font-light text-xs'>
          {dayjs(tripData.arrDate).format('D MMM YYYY')}  →  {dayjs(tripData.depDate).format('D MMM YYYY')}
          </div>
        </div>
        </Link>
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