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
        <Parallax
          pages={2.85}
          style={{ top: "0", left: "0" }}
          className="animation"
          ref={ref}
        >
          <ParallaxLayer
            offset={0}
            factor={isMediumScreen ? 0.4 : 0.2}
            speed={0.1}
          >
            <div className="animation_layer parallax" id="background"></div>
          </ParallaxLayer>
          <ParallaxLayer
            offset={0}
            factor={isMediumScreen ? 0.4 : 0.2}
            speed={-1}
          >
            <div className="animation_layer parallax" id="title">
              <h2
                id="parallaxTitleBig"
                className="text-black z-0 uppercase mt-[8%] text-white lg:mt-[12%] 2xl:ml-[10%] absolute text-4xl  lg:text-8xl 
          font-bold ml-[4%]"
              >
                Planner
              </h2>
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            offset={0}
            factor={isMediumScreen ? 0.4 : 0.2}
            speed={0.1}
          >
            <div className="animation_layer parallax" id="foreground"></div>
          </ParallaxLayer>
          <ParallaxLayer
            offset={0.99999999999}
            factor={isMediumScreen ? 0.4 : 0.4}
            speed={0.1}
            style={{ height: "auto" }}
          >
            <LoginFirstpage />
          </ParallaxLayer>
          <ParallaxLayer
            offset={isMediumScreen ? 1.3 : 1}
            factor={isMediumScreen ? 0.4 : 0.4}
            speed={0.1}
            style={{ height: "auto" }}
          >
            <LoginSecondpage />
          </ParallaxLayer>
          <ParallaxLayer
            offset={isMediumScreen ? 1.3 : 1.5}
            factor={isMediumScreen ? 0.4 : 0.4}
            speed={0.1}
            style={{ height: "auto" }}
          >
            <LoginThirdpage />
          </ParallaxLayer>
          <ParallaxLayer
            offset={isMediumScreen ? 1.65 : 1.95}
            factor={isMediumScreen ? 0.4 : 0.4}
            speed={0.1}
            style={{ height: "auto" }}
          >
            <LoginFourthpage />
          </ParallaxLayer>
          <ParallaxLayer
            offset={isMediumScreen ? 1.97 : 2.3}
            factor={isMediumScreen ? 0.4 : 0.4}
            speed={0.1}
            style={{ height: "auto" }}
          >
            <LoginFifthpage />
            <div className="fixed  right-2">
              <button
                type="button"
                onClick={() => ref.current.scrollTo(0)}
                className="bg-black hover:opacity-50 duration-300 z-40 focus:ring-black  cursor-pointer inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <BiArrowFromBottom className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex justify-center items-center bg-white gap-5 py-3">
              <i
                onClick={() => setEnvelopeClicked(!envelopeClicked)}
                className=" fa-sharp fa-solid fa-envelope duration-300 hover:opacity-30 text-black cursor-pointer"
              >
                {" "}
              </i>
              {envelopeClicked && (
                <h2 className="text-black">travelplannerkandidat@gmail.com</h2>
              )}
            </div>
          </ParallaxLayer>
        </Parallax>
      )}
      {isSmallScreen === true && (
        <Parallax
          pages={4.2}
          style={{ top: "0", left: "0" }}
          className="animation"
        >
          <ParallaxLayer offset={0} speed={0.1}>
            <div
              className="animation_layer parallax"
              id="backgroundSmall"
            ></div>
          </ParallaxLayer>
          <ParallaxLayer offset={0} speed={-0.7}>
            <div className="animation_layer parallax" id="title">
              <h2
                id="parallaxTitleBig"
                className="text-black z--1 text-white uppercase mt-[35%] lg:mt-[6%] absolute text-4xl  lg:text-8xl 
          font-bold ml-[35%]"
              >
                Planner
              </h2>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={0} speed={0.1}>
            <div
              className="animation_layer parallax"
              id="foregroundSmall"
            ></div>
          </ParallaxLayer>
          <ParallaxLayer offset={0.844} factor={0.3} speed={0.1}>
            <LoginFirstpage />
          </ParallaxLayer>
          <ParallaxLayer offset={1} factor={0.2} speed={0.1}>
            <LoginSecondpage />
          </ParallaxLayer>
          <ParallaxLayer offset={1.7} factor={0.2} speed={0.1}>
            <LoginThirdpage />
          </ParallaxLayer>
          <ParallaxLayer offset={2.4} factor={0.2} speed={0.1}>
            <LoginFourthpage />
          </ParallaxLayer>
          <ParallaxLayer offset={3.3} factor={0.4} speed={0.1}>
            <LoginFifthpage />

            <div className="flex justify-center items-center bg-white gap-5 py-3">
              <i
                onClick={() => setEnvelopeClicked(!envelopeClicked)}
                className=" fa-sharp fa-solid fa-envelope duration-300 hover:opacity-30 text-black cursor-pointer"
              >
                {" "}
              </i>
              {envelopeClicked && (
                <h2 className="text-black">travelplannerkandidat@gmail.com</h2>
              )}
            </div>
          </ParallaxLayer>
        </Parallax>
      )}
    </div>
  );
}
