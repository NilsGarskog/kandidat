import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import TripCard from './TripCard'
import { doc, setDoc, deleteField, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import useFetchTrips from '../hooks/FetchTrips'
import useFetchProfileInfo from '../hooks/FetchProfileInfo'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import Map from './Map'
import APItest from './APItest'
import Autocomplete from './Autocomplete'
import { getUrl } from '@/utils/urlUtil'
import Header from './Header'


export default function UserDashboard() {
  const { userInfo, currentUser } = useAuth()
  const [trip, setTrip] = useState('')
  const [arrDate, setArrDate] = useState(null)
  const [depDate, setDepDate] = useState(null)
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");
  const [tripImageUrl, setTripImageUrl] = useState([]);
  const isMobile = window.innerWidth < 640;
  const unsplashKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;




  const contentStyle = { 
  width: "600px",
  height: "420px",
  borderRadius: '1em',
  boxShadow: "0px 3px 7px rgba(0, 0, 0, 0.2)",
 };

  
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };

  const mobileContentStyle = {
    width: "350px",
    height: "470px",
    borderRadius: '0.7em',
    boxShadow: "0px 3px 7px rgba(0, 0, 0, 0.2)",
  }

  const { trips, setTrips, loading, error } = useFetchTrips()
  const { loadingPInfo, errorPInfo, profileData, setProfileData } = useFetchProfileInfo()





  async function handleAddTrip() {
    if (!trip || arrDate === null || depDate === null) { return setErr('Please fill in the required fields') }
    setOpen(false);


    const url = await getUrl(trip, unsplashKey)
    const newKey = Object.keys(trips).length === 0 ? 1 : Math.max(...Object.keys(trips)) + 1
    setTrips({ ...trips, [newKey]: trip })
    const userRef = doc(db, 'users', currentUser.uid, 'Trips', newKey.toString())

    await setDoc(userRef, { Name: trip, arrDate: arrDate.format('YYYY-MM-DD'), depDate: depDate.format('YYYY-MM-DD'), tripImageUrl: url, preferredImageIndex: 0, itCreated: false, itineary: null })

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
    <div className='overflow-hidden'>
      <Header/>
      <div className='w-full text-black max-w-[90ch] mx-auto items-center flex flex-col flex-wrap sm:gap-5
    text-xs sm:text-sm overflow-hidden'>
        {(!loadingPInfo) && (
          <div className='flex flex-col items-center text-center select-none cursor-default'>
            <h1 className="text-3xl sm:text-5xl pb-3 sm:pb-10 pt-10 sm:pt-0"><span className='font-bold'>Welcome,</span> <span className='font-light'> {profileData.ProfileInfo?.FirstName ? profileData.ProfileInfo.FirstName + '!' : 'Traveller!'} </span></h1>
            <h1 className="text-md sm:text-xl font-regular sm:mb-0 mb-3">Here are your current trips. <br></br>
              Want to add another one? Just click the plus icon. </h1>
          </div>
        )}

        {(loading) && (<div className='flex-1 grid place-items-center '>
          <i className="fa-solid fa-spinner animate-spin text-6xl text-black"></i>
        </div>)}


        {(!loading) && (


          <div className=' flex pb-20 pt-5 h-[60ch] pr-3 sm:h-[65ch] overflow-y-auto pl-3 flex-wrap  gap-5 w-full items-start content-start sm:justify-between justify-center justify-self-center'>

            <>
            {Object.keys(trips).reverse().map((tripKey) => {
  return (
    <TripCard key={tripKey} tripKey={tripKey}>
      {trips[tripKey]}
    </TripCard>
  );
})}

            </>
          </div>

        )}
        <div className="  w-full flex justify-center -mt-24  sm:-mt-36 z-10 bg-gradient-to-t from-white via-white via-30% h-[10ch] items-start ">
          <button onClick={() => handleButton()} className=" rounded-full bg-buttonGreen opacity-100 hover:opacity-80 duration-300 shadow-lg h-20 w-20 cursor-pointer" ><img src='../icons/plus-sign.svg' /></button>
        </div>
        <Popup open={open}
          position="relative"
          modal
          closeOnDocumentClick={false}
         contentStyle={isMobile ? mobileContentStyle : contentStyle}
         overlayStyle={overlayStyle}

        >

          <div className='flex flex-col font-medium text-base items-center rounded-lg w-full'>
            <i onClick={() => handleButton(true)} className="text-4xl sm:text-5xl  fa-solid fa-xmark cursor-pointer absolute top-2 right-4 duration-300 opacity-50 hover:opacity-100 "></i>
            {/* <button onClick={close} className='absolute top-0 right-0 p-2'>CLOSE</button> */}
            <div className="flex flex-col items-stretch p-3 sm:pl-8 pt-10 w-full justify-items-start items-center">
              <h1 className="text-3xl sm:text-4xl pb-2 select-none cursor-default">DESTINATION</h1>
              <input type="text" placeholder='Enter trip' value={trip}
                onChange={(e) => setTrip(e.target.value)} className="outline-none p-3 
      text-base sm:text-lg text-slate-900 flex-1 w-[28ch] rounded-md"/>
            </div>
            <div className='flex h-2 pb-4 text-red-600'>
              <h1 >{err}</h1>
            </div>
            <div className='flex flex-col sm:flex-row w-full p-3 sm:pl-8'>
              <div className='justify-items-start w-full '>
              <div className="flex flex-col sm:mt-0 -mt-4 mb-4">
                <h1 className="text-2xl sm:text-3xl pb-1 select-none cursor-default">ARRIVAL</h1>
                <DatePicker  value={arrDate} onChange={(newValue) => {setArrDate(newValue), setDepDate(newValue)}} format='DD-MM-YYYY' className=' w-[20ch]'/>
              </div>
              </div>
              <div className='justify-items-start w-full '>
              <div className="flex flex-col ">
                <h1 className="text-2xl sm:text-3xl pb-1 select-none cursor-default">DEPARTURE</h1>

                <DatePicker value={depDate} onChange={(newValue) => setDepDate(newValue)} format='DD-MM-YYYY' className='w-[20ch]'/>

              </div>
              </div>
            </div>
            <button className='border uppercase font-semibold w-1/2 sm:w-1/3 text-base sm:text-lg bg-buttonGreen opacity-100 hover:opacity-80 duration-300 text-black rounded-xl p-3 m-4 mt-4' onClick={() => { handleAddTrip() }}>Create trip</button>
          </div>
        </Popup>

      </div> 
    </div>
  )

}