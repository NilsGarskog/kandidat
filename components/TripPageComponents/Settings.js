import { React, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import { useRouter } from 'next/router';
import { useAuth } from 'context/authContext.js'
import Popup from 'reactjs-popup';
import { doc, setDoc, deleteField, deleteDoc, collection, getDocs } from 'firebase/firestore'
import { db } from 'firebase.js'



export default function Settings(props) {
    const { userInfo, currentUser } = useAuth()
    const router = useRouter()
    const { tripKey } = router.query

    let [saveLoading, setSaveLoading] = useState(false)

    const contentStyle = { borderRadius: '20px' };
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

        const collectionRef = collection(db, 'users', currentUser.uid, 'Trips', tripKey, 'Activities');
        const querySnapshot = await getDocs(collectionRef);

        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
                });

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
            <div className='pl-20 flex flex-col space-y-4'>
                <div className='flex h-2 pb-4 text-red-600'>
                    <h1 >{err}</h1>
                </div>
                <div>
                    <h1 className="text-2xl pb-2">DESTINATION</h1>
                    <input type="text" placeholder='Enter trip' value={NewName}
                        onChange={(e) => setNewName(e.target.value)} className="outline-none p-3 
      text-base sm:text-lg text-slate-900 flex-1"/>
                </div>
                <div className='flex flex-row'>
                    <div className="flex flex-col pb-3 pr-5 ">
                        <h1 className="text-xl pb-1">ARRIVAL</h1>
                        <DatePicker value={NewArrDate} onChange={(newValue) => setNewArrDate(newValue)} format='DD-MM-YYYY' />
                    </div>
                    <div className="flex flex-col ">
                        <h1 className="text-xl pb-1">DEPARTURE</h1>

                        <DatePicker value={NewDepDate} onChange={(newValue) => setNewDepDate(newValue)} format='DD-MM-YYYY' />

                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    {saveLoading === false &&
                        <button className='border w-1/3 bg-buttonGreen opacity-100 hover:opacity-80 duration-300 text-black rounded-xl p-3' onClick={() => { handleUpdate() }}>SAVE CHANGES</button>
                    }
                    {saveLoading === true &&
                        <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
                    }
                    <Popup position="relative"
                        modal
                        {...{ contentStyle, overlayStyle }}
                        trigger={<button className='border w-1/3 bg-buttonRed opacity-100 hover:opacity-80 duration-300 text-black rounded-xl p-3' >DELETE TRIP</button>} >
                        {close => (
                            <div className='flex p-1 flex-col items-center font-medium text-base rounded-lg w-full'>
                                <h1 className="text-xl p-2">Are you sure you want to delete the trip to {NewName} ?</h1>
                                <button className='border w-1/2 bg-buttonRed text-black rounded-xl p-4' onClick={() => { handleDelete(tripKey); close() }}>CONFIRM</button>
                            </div>
                        )}
                    </Popup>
                </div>
            </div>
        </div>
    );
}
