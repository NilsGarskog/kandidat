
import { removeDuplicates, getActName } from 'utils/calUtils.js';
import { useDrag, useDrop } from 'react-dnd';
import React, { useState, useEffect } from 'react';

export default function Day(props) {
  const { day, activities, actArr } = props;
  const [updatedActivities, setUpdatedActivities] = useState(activities);

  const handleDrop = (index, item) => {
    // Retrieve the dragged activity and its index
    const draggedIndex = item.index;
    const draggedActivity = item.activity;

    // Retrieve the dropped activity and its index
    const droppedIndex = index;
    const droppedActivity = activities[droppedIndex];

    // Swap the activities in the array
    const updatedActivities = [...activities];
    updatedActivities[draggedIndex] = droppedActivity;
    updatedActivities[droppedIndex] = draggedActivity;

    // Update the state or perform other actions to reflect the changes
    // For example, you can update the activities state
    setUpdatedActivities(updatedActivities);

    // You can also perform any other necessary actions based on the swapped activities

    console.log('Swapped Activities:', updatedActivities);
  };

  const newArray = removeDuplicates(activities);

  return (
    <div className="flex flex-col align-center px-6">
      <h3 className="uppercase text-xl text-center font-light">{day}</h3>
      {newArray.map((activity, index) => {
        let actName = getActName(activity, actArr).name;
        let actLength = getActName(activity, actArr).length;
        let actType = getActName(activity, actArr).type;

        if (activity === 1) {
          actName = 'LUNCH';
          actLength = 0;
          actType = 1;
        } else if (activity === 2) {
          actName = 'DINNER';
          actLength = 0;
          actType = 2;
        } else if (activity === 3 || activity === null) {
          actName = 'FREE TIME!';
          actLength = 0;
          actType = 0;
        }

        return (
          <Activity
            key={index}
            index={index}
            activity={activity}
            actName={actName}
            actLength={actLength}
            actType={actType}
            handleDrop={handleDrop}
          />
        );
      })}
    </div>
  );
}

function Activity({ index, activity, actName, actLength, actType, handleDrop }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'activity',
    item: { index, activity },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: 'activity',
    drop: (item) => handleDrop(index, item),
  });

  return (
    <div
      ref={drop}
      id={activity}
      className={`font-medium hover:scale-105 hover:duration-300 duration-1000 flex items-center justify-center rounded-xl w-[15ch] ${
        actLength === 0 ? 'h-[5ch]' : 'h-[11ch]'
      } text-lg mt-3 text-slate-900 text-center ${
        actType === 1 || actType === 2 ? 'bg-calYellow' : 'bg-calBlue'
      } ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div ref={drag} style={{ cursor: 'grab' }}>
        {actName}
      </div>
    </div>
  );
}
