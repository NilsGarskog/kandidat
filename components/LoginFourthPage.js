import React from "react";

export default function LoginFourthPage() {
  return (
    <div className="wrapper flex flex-row relative z-999">
      <section className="flex bg-white flex-wrap ">
        <div className="ml-[5%] flex-1 p-6 m-auto">
          <h2 className="text-black text-2xl sm:text-4xl font-bold text-left uppercase select-none">
            Generate
          </h2>
          <p className="text-black text-xl sm:text-2xl mb-6 select-none">
            an optimized itinerary
          </p>
          <h2 className="text-black text-xl sm:text-2xl text-left mb-4 select-none">
            Travel planner will do the hard work for <br></br>
            you when it comes to the actual planning.
          </h2>
          <h2 className="text-black text-xl sm:text-2xl text-left select-none">
            Based on what your friend group wants <br></br>
            to do the most, distance between <br></br> activities, opening hours
            and more, the <br></br>application will generate and optimized{" "}
            <br></br>itinerary for the entire trip.
          </h2>
        </div>
        <div className="bg-white flex-1 p-6">
          <img src="../img/plantrip.jpg" className="tripPlan w-3/4"></img>
        </div>
      </section>
    </div>
  );
}
