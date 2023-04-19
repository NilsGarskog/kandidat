import React from "react";
import { useScreenSizes } from "./LoginFirstPage";

export default function LoginThirdPage() {
  const { isSmallScreen, isMediumScreen } = useScreenSizes();
  const smallScreen = isSmallScreen;
  const MediumScreen = isMediumScreen;
  return (
    <div className="wrapper flex flex-row relative z-999">
      <section className=" bg-white flex flex-wrap justify-center">
        {smallScreen !== true && (
          <div className="bg-white sm:flex-1 p-4  sm:p-6 flex justify-center ">
            <img src="../img/plantrip.jpg" className=" w-3/4"></img>
          </div>
        )}

        <div className=" flex-1 sm:p-6 p-0 z-999 m-auto">
          <h2 className="text-black text-xl lg:text-6xl font-bold sm:mt-0 mt-8 text-center sm:text-left uppercase select-none">
            Explore
          </h2>
          <p className="text-black text-xl lg:text-4xl mb-6 text-center sm:text-left select-none">
            a destination together
          </p>
          {smallScreen !== true && (
            <>
              <h2 className="text-black text-xl lg:text-4xl text-left mb-4 select-none">
                Travel planner let your friend group <br></br> add activites,
                restaurants, etc to a <br></br>
                shared planning space where you can <br></br> all see each
                others suggestions.
              </h2>
              <h2 className="text-black text-xl lg:text-4xl text-center sm:text-left mb-4 sm:mb-0 select-none">
                Upvote your friends suggestions to <br></br> hightlight what you
                want to explore at <br></br>
                the destination.
              </h2>
            </>
          )}
          {smallScreen === true && (
            <>
              <h2 className="text-black text-xl lg:text-2xl text-center sm:text-left mb-4 sm:mr-0 mr-4 select-none">
                Travel planner let your friend group add activites, restaurants,
                etc to a shared planning space where you can all see each others
                suggestions.
              </h2>
              <h2 className="text-black text-xl lg:text-2xl text-center sm:p-5 sm:text-left mb-4 sm:mb-0 select-none">
                Upvote your friends suggestions to hightlight what you want to
                explore at the destination.
              </h2>
            </>
          )}
        </div>
        {smallScreen === true && (
          <div className="bg-white sm:flex-1 p-0 sm:p-6 flex justify-center ">
            <img src="../img/plantrip.jpg" className=" w-3/4"></img>
          </div>
        )}
      </section>
    </div>
  );
}
