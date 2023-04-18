import React, { useEffect, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";

export default function LoginFirstPage() {
  const size = useWindowSize();
  const [stateBig, setStateBig] = useState(0);
  const [stateSmall, setStateSmall] = useState(0);

  useEffect(() => {
    console.log(stateBig);
    const paraBig = () => {
      const parallaxTitleBig = document.getElementById("parallaxTitleBig");
      setStateBig(5 + window.scrollY * 0.05);
      if (parallaxTitleBig) {
        parallaxTitleBig.style.marginTop = stateBig + "%";
        console.log(stateBig);
      }
    };

    window.addEventListener("scroll", paraBig);
    paraBig();

    const paraSmall = () => {
      const parallaxTitleSmall = document.getElementById("parallaxTitleSmall");
    };

    return () => window.removeEventListener("scroll", paraBig);

    /* if (parallaxTitleSmall) {
      parallaxTitleSmall.style.marginTop = 30 + "%";
    }
    window.addEventListener("scroll", () => {
      if (parallaxTitleSmall) {
        parallaxTitleSmall.style.marginTop = 30 + window.scrollY * 0.2 + "%";
      }
    }); */
    /* if (parallaxTitleBig) {
      parallaxTitleBig.style.marginTop = 5 + "%";
    }
    window.addEventListener("scroll", () => {
      if (parallaxTitleBig) {
        parallaxTitleBig.style.marginTop = 5 + window.scrollY * 0.05 + "%";
      }
    }); */
  }, []);

  return (
    <>
      {size.width < 600 && (
        <section className=" relative flex justify-center align-items h-[100vh]">
          <img
            src="../img/MobileKandidatSmall.jpg"
            id="bakgrund"
            className="max-w-full absolute h-auto object-cover"
          ></img>

          <h2
            id="parallaxTitleSmall"
            className="text-black z-0 absolute text-6xl text-center  sm:text-5xl 
          font-bold "
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
      {size.width > 600 && (
        <section className=" relative flex justify-center align-items h-[100vh]">
          <img
            src="../img/StartPageKandidatSmall.jpg"
            id="bakgrund"
            className="max-w-full absolute h-auto object-cover"
          ></img>

          <h2
            id="parallaxTitleBig"
            className="text-black z-0 absolute text-3xl max-h-10 sm:text-5xl 
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

      <section className=" relative ">
        <div className="Wrapper bg-white h-1/4 flex flex-row z-999 items-center   gap-10">
          <h2 className="text-black text-2xl sm:text-4xl font-bold  text-left px-4 sm:px-8 select-none">
            The social and <br></br>interactive travel <br></br>planner for you
            and your friends
          </h2>

          <button className="border bg-white text-black text-2xl sm:text-4xl ml-[25%] font-bold py-4 px-6 rounded-full shadow-md hover:shadow-lg">
            Get Started!
          </button>
          <button className="border bg-white text-black font-bold text-2xl sm:text-4xl py-4 px-6 rounded-full shadow-md hover:shadow-lg mr-[5%]">
            Login
          </button>
        </div>
      </section>
    </>
  );
}
