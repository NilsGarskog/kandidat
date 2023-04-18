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
import Map from './Map'
import APItest from './APItest'
import Autocomplete from './Autocomplete'


export default function UserDashboard() {
  const { userInfo, currentUser } = useAuth()
  const [trip, setTrip] = useState('')
  const [arrDate, setArrDate] = useState(null)
  const [depDate, setDepDate] = useState(null)
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");
  const [tripImageUrl, setTripImageUrl] = useState([]);



  const contentStyle = { borderRadius: '20px' };
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };

  const {trips, setTrips, loading, error} = useFetchTrips()

  const unsplashKey = 'r43nNRBOIfWqh_6e_Z_aw8DKgGsZpG4UAgk1VvnXKQ8'


async function getUrl(){
  try{
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${trip}&client_id=${unsplashKey}`);
  const data = await response.json();
  const imageUrl = []
  for(let i = 0; i < 10; i++){
    if(data.results[i]){
  imageUrl.push(data.results[i].urls.regular)
    }
  }
  return(imageUrl)
}
catch {
  return([])
}
}
  
  async function handleAddTrip() {
     if (!trip || arrDate === null || depDate === null) { return setErr('Please fill in the required fields') }

    /* try { 
      // Get image URL from Unsplash API
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${trip}&client_id=${unsplashKey}`);
      const data = await response.json();
      const imageUrl = []
      for(let i = 0; i < 10; i++){
      imageUrl.push(data.results[i].urls.regular);
      }
      console.log(imageUrl)
      setTripImageUrl('Funkar detta?')
      setTripImageUrl(imageUrl);
      console.log(tripImageUrl)
       */
    
    const url = await getUrl()
    console.log(url)
    const newKey = Object.keys(trips).length === 0 ? 1 : Math.max(...Object.keys(trips)) + 1
    setTrips({ ...trips, [newKey]: trip })
    const userRef = doc(db, 'users', currentUser.uid, 'Trips', newKey.toString())
 
    await setDoc(userRef, { Name: trip, arrDate: arrDate.format('YYYY-MM-DD'), depDate: depDate.format('YYYY-MM-DD'), tripImageUrl: url })
    
    handleButton()


     }
    /* catch {
  setTripImageUrl([])
    
    }  */
  
    
  

  async function handleDelete(tripKey) {

    const userRef = doc(db, 'users', currentUser.uid, 'Trips', tripKey)
    await deleteDoc(userRef)

    const tempObj = { ...trips }
    delete tempObj[tripKey]
    setTrips(tempObj)
  }

  function handleButton() {
    if (open === false) {
      setOpen(true);
      setErr('')
    } else {
      setOpen(false);
      setTrip('')
      setArrDate(null)
      setDepDate(null)
    }
  }

  return (
    <div className='w-full max-w-[65ch] mx-auto items-center justify-self-center flex flex-col gap-3 sm:gap-5
    text-xs sm:text-sm'>

      {(loading) && (<div className='flex-1 grid place-items-center '>
        <i className="fa-solid fa-spinner animate-spin text-6xl text-black"></i>
      </div>)}


      {(!loading) && (
        <>
          {Object.keys(trips).map((trip, i) => {
            return (
              // <div className="w-full">
              <TripCard key={i} tripKey={trip} handleDelete={handleDelete}>
                {trips[trip]}
              </TripCard>
              // {/* </div> */}
            )
          })}
        </>
      )}
      <button onClick={() => handleButton()} className="duration-300 hover:bg-slate-100 rounded-full shadow-xl h-20 w-20 cursor-pointer" ><img src='../icons/plus-sign.svg' /></button>

      <Popup open={open}
        position="relative"
        modal
        closeOnDocumentClick={false}
        {...{ contentStyle, overlayStyle }}

      >

        <div className='flex flex-col font-medium text-base items-center rounded-lg w-full'>
          <i onClick={() => handleButton()} className="text-3xl fa-solid fa-xmark cursor-pointer absolute top-2 right-4 "></i>
          {/* <button onClick={close} className='absolute top-0 right-0 p-2'>CLOSE</button> */}
          <div className="flex flex-col items-stretch p-3 items-center">
            <h1 className="text-2xl pb-2">DESTINATION</h1>
            <input type="text" placeholder='Enter trip' value={trip}
              onChange={(e) => setTrip(e.target.value)} className="outline-none p-3 
      text-base sm:text-lg text-slate-900 flex-1"/>
          </div>
          <div className='flex h-2 pb-4 text-red-600'>
            <h1 >{err}</h1>
          </div>
          <div className='flex flex-col sm:flex-row space-x-20 p-3'>
            <div className="flex flex-col ">
              <h1 className="text-xl pb-1">ARRIVAL</h1>
              <DatePicker value={arrDate} onChange={(newValue) => setArrDate(newValue)} />
            </div>
            <div className="flex flex-col ">
              <h1 className="text-xl pb-1">DEPARTURE</h1>
              <DatePicker value={depDate} onChange={(newValue) => setDepDate(newValue)} />
            </div>
          </div>
          <button className='border w-1/2 bg-black text-white rounded-xl p-3 m-4' onClick={() => { handleAddTrip() }}>Create trip</button>
        </div>
      </Popup>

    </div>
  )

}