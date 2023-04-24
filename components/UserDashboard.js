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

  const { trips, setTrips, loading, error } = useFetchTrips()

  const unsplashKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;



  async function getUrl() {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${trip}&client_id=${unsplashKey}`);
      const data = await response.json();
      const imageUrl = []
      for (let i = 0; i < 10; i++) {
        if (data.results[i]) {
         
          imageUrl.push({ urlFull: data.results[i].urls.full, urlThumb: data.results[i].urls.thumb, name: data.results[i].user.last_name ? data.results[i].user.first_name + ' ' + data.results[i].user.last_name : data.results[i].user.first_name, portfolioUrl: data.results[i].user.links.html })

        }
      }
      return (imageUrl)
    }
    catch {
      return ([])
    }
  }

  async function handleAddTrip() {
    setOpen(false);
    if (!trip || arrDate === null || depDate === null) { return setErr('Please fill in the required fields') }


    const url = await getUrl()
    const newKey = Object.keys(trips).length === 0 ? 1 : Math.max(...Object.keys(trips)) + 1
    setTrips({ ...trips, [newKey]: trip })
    const userRef = doc(db, 'users', currentUser.uid, 'Trips', newKey.toString())

    await setDoc(userRef, { Name: trip, arrDate: arrDate.format('YYYY-MM-DD'), depDate: depDate.format('YYYY-MM-DD'), tripImageUrl: url, preferredImageIndex: 0 })

    handleButton(false)


  }

  function handleButton(exit) {
    if (open === false) {
      setOpen(true);
      setErr('')
    } else {
      if (exit === true) {
        setOpen(false);
      }
      setTrip('')
      setArrDate(null)
      setDepDate(null)
    }
  }

  return (
    <div className='w-full text-black max-w-[90ch] mx-auto items-center flex flex-col flex-wrap sm:gap-5
    text-xs sm:text-sm overflow-hidden'>
      <div className='flex flex-col items-center text-center select-none'>
        <h1 className="text-3xl sm:text-5xl pb-3 sm:pb-10 pt-0"><span className='font-bold'>Welcome,</span> <span className='font-light'>Samuel!</span></h1>
        <h1 className="text-lg sm:text-xl font-regular">Here are your current trips. <br></br>
          Want to add another one? Just click the plus icon. </h1>
      </div>

      {(loading) && (<div className='flex-1 grid place-items-center '>
        <i className="fa-solid fa-spinner animate-spin text-6xl text-black"></i>
      </div>)}


      {(!loading) && (


        <div className=' flex pb-20 pt-5 h-[60ch] pr-3 sm:h-[65ch] overflow-y-auto pl-3 flex-wrap gap-5 w-full items-start content-start sm:justify-between justify-center justify-self-center'>

          <>
            {Object.keys(trips).map((trip, i) => {
              return (
                <TripCard key={i} tripKey={trip}>
                  {trips[trip]}
                </TripCard>

              )
            })}
          </>
        </div>

      )}
      <div className="  w-full flex justify-center -mt-16 sm:-mt-28 z-10 bg-gradient-to-t from-white h-[10ch] items-start ">
        <button onClick={() => handleButton()} className=" rounded-full bg-buttonGreen opacity-100 hover:opacity-80 duration-300 shadow-lg h-20 w-20 cursor-pointer" ><img src='../icons/plus-sign.svg' /></button>
      </div>
      <Popup open={open}
        position="relative"
        modal
        closeOnDocumentClick={false}
        {...{ contentStyle, overlayStyle }}

      >

        <div className='flex flex-col font-medium text-base items-center rounded-lg w-full'>
          <i onClick={() => handleButton(true)} className="text-3xl fa-solid fa-xmark cursor-pointer absolute top-2 right-4 "></i>
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
          <button className='border w-1/2 bg-buttonGreen opacity-100 hover:opacity-80 duration-300 text-black rounded-xl p-3 m-4' onClick={() => { handleAddTrip() }}>Create trip</button>
        </div>
      </Popup>

    </div>
  )

}