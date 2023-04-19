import React from 'react'

export default function TripHeader(props) {
    const {tripData} = props
    console.log(tripData)
  return (
  
    <div className='w-full bg-black'>{tripData.Name}</div>
  )
}
