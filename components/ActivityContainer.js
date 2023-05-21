import useFetchAct from '@/hooks/FetchActivities'
import React, {useEffect} from 'react'
import ActivityCard from './ActivityCard'

export default function ActivityContainer(props) {
const child = props.children
const activities = props.data




             if (child==null) {
                
                return (
                    <>
                 
                    {(props.showType === 'showAct') && ( <>
                    <div className='flex w-[50ch] flex-row  sm:overflow-x-hidden sm:flex-wrap pl-16 px-2 sm:p-2 sm:pb-32'>
                        {activities.map((x) => (
                        <div key={String(x)}>
                            {(x.type == 0) && (
                            <div className=" sm:p-2 text-black">
                              <ActivityCard children={x}/>
                            </div>
                            )}
                           
                        </div>
                    ))}
                    </div>
                    </>)}
                 
                    {(props.showType === 'showFood') && ( <>
                        <div className='flex w-[50ch] flex-row sm:overflow-x-hidden sm:flex-wrap pl-16 px-2 sm:p-2 sm:pb-32'>
                        {activities.map((x) => (
                        <div key={String(x)}>
                            {(!x.type == 0) && (
                            <div className="sm:p-2 text-black">
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
                    <div className='flex flex-col px-2 sm:p-2'> 
                    <ActivityCard children={child}/>
                    </div>
                    
                    </>
                )
            }
            
            
          
            
      
}



 