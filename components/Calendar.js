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

    const [currentView, setCurrentView] = useState(0);

    const daysToRender = itineary.slice(currentView * 3, (currentView * 3) + 3);


    return (
        <div className='w-full h-[70ch] flex flex-wrap justify-center  gap-10 mt-10 select-none'>

            {daysToRender.map((item, index) => {
                let newActivityList = []
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

                    {
                        newActivityList.push(
                            <div id={activity} className={`font-medium flex items-center justify-center rounded-xl w-[15ch] ${actLength == 0 ? 'h-[5ch]' : 'h-[11ch]'} text-lg mt-3 text-slate-900 text-center ${actType == 1 || actType == 2 ? 'bg-calBlue' : 'bg-calYellow'}`} key={index}>
                                {actName}
                            </div>
                        )

                    



                    }
                })


                return (

                    <div className='flex flex-col align-center' key={item.day}>

                        <h3 className='uppercase text-xl text-center font-light'>{item.day}</h3>
                        {newActivityList}

                    </div>
                )
            })}
            <button onClick={() => setCurrentView(currentView + 1)}>Next</button>

        </div>
    )
}
