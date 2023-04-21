import React from "react";
import { useScreenSizes } from "./LoginFirstPage";

export default function LoginFourthPage() {
  const { isSmallScreen, isMediumScreen } = useScreenSizes();
  const smallScreen = isSmallScreen;
  const MediumScreen = isMediumScreen;
  return (
    <div className="wrapper flex flex-row  z-999">
      <section className=" bg-white flex flex-wrap justify-center">
        <div className="md:ml-[5%] flex-1 sm:p-6 p-4  z-999 m-auto">
          <h2 className="text-black text-xl lg:text-6xl sm:mt-0 mt-8 font-bold text-center sm:text-left uppercase select-none">
            Generate
          </h2>
          <p className="text-black text-xl lg:text-4xl mb-6 text-center sm:text-left select-none">
            an optimized itinerary
          </p>
          {smallScreen !== true && (
            <>
              <h2 className="text-black text-xl lg:text-4xl text-left mb-4 select-none">
                Travel planner will do the hard work for <br></br>
                you when it comes to the actual planning.
              </h2>
              <h2 className="text-black text-xl lg:text-4xl text-center sm:text-left mb-4 sm:mb-0 select-none">
                Based on what your friend group wants <br></br>
                to do the most, distance between <br></br> activities, opening
                hours and more, the <br></br>application will generate and
                optimized <br></br>itinerary for the entire trip.
              </h2>
            </>
          )}
          {smallScreen === true && (
            <>
              <h2 className="text-black text-xl lg:text-2xl text-center sm:text-left mb-4 sm:mr-0 mr-4 px-4 select-none">
                Travel planner will do the hard work for you when it comes to
                the actual planning.
              </h2>
              <h2 className="text-black text-xl lg:text-2xl text-center sm:text-left mb-4 sm:mb-0 px-4 select-none">
                Based on what your friend group wants to do the most, distance
                between activities, opening hours and more, the application will
                generate and optimize itinerary for the entire trip.
              </h2>
            </>
          )}
        </div>
        {smallScreen !== true && (
          <div className="bg-white sm:flex-1 p-0 sm:p-6 flex justify-center ">
            <img
              src="../img/plantrip.jpg"
              className="2xl:w-3/4 w-full h-auto "
            ></img>
          </div>
        )}
        {smallScreen === true && (
          <div className="bg-white sm:flex-1 p-0 sm:p-6 flex justify-center ">
            <img src="../img/plantrip.jpg" className=" w-3/4 "></img>
          </div>
        )}
      </section>
    </div>
  );
}
