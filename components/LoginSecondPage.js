import React from "react";

export default function LoginSecondPage() {
  return (
    <div className="wrapper flex flex-row relative z-999 mt-4">
      <section className=" bg-white flex flex-wrap justify-center">
        <div className="ml-[5%] flex-1 p-6 z-999 m-auto">
          <h2 className="text-black text-2xl sm:text-4xl font-bold text-left uppercase select-none">
            Trip planning
          </h2>
          <p className="text-black text-xl sm:text-2xl mb-6 select-none">
            has never been easier
          </p>
          <h2 className="text-black text-xl sm:text-2xl text-left mb-4 select-none">
            Travel planner offers you and your <br></br> friends a range of
            features to make <br></br> your trip planning more smooth, easy
            <br></br> and interactive.
          </h2>
          <h2 className="text-black text-xl sm:text-2xl text-left select-none">
            Scroll down to learn more.
          </h2>
        </div>
        <div className="bg-white flex-1 p-6 flex justify-center">
          <img src="../img/plantrip.jpg" className="tripPlan w-3/4"></img>
        </div>
      </section>
    </div>
  );
}
