import React, { useState, useEffect } from 'react'
import Algoritmen from '@/Algorithms/Algoritmen';
import { removeDuplicates, getActName } from 'utils/calUtils.js';
import Day from './Day';
import {pdfMake, pdfFonts }from "pdfmake";
import { htmlToPdfmake } from "pdfmake/build/pdfmake";


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
  const dispNo = false
  const dispYes = true


  function downloadPdf()  {

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.fonts = {
  Roboto: {
    normal: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};
  const htmlContent = document.getElementById('pdf-content').innerHTML;
  const content = htmlToPdfmake(htmlContent);
  const docDefinition = {
    content: content,
  };
    pdfMake.createPdf(docDefinition).download("sample.pdf");
  };


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
    <div className='flex flex-col'>
       {!isMobile && <div>
            <h1 className='uppercase text-center text-7xl -mb-10 mt-4 font-bold cursor-default select-none'>
                YOUR Itinerary
            </h1>
            <button onClick={downloadPdf}>Export to PDF</button>
        </div>}
    <div className={`flex w-full mt-8 sm:mt-20`}>
        
      {itineary.length > daysPerView + 1 && <div className='flex  mt-0 justify-evenly'>
   
        <button className='h-20 px-0' onClick={() => setCurrentView(currentView - 1)} disabled={!isPrevEnabled}>
          <img className={`absolute left-0 sm:mt-32 mt-40 ml-6 sm:ml-40 h-12 sm:h-20 ${!isPrevEnabled ? 'opacity-50 ' : 'cursor-pointer opacity-80 hover:opacity-100'}`}
            src='../icons/arrow-left.png'
            style={{ backfaceVisibility: 'hidden' }}
          />
        </button>
        </div>
        }
        

      <div className="w-full h-[70ch] flex justify-center select-none cursor-default">

{daysToRender.map((item, index) => (
  <Day
    key={item.day}
    day={item.day}
    activities={item.act}
    actArr={data.actArr}
    disp = {dispYes}
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
    <div className='collapse hidden'>
        <div id='pdf-content' className='text-sm'> 
{itineary.map((item, index) => (
  <Day
    key={item.day}
    day={item.day}
    activities={item.act}
    actArr={data.actArr}
    disp = {dispNo}
  />
))}
</div>

    </div>
    </div>
  )
}