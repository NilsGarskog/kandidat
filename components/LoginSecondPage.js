import React from "react";
import { useScreenSizes } from "./LoginLayout";

export default function LoginSecondPage() {
  const { isSmallScreen, isMediumScreen } = useScreenSizes();
  const smallScreen = isSmallScreen;
  const MediumScreen = isMediumScreen;

  return (
    <div className="cursor-default wrapper relative flex flex-row z-50 min-h-[20vh] w-full">
      <section className=" bg-white flex flex-wrap justify-center w-full">
        <div className="md:ml-[5%] flex-1 sm:p-6 sm:pl-0 p-4 z-999 m-auto">
          <h2 className="text-black text-4xl sm:text-7xl font-light text-center sm:text-left uppercase select-none pt-8 sm:pt-0">
            Travel planning
          </h2>
          <p className="text-black text-xl font-extralight italic lg:text-4xl mb-6 text-center sm:text-left select-none">
            has never been easier
          </p>
          {smallScreen !== true && (
            <h2 className="text-black text-xl sm:text-2xl  text-left mb-4 select-none pr-20">
              TRAPLA offers you and your friends a range of
              features to make your trip planning more smooth, easy
             and interactive.
            </h2>
          )}
          {smallScreen === true && (
            <h2 className="text-black text-md lg:text-2xl text-center sm:text-left mb-0 sm:mr-0  px-8  select-none">
             TRAPLA offers you and your friends a range of features to
              make your trip planning more smooth, easy and interactive.
            </h2>
          )}

          <h2 className="text-black text-md lg:text-2xl text-center sm:text-left mb-0 sm:mb-0 select-none">
            <br/>
           <b> Scroll down to learn more.</b>
          </h2>
        </div>
        {smallScreen !== true && (
          <div className="bg-white sm:flex-1 p-0 sm:p-6 flex justify-center ">
            <img
              src="../img/startpage_trips.png"
              className="2xl:w-3/4 w-full h-auto sm:mr-10 "
            ></img>
          </div>
        )}
        {smallScreen === true && (
          <div className="bg-white sm:flex-1 p-0 sm:p-6 flex justify-center ">
            <img src="../img/startpage_trips.png" className=" w-5/6 "></img>
          </div>
        )}
      </section>
    </div>
  );
}
