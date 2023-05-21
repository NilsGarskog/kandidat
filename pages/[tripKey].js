import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from '../context/authContext'
import { db } from '../firebase'
import { useRouter } from 'next/router';
import useFetchTripData from '../hooks/FetchTripData'
import useFetchAct from '../hooks/FetchActivities'
import dayjs from 'dayjs'
import Calendar from '@/components/Calendar';
import CalendarContainer from '@/components/CalenderContainer';
import CreateActivity from '../components/CreateActivity'
import TripHeader from '@/components/TripHeader';
import TripNavBar from '../components/TripPageComponents/TripNavBar'
import Settings from '../components/TripPageComponents/Settings'
import Header from '@/components/Header';
import EasterEgg2 from '@/components/EasterEgg2';



export default function Trip() {
    const router = useRouter()
    let [page, setPage] = useState("activities")
    const { tripKey } = router.query
    const [actArr, setActArr] = useState([])
    const { userInfo, currentUser } = useAuth()
    let allData = useFetchTripData(tripKey)
    const actData = useFetchAct(tripKey)
    let [openIt, setOpenIt] = useState(false)
    const isMobile = window.innerWidth < 640;
    let itineary = null;
    const [enteredPassword, setEnteredPassword] = useState("");
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const predefinedPassword = "motherload";

    // const unsubscribe = onSnapshot(doc(db, 'users', currentUser.uid, 'Trips', tripKey), (doc) => {
    //     console.log("It fetched ", doc.data().itineary);
    //     itineary = doc.data().itineary
    //     console.log("It saved ", itineary);
    // });
    // unsubscribe();
    const checkPassword = () => {
        if (enteredPassword.endsWith(predefinedPassword)) {
          setShowEasterEgg(true);
          setTimeout(() => {
            setShowEasterEgg(false);
          }, 8500); // Hide the component after 10 seconds
          setEnteredPassword("");
        }
      };
      
      useEffect(() => {
        checkPassword();
      }, [enteredPassword]);
      
      const handleKeyDown = (event) => {
        const keyPressed = event.key.toLowerCase();
        setEnteredPassword((prevPassword) => prevPassword + keyPressed);
      };

      useEffect(() => {
        const keyboardListener = (event) => {
          handleKeyDown(event);
        };
      
        window.addEventListener("keydown", keyboardListener);
      
        return () => {
          window.removeEventListener("keydown", keyboardListener);
        };
      }, []);
      
      
    useEffect(() => {
        const unsubscribe = onSnapshot(
          doc(db, 'users', currentUser.uid, 'Trips', tripKey),
          (doc) => {
            const tripData = doc.data();
            if (tripData) {
              // Handle real-time updates based on the 'page' value
              if (page === 'activities') {
                // Update 'actArr' state based on the new data
                const actArr = tripData.actArr || [];
                setActArr(actArr);
              }
              // Handle other cases if needed
              // ...
            }
          }
        );
    
        return () => unsubscribe();
      }, [currentUser.uid, tripKey, page]);

    if (allData.loading === false && actData.loading === false) {
        const tripData = allData.tripData
        itineary = tripData.itineary
        const actArr = actData.actArr
        let ItCreated = tripData.itCreated

        const algoData = { arrDate: tripData.arrDate, depDate: tripData.depDate, actArr: actArr, itineary: itineary, ItCreated: ItCreated, tripKey: tripKey }
        return (
            <div className='overflow-x-hidden'>
                <Header/>
                {showEasterEgg && <EasterEgg2 />}
                {page === "activities" &&
                    <div>
                        <TripHeader tripData={tripData}>
                        </TripHeader>

                        <div className='ml-20 sm:ml-0 flex flex-col sm:flex-row  items-center justify-evenly mt-10'>
                            <CreateActivity tripKey={tripKey} actData={algoData.actArr} type='activity'></CreateActivity>
                            <CreateActivity tripKey={tripKey} actData={algoData.actArr} type='restaurant'></CreateActivity>
                        </div>
                    </div>
                }
                {(page === "calender" && ItCreated === false && openIt === false) &&
                    <div className='flex items-center flex-col p-3'>
                        <div className='flex flex-col items-center w-5/6 sm:w-2/3 select-none cursor-default'>
                            <h1 className="text-center text-5xl sm:text-7xl text-bold p-2 font-bold uppercase mt-10 sm:mt-28">Your itinerary</h1>
                            <p className="text-md sm:text-lg text-center p-1 mt-4 sm:mt-0" > Here, you can generate your itinerary based on the activities you have planned so far.<br />  {isMobile && <br />}
                                If you would like to add more activities, you can always come back to this page later {!isMobile && <br />}and regenerate the itinerary.</p>
                        </div>
                        <button className='mt-5 border w-auto bg-buttonGreen uppercase opacity-100 hover:opacity-80 duration-300 text-black text-2xl sm:text-2xl font-semibold rounded-xl px-10 py-3' onClick={() => setOpenIt(true)}>GENERATE!</button>
                    </div>
                }
                {(page === "calender" && (ItCreated === true || openIt === true)) &&
                    <div>
                        <CalendarContainer data={algoData}></CalendarContainer>
                    </div>
                }
                {page === "settings" &&
                    <div className='flex items-center flex-col'>
                        <div className='flex flex-col items-center w-4/5'>
                            <h1 className="sm:text-7xl text-5xl text-bold p-2 sm:pt-10 pt-10 font-bold uppercase">Settings</h1>
                            <p className="text-base text-center sm:text-xl p-1 pt-5" > Here you can edit the <br /> specifications of your trip.{/* <br/><br></br>Do not forget to save when <br/>you are done! */}</p>
                        </div>
                        <Settings data={tripData}></Settings>
                    </div>
                }
                <div className="min-h-[10ch]"></div>
                <div className="fixed bottom-10 left-0 right-0 z-10">
                    <TripNavBar page={page} setPage={setPage}></TripNavBar>
                </div>

            </div>


        )

    }
    else {
        return (
            <div className='flex-1 grid place-items-center '><i className="fa-solid fa-spinner animate-spin text-6xl"></i>

            </div>
        )
    }

}

