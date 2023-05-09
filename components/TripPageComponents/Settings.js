import { React, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import { useRouter } from 'next/router';
import { useAuth } from 'context/authContext.js'
import Popup from 'reactjs-popup';
import { doc, setDoc, deleteField, deleteDoc } from 'firebase/firestore'
import { db } from 'firebase.js'



export default function Settings(props) {
    const { userInfo, currentUser } = useAuth()
    const router = useRouter()
    const { tripKey } = router.query
    const isMobile = window.innerWidth < 640;

    let [saveLoading, setSaveLoading] = useState(false)


    const contentStyle = {
        width: "400px",
        height: "200px",
        borderRadius: "0.7em",
        boxShadow: "0px 3px 7px rgba(0, 0, 0, 0.2)",
      }
      
      const mobileContentStyle = {
        width: "300px",
        height: "200px",
        borderRadius: '0.7em',
        boxShadow: "0px 3px 7px rgba(0, 0, 0, 0.2)",
      }
    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };

    async function handleUpdate() {
        if (NewName != "" && NewArrDate != null && NewDepDate != null) {
            setSaveLoading(true)
            const userRef = doc(db, 'users', currentUser.uid, 'Trips', tripKey)
            await setDoc(userRef, {
                Name: NewName,
                arrDate: dayjs(NewArrDate).format('YYYY-MM-DD'),
                depDate: dayjs(NewDepDate).format('YYYY-MM-DD'),
            }, { merge: true })
            setSaveLoading(false)
            router.reload();
        } else {
            setErr("Please fill in all the fields")
        }
    }

    async function handleDelete(tripKey) {

        const userRef = doc(db, 'users', currentUser.uid, 'Trips', tripKey)
        await deleteDoc(userRef)

        router.push('/')

    }


    let Name = props.data.Name
    let arrDate = dayjs(props.data.arrDate)
    let depDate = dayjs(props.data.depDate)
    let [NewName, setNewName] = useState(Name)
    let [NewArrDate, setNewArrDate] = useState(arrDate)
    let [NewDepDate, setNewDepDate] = useState(depDate)
    let [err, setErr] = useState("");




    return (
        <div className="flex  w-full justify-center ">
            <div className=' flex flex-col space-y-4'>
                <div className='flex h-2 pb-4 text-red-600'>
                    <h1 >{err}</h1>
                </div>
                <div className='flex flex-col justify-center'>
                    <h1 className="text-2xl sm:text-3xl pb-2 sm:pt-5">DESTINATION</h1>
                    <input type="text" placeholder='Enter trip' value={NewName}
                        onChange={(e) => setNewName(e.target.value)} className="outline-none p-3 
      text-base sm:text-lg text-slate-900 flex-1 rounded"/>
                </div>
                <div className='flex flex-row'>
                    <div className="flex flex-col pb-3 pr-5 ">
                        <h1 className="text-xl sm:text-2xl pb-1">ARRIVAL</h1>
                        <DatePicker className='w-[15ch]' value={NewArrDate} onChange={(newValue) => setNewArrDate(newValue)} format='DD-MM-YYYY' />
                    </div>
                    <div className="flex flex-col ">
                        <h1 className="text-xl sm:text-2xl pb-1">DEPARTURE</h1>

                        <DatePicker  className='w-[15ch]'  value={NewDepDate} onChange={(newValue) => setNewDepDate(newValue)} format='DD-MM-YYYY' />

                    </div>
                </div>
                <div className="flex flex-row justify-evenly">
                    {saveLoading === false &&
                        <button className='text-lg font-bold sm:font-semibold border w-1/3 bg-buttonGreen opacity-100 hover:opacity-80 duration-300 text-black rounded-xl p-3' onClick={() => { handleUpdate() }}>SAVE</button>
                    }
                    {saveLoading === true &&
                        <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
                    }
                    <Popup position="relative"
                        modal
                        contentStyle={isMobile? mobileContentStyle : contentStyle}
                        overlayStyle={overlayStyle}
                        trigger={<button className='text-lg font-bold sm:font-semibold border w-1/3 bg-buttonRed opacity-100 hover:opacity-80 duration-300 text-black rounded-xl p-3' >DELETE</button>} >
                        {close => (

                            
                            <div className='flex pt-5 flex-col items-center text-base  rounded-lg w-full'>
                                <h1 className="text-center font-normal text-lg sm:px-5 p-2 mb-2 ">Are you sure you want to <b>delete</b> the trip to {NewName}?</h1>
                                <button className='border font-bold w-1/2 bg-buttonRed text-black rounded-xl p-4' onClick={() => { handleDelete(tripKey); close() }}>CONFIRM</button>
                            </div>
                        )}
                    </Popup>
                </div>
            </div>
        </div>
    );
}
