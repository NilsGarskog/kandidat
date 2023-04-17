import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/router";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useAuth();
  const router = useRouter();

  /* if (!currentUser) {
    return (
      <>
        <div className='sticky top-0 w-full left-0 bg-inherit flex items-center z-30 justify-between p-2 border-b border-solid border-white'>
          <h1 onClick={() => router.push('/')} className='text-1xl select-none sm:text-3xl duration-300 hover:opacity-40 cursor-pointer font-medium'> TRAVEL PLANNER </h1>
        </div>
      </>
    )
  }

  return (
    <>
      {openModal &&  <Modal setOpenModal={setOpenModal}/>}
      <div className='w-full left-0 bg-inherit flex items-center justify-between p-4 border-b border-solid border-white'>
        <h1 onClick={() => router.push('/')} className='text-3xl select-none  duration-300 hover:opacity-40 cursor-pointer sm:text-6xl font-medium'> TRAVEL PLANNER </h1>
        <i onClick={() => setOpenModal(true)} className="fa-solid fa-user text-xl  duration-300 hover:opacity-40 cursor-pointer sm:text-3xl"></i>
      </div>
    </>
  ) */
}
