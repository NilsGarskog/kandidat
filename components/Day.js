import React from 'react'
import { removeDuplicates, getActName } from 'utils/calUtils.js';


export default function Day(props) {
    const {day, activities, actArr} = props
    let newActivityList = []
    let newArray = removeDuplicates(activities)
  
    newArray.forEach((activity, index) => {
      let actName = getActName(activity, actArr).name
      let actLength = getActName(activity, actArr).length
      let actType = getActName(activity, actArr).type
  
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
  
      newActivityList.push(
        <div
          id={activity}
          className={`font-medium flex items-center justify-center rounded-xl w-[15ch] ${actLength == 0 ? 'h-[5ch]' : 'h-[11ch]'} text-lg mt-3 text-slate-900 text-center ${actType == 1 || actType == 2 ? 'bg-calBlue' : 'bg-calYellow'}`}
          key={index}
        >
          {actName}
        </div>
      )
    })
  
    return (
      <div className="flex flex-col align-center">
        <h3 className="uppercase text-xl text-center font-light">{day}</h3>
        {newActivityList}
      </div>
    )
  }