import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import TripCard from './TripCard'
import { doc, setDoc, deleteField, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import useFetchTrips from '../hooks/FetchTrips'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'


export default function UserDashboard() {
  const { userInfo, currentUser } = useAuth()
  const [trip, setTrip] = useState('')
  const [arrDate, setArrDate] = useState(null)
  const [depDate, setDepDate] = useState(null)

  const { trips, setTrips, loading, error } = useFetchTrips()

  async function handleAddTrip() {
    if (!trip) { return }
    const newKey = Object.keys(trips).length === 0 ? 1 : Math.max(...Object.keys(trips)) + 1
    setTrips({ ...trips, [newKey]: trip })
    const userRef = doc(db, 'users', currentUser.uid, 'Trips', newKey.toString())
    console.log(newKey)
    await setDoc(userRef, { Name: trip, arrDate: arrDate.format('YYYY-MM-DD'), depDate: depDate.format('YYYY-MM-DD') })
    setTrip('')
    setArrDate(null)
    setDepDate(null)

  }

  function handleDelete(tripKey) {
    return async () => {
      const tempObj = { ...trips }
      delete tempObj[tripKey]

      setTrips(tempObj)
      const userRef = doc(db, 'users', currentUser.uid, 'Trips', tripKey)
      await deleteDoc(userRef)

    }
  }

  return (
    <div className='w-full max-w-[65ch] mx-auto flex flex-col gap-3 sm:gap-5
    text-xs sm:text-sm'>
      <div className="flex items-stretch">
        <input type="text" placeholder='Enter trip' value={trip}
          onChange={(e) => setTrip(e.target.value)} className="outline-none p-3 
      text-base sm:text-lg text-slate-900 flex-1"/>
        <Popup trigger={<button className='w-fit px-4 sm:px-6 py-2 sm:py-3 
      bg-black text-white font-medium text-base duration-300 
      hover:opacity-40'>
          ADD
        </button>}
          position="relative"
          modal
          closeOnDocumentClick={false}
        >
          {close => (
            <div className='flex flex-col items-center font-medium text-base rounded-lg w-full'>
              <i onClick={close} className="text-3xl fa-solid fa-xmark cursor-pointer absolute top-0 right-2 "></i>
              {/* <button onClick={close} className='absolute top-0 right-0 p-2'>CLOSE</button> */}
              <div className='flex flex-col sm:flex-row space-x-20 pb-8 pt-8  '>
                <div className="flex flex-col items-center">
                  <h1>Choose arrival</h1>
                  <DatePicker value={arrDate} onChange={(newValue) => setArrDate(newValue)} />
                </div>
                <div className="flex flex-col items-center">
                  <h1>Choose departure</h1>
                  <DatePicker value={depDate} onChange={(newValue) => setDepDate(newValue)} />
                </div>
              </div>
              <button className='border w-1/2 bg-green-300' onClick={() => { handleAddTrip(); close(); }}>Create trip</button>
            </div>
          )}
        </Popup>


      </div>

      {(loading) && (<div className='flex-1 grid place-items-center '>
        <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
      </div>)}


      {(!loading) && (
        <>
          {Object.keys(trips).map((trip, i) => {
            return (
              <TripCard key={i} tripKey={trip} handleDelete={handleDelete}>
                {trips[trip]}
              </TripCard>
            )
          })}
        </>
      )}
      {/*!addTodo && <button onClick={() => setAddTodo(true)} className='text-cyan-300 border border-solid border-cyan-300 py-2 text-center uppercase 
       text-lg duration-300 hover:opacity-30'>ADD TRIP</button>*/}
    </div>
  )
}