import React,{ useState } from 'react'

export default function Footer() {

  const [envelopeClicked, setEnvelopeClicked] = useState(false)


  return (
    <div className='flex justify-center items-center gap-5 py-3'>
        <i onClick={() => setEnvelopeClicked(!envelopeClicked)} className="fa-regular fa-envelope duration-300 hover:opacity-30 cursor-pointer" > </i>
        {envelopeClicked && <h2>travelplannerkandidat@gmail.com</h2>}
    </div>
   
   
  )
}
