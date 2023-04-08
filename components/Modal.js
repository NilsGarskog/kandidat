import React, {useState, useEffect} from 'react'
import  ReactDom  from 'react-dom'
import { useAuth } from '../context/authContext'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { doc, setDoc, deleteField } from 'firebase/firestore'
import {db} from '../firebase'
import useFetchTrips from '../hooks/FetchTrips'

export default function Modal(props) {
    const { setOpenModal } = props
    const [_document, set_document] = useState(null)
    const {logout} = useAuth()

    async function handleEditProfile() {

        if(!editedValue) {return}
        const newKey = edit
        setTodos({...todos , [newKey]: editedValue})
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(userRef, {
            'todos': {
                [newKey]: editedValue
            }

        }, {merge: true})
        setEdit(null)
        setEditedValue('')

    }

    useEffect(() => { 
        set_document(document)
    }, [])
    if (!_document) { return null}

  return ReactDom.createPortal(
    <div className='fixed inset-0 bg-white text-slate-900 text-lg sm:text-xl flex flex-col'>
        <div className='flex items-center justify-between border-b border-solid border-slate-900 p-4'>
            <h1 className='font-extrabold text-2xl sm:text-5xl'>MENU</h1>
            <i onClick={() => setOpenModal(false)} className="fa-solid fa-xmark duration-300 hover:rotate-90 text-lg sm_text-3xl"></i>
        </div>
        <div className='p-4 flex flex-col gap-3'>
        <Popup className = 'shadow-2xl shadow-red 'trigger = {   <h2 className="select-none duration-300 hover:pl-2 cursor-pointer">Edit profile</h2>}
        
        position="relative"
        modal
        closeOnDocumentClick={false}
        >
            {close => (
        
        <div className='flex flex-col items-center font-medium text-base rounded-lg w-full'>
              <i onClick={close} className="text-3xl fa-solid fa-xmark cursor-pointer absolute top-0 right-2 "></i>
              <p>Here is your profile information.<br/>Don't forget to save your changes.</p>
        <div className='flex justify-center'>
            <div className="flex flex-col justify-items-center">
            <h2>First name</h2>
            <input placeholder='Hej'></input>
            </div>
            <div>
                <h2 className="flex flex-col justify-items-center">Last Name</h2>
                <input placeholder='Hejdå'></input>
            </div>
           
        </div>
        <div>
                <button>Save</button>
            </div>
        </div>
        
              )}

    
           
        </Popup>
     
        <h2 onClick={() => {
            logout()
            setOpenModal(false)
        }} className="select-none duration-300 hover:pl-2 cursor-pointer">Logout</h2>
        </div>
    </div>, _document.getElementById('portal')
  )
}
