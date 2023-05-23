import React, { useState, useEffect } from 'react';
import Algoritmen from '@/Algorithms/Algoritmen';
import { removeDuplicates, getActName } from 'utils/calUtils.js';
import Day from './Day';
import useFetchTripData from '../hooks/FetchTripData';
import toast from 'react-hot-toast';

export default function Calendar(props) {
  const data = props.data;
  const itCreated = props.itCreated;
  const [regenerateFlag, setRegenerateFlag] = useState(false);

  const allData = useFetchTripData(data.tripKey);
  const [currentView, setCurrentView] = useState(0);
  const [daysPerView, setDaysPerView] = useState(3);

  const isMobile = window.innerWidth < 640; // adjust breakpoint as needed

  const [itinerary, setItinerary] = useState([]);


  useEffect(() => {
    if (isMobile) {
      setDaysPerView(1); // adjust number of days per view for mobile
    } else {
      setDaysPerView(3); // set back to default for larger screens
    }
  }, [isMobile]);

  const regenerateItinerary = () => {
    setRegenerateFlag(true);
    toast.success('Regenerated itinerary!');
  };

  useEffect(() => {
    if (regenerateFlag) {
      const regeneratedItinerary = Algoritmen(data.arrDate, data.depDate, data.actArr);
      allData.tripData.itinerary = regeneratedItinerary;
      setRegenerateFlag(false);
    }
  }, [regenerateFlag, data.arrDate, data.depDate, data.actArr, allData.tripData]);
  
  if (allData.loading === false) {
    console.log(allData)
    let itinerary = allData.tripData.itinerary;

    if (data.itinerary === null || regenerateFlag) {
      itinerary = Algoritmen(data.arrDate, data.depDate, data.actArr);
    }

    const isNextEnabled = (itinerary && (currentView + 1) * daysPerView < (itinerary.length || 0)) || false;
    const isPrevEnabled = currentView > 0;

    const daysToRender = itinerary ? itinerary.slice(currentView * daysPerView, (currentView * daysPerView) + daysPerView) : [];

    return (
      <div className='flex flex-col'>
        {!isMobile && (
          <button onClick={regenerateItinerary} className='rounded-lg w-[16ch] p-1 px-3 sm:mt-5 bg-buttonGreen hover:opacity-70 duration-300 shadow-lg flex justify-center items-center gap-2 text-lg font-semibold uppercase'>
            <div>REGENERATE</div>
            <i className="fa-solid duration-300 hover:rotate-90 fa-arrows-rotate text-3xl cursor-pointer"></i>
          </button>
        )}
        <div className={`flex w-full mt-8 sm:mt-4`}>
          {itinerary && itinerary.length > daysPerView + 1 && (
            <div className='flex mt-0 justify-evenly'>
              <button className='h-20 px-0' onClick={() => setCurrentView(currentView - 1)} disabled={!isPrevEnabled}>
                <img
                  className={`absolute left-0 sm:mt-32 mt-40 ml-6 sm:ml-40 h-12 sm:h-20 ${!isPrevEnabled ? 'opacity-50' : 'cursor-pointer opacity-80 hover:opacity-100'}`}
                  src='../icons/arrow-left.png'
                  style={{ backfaceVisibility: 'hidden' }}
                />
              </button>
            </div>
          )}

          <div className="w-full h-auto flex justify-center select-none cursor-default">
            {daysToRender.map((item, index) => (
              <Day
                key={item.day}
                day={item.day}
                activities={item.act}
                actArr={data.actArr}
              />
            ))}

            {itinerary && itinerary.length > daysPerView + 1 && (
              <div className='flex mt-0 justify-evenly'>
                <button className='h-20 px-0' onClick={() => setCurrentView(currentView + 1)} disabled={!isNextEnabled}>
                  <img
                    className={`absolute right-0 sm:mt-32 mt-40 mr-6 sm:mr-40 h-12 sm:h-20 px-0 ${!isNextEnabled ? 'opacity-50' : 'cursor-pointer opacity-80 hover:opacity-100'}`}
                    src='../icons/arrow-right.png'
                    style={{ backfaceVisibility: 'hidden' }}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <h1>Loading...</h1>;
}
