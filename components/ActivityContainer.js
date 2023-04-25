import useFetchAct from '@/hooks/FetchActivities'
import React from 'react'
import ActivityCard from './ActivityCard'

export default function ActivityContainer(props) {
const child = props.children
const activityData = useFetchAct(props.tripKey)
const activities = activityData.actArr
console.log(activities)


        
             if (child==null) {
                
                return (
                    <>
                 
                    {(props.showType === 'showAct') && ( <>
                    <div className='flex flex-col'>
                        {activities.map((x) => (
                        <div key={String(x)}>
                            {(x.type == 0) && (
                            <div className=" p-2 text-black">
                              <ActivityCard children={x}/>
                            </div>
                            )}
                           
                        </div>
                    ))}
                    </div>
                    </>)}
                 
                    {(props.showType === 'showFood') && ( <>
                        <div className='flex flex-col'>
                        {activities.map((x) => (
                        <div key={String(x)}>
                            {(!x.type == 0) && (
                            <div className="p-2 text-black">
                             <ActivityCard children={x}/>
                            </div>
                            )}
                           
                        </div>
                    ))}
                    </div>
                    </>)}
                    
                   
                      
                    </>
                )
             }
            else {
                return (
                    <>
                    <div className='flex flex-col p-2'> 
                    <ActivityCard children={child}/>
                    </div>
                    
                    </>
                )
            }
            
            
          
            
      
}



 