import React from 'react'

export default function ActivityCard(props) {
    const children = props.children
    const actData = {name: children.activityName, img: children.actImage[0], description: children.description}
    console.log(actData)
  return (
 
    <div className='sm:max-w-sm max-w-xs duration-300 hover:bg-gray-100 shadow-xl bg-white text-black rounded-xl items-center'>
    <div className='flex items-center pr-40 pl-3 pt-4 pb-4'>
      <div className=' flex items-center'>


        <div className={`ml-3 h-20 w-20  rounded-full overflow-hidden`} >
          <img className='w-full h-full object-cover' src={actData.img?.urlThumb || '../img/placeholder-image.png'} />
        </div>

        <div className='flex flex-col ml-4'>
          <div className={`uppercase font-semibold text-2xl w-[10ch] select-none cursor-default`}>

            {actData.name}
          </div>
         

        </div>
      </div>
    </div>

  </div>
  )
}
