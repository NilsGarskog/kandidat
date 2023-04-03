import React from 'react'
import Link from 'next/link';

export default function TripCard(props) {
  const { children, tripKey, handleDelete } = props;
  return (
    <div className=' border sm:p-3 grid grid-cols-12 border-white border-solid '>
      <a href={`/MyTrip/${children}`} className='col-span-11'>
        <div className=' '>
          <> {children}</>
          {/*  {children} */}
        </div>
      </a >
      <div className=' items-center'>
        <i onClick={handleDelete(tripKey)} className=" fa-solid fa-trash-can  duration-300 hover:scale-125 cursor-pointer z-10 absolute "></i>
      </div>
    </div>
  )
}