import React, {useState} from 'react'

export default function Calendar() {

const itineary =[   {day:'mon', act:[32,32,67,55,null,33]},
                    {day:'tue', act:[null,27,1,3,555,330]},
                    {day:'wed', act:[44,44,99,39,39,2]}
                ]

//id 1, 2, 3 reserverat för generiska aktiviteter ('lunch', 'dinner', 'activity')

const[activityHeights, setActivityHeights] = useState({})



  return (
    <div className='w-mw flex place-content-center gap-10 mt-10 select-none'>
        
        {itineary.map((item,index) => {
            let newActivityList = []
            let prevActivity = null
            let prevActivityIndex = null

            item.act.forEach((activity,index) => {
                
                if(activity===1){
                    activity='LUNCH'
                }
                else if(activity===2){
                    activity='DINNER'
                }
                else if(activity===3 || activity===null){
                    activity='FREE TIME!'
                }

                if (prevActivity === activity) {
                
                   
                   
                     console.log('hej')
                    const theDiv = document.getElementById(`${activity}`)
                    if(theDiv){
                    theDiv.style.height='11ch'
                    

                        
                    }
                      
                }
                else  {
                   
                    
                    newActivityList.push(
                        <div id = {activity} className={`font-medium flex items-center justify-center rounded-xl w-[15ch] h-[5ch] text-lg mt-3 text-slate-900 text-center ${index == 2 || index == 5 ? 'bg-blue-300' : 'bg-yellow-300'}`} key={index}>
                    {activity}
                    </div>
                    )
                    
                    prevActivity = activity
                    prevActivityIndex = newActivityList.length-1
                    console.log(prevActivityIndex)
                    
                    

                }
            })
         

            return(
               
                <div className='flex flex-col align-center'key = {item.day}>
                   
                    <h3 className='uppercase text-xl text-center font-light'>{item.day}</h3>
                    {newActivityList}
                    
                    </div>
            )
        })}
        </div>
  )
    }
           