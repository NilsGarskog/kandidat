import React, { useState } from 'react'
import Algoritmen from '@/Algorithms/Algoritmen';
import { removeDuplicates, getActName } from 'utils/calUtils.js';
import Day from './Day';

export default function Calendar(props) {
    const { data } = props
    const itineary = Algoritmen(data.arrDate, data.depDate, data.actArr)
    const [currentView, setCurrentView] = useState(0);
    const daysToRender = itineary.slice(currentView * 3, (currentView * 3) + 3);
  
    return (
      <div className="w-full h-[70ch] flex flex-wrap justify-center gap-10 mt-10 select-none">
        {daysToRender.map((item, index) => (
          <Day
            key={item.day}
            day={item.day}
            activities={item.act}
            actArr={data.actArr}
          />
        ))}
        <button onClick={() => setCurrentView(currentView + 1)}>Next</button>
      </div>
    )
  }