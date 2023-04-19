import React from 'react'
import Link from 'next/link';
import dayjs from 'dayjs'
import { useRouter } from 'next/router';
import useFetchTripData from '../hooks/DBfunctions'
import Popup from 'reactjs-popup';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip'



export default function TripCard(props) {
  const { children, tripKey, handleDelete } = props;
  const allData = useFetchTripData(tripKey)
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState('');
  const contentStyle = { borderRadius: '20px', width: "30%" };
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
  const uniqueClassName = `trip-image-${tripKey}`;


  if (allData.loading === false) {
    const tripData = allData.tripData
    return (
      <div className="flex flex-row items-center">

        <div className='sm:max-w-sm max-w-xs duration-300 hover:bg-gray-100 shadow-xl bg-white text-black rounded-xl items-center'>
          <div className='flex items-center p-7 pt-4 pb-4'>
            <Link href={`/${tripKey}`} className=' flex items-center'>
             
             
              <div className= {`${uniqueClassName} ml-3 h-20 w-20 border border-2 rounded-full overflow-hidden`} >
              <img className='w-full h-full object-cover' src={tripData.tripImageUrl?.[0]?.url || '../img/placeholder-image.png'}/>
              </div>
          
              <div className='flex flex-col ml-4'>
                <div className={`uppercase font-semibold text-2xl w-[10ch]`}> 
                
                  {children}
                </div>
                <div className='font-light text-xs'>
                  {dayjs(tripData.arrDate).format('D MMM YYYY')}  →  {dayjs(tripData.depDate).format('D MMM YYYY')}
                </div>

              </div>
            </Link>
            <Popup position="relative"
              modal
              {...{ contentStyle, overlayStyle }}
              trigger={<img src='../icons/bin.png' className="h-8 duration-300 pl-10 opacity-50 hover:opacity-90 cursor-pointer"/>} >
              {close => (
                <div className='flex p-1 flex-col items-center font-medium text-base rounded-lg w-full'>
                  <h1 className="text-xl p-2">Are you sure you want to delete the trip to {children} ?</h1>
                  <button className='border w-1/2 bg-buttonRed text-black rounded-xl p-4' onClick={() => { handleDelete(tripKey); close() }}>CONFIRM</button>
                </div>
              )}
            </Popup>
          </div>

        </div>

        {allData.loading === false && allData.tripData && allData.tripData.tripImageUrl && allData.tripData.tripImageUrl[0] && <Tooltip anchorSelect={`.${uniqueClassName}`} place='top' clickable>
  Photo by <Link href={allData.tripData.tripImageUrl[0].portfolioUrl + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target="_blank"><u>{allData.tripData.tripImageUrl[0].name}</u></Link> on <Link href={'https://unsplash.com/' + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target='_blank'><u>Unsplash</u></Link>
</Tooltip>}

        

      </div>




    )
  }
  else {
    return (
      <div className='flex-1 grid place-items-center '><i className="fa-solid fa-spinner animate-spin text-6xl"></i></div>
    )
  }
}