import React, { useEffect, useState }  from 'react' 
import { doc, setDoc, collection, addDoc, deleteField, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/authContext'
import {v4} from 'uuid'
import Popup from 'reactjs-popup';

import fetchAct from '@/Algorithms/Algoritmen'
import ActivityCard from './ActivityCard'
import { Checkbox } from '@mui/material'



export default function CreateActivity(props){
    const {tripKey} = props.tripKey
    const [activityData] = props.actData
    
    let [activity, setActivity] = useState('')
    let [activityLength, setActivityLength] = useState('')
    let [activityType, setActivityType] = useState('')
    const { userInfo, currentUser } = useAuth()
    const [actOpen, setActOpen] = useState(false);
    const [foodOpen, setFoodOpen] = useState(false);
    const [err, setErr] = useState("");
    const showAct = 'showAct'
    const showLunch = 'showLunch'
    const showDinner = 'showDinner'
    const showFood = 'showFood'
    const[checkedActShort, setCheckedActShort] = useState(false)
    const[checkedLunch, setCheckedLunch] =useState(false)
    
    if(props.type === 'activity'){
    
    return(
        
        <div >
            
        <div className='flex items-center box-content h-32 w-60  text-base p-6 bg-slate-300 rounded-lg  '>
        <div> 
            <i onClick={() => handleActButton()} className="fa-solid fa-circle-plus fa-2xl duration-300 
      hover:opacity-40 cursor-pointer"></i>
            <ActivityCard actData = {props.actData} type = 'showAct'></ActivityCard>
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
              <p className='p-2 pl-4 pt-4 font-light'>Add information about your activity</p>
              </div>
              <div className="search">
                    <span></span>
                    <input type="text" className='rounded-lg bg-gray-200 pl-2 p-1 italic text-slate-500 w-[21ch] items-center' placeholder="Name of activity" value={activity} onChange={(e) => {setActivity(e.target.value)}}/>
              
                    <div className="relative w-full lg:max-w-sm">
                      <div className='flex flex-start text-xl select-none'>
              <p className='p-2 pl-4 pt-4 font-light'>Length of activity</p>
              </div>
            <div>
              <label>
              <input type='radio' label='Short' name='activitlength' value={checkedActShort} onChange={(e) => {setCheckedActShort(!checkedActShort)}}/>
              Short
              </label>
              <label>
              <input type='radio' label='Long' name='activitlength' value={checkedActShort} onChange={(e) => {setCheckedActShort(!checkedActShort)}}/>
              Long
              </label>
            </div>
         
            
              </div>
            </div>
            </div>
            
            <button onClick={() => addActivity()} id="addButton" className="duration-300 hover:bg-gray-100 rounded-lg drop-shadow-md w-[90px] h-[40px] border uppercase text-xl font-semibold">
        ADD
        </button>
            </div>
          </Popup> 
          </div>)}
          else{
            return(
        
                <div >
                    
                <div className='flex items-center box-content h-32 w-60  text-base p-6 bg-slate-300 rounded-lg  '>
                <div> 
                    <i onClick={() => handleFoodButton()} className="fa-solid fa-circle-plus fa-2xl duration-300 
              hover:opacity-40 cursor-pointer"></i>
                    <ActivityCard actData = {props.actData} type = 'showFood'></ActivityCard>
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
                      <p className='p-2 pl-4 pt-4 font-light'>Add information about your restaurant</p>
                      </div>
                      <div className="search">
                            <span></span>
                            <input type="text" className='rounded-lg bg-gray-200 pl-2 p-1 italic text-slate-500 w-[21ch] items-center' placeholder="Name of activity" value={activity} onChange={(e) => {setActivity(e.target.value)}}/>
                        <div className='flex flex-start text-xl select-none'>
                      <p className='p-2 pl-4 pt-4 font-light'>This place is suitable for</p>
                      </div>
                            <div className="relative w-full lg:max-w-sm">
                            <div>
                              <label>
                              <input type='radio' label='Lunch' name='foodType' value={checkedLunch} onChange={(e) => {setCheckedLunch(!checkedLunch)}}/>
                              Lunch
                              </label>
                              <label>
                              <input type='radio' label='Dinner' name='foodType' value={checkedLunch} onChange={(e) => {setCheckedLunch(!checkedLunch)}}/>
                              Dinner
                              </label>
                            </div>
                    
                    
                    
                      </div>
                    </div>
                    </div>
                    
                    <button onClick={() => addFood()} id="addButton" className="duration-300 hover:bg-gray-100 rounded-lg drop-shadow-md w-[90px] h-[40px] border uppercase text-xl font-semibold">
                ADD
                </button>
                    </div>
                  </Popup> 
                  </div>)

          }
    function translateStringToNum(){
        if(activityType.toString() == 'Activity'){
            activityType = 0
        }
        else if (activityType.toString() == 'Lunch'){
            activityType = 1
        }
        else {
            activityType = 2
        }
        if (activityLength.toString() == 'Short'){
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
        }
      }
      function handleFoodButton() {
        if (foodOpen === false) {
          setFoodOpen(true);
          setErr('')
    
        } else {
          setFoodOpen(false);
          setActivity('') 
        }
      }
    function addActivity(){            
        translateStringToNum()
        handleAddActivity(props, activity, activityLength, currentUser, checkedActShort)
        handleActButton()
        setActivity('')        
        
    }
    function addFood(){            
      translateStringToNum()
      handleAddFood(props, activity,  activityType, currentUser,  checkedLunch)
      handleFoodButton()
      setActivity('')        
      
  }
   
}
async function handleAddFood(props, activity,  activityType, currentUser,  checkedLunch) {
  const newKey = v4()
  
  if(checkedLunch){
    activityType = 1
  }
  else if(!checkedLunch){
    activityType = 2
  }
  
  const userRef = doc(db, 'users', currentUser.uid, 'Trips', props.tripKey, 'Activities', newKey.toString())

const data = {
  id: newKey,
  activityName: activity,
  time: 0,
  type: activityType

}
setDoc(userRef, data)
.then((docRef) => {
console.log('Document written with ID: ');
})
.catch((error) => {
console.error('Error adding document: ', error);
});
 

}

async function handleAddActivity(props, activity, activityLength, currentUser, checkedActShort, checkedLunch) {
    const newKey = v4()
    if(checkedActShort){
      activityLength = 0
    }
    else if (!checkedActShort){
      activityLength = 1
    }
    
    
    const userRef = doc(db, 'users', currentUser.uid, 'Trips', props.tripKey, 'Activities', newKey.toString())

const data = {
    id: newKey,
    activityName: activity,
    time: activityLength,
    type: 0

}
setDoc(userRef, data)
.then((docRef) => {
  console.log('Document written with ID: ');
})
.catch((error) => {
  console.error('Error adding document: ', error);
});
   

  }

  