import React, {useState} from 'react'
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import { useRouter } from 'next/router';
import { doc, setDoc, collection, addDoc, deleteField, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/authContext'

export default function ActivityCard(props) {
    const { userInfo, currentUser } = useAuth()
    const router = useRouter()
    const { tripKey } = router.query
    const children = props.children
    const actData = {name: children.activityName, img: children.actImage[0], description: children.description, id: children.id, type: children.type}
    const uniqueClassName = `act-image-${actData.id}`;
    const [isEditing, setIsEditing] = useState(false)
    const [newDescription, setNewDescription] = useState(actData.description)
    const [buttonText, setButtonText] = useState('EDIT')
    const isMobile = window.innerWidth < 640;
    const contentStyle = {
      width: "800px",
      height: "400px",
      borderRadius: "0.7em",
      boxShadow: "0px 3px 7px rgba(0, 0, 0, 0.2)",
    }
    
    const mobileContentStyle = {
      width: "350px",
      height: "450px",
      borderRadius: '0.7em',
      boxShadow: "0px 3px 7px rgba(0, 0, 0, 0.2)",
    }

    async function handleEditDescription() {
    const userRef = doc(db, 'users', currentUser.uid, 'Trips', tripKey, 'Activities', actData.id)
    await setDoc(userRef, {
      description: newDescription
  }, { merge: true })
    setIsEditing(false)
      
    }

    async function handleDeleteActivity() {
      const userRef = doc(db, 'users', currentUser.uid, 'Trips', tripKey, 'Activities', actData.id)
      await deleteDoc(userRef)

      window.location.href = `/${tripKey}`

     
    }

    function toggleEdit(){
      if(isEditing){
        handleEditDescription()
        setButtonText('EDIT')
        setIsEditing(false)
      }
      else{
        setButtonText('SAVE')
        setIsEditing(true)
      }
    }
  return (

    <div className="flex flex-row items-center">
         <Popup
         
         
         trigger={

    <div className='sm:max-w-sm max-w-[10ch] sm:duration-300 sm:hover:bg-gray-100 sm:shadow-xl sm:bg-white text-black sm:rounded-xl sm:items-center cursor-pointer'>
      <div className='flex items-center pr-40 pl-3 sm:pt-4 pb-4'>
        <div className=' flex sm:flex-row flex-col items-center justify-center'>


          <div className={`${uniqueClassName} ml-3 h-20 w-20  rounded-full overflow-hidden`} >
            <img className='w-full h-full object-cover' src={actData.img?.urlThumb || '../img/placeholder-image.png'} />
          </div>

          <div className='flex flex-wrap flex-col ml-4 sm:text-left text-center mt-2 sm:mt-0 ml-4'>
            <div className={`uppercase font-light sm:font-semibold text-base sm:text-2xl w-[10ch] select-none `}>

              {actData.name}
            </div>
           
          </div>
     </div>
      </div>

    </div>
         }
         contentStyle={isMobile ? mobileContentStyle : contentStyle}
        position="relative"
        modal
        closeOnDocumentClick={isMobile? true : false}
      >
         {(close) => (
          <>
           <i
                    onClick={() => {
                      close();
     
             

                    }}
                    className="p-2 sm:pr-4 pr-2 sm:pt-4 pt-2 sm:text-5xl text-4xl fa-solid fa-xmark cursor-pointer absolute top-0 right-2 duration-300 opacity-50 hover:opacity-100 "
                  ></i>
          <div className='flex flex-col sm:pl-10 pl-5 sm:pt-10 pt-5'>
          <h1 className='uppercase font-light text-3xl sm:text-5xl sm:pb-10 pb-5'>
            {actData.name}
          </h1>
          <div className='flex flex-col sm:flex-row'>
          <div className='sm:mr-64 pr-10 font-extralight leading-normal sm:leading-relaxed italic text-lg sm:text-xl sm:pt-4 cursor-default select-none'>
          {isEditing ? (
  <textarea 
    maxLength='175' 
    wrap='soft' 
    resize='none' 
    className='resize-none rounded-lg bg-gray-100 font-extralight leading-normal sm:leading-relaxed italic text-lg sm:text-xl w-[25ch] sm:w-[35ch] h-[12ch]' 
    value={newDescription} 
    onChange={(e) => setNewDescription(e.target.value)}
  >
  </textarea>
) : (
  <>{newDescription !== '' ? newDescription : `Click 'EDIT' to add a description to this ${actData.type === 0 ? 'activity.' : 'restaurant.'} `}</>
)}

          </div>
          
          <div className={`flex flex-col sm:-mt-4 mt-4 mr-10 sm:items-center ${isMobile ? 'absolute bottom-0 mb-8 ml-3': 'absolute right-0'} `}>
          <div className={`sm:h-52 sm:w-52 h-32 w-32 rounded-full overflow-hidden `} >
         
            <img className='w-full h-full object-cover  items-center' src={actData.img?.urlFull || '../img/placeholder-image.png'} />
          </div>
          
            <div className='sm:text-sm text-xs mt-2 max-w-[30ch] sm:max-w-[30ch] sm:text-center text-gray-700 italic'>
              Photo by <Link className='focus:outline-none' href={actData.img.portfolioUrl + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target="_blank"><u>{actData.img.name}</u></Link> on <Link href={'https://unsplash.com/' + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target='_blank'><u>Unsplash</u></Link>
          
          </div>
          </div>
         
          
          
          </div>
          <div className={`flex sm:flex-row flex-col mt-10 sm:gap-10 gap-3 text-lg sm:text-xl font-medium absolute ${isMobile ? 'right-0 pr-10 mt-64': 'bottom-0'} mb-10`}>
          <button onClick={toggleEdit} className='duration-300 hover:opacity-60 bg-buttonGreen rounded-2xl drop-shadow-md text-center px-3 sm:pr-4 pr-2 text-left w-[100px] h-[40px] sm:w-[10ch] sm:h-[40px] '>
          {buttonText}
          </button>
          <button onClick={() =>
            {handleDeleteActivity(); 
            close();
            }}
            className='duration-300 hover:opacity-60 bg-buttonRed rounded-2xl drop-shadow-md text-center  px-3 sm:pr-4 pr-2 text-left w-[100px] h-[40px] sm:w-[10ch] sm:h-[40px] '>
            DELETE
          </button>
          </div>
         
          </div>
          </>
         )}
   </Popup>
   {/*  {actData.img && !isMobile && <Tooltip anchorSelect={`.${uniqueClassName}`} place='top' clickable>
      Photo by <Link href={actData.img.portfolioUrl + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target="_blank"><u>{actData.img.name}</u></Link> on <Link href={'https://unsplash.com/' + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target='_blank'><u>Unsplash</u></Link>
    </Tooltip>}
 */}



  </div>





  )
}
