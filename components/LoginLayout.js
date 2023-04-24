import React, { useEffect, useRef, useState } from "react";
import LoginFirstpage from "./LoginFirstPage";
import LoginSecondpage from "./LoginSecondPage";
import LoginThirdpage from "./LoginThirdPage";
import LoginFourthpage from "./LoginFourthPage";
import LoginFifthpage from "./LoginFifthPage";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { BiArrowFromBottom } from "react-icons/bi";

export const useScreenSizes = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
      setIsMediumScreen(window.innerWidth >= 640 && window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isSmallScreen, isMediumScreen };
};

export default function LoginLayout() {
  const [isSmallScreen, setIsSmallScreen] = useState("");
  const [isMediumScreen, setIsMediumScreen] = useState("");
  const [envelopeClicked, setEnvelopeClicked] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640 ? true : false);
      setIsMediumScreen(
        window.innerWidth >= 640 && window.innerWidth <= 1024 ? true : false
      );
    };
    handleResize(); // Call once to set the initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="">
      {isSmallScreen !== true && (
        <section className=" relative flex justify-center align-items">
          <img
            src="../img/StartPageKandidatSmall.jpg"
            id="bakgrund"
            className="max-w-full relative mb-7 h-auto object-cover"
          ></img>

          <h2
            id="parallaxTitleBig"
            className="text-black z-0 uppercase mt-[8%] lg:mt-[6%] absolute text-4xl  lg:text-8xl 
          font-bold mr-[55%]"
          >
            Planner
          </h2>

          <img
            src="../img/StartPageforegroundSmall.png"
            id="foreground"
            className="max-w-full absolute h-auto object-cover"
          ></img>
        </section>
      )}

      {isSmallScreen === true && (
        <section className=" relative flex justify-center align-items h-auto w-screen">
          <img
            src="../img/MobileKandidatSmall.jpg"
            id="bakgrund"
            className="w-full  h-auto object-cover"
          ></img>

          <h2
            id="parallaxTitleSmall"
            className="text-black z-0 absolute mt-[16%] text-6xl text-center  sm:text-5xl 
          font-bold font-family: "
          >
            Planner
          </h2>

          <img
            src="../img/MobileKandidatSmallForeground.png"
            id="foreground"
            className="max-w-full absolute h-auto object-cover"
          ></img>
        </section>
      )}

      <LoginFirstpage />
      <LoginSecondpage />
      <LoginThirdpage />
      <LoginFourthpage />
      <LoginFifthpage />
      <ScrollToTop />
    </div>
  );
}
