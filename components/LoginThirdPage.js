import React from "react";

export default function LoginThirdPage() {
  return (
    <div className="wrapper flex flex-row relative z-999">
      <section className="flex bg-white  justify-center flex-wrap ">
        <div className="bg-white flex-1 flex justify-center p-6 ">
          <img src="../img/plantrip.jpg" className="tripPlan w-3/4"></img>
        </div>
        <div className="ml-[5%] flex-1 p-6 m-auto">
          <h2 className="text-black text-2xl sm:text-4xl font-bold text-left uppercase select-none">
            Explore
          </h2>
          <p className="text-black text-xl sm:text-2xl mb-6 text-left select-none">
            a destination together
          </p>
          <h2 className="text-black text-xl sm:text-2xl text-left mb-4 select-none">
            Travel planner let your friend group <br></br> add activites,
            restaurants, etc to a <br></br>
            shared planning space where you can <br></br> all see each others
            suggestions.
          </h2>
          <h2 className="text-black text-xl sm:text-2xl text-left select-none">
            Upvote your friends suggestions to <br></br> hightlight what you
            want to explore at <br></br>
            the destination.
          </h2>
        </div>
      </section>
    </div>
  );
}
