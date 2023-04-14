import React, { useEffect, useState } from 'react'
import { doc, setDoc, collection, addDoc, deleteField, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/authContext'
import { v4 } from 'uuid'
import Popup from 'reactjs-popup';
import Example from '@/hooks/ActivityPopUp'



export default function CreateActivity(props) {
    const { tripKey } = props
    const [activity, setActivity] = useState('')
    let [activityLength, setActivityLength] = useState('Short')
    let [activityType, setActivityType] = useState('Activity')
    const { userInfo, currentUser } = useAuth()


    return (
        < div className="search">
            <span></span>
            <input type="text" className='text-black' placeholder="Add activity..." value={activity} onChange={(e) => {
                setActivity(e.target.value)
            }} />
            {/*<input type="text" className='text-black' placeholder="Type of activity" value={activityType} onChange={(e) => {setActivityType(e.target.value),
                        console.log({activityType})}}/>
                        <input type="text" className='text-black' placeholder="Lenght of activity" value={activityLength} onChange={(e) => {setActivityLength(e.target.value),
                    console.log({activityLength})}}/>*/}
            <div className="relative w-full lg:max-w-sm">
                <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600" value={activityType} onChange={(e) => { setActivityType(e.target.value) }}>
                    <option>Activity</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                </select>
                <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600" value={activityLength} onChange={(e) => { setActivityLength(e.target.value) }}>
                    <option>Short </option>
                    <option>Long </option>

                </select>
            </div>
            <button onClick={addActivity} id="addButton" className='w-fit px-4 sm:px-6 py-2 sm:py-3 
      bg-black text-white font-medium text-base duration-300 
      hover:opacity-40'>
                ADD
            </button>
        </div>)
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
    function addActivity() {
        translateStringToNum()
        handleAddActivity(tripKey, activity, activityLength, activityType, currentUser)
        setActivity('')

    }

}

async function handleAddActivity(tripKey, activity, activityLength, activityType, currentUser) {
    const newKey = v4()
    const userRef = doc(db, 'users', currentUser.uid, 'Trips', tripKey, 'Activities', newKey.toString())

    const data = {
        id: newKey,
        activityName: activity,
        time: activityLength,
        type: activityType

    }
    setDoc(userRef, data)
        .then((docRef) => {
            console.log('Document written with ID: ');
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
        });
    /* const dbRef = collection(db, "users");
     
     const data = {activityName:activity}
     addDoc(dbRef, data)
 .then(docRef => {
     console.log("Document has been added successfully");
 })
 .catch(error => {
     console.log(error);
 })
       
      
 
    console.log('Kom jag hit?')
     const newKey = Object.keys(activity).length === 0 ? 1 : Math.max(...Object.keys(activities)) + 1
     setActivities({ ...activities, [newKey]: activity})
     const userRef = doc(db, 'users', currentUser.uid, 'Trips', tripKey, 'Activities', newKey.toString())
     console.log(newKey)
     await setDoc(userRef, { Name: activity })*/

}

