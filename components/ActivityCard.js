import React from 'react'

export default function ActivityCard(props) {
    const children = props.children
    const actData = {name: children.activityName, img: children.actImage[0], description: children.description}
    console.log(actData)
  return (
 
    <div className='sm:max-w-sm max-w-[10ch] sm:duration-300 sm:hover:bg-gray-100 sm:shadow-xl sm:bg-white text-black sm:rounded-xl sm:items-center'>
    <div className='flex items-center pr-40 pl-3 sm:pt-4 pb-4'>
      <div className=' flex sm:flex-row flex-col items-center justify-center'>


        <div className={`ml-3 h-20 w-20  rounded-full overflow-hidden`} >
          <img className='w-full h-full object-cover' src={actData.img?.urlThumb || '../img/placeholder-image.png'} />
        </div>

        <div className='flex flex-col sm:text-left text-center ml-4'>
          <div className={`uppercase font-light sm:font-semibold text-md sm:text-2xl w-[10ch] select-none cursor-default`}>

            {actData.name}
          </div>
         

        </div>
      </div>
    </div>

  </div>
  )
}
