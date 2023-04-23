import React from "react";
import { useScreenSizes } from "./LoginLayout";

export default function LoginSecondPage() {
  const { isSmallScreen, isMediumScreen } = useScreenSizes();
  const smallScreen = isSmallScreen;
  const MediumScreen = isMediumScreen;

  return (
    <div className="wrapper flex flex-row z-80 min-h-[20vh]">
      <section className=" bg-white flex flex-wrap justify-center">
        <div className="md:ml-[5%] flex-1 sm:p-6 p-4 z-999 m-auto">
          <h2 className="text-black text-xl lg:text-6xl font-bold text-center sm:text-left uppercase select-none">
            Trip planning
          </h2>
          <p className="text-black text-xl lg:text-4xl mb-6 text-center sm:text-left select-none">
            has never been easier
          </p>
          {smallScreen !== true && (
            <h2 className="text-black text-xl lg:text-4xl text-left mb-4 select-none">
              Travel planner offers you and your <br></br> friends a range of
              features to make <br></br> your trip planning more smooth, easy
              <br></br> and interactive.
            </h2>
          )}
          {smallScreen === true && (
            <h2 className="text-black text-xl lg:text-2xl text-center sm:text-left mb-4 sm:mr-0  px-4  select-none">
              Travel planner offers you and your friends a range of features to
              make your trip planning more smooth, easy and interactive.
            </h2>
          )}

          <h2 className="text-black text-xl lg:text-4xl text-center sm:text-left mb-4 sm:mb-0 select-none">
            Scroll down to learn more.
          </h2>
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
