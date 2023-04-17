import React, { useEffect, useState } from "react";

export default function LoginFirstPage() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        const parallaxTitle = document.getElementById("parallaxTitle");
        if (parallaxTitle) {
          parallaxTitle.style.marginTop = window.scrollY * 1 + "px";
          /* if (window.scrollY > 600) {
            isVisible && setIsVisible(false);
          } else {
            setIsVisible(true);
          } */
        }
      },
      []
    );
  });

  return (
    <div className="h-screen relative">
      <section className="parallax h-3/4 ">
        <img
          src="../img/StartPageMindre.png"
          id="bakgrund"
          className="max-w-full h-auto object-cover"
        ></img>
        {isVisible && (
          <h2
            id="parallaxTitle"
            className="text-black z-0  absolute text-4xl sm:text-6xl font-bold mr-[20%] sm:mr-[50%]"
          >
            Planner
          </h2>
        )}
        <img
          src="../img/StartPageBottomMindre.png"
          id="foreground"
          className="max-w-full h-auto object-cover"
        ></img>
      </section>
      <div className="flex flex-1 flex-row z-999 bg-white items-center justify-center gap-4 justify-between absolute h-1/4 w-full">
        <h2 className="text-black text-2xl sm:text-4xl font-bold text-left px-4 sm:px-8">
          The social and <br></br>interactive travel <br></br>planner for you
          and your friends
        </h2>

        <button className="border bg-white text-black text-2xl sm:text-4xl font-bold py-4 px-6 rounded-full shadow-md hover:shadow-lg ">
          Get Started!
        </button>
        <button className="border bg-white text-black font-bold text-2xl sm:text-4xl py-4 px-6 rounded-full shadow-md hover:shadow-lg ">
          Login
        </button>
      </div>
    </div>
  );
}
