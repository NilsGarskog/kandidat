import React, { useEffect, useState } from 'react'
import { doc, setDoc, collection, addDoc, deleteField, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/authContext'
import { v4 } from 'uuid'
import Popup from 'reactjs-popup';

import fetchAct from '@/Algorithms/Algoritmen'
import ActivityContainer from './ActivityContainer'
import { Checkbox } from '@mui/material'
import useFetchAct from '@/hooks/FetchActivities'
import { getUrl } from '@/utils/urlUtil'



export default function CreateActivity(props) {
  const { tripKey } = props.tripKey
  const [activityData] = props.actData
  const [error, setError] = useState('')
  let [activity, setActivity] = useState('')
  let [activityLength, setActivityLength] = useState('')
  let [activityType, setActivityType] = useState('')
  const [actInfo, setActInfo] = useState([])
  const [foodInfo, setFoodInfo] = useState([])
  const { userInfo, currentUser } = useAuth()
  const [actOpen, setActOpen] = useState(false);
  const [foodOpen, setFoodOpen] = useState(false);
  const [err, setErr] = useState("");


  const [checkedActShort, setCheckedActShort] = useState(null)
  const [checkedLunch, setCheckedLunch] = useState(null)
  const [actDescription, setActDescription] = useState('')
  const isMobile = window.innerWidth < 640; // adjust breakpoint as needed

  const contentStyle = {
    width: '500px',
    height: '500px',
    borderRadius: '0.7em',
    boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.2)'


  }
  
  const contentStyleMobile = {
    width: '350px',
    height: '470px',
    borderRadius: '0.7em',
    boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.2)'


  }

  if (props.type === 'activity') {

    return (

      <div >

        <div  >
        <div className='static flex sm:items-start flex-col sm:mt-0 mt-0 mb-2'>
            <div className=' flex sm:flex-row flex-col sm:justify-start justify-between items-start sm:items-center mb-4'>
           <h1 className=' text-4xl pl-4'>ACTIVITIES</h1>
            {!isMobile && <img className="rounded-full bg-buttonGreen opacity-100 hover:opacity-80 duration-300 shadow-lg h-16 w-16 ml-6 cursor-pointer" onClick={() => handleActButton()} src="../icons/plus-sign.svg"></img>}
            </div>
            <div className='sm:mt-0 mt-10 flex sm:flex-col sm:h-[24ch]'>
            <div className=' flex sm:flex-col-reverse '>
            {isMobile && <div className='flex bg-gradient-to-l from-white z-10'><img className=" rounded-full bg-buttonGreen opacity-100 hover:opacity-80 duration-300 shadow-lg h-20 w-20 ml-6 cursor-pointer" onClick={() => handleActButton()} src="../icons/plus-sign.svg"></img></div>}
            <div className='sm:h-[24ch] flex sm:flex-col sm:overflow-y-scroll overflow-x-scroll'>
            {Object.keys(actInfo).map((act, i) => {
            return (
      
      <ActivityContainer  key={i} actInfo = {act} tripKey={props.tripKey}  >
        {actInfo[act]}
      </ActivityContainer>         
    )
  })}
  
  <ActivityContainer tripKey={props.tripKey} showType = 'showAct' >{}</ActivityContainer>
  </div>
        </div>
          </div>
          </div>

        </div>
        <Popup open={actOpen}
          contentStyle={isMobile? contentStyleMobile : contentStyle}
          position="relative"
          modal
          closeOnDocumentClick={false}>

          <div className='sm:pl-6 flex flex-col sm:items-start items-center font-medium text-base text-black rounded-lg w-full'>
            <i onClick={() => handleActButton()} className="text-4xl sm:text-5xl fa-solid fa-xmark cursor-pointer absolute top-2 right-3 duration-300 opacity-50 hover:opacity-100 "></i>
            {/* <button onClick={close} className='absolute top-0 right-0 p-2'>CLOSE</button> */}

            <div className='flex text-red-600'>
              <h1>{err}</h1>
            </div>

            <div className='select-none'>
              <div className='flex flex-start text-3xl sm:text-4xl'>
                <p className='p-2 pt-10 font-light uppercase'>Activity</p>
              </div>
              <div className="search">
                <span></span>
                <input type="text" className='rounded-lg bg-gray-200 pl-2 p-1 ml-2 italic text-slate-500 sm:w-[32ch] w-[27ch] items-center ' placeholder="Enter name..." value={activity} onChange={(e) => { setActivity(e.target.value) }} />
              </div>
              <div className="relative w-full lg:max-w-sm">
                <div className='flex flex-start text-2xl sm:text-3xl'>
                  <p className='p-2 pt-6 font-light uppercase'>Length of activity</p>
                </div>
                <div className='flex items-center font-light uppercase text-base'>
                  <label className='flex items-center ml-3'>
                    <input type='radio' label='Short' name='activitlength' className=' checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus:outline-none focus:ring-1 focus:ring-black cursor-pointer' value={checkedActShort} onChange={(e) => { setCheckedActShort(true) }} />
                    <div className='ml-2'>Short</div>
                  </label>
                  <label className='flex items-center'>
                    <input type='radio' label='Long' name='activitlength' className='checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus:outline-none focus:ring-1 focus:ring-black ml-3 cursor-pointer' value={checkedActShort} onChange={(e) => { setCheckedActShort(false) }} />
                    <div className='ml-2'>Long</div>
                  </label>
                </div>
              </div>
              <div>
                <div className=' items-center p-2 pt-4 font-light'>
                  <p className='flex flex-start text-2xl sm:text-3xl uppercase '>Add description </p>
                  <p className='sm:text-xl'>(optional)</p>
                </div>
                <textarea type='text' placeHolder='Enter description...' className='resize-none text-start rounded-lg bg-gray-200 pl-3 p-1 pt-3 ml-2 italic text-slate-500 sm:w-[38ch] w-[27ch] h-[10ch] ' value={actDescription} onChange={(e) => { setActDescription(e.target.value) }}></textarea>
              </div>

            </div>
            </div>
            <p className='text-rose-700'>{error}</p>
           <div className='flex justify-center sm:w-full sm:mx-0 sm:px-0'> 
            <button onClick={() => addActivity()} id="addButton" className=" bg-buttonGreen duration-300 hover:opacity-50 rounded-lg drop-shadow-md w-[90px] h-[40px] uppercase text-xl sm:text-2xl sm:w-[110px]  font-semibold mt-2">
              ADD
            </button>
            
            </div>
          
        </Popup>
      </div>)
  }
  else {
    return (

      <div>

        <div >
        <div className='static flex sm:items-start flex-col sm:mt-0 mt-0 mb-24 sm:mb-2'>
            <div className='flex sm:flex-row flex-col sm:justify-start justify-between items-start sm:items-center mb-4'>
           <h1 className=' text-4xl pl-4'>FOOD</h1>
            {!isMobile && <img className="rounded-full bg-buttonGreen opacity-100 hover:opacity-80 duration-300 shadow-lg h-16 w-16 ml-6 cursor-pointer" onClick={() => handleFoodButton()} src="../icons/plus-sign.svg"></img>}
            </div>
            <div className='sm:mt-0 mt-10 flex sm:flex-col sm:h-[24ch]'>
            <div className=' flex sm:flex-col-reverse '>
            {isMobile && <div className=' flex justify-items-center bg-white'><img className=" rounded-full bg-buttonGreen opacity-100 hover:opacity-80 duration-300 shadow-lg h-20 w-20 ml-6 cursor-pointer" onClick={() => handleFoodButton()} src="../icons/plus-sign.svg"></img></div>}
            <div className='sm:h-[24ch] flex sm:flex-col sm:overflow-y-scroll overflow-x-scroll'>
            {Object.keys(foodInfo).map((food, i) => {
            return (
      
      <ActivityContainer  key={i} foodInfo = {food} tripKey={props.tripKey}  >
        {foodInfo[food]}
      </ActivityContainer>         
    )
  })}
  
  <ActivityContainer tripKey={props.tripKey} showType = 'showFood' >{}</ActivityContainer>
  </div>
        </div>
          </div>
          </div>

        </div>

        <Popup open={foodOpen}
          contentStyle={isMobile? contentStyleMobile : contentStyle}
          position="relative"
          modal
          closeOnDocumentClick={false}>

          <div className='sm:pl-6 flex flex-col sm:items-start items-center font-medium text-base text-black rounded-lg w-full'>
            <i onClick={() => handleFoodButton()} className="text-3xl sm:text-5xl fa-solid fa-xmark cursor-pointer absolute top-2 right-3 duration-300 opacity-50 hover:opacity-100 "></i>
            {/* <button onClick={close} className='absolute top-0 right-0 p-2'>CLOSE</button> */}

            <div className='flex text-red-600'>
              <h1>{err}</h1>
            </div>

            <div className='select-none'>
              <div className='flex flex-start text-3xl sm:text-4xl'>
                <p className='p-2 pt-10 font-light uppercase'>Restaurant</p>
              </div>
              <div className="search">
                <span></span>
                <input type="text" className='rounded-lg bg-gray-200 pl-2 p-1 ml-2 italic text-slate-500 sm:w-[32ch] w-[27ch] items-center ' placeholder="Enter name..." value={activity} onChange={(e) => { setActivity(e.target.value) }} />
              </div>
              <div className="relative w-full lg:max-w-sm">
                <div className='flex flex-start text-2xl sm:text-3xl'>
                  <p className='p-2 pt-6 font-light uppercase'>Suitable for</p>
                </div>
                <div className='flex items-center font-light uppercase text-base'>
                  <label className='flex items-center ml-3'>
                    <input type='radio' label='Short' name='activitlength' className=' checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus:outline-none focus:ring-1 focus:ring-black cursor-pointer' value={checkedLunch} onChange={(e) => { setCheckedLunch(true) }} />
                    <div className='ml-2'>Lunch</div>
                  </label>
                  <label className='flex items-center'>
                    <input type='radio' label='Long' name='activitlength' className='checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus:outline-none focus:ring-1 focus:ring-black ml-3 cursor-pointer' value={checkedLunch} onChange={(e) => { setCheckedLunch(false) }} />
                    <div className='ml-2'>Dinner</div>
                  </label>
                </div>
              </div>
              <div>
                <div className=' items-center p-2 pt-4 font-light'>
                  <p className='flex flex-start text-2xl sm:text-3xl uppercase '>Add description </p>
                  <p className='sm:text-xl'>(optional)</p>
                </div>
                <textarea type='text' placeHolder='Enter description...' className='resize-none text-start rounded-lg bg-gray-200 pl-3 p-1 pt-3 ml-2 italic text-slate-500 sm:w-[38ch] w-[27ch] h-[10ch] ' value={actDescription} onChange={(e) => { setActDescription(e.target.value) }}></textarea>
              </div>
              </div>
            </div>
            <p className='text-rose-700'>{error}</p>
           <div className='flex justify-center sm:w-full sm:mx-0 sm:px-0'> 
            <button onClick={() => addFood()} id="addButton" className=" bg-buttonGreen duration-300 hover:opacity-50 rounded-lg drop-shadow-md w-[90px] h-[40px] uppercase text-xl sm:text-2xl sm:w-[110px]  font-semibold mt-2">
              ADD
            </button>
            
            </div>
        </Popup>
      </div>)

  }
  function translateStringToNum() {
    if (activityType.toString() == 'Activity') {
      activityType = 0
    }
    else if (activityType.toString() == 'Lunch') {
      activityType = 1
    }
    else {
      activityType = 2
    }
    if (activityLength.toString() == 'Short') {
      activityLength = 0
    }
    else {
      activityLength = 1
    }
  }
  function handleActButton() {
    if (actOpen === false) {
      setActOpen(true);
      setErr('')

    } else {
      setActOpen(false);
      setActivity('')
      setActDescription('')
    }
  }
  function handleFoodButton() {
    if (foodOpen === false) {
      setFoodOpen(true);
      setErr('')

    } else {
      setFoodOpen(false);
      setActivity('')
      setActDescription('')
    }
  }
  async function addActivity() {
   
    if (!activity) {
      setError('Please enter activity name')
    }

    else {
      if (checkedActShort == null) {
        setError('Please choose a length for your activity')
      }
      else {
        setError('')
        translateStringToNum()
        handleAddActivity()
        handleActButton()
        setActivity('')
        setCheckedActShort(null)
      }
    }


  }
  function addFood() {
    if (!activity) {
      setError('Please enter restaurant name')
    }

    else {
      if (checkedLunch == null) {
        setError('Please choose a type of restaurant')
      }
      else {
        setError('')
        translateStringToNum()
        handleAddFood()
        handleFoodButton()
        setActivity('')
        setActDescription('')
        setCheckedLunch(null)
      }
    }

  }


async function handleAddFood() {
  const newKey = v4()

  if (checkedLunch) {
    activityType = 1
  }
  else if (!checkedLunch) {
    activityType = 2
  }

  const userRef = doc(db, 'users', currentUser.uid, 'Trips', props.tripKey, 'Activities', newKey.toString())
  const actUrl = await getUrl(activity, process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY)
  console.log(actUrl)

  const data = {
    id: newKey,
    activityName: activity,
    time: 0,
    type: activityType,
    description: actDescription,
    actImage: actUrl 


  }
  setFoodInfo([...foodInfo, data])
  await setDoc(userRef, data)
    .then((docRef) => {
      console.log('Document written with ID: ');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });


}

async function handleAddActivity() {
  const newKey = v4()
  if (checkedActShort) {
    activityLength = 0
  }
  else if (!checkedActShort) {
    activityLength = 1
  }


  const userRef = doc(db, 'users', currentUser.uid, 'Trips', props.tripKey, 'Activities', newKey.toString())
  const actUrl = await getUrl(activity, process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY)
  const data = {
    id: newKey,
    activityName: activity,
    time: activityLength,
    type: 0,
    description: actDescription,
    actImage: actUrl
  }
  setActInfo([...actInfo, data])
  await setDoc(userRef, data)
    .then((docRef) => {
      console.log('Document written with ID: ');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });


}

}