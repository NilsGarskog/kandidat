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
      <div className='flex flex-col absolute bottom-0 right-0 p-2 mb-1 mr-2'>
       <div className='flex gap-3 '>
      <button onClick={() => {if(imageIndex !== 0) {handleEditHeaderImage(imageIndex-1)}}} ><img className={`h-8 sm:h-10 ${imageIndex==0? 'opacity-50 cursor-default':'opacity-80 hover:opacity-100' }`}src='../icons/arrow-left.png'></img></button>
      <button onClick={() => {if(imageIndex !== urlArray.length -1) {handleEditHeaderImage(imageIndex+1)}}} ><img className={`h-8 sm:h-10 ${imageIndex==urlArray.length -1? 'opacity-50 cursor-default':'opacity-80 hover:opacity-100' }`} src='../icons/arrow-right.png'></img></button>
     </div>
      
      </div>
      {urlArray && urlArray[imageIndex] && <div className='text-xs text-white absolute bottom-0 left-0 bg-black bg-opacity-50 p-2 mb-2 ml-2'>
      Photo by <Link href={urlArray[imageIndex].portfolioUrl + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target="_blank"><u>{urlArray[imageIndex].name}</u></Link> on <Link href={'https://unsplash.com/' + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target='_blank'><u>Unsplash</u></Link>
      </div>}
     
     
   
     
    </div>
  )
}
