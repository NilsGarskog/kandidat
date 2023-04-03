import React from 'react'
import Link from 'next/link';

export default function TripCard(props) {
  const { children, edittedValue, setEdittedValue, todoKey, handleEditTodo, handleDelete } = props;
  return (
    // <a href="/MyTrip">
    <div className='p-2 relative border sm:p-3 flex items-stretch border-white border-solid'>
      <link href="/MyTrip" rel="stylesheet" />

      <div className='flex-1 flex'>
        <> {children}</>
        {/*  {children} */}
      </div>

      <div className='flex items-center'>
        <i onClick={handleDelete(todoKey)} className="fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer"></i>
      </div>
    </div>
    // </a>
  )
}