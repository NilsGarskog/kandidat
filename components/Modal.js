import React, {useState, useEffect} from 'react'
import  ReactDom  from 'react-dom'
import { useAuth } from '../context/authContext'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { doc, setDoc, deleteField, getDoc, collection } from 'firebase/firestore'
import {db, storage } from '../firebase'
import {ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import {v4} from 'uuid'
import useFetchTrips from '../hooks/FetchTrips'

export default function Modal(props) {
    const {userInfo, currentUser} = useAuth()
    const { setOpenModal } = props
    const [_document, set_document] = useState(null)
    const {logout} = useAuth()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [profileInfo, setProfileInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [imageUpload, setImageUpload] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    

    const uploadImage = () => {
        if (imageUpload == null) return;

        const imageRef = ref(storage, `profileImages/${imageUpload.name + v4()}`)
        uploadBytes(imageRef, imageUpload).then(() => {
            getDownloadURL(imageRef).then(url =>
                setUploadedImageUrl(url))
                console.log(uploadedImageUrl)
            alert('Image uploaded!')
        })

    };
   

    async function handleAddProfileInfo() {
       /*  if (!trip) { return }
        setTrips({ ...trips, [newKey]: trip }) */
        const userRef = doc(db, 'users', currentUser.uid)
       /*  console.log(newKey) */
        await setDoc(userRef, { ProfileInfo: { FirstName: firstName, LastName: lastName }}, {merge:true})
        
        setProfileInfo({ FirstName: firstName, LastName: lastName})
    
      }


    async function handleAddProfileImage() {
        if(imageUpload && selectedImage!=null) {
        const imageRef = ref(storage, `profileImages/${imageUpload.name + v4()}`)
        uploadBytes(imageRef, imageUpload).then(() => {
            getDownloadURL(imageRef).then(url => {
                setUploadedImageUrl(url)
                const userRef = doc(db, 'users', currentUser.uid)
                setDoc(userRef, {ProfileInfo: {...profileInfo, ProfileImageURL: url}}, {merge: true})
                setProfileInfo({...profileInfo, ProfileImageURL: url})
                setUploadedImageUrl(null)
                alert('Image uploaded!')
            })
        })
    }}

    async function handleDeleteProfileImage() {
        if(selectedImage==null){
            const userRef = doc(db,'users',currentUser.uid)
            const docSnap = await getDoc(userRef)
            if (docSnap.exists()) {
                const data = docSnap.data()
                const profileInfo = data.ProfileInfo || {}
                if (profileInfo.ProfileImageURL) {
                    const imageRef = ref(storage, profileInfo.ProfileImageURL);
                    await deleteObject(imageRef)
                    await setDoc(userRef, {ProfileInfo: {ProfileImageURL: deleteField()}}, {merge: true})
                    setProfileInfo({...profileInfo, ProfileImageURL: null})
                    alert('Profile image deleted!')
                }
            }
        }
        


    }
    
    useEffect(() => { 
        set_document(document)
    }, [])


    useEffect(() => {
        async function fetchProfileInfo() {
          setIsLoading(true)
          const userRef = doc(db, 'users', currentUser.uid)
          const docSnap = await getDoc(userRef)
          if (docSnap.exists()) {
            const data = docSnap.data()
            const profileInfo = data.ProfileInfo || {}
            setProfileInfo(profileInfo)
            setFirstName(profileInfo.FirstName || '')
            setLastName(profileInfo.LastName || '')
            setProfileImageUrl(profileInfo.profileImageUrl || '')
          }
          setIsLoading(false)
        }
        fetchProfileInfo()
      }, [currentUser.uid])
    
    
    if (!_document) { return null}

  return ReactDom.createPortal(
    <div className='fixed inset-0 bg-white text-slate-900 text-lg sm:text-xl flex flex-col'>
        <div className='flex items-center justify-between border-b border-solid border-slate-900 p-4'>
            <h1 className='font-extrabold text-2xl sm:text-5xl'>MENU</h1>
            <i onClick={() => setOpenModal(false)} className="fa-solid fa-xmark duration-300 hover:rotate-90 text-lg sm_text-3xl"></i>
        </div>
        <div className='p-4 flex flex-col gap-3'>
        
        <Popup 
        trigger = {   <h2 className="select-none duration-300 hover:pl-2 cursor-pointer">Edit profile</h2>}
        contentStyle={{
            width: '600px',
            height: '450px',
            borderRadius: '0.7em',
            boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.2)'

            
        }}
        position="relative"
        modal
        closeOnDocumentClick={false}
        >
            {close => (
        <>
        <div className='select-none'>
            <div className='flex flex-start text-xl'>
              <p className='p-2 pl-4 pt-4 font-light'>Here is your profile information.<br/>Don't forget to save your changes.</p>
              <i onClick={() => {close(); setSelectedImage(null)}} className="p-2 pr-4 pt-4 text-5xl fa-solid fa-xmark cursor-pointer absolute top-0 right-2 duration-300 opacity-50 hover:opacity-100 "></i>
             </div>
        <div className='p-2 pt-6 pl-4 text-2xl font-light flex gap-x-8 uppercase'>
            <div className="flex flex-col justify-items-center">
            <h2>First name</h2>
            <input className='rounded-lg bg-gray-200 pl-2 p-1 italic text-slate-500 w-[15ch]'  value = {firstName}  placeholder={profileInfo?.FirstName || 'Enter First Name...'} onChange={e => setFirstName(e.target.value)} autoFocus={false}></input>
            </div>
            <div>
                <h2 className="flex flex-col justify-items-center">Last name</h2>
                <input className='rounded-lg bg-gray-200 pl-2 p-1 italic text-slate-500 w-[15ch] ' value = {lastName}   placeholder={profileInfo?.LastName || 'Enter Last Name...'} onChange={e => setLastName(e.target.value)}></input>
            </div>
           
        </div>
        <div className='flex place-content-between'>
        <div className='flex flex-col'>
        
        <div className='text-2xl font-light uppercase pl-4 pt-4'>
            <h2>Profile picture</h2>
        </div>
        <div className='flex'>
        <div className='ml-4 mt-4 h-40 w-40 border border-2 rounded-full overflow-hidden'>
        <img className='w-full h-full object-cover' src={selectedImage ? URL.createObjectURL(selectedImage) : '../img/placeholder-image.png'} ></img>
        </div>
        <div className=' font-normal gap-2  pt-8 pl-6 text-sm pl-4 flex flex-col justify-center items-center'>
          
            <button onClick={() => setSelectedImage(null)} className='duration-300 hover:bg-gray-100 rounded-lg drop-shadow-md flex place-content-between items-center px-3 pr-4 text-left w-[150px] h-[40px] border'><p>Remove</p>  <i className="fa-solid fa-trash-can scale-125" ></i></button>
            <label className ='duration-300 hover:bg-gray-100 rounded-lg drop-shadow-md flex place-content-between items-center px-3 pr-4 text-left w-[150px] h-[40px] border cursor-pointer' htmlFor='inputTag'>
                Upload new
                <i className="fa-solid fa-arrow-up-from-bracket scale-125"></i>
            <input 
            className='hidden' 
            id='inputTag' 
            type='file' 
            accept='image/*' 
            onChange={(e)=> {
                const file = e.target.files[0];
                setImageUpload(e.target.files[0]); 
                setSelectedImage(file);
                }}
                key = {selectedImage?.name || 'input'}/>
            </label>
            
        </div>
        </div>
        </div>
        
        <div className='pr-10 flex place-items-end'>
                <button onClick={() => {handleAddProfileInfo(); close(); handleAddProfileImage();
                handleDeleteProfileImage()}} className="duration-300 hover:bg-gray-100 rounded-lg drop-shadow-md w-[90px] h-[40px] border uppercase text-xl font-semibold">Save!</button>
        </div>
        </div>
        </div>
        </>
 
        
              )}

    
           
        </Popup>
     
        <h2 onClick={() => {
            logout()
            setOpenModal(false)
        }} className="select-none duration-300 hover:pl-2 cursor-pointer">Logout</h2>
        </div>
    </div>, _document.getElementById('portal')
  )
}
