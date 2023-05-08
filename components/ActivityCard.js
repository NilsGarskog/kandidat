import React from 'react'
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';

export default function ActivityCard(props) {
    const children = props.children
    const actData = {name: children.activityName, img: children.actImage[0], description: children.description, id: children.id}
    const uniqueClassName = `act-image-${actData.id}`;
    const isMobile = window.innerWidth < 640;


  return (
 
    <div className="flex flex-row items-center">

    <div className='sm:max-w-sm max-w-[10ch] sm:duration-300 sm:hover:bg-gray-100 sm:shadow-xl sm:bg-white text-black sm:rounded-xl sm:items-center'>
      <div className='flex items-center pr-40 pl-3 sm:pt-4 pb-4'>
        <div className=' flex sm:flex-row flex-col items-center justify-center'>


          <div className={`${uniqueClassName} ml-3 h-20 w-20  rounded-full overflow-hidden`} >
            <img className='w-full h-full object-cover' src={actData.img?.urlThumb || '../img/placeholder-image.png'} />
          </div>

          <div className='flex flex-wrap flex-col ml-4 sm:text-left text-center mt-2 sm:mt-0 ml-4'>
            <div className={`uppercase font-light sm:font-semibold text-base sm:text-2xl w-[10ch] select-none cursor-default`}>

              {actData.name}
            </div>
           
          </div>
     </div>
      </div>

    </div>

    {actData.img && !isMobile && <Tooltip anchorSelect={`.${uniqueClassName}`} place='top' clickable>
      Photo by <Link href={actData.img.portfolioUrl + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target="_blank"><u>{actData.img.name}</u></Link> on <Link href={'https://unsplash.com/' + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target='_blank'><u>Unsplash</u></Link>
    </Tooltip>}




  </div>





  )
}
