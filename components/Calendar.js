import React, { useState, useEffect } from 'react'
import Algoritmen from '@/Algorithms/Algoritmen';
import { removeDuplicates, getActName } from 'utils/calUtils.js';
import Day from './Day';
import useFetchTripData from '../hooks/FetchTripData'

export default function Calendar(props) {
  const data = props.data
  const itCreated = props.itCreated
  const regen = props.regen
  let itineary = []
  if (data.itineary === null || regen != null) {
    itineary = Algoritmen(data.arrDate, data.depDate, data.actArr)
  } else {
    itineary = data.itineary
  }
  let allData = useFetchTripData(data.tripKey)

  const [currentView, setCurrentView] = useState(0);
  const [daysPerView, setDaysPerView] = useState(3);

  const isMobile = window.innerWidth < 640; // adjust breakpoint as needed

  useEffect(() => {
    if (isMobile) {
      setDaysPerView(1); // adjust number of days per view for mobile
    } else {
      setDaysPerView(3); // set back to default for larger screens
    }
  }, [isMobile]);

  const daysToRender = itineary.slice(currentView * daysPerView, (currentView * daysPerView) + daysPerView);
  const isNextEnabled = (currentView + 1) * daysPerView < itineary.length;
  const isPrevEnabled = currentView > 0;
  if (allData.loading === false) {
    itineary = allData.tripData.itineary
    return (
      <div className='flex flex-col'>
      
        <div className={`flex w-full mt-8 sm:mt-5`}>

          {itineary.length > daysPerView + 1 && <div className='flex  mt-0 justify-evenly'>

            <button className='h-20 px-0' onClick={() => setCurrentView(currentView - 1)} disabled={!isPrevEnabled}>
              <img className={`absolute left-0 sm:mt-32 mt-40 ml-6 sm:ml-40 h-12 sm:h-20 ${!isPrevEnabled ? 'opacity-50 ' : 'cursor-pointer opacity-80 hover:opacity-100'}`}
                src='../icons/arrow-left.png'
                style={{ backfaceVisibility: 'hidden' }}
              />
            </button>
          </div>
          }


          <div className="w-full h-auto flex justify-center select-none cursor-default">

            {daysToRender.map((item, index) => (
              <Day
                key={item.day}
                day={item.day}
                activities={item.act}
                actArr={data.actArr}
              />
            ))}

            {itineary.length > daysPerView + 1 && <div className='flex  mt-0 justify-evenly'>

              <button className='h-20  px-0' onClick={() => setCurrentView(currentView + 1)} disabled={!isNextEnabled}>
                <img className={`absolute right-0 sm:mt-32 mt-40 mr-6 sm:mr-40 h-12 sm:h-20 px-0 ${!isNextEnabled ? 'opacity-50 ' : 'cursor-pointer opacity-80 hover:opacity-100'}`}
                  src='../icons/arrow-right.png'
                  style={{ backfaceVisibility: 'hidden' }}
                />
              </button>
            </div>
            }
          </div>


        </div>
      </div>
    )
  } else { return <h1></h1> }
}