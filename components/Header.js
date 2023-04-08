import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { useAuth } from '../context/authContext'

export default function Header() {
  const [openModal, setOpenModal] = useState(false)
  const { currentUser } = useAuth()

  if (!currentUser) {
    return (
      <>
        <div className='sticky top-0 w-full left-0 bg-inherit flex items-center justify-between p-2 border-b border-solid border-white'>
          <h1 className='text-1xl select-none sm:text-3xl font-latoBold'> TRAVEL PLANNER </h1>
        </div>
      </>
    )
  }

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div className='w-full left-0 bg-inherit flex items-center justify-between p-4 border-b border-solid border-white'>
        <h1 className='text-3xl select-none sm:text-6xl font-latoBold'> TRAVEL PLANNER </h1>
        <i onClick={() => setOpenModal(true)} className="fa-solid fa-user text-xl  duration-300 hover:opacity-40 cursor-pointer sm:text-3xl"></i>
      </div>
    </>
  )
}
