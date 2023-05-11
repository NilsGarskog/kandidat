import React , {useState} from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { doc, setDoc } from 'firebase/firestore'
import { useAuth } from 'context/authContext.js'
import { db } from '../firebase'
import { useRouter } from 'next/router';

export default function TripHeader(props) {
  const { userInfo, currentUser } = useAuth()
  const { tripData } = props
  const urlArray = tripData.tripImageUrl
  const router = useRouter()
  const { tripKey } = router.query
  const [isEditing, setIsEditing] = useState(false)
  const isMobile = window.innerWidth < 640;
 

  const [imageIndex, setImageIndex] = useState(tripData.preferredImageIndex)

  async function handleEditHeaderImage(i) {
    const userRef = doc(db, 'users', currentUser.uid, 'Trips', tripKey)
    await setDoc(userRef, {
     preferredImageIndex: i
  }, { merge: true })
  setImageIndex(i)
  }

  return (
    <div
      className='w-full h-[20ch] sm:h-[40ch] relative bg-center bg-cover flex justify-center items-center'
      style={{
        backgroundImage: `url(${urlArray && urlArray[imageIndex] ? urlArray[imageIndex].urlFull : "../img/placeholder-image.png"})`,
        backgroundColor: "rgba(0, 0, 0, 0.4)",

      }}
    >
      <div className='absolute inset-0' style={{ zIndex: -1 }}>
        <div
          className='w-full h-full bg-center opacity-40'
          style={{ backgroundImage: `url(${urlArray && urlArray[imageIndex] ? urlArray[imageIndex].urlFull : "../img/placeholder-image.png"})`}}
        ></div>
      </div>
     
      <div className='flex flex-col'>
      <div className='sm:mt-0 -mt-4 bg-black select-none cursor-default w-auto px-8 sm:px-20 h-[8ch] sm:h-[20ch] flex flex-col text-white justify-items-center items-center justify-center'>
        <div className='text-4xl sm:text-9xl uppercase font-regular '>{tripData.Name}</div>
        <div className='text-md sm:text-2xl lowercase font-light'>{dayjs(tripData.arrDate).format('D MMM')}  →  {dayjs(tripData.depDate).format('D MMM YYYY')} </div>
      </div>
      </div>
      <div className='flex flex-col absolute bottom-0 right-0 p-2 sm:mb-1 sm:mr-2'>
       {isEditing && <div className='flex sm:flex-row flex-col items-center sm:gap-3 gap-2'>
        <div className='flex sm:gap-2 gap-1 sm:mb-0 -mb-1'>
      <button onClick={() => {if(imageIndex !== 0) {handleEditHeaderImage(imageIndex-1)}}} ><img className={`h-8 sm:h-10 ${imageIndex==0? 'opacity-50 cursor-default':'opacity-80 hover:opacity-100' }`}src='../icons/arrow-left.png'></img></button>
      <button onClick={() => {if(imageIndex !== urlArray.length -1) {handleEditHeaderImage(imageIndex+1)}}} ><img className={`h-8 sm:h-10 ${imageIndex==urlArray.length -1? 'opacity-50 cursor-default':'opacity-80 hover:opacity-100' }`} src='../icons/arrow-right.png'></img></button>
      </div>
      <div>
      <button onClick={() => setIsEditing(false)}><p className='bg-black bg-opacity-50 p-2 py-1 sm:mr-3 sm:hover:scale-105 duration-300 sm:text-base text-xs text-white'>DONE!</p></button>
      </div>
     </div>}
     {!isEditing && <div onClick={()=> {setIsEditing(true)}} className='mb-0 cursor-pointer sm:hover:scale-105 duration-300 text-xs sm:text-sm gap-2 p-2 py-1 sm:gap-3 bg-black bg-opacity-50 sm:p-1 sm:px-2 uppercase flex items-center text-white'><p>{isMobile? 'Edit' : 'Edit header image'}</p><i className="sm:text-xl  text-base fa-solid fa-pen text-white"></i></div>}
      
      </div>
      {urlArray && urlArray[imageIndex] && <div className='text-xs text-white absolute bottom-0 left-0 bg-black bg-opacity-50 p-2 ml-2 mr-3 mb-2 '>
      Photo by <Link href={urlArray[imageIndex].portfolioUrl + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target="_blank"><u>{urlArray[imageIndex].name}</u></Link> on <Link href={'https://unsplash.com/' + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target='_blank'><u>Unsplash</u></Link>
      </div>}
     
     
   
     
    </div>
  )
}
