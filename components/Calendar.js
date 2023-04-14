import React, { useState } from 'react'
import Algoritmen from '@/Algorithms/Algoritmen';

function removeDuplicates(arr) {
    let newArr = []
    arr.forEach(item => {
        if (!newArr.includes(item) || item == 3 || item == 2 || item == 1) {
            newArr.push(item)
        }

    })
    return newArr
}

function getActName(id, actArr) {
    let name = ""
    let length = null;
    let type = null;
    actArr.forEach(act => {
        if (act.id === id) {
            // console.log(act.activityName)
            name = act.activityName
            length = act.time
            type = act.type
        }
    })
    return { name: name, length: length, type: type }
}

export default function Calendar(props) {

    const { data } = props
    const itineary = Algoritmen(data.arrDate, data.depDate, data.actArr)


    // const itineary = [{ day: 'mon', act: [32, 32, 67, 55, null, 33] },
    // { day: 'tue', act: [null, 27, 1, 3, 555, 330] },
    // { day: 'wed', act: [44, 44, 99, 39, 39, 2] }
    // ]

    // id 1, 2, 3 reserverat för generiska aktiviteter ('lunch', 'dinner', 'activity')

    const [activityHeights, setActivityHeights] = useState({})



    return (
        <div className='w-mw flex flex-wrap place-content-center gap-10 mt-10 select-none'>

            {itineary.map((item, index) => {
                let newActivityList = []
                let prevActivity = null
                let prevActivityIndex = null
                let newArray = removeDuplicates(item.act)

                newArray.forEach((activity, index) => {
                    let actName = getActName(activity, data.actArr).name
                    let actLength = getActName(activity, data.actArr).length
                    let actType = getActName(activity, data.actArr).type

                    if (activity === 1) {
                        actName = 'LUNCH'
                        actLength = 0
                        actType = 1
                    }
                    else if (activity === 2) {
                        actName = 'DINNER'
                        actLength = 0
                        actType = 2
                    }
                    else if (activity === 3 || activity === null) {
                        actName = 'FREE TIME!'
                        actLength = 0
                        actType = 0
                    }

                    // if (prevActivity === activity) {



                    //     const theDiv = document.getElementById(`${activity}`)
                    //     if (theDiv) {
                    //         theDiv.style.height = '11ch'



                    //     }

                    // }
                    // else 
                    {
                        newActivityList.push(
                            <div id={activity} className={`font-medium flex items-center justify-center rounded-xl w-[15ch] ${actLength == 0 ? 'h-[5ch]' : 'h-[11ch]'} text-lg mt-3 text-slate-900 text-center ${actType == 1 || actType == 2 ? 'bg-blue-300' : 'bg-yellow-300'}`} key={index}>
                                {actName}
                            </div>
                        )

                        prevActivity = activity
                        prevActivityIndex = newActivityList.length - 1



                    }
                })


                return (

                    <div className='flex flex-col align-center' key={item.day}>

                        <h3 className='uppercase text-xl text-center font-light'>{item.day}</h3>
                        {newActivityList}

                    </div>
                )
            })}
        </div>
    )
}
