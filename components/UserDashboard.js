import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import TripCard from './TripCard'
import { doc, setDoc, deleteField, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import useFetchTrips from '../hooks/FetchTrips'

export default function UserDashboard() {
  const { userInfo, currentUser } = useAuth()
  const [trip, setTrip] = useState('')

  const { trips, setTrips, loading, error } = useFetchTrips()

  async function handleAddTrip() {
    if (!trip) { return }
    const newKey = Object.keys(trips).length === 0 ? 1 : Math.max(...Object.keys(trips)) + 1
    setTrips({ ...trips, [newKey]: trip })
    const userRef = doc(db, 'users', currentUser.uid, 'Trips', newKey.toString())
    console.log(newKey)
    await setDoc(userRef, { Name: trip })
    setTrip('')

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
        <button onClick={handleAddTrip} className='w-fit px-4 sm:px-6 py-2 sm:py-3 
      bg-black text-white font-medium text-base duration-300 
      hover:opacity-40'>
          ADD
        </button>
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