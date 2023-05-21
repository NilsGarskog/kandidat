
import React, {useState} from 'react'
import { removeDuplicates, getActName } from 'utils/calUtils.js';
import Popup from 'reactjs-popup';
import Link from 'next/link';


export default function Day(props) {
  const { day, activities, actArr } = props;
  let newActivityList = [];
  let newArray = removeDuplicates(activities);
  const isMobile = window.innerWidth < 640;
  const contentStyle = {
    width: "800px",
    height: "400px",
    borderRadius: "0.7em",
    boxShadow: "0px 3px 7px rgba(0, 0, 0, 0.2)",
  };

  const mobileContentStyle = {
    width: "350px",
    height: "450px",
    borderRadius: "0.7em",
    boxShadow: "0px 3px 7px rgba(0, 0, 0, 0.2)",
  };

  newArray.forEach((activity, index) => {
    let actName = getActName(activity, actArr).name;
    let actLength = getActName(activity, actArr).length;
    let actType = getActName(activity, actArr).type;
    let actDescription = getActName(activity, actArr).description
    let actImg = null
    if(getActName(activity,actArr).img){
    actImg = getActName(activity, actArr).img[0]

    }
   

    if (activity === 1) {
      actName = "LUNCH";
      actLength = 0;
      actType = 1;
    } else if (activity === 2) {
      actName = "DINNER";
      actLength = 0;
      actType = 2;
    } else if (activity === 3 || activity === null) {
      actName = "FREE TIME!";
      actLength = 0;
      actType = 0;
    }

    const activityComponent = (
      <div
        id={activity}
        className={`${(actName === 'FREE TIME!' || actName === 'DINNER' || actName === 'LUNCH')? '' : 'hover:scale-105 duration-300 cursor-pointer '} px-2 font-medium flex items-center justify-center rounded-xl w-[15ch] ${
          actLength == 0 ? "h-[5ch]" : "h-[11ch]"
        } text-lg mt-3 text-slate-900 text-center ${
          actType == 1 || actType == 2 ? "bg-calYellow" : "bg-calBlue"
        }`}
        key={index}
      >
        <h1 className='uppercase'>{actName}</h1>
      </div>
    );

    if (actName !== "FREE TIME!" && actName !== "LUNCH" && actName !== "DINNER") {
      newActivityList.push(
        <Popup
          contentStyle={isMobile ? mobileContentStyle : contentStyle}
          position="relative"
          modal
          closeOnDocumentClick={isMobile ? true : true}
          key={index}
          trigger={activityComponent}
        >
           {(close) => (
          <>

            <i
              onClick={() => {
             
                close();
                



              }}
              className="p-2 sm:pr-4 pr-2 sm:pt-4 pt-2 sm:text-5xl text-4xl fa-solid fa-xmark cursor-pointer absolute top-0 right-2 duration-300 opacity-50 hover:opacity-100 "
            ></i>
            <div className='flex flex-col sm:pl-10 pl-5 sm:pt-10 pt-5'>
              <h1 className='uppercase font-light text-3xl sm:text-5xl sm:pb-10 pb-5 cursor-default select-none '>
                {actName}
              </h1>
              <div className='flex flex-col sm:flex-row'>
                <div className='sm:mr-64 pr-10 font-extralight leading-normal sm:leading-relaxed italic text-lg sm:text-xl sm:pt-4 cursor-default select-none'>
                 
                 {actDescription ? actDescription : `You can add a description for this ${actType == 0 ? 'activity' : 'restaurant'} in the 'activities' view!'`}

                </div>

                <div className={`flex flex-col sm:-mt-4 mt-4 mr-10 sm:items-center ${isMobile ? 'absolute bottom-0 mb-8 ml-3' : 'absolute right-0'} `}>
                  <div className={`sm:h-52 sm:w-52 h-32 w-32 rounded-full overflow-hidden `} >

                    <img className='w-full h-full object-cover  items-center' src={actImg?.urlFull || actImg} />
                  </div>

                  <div className='sm:text-sm text-xs mt-2 max-w-[30ch] sm:max-w-[30ch] sm:text-center text-gray-700 italic cursor-default select-none'>
                    {actImg && <>Photo by <Link className='focus:outline-none' href={actImg.portfolioUrl + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target="_blank"><u>{actImg.name}</u></Link> on <Link href={'https://unsplash.com/' + '?utm_source=travel_planner_kandidat&utm_medium=referral'} target='_blank'><u>Unsplash</u></Link></>}

                  </div>
                </div>



              </div>
            


            </div>
          </>
        )}
      </Popup>
      );
    } else {
      newActivityList.push(activityComponent);
    }
  });
  function toggleEdit() {
    if (isEditing) {
      handleEditDescription()
      setButtonText('EDIT')
      setIsEditing(false)
    }
    else {
      setButtonText('SAVE')
      setIsEditing(true)
    }
  }
  return (
    <div className="flex flex-col align-center px-6">
      <h3 className="uppercase text-xl text-center font-light">{day}</h3>
      {newActivityList}
    </div>
  );
}

