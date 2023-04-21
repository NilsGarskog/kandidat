import React from "react";
import { useScreenSizes } from "./LoginFirstPage";

export default function LoginFifthPage() {
  const { isSmallScreen, isMediumScreen } = useScreenSizes();
  const smallScreen = isSmallScreen;
  const MediumScreen = isMediumScreen;
  return (
    <div className="wrapper flex flex-row z-999">
      <section className=" bg-white flex flex-wrap justify-center">
        {smallScreen !== true && (
          <div className="bg-white sm:flex-1 p-4  sm:p-6 flex justify-center ">
            <img
              src="../img/plantrip.jpg"
              className=" 2xl:w-3/4 w-full h-auto"
            ></img>
          </div>
        )}
        <div className="md:ml-[5%] flex-1 sm:p-6 p-0 z-999 m-auto">
          <h2 className="text-black text-xl lg:text-6xl font-bold sm:mt-0 mt-8  text-center sm:text-left uppercase select-none">
            Shared expenses
          </h2>
          <p className="text-black text-xl lg:text-4xl mb-6 text-center sm:text-left 2xl 2xl:px-4 select-none">
            will not be a problem any longer
          </p>
          {smallScreen !== true && (
            <h2 className="text-black text-xl lg:text-4xl text-left mb-4 select-none">
              Travel planner lets you enter your <br></br> expenses from the
              trip, and will <br></br> calculatee who owns who how much
              <br></br> money. In that way you will not need <br></br> to pay
              each other after each expense, <br></br> but can instead pay a
              lump sum to <br></br> one person at the end of the trip.
            </h2>
          )}
          {smallScreen === true && (
            <h2 className="text-black text-xl lg:text-2xl text-center sm:text-left mb-4 sm:mr-0 mr-4 px-4 select-none">
              Travel planner lets you enter your expenses from the trip, and
              will calculatee who owns who how much money. In that way you will
              not need to pay each other after each expense, but can instead pay
              a lump sum to one person at the end of the trip.
            </h2>
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
