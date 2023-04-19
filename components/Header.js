import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { useAuth } from '../context/authContext'
import { useRouter } from 'next/router';


export default function Header() {
  const [openModal, setOpenModal] = useState(false)
  const { currentUser } = useAuth()
  const router = useRouter()

  if (!currentUser) {
    return
  }

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div className='w-full pr-5 pl-5 pt-3 left-0 bg-inherit flex items-center justify-between p-1'>
        <h1 onClick={() => router.push('/')} className='text-2xl select-none text-black  duration-300 hover:opacity-40 cursor-pointer sm:text-4xl font-medium'> PLANNER </h1>
        <i onClick={() => setOpenModal(true)} className="fa-solid fa-user text-xl text-black duration-300 hover:opacity-40 cursor-pointer sm:text-3xl"></i>
      </div>
    </>
  )
}
