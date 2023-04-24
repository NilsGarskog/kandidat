import React, { useState, useEffect } from 'react'
import Algoritmen from '@/Algorithms/Algoritmen';
import { removeDuplicates, getActName } from 'utils/calUtils.js';
import Day from './Day';

export default function Calendar(props) {
  const data = props.data
  const itCreated = props.itCreated
  const regen = props.regen
  let itineary = []
  if (data.itineary === null || regen === true) {
    itineary = Algoritmen(data.arrDate, data.depDate, data.actArr)
  } else {
    itineary = data.itineary
  }

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

  return (
    <div className='flex flex-col w-full'>
      {itineary.length > daysPerView + 1 && <div className='flex  mt-0 justify-evenly'>
        <button className='h-20 mr-20 px-0' onClick={() => setCurrentView(currentView - 1)} disabled={!isPrevEnabled}>
          <img className={`-mb-10 mr-24 px-0 h-10 ${!isPrevEnabled ? 'opacity-50 ' : 'cursor-pointer opacity-80 hover:opacity-100'}`}
            src='../icons/arrow-left.png'
            style={{ backfaceVisibility: 'hidden' }}
          />
        </button>

        <button className='h-20 ml-20 px-0' onClick={() => setCurrentView(currentView + 1)} disabled={!isNextEnabled}>
          <img className={`-mb-10 ml-24 h-10 px-0 ${!isNextEnabled ? 'opacity-50 ' : 'cursor-pointer opacity-80 hover:opacity-100'}`}
            src='../icons/arrow-right.png'
            style={{ backfaceVisibility: 'hidden' }}
          />
        </button>

      </div>}
      <div className="w-full h-[70ch] flex flex-wrap justify-center gap-10 -mt-12 select-none">

        {daysToRender.map((item, index) => (
          <Day
            key={item.day}
            day={item.day}
            activities={item.act}
            actArr={data.actArr}
          />
        ))}

      </div>
    </div>
  )
}