import React from "react";
import { useScreenSizes } from "./LoginLayout";

export default function LoginThirdPage() {
  const { isSmallScreen, isMediumScreen } = useScreenSizes();
  const smallScreen = isSmallScreen;
  const MediumScreen = isMediumScreen;
  return (
    <div className="wrapper flex flex-row  z-999">
      <section className=" bg-white flex flex-wrap justify-center">
        {smallScreen !== true && (
          <div className="bg-white sm:flex-1 p-4 sm:p-6  flex justify-center ">
            <img
              src="../img/startpage_act.png"
              className=" 2xl:w-3/4 w-full h-auto"
            ></img>
          </div>
        )}

        <div className=" flex-1 sm:p-6 p-0 z-999 m-auto cursor-default">
          <h2 className="pt-8 sm:pt-0 text-black text-4xl sm:text-7xl font-light text-center sm:text-right sm:mr-14 uppercase select-none">
            Explore
          </h2>
          <p className="text-black text-xl font-extralight italic lg:text-4xl mb-6 text-center sm:text-right sm:mr-14 select-none">
            a destination together
          </p>
          {smallScreen !== true && (
            <>
              <h2 className="text-black text-xl sm:text-2xl text-right mb-4 sm:mr-14 sm:pl-6 select-none">
                TRAPLA let your friend group add activites,
                restaurants, etc to a 
                shared planning space where you can all see each
                others suggestions.
              </h2>
              <h2 className="text-black text-xl sm:text-2xl text-center sm:text-right mb-4 sm:mr-14 sm:pl-6 sm:mb-0 select-none">
                Upvote your friends suggestions to hightlight what you
                want to explore at 
                the destination.
              </h2>
            </>
          )}
          {smallScreen === true && (
            <>
              <h2 className="text-black text-md lg:text-2xl text-center sm:text-left mb-2 sm:mr-0  px-8  select-none">
                TRAPLA let your friend group add activites, restaurants,
                etc to a shared planning space where you can all see each others
                suggestions.
              </h2>
              <h2 className="text-black text-md lg:text-2xl text-center sm:p-5 sm:text-left mb-4 sm:mb-0 px-8  select-none">
                Upvote your friends suggestions to hightlight what you want to
                explore at the destination.
              </h2>
            </>
          )}
        </div>
        {smallScreen === true && (
          <div className="bg-white sm:flex-1 p-0 sm:p-6 flex justify-center ">
            <img src="../img/startpage_act.png" className=" w-5/6"></img>
          </div>
        )}
      </section>
    </div>
  );
}
