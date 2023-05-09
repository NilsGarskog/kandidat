import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/router";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useAuth();
  const router = useRouter();

  function closeModalOnClickOutside(event) {
    console.log(event.target.className)
    if (event.target.className != "fa-solid fa-user text-xl text-black duration-300 hover:opacity-40 cursor-pointer sm:text-3xl") {
      setOpenModal(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", closeModalOnClickOutside);
    return () => {
      document.removeEventListener("click", closeModalOnClickOutside);
    };
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div className='w-full pr-5 pl-5 pt-3 left-0 bg-inherit flex items-center justify-between p-1'>
        <div onClick={() => router.push('/')} className="flex items-center duration-300 hover:opacity-40 cursor-pointer">
        <h1 className='text-2xl select-none text-black   sm:text-4xl font-medium'> TRAPLA </h1>
        <img className='h-12 pl-2' src='../img/logo.svg'/>
        </div>
        <i onClick={() => setOpenModal(true)} className="fa-solid fa-user text-xl text-black duration-300 hover:opacity-40 cursor-pointer sm:text-3xl"></i>
      </div>
    </>
  );
}
