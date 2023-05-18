import React, { useEffect, useState } from 'react';
import { emojisplosion, emojisplosions} from 'emojisplosion';


export default function EasterEgg2() {

    const [isBlinking, setIsBlinking] = useState(true);
    const [color, setColor] = useState('green-300')

    useEffect(() => {
      const interval = setInterval(() => {
        setIsBlinking((prevIsBlinking) => !prevIsBlinking);
  
   
      }, 1000); // Blinking interval in milliseconds
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    useEffect(() => {
        // Create a new audio instance
        const audio = new Audio('../sounds/Money.mp3');
    
        // Start playing the audio when the component mounts
        audio.play();
    
        // Clean up the audio when the component unmounts
        return () => {
          audio.pause();
          audio.currentTime = 0;
        };
      }, []);

 
    const {cancel} = emojisplosions({
        emojiCount: () => Math.random() * 10 + 10,
        emojis: ["💰","💸","💵","💶","🤑","💳","💲","📈"],
        physics: {
            fontSize: (14,100),
        },
        uniqueness: 7,
    })

    setTimeout(cancel, 100)

  return (
    <div className=' z-50 absolute w-screen h-screen flex items-center text-center pb-44 justify-center'>
    <div className=' p-10 relative font-semibold'>
      <h1 className={`text-[130px] pt-10 px-10 bg-green-900 text-${color} ${isBlinking ? '' : 'hidden'}`}>YOUR BUDGET IS:</h1>
      <h1 className={`text-[170px] pb-10 px-10 bg-green-900 text-${color} ${isBlinking ? '' : 'hidden'}`}>$100000000</h1>
    </div>
  </div>
  
  );
}
