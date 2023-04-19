import React, { useEffect, useState } from 'react'
import { doc, setDoc, collection, addDoc, deleteField, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/authContext'
import { v4 } from 'uuid'
import Popup from 'reactjs-popup';

import fetchAct from '@/Algorithms/Algoritmen'
import ActivityCard from './ActivityCard'
import { Checkbox } from '@mui/material'



export default function CreateActivity(props) {
  const { tripKey } = props.tripKey
  const [activityData] = props.actData
  const [error, setError] = useState('')
  let [activity, setActivity] = useState('')
  let [activityLength, setActivityLength] = useState('')
  let [activityType, setActivityType] = useState('')
  const { userInfo, currentUser } = useAuth()
  const [actOpen, setActOpen] = useState(false);
  const [foodOpen, setFoodOpen] = useState(false);
  const [err, setErr] = useState("");

  const [checkedActShort, setCheckedActShort] = useState(null)
  const [checkedLunch, setCheckedLunch] = useState(null)
  const [actDescription, setActDescription] = useState('')

  if (props.type === 'activity') {

    return (

      <div >

        <div >
          <div>
            <i onClick={() => handleActButton()} className="text-black fa-solid fa-circle-plus fa-2xl duration-300 
      hover:opacity-40 cursor-pointer"></i>
            <ActivityCard actData={props.actData} type='showAct'></ActivityCard>
          </div>


        </div>

        <Popup open={actOpen}
          contentStyle={{
            width: '400px',
            height: '350px',
            borderRadius: '0.7em',
            boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.2)'


          }}
          position="relative"
          modal
          closeOnDocumentClick={false}>

          <div className='flex flex-col items-center font-medium text-base text-black rounded-lg w-full'>
            <i onClick={() => handleActButton()} className="text-3xl fa-solid fa-xmark cursor-pointer absolute top-0 right-2 "></i>
            {/* <button onClick={close} className='absolute top-0 right-0 p-2'>CLOSE</button> */}

            <div className='flex text-red-600'>
              <h1>{err}</h1>
            </div>

            <div className='select-none'>
              <div className='flex flex-start text-xl'>
                <p className='p-2 pl-4 pt-4 font-light uppercase'>Activity Name</p>
              </div>
              <div className="search">
                <span></span>
                <input type="text" className='rounded-lg bg-gray-200 pl-4 p-1 ml-3 italic text-slate-500 w-[30ch] items-center ' placeholder="Enter name..." value={activity} onChange={(e) => { setActivity(e.target.value) }} />
              </div>
              <div className="relative w-full lg:max-w-sm">
                <div className='flex flex-start text-xl'>
                  <p className='p-2 pl-4 pt-4 font-light uppercase'>Length of activity</p>
                </div>
                <div className='flex items-center font-light uppercase'>
                  <label className='flex items-center ml-4'>
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
                <span className='flex items-center p-2 pl-4 pt-4 font-light'>
                  <p className='flex flex-start text-xl uppercase '>Add description </p>
                  <p className='pl-2'>(optional)</p>
                </span>
                <input type='text' placeHolder='Enter description...' className='flex items-center rounded-lg bg-gray-200 p-1 pl-4 ml-3 italic text-slate-500 w-[30ch] h-[5ch] ' value={actDescription} onChange={(e) => { setActDescription(e.target.value) }}></input>
              </div>

            </div>
            <p className='text-rose-700'>{error}</p>
            <button onClick={() => addActivity()} id="addButton" className="duration-300 hover:bg-gray-100 rounded-lg drop-shadow-md w-[90px] h-[40px] border uppercase text-xl font-semibold mt-2">
              ADD
            </button>
          </div>
        </Popup>
      </div>)
  }
  else {
    return (

      <div >

        <div >
          <div>
            <i onClick={() => handleFoodButton()} className="text-black fa-solid fa-circle-plus fa-2xl duration-300 
              hover:opacity-40 cursor-pointer"></i>
            <ActivityCard actData={props.actData} type='showFood'></ActivityCard>
          </div>


        </div>

        <Popup open={foodOpen}
          contentStyle={{
            width: '400px',
            height: '350px',
            borderRadius: '0.7em',
            boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.2)'


          }}
          position="relative"
          modal
          closeOnDocumentClick={false}>

          <div className='flex flex-col items-center font-medium text-base text-black rounded-lg w-full'>
            <i onClick={() => handleFoodButton()} className="text-3xl fa-solid fa-xmark cursor-pointer absolute top-0 right-2 "></i>
            {/* <button onClick={close} className='absolute top-0 right-0 p-2'>CLOSE</button> */}

            <div className='flex text-red-600'>
              <h1>{err}</h1>
            </div>

            <div className='select-none'>
              <div className='flex flex-start text-xl'>
                <p className='p-2 pl-4 pt-4 font-light uppercase'>Restaurant Name</p>
              </div>
              <div className="search">
                <span></span>
                <input type="text" className='rounded-lg bg-gray-200 pl-4 p-1 ml-3 italic text-slate-500 w-[30ch] items-center ' placeholder="Enter name..." value={activity} onChange={(e) => { setActivity(e.target.value) }} />
              </div>
              <div className="relative w-full lg:max-w-sm">
                <div className='flex flex-start text-xl'>
                  <p className='p-2 pl-4 pt-4 font-light uppercase'>Suitable for</p>
                </div>
                <div className='flex items-center font-light uppercase '>
                  <label className='flex items-center ml-4'>
                    <input type='radio' label='Short' name='activitlength' className='checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus:outline-none focus:ring-1 focus:ring-black cursor-pointer' value={checkedLunch} onChange={(e) => { setCheckedLunch(true) }} />
                    <div className='ml-2'>Lunch</div>
                  </label>
                  <label className='flex items-center'>
                    <input type='radio' label='Long' name='activitlength' className=' checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus:outline-none focus:ring-1 focus:ring-black ml-3 cursor-pointer' value={checkedLunch} onChange={(e) => { setCheckedLunch(false) }} />
                    <div className='ml-2'>Dinner</div>
                  </label>
                </div>
              </div>
              <div>
                <span className='flex items-center p-2 pl-4 pt-4 font-light'>
                  <p className='flex flex-start text-xl uppercase '>Add description </p>
                  <p className='pl-2'>(optional)</p>
                </span>
                <input type='text' placeHolder='Enter description...' className='flex items-center rounded-lg bg-gray-200 p-1 pl-4 ml-3 italic text-slate-500 w-[30ch] h-[5ch] ' value={actDescription} onChange={(e) => { setActDescription(e.target.value) }}></input>
              </div>

            </div>
            <p className='text-rose-700'>{error}</p>
            <button onClick={() => addFood()} id="addButton" className="duration-300 hover:bg-gray-100 rounded-lg drop-shadow-md w-[90px] h-[40px] border uppercase text-xl font-semibold mt-2">
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
        handleAddActivity(props, activity, activityLength, currentUser, checkedActShort, actDescription)
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
        handleAddFood(props, activity, activityType, currentUser, checkedLunch, actDescription)
        handleFoodButton()
        setActivity('')
        setActDescription('')
        setCheckedLunch(null)
      }
    }

  }

}
async function handleAddFood(props, activity, activityType, currentUser, checkedLunch, actDescription) {
  const newKey = v4()

  if (checkedLunch) {
    activityType = 1
  }
  else if (!checkedLunch) {
    activityType = 2
  }

  const userRef = doc(db, 'users', currentUser.uid, 'Trips', props.tripKey, 'Activities', newKey.toString())

  const data = {
    id: newKey,
    activityName: activity,
    time: 0,
    type: activityType,
    description: actDescription


  }
  setDoc(userRef, data)
    .then((docRef) => {
      console.log('Document written with ID: ');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });


}

async function handleAddActivity(props, activity, activityLength, currentUser, checkedActShort, actDescription) {
  const newKey = v4()
  if (checkedActShort) {
    activityLength = 0
  }
  else if (!checkedActShort) {
    activityLength = 1
  }


  const userRef = doc(db, 'users', currentUser.uid, 'Trips', props.tripKey, 'Activities', newKey.toString())

  const data = {
    id: newKey,
    activityName: activity,
    time: activityLength,
    type: 0,
    description: actDescription

  }
  setDoc(userRef, data)
    .then((docRef) => {
      console.log('Document written with ID: ');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });


}

