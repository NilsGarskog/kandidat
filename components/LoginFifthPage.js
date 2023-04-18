import React from "react";

export default function LoginFifthPage() {
  return (
    <div className="wrapper flex flex-row relative z-999">
      <section className="flex bg-white flex-wrap ">
        <div className="bg-white flex-1 p-6 ml-[5%] m-auto">
          <img src="../img/plantrip.jpg" className="tripPlan w-3/4"></img>
        </div>
        <div className="ml-[5%] flex-1 p-6 ">
          <h2 className="text-black text-2xl sm:text-4xl font-bold text-left uppercase select-none">
            Shared expenses
          </h2>
          <p className="text-black text-xl sm:text-2xl mb-6 select-none">
            will not be a problem any longer
          </p>
          <h2 className="text-black text-xl sm:text-2xl text-left mb-4 select-none">
            Travel planner lets you enter your <br></br> expenses from the trip,
            and will <br></br> calculatee who owns who how much <br></br> money.
            In that way you will not need <br></br> to pay each other after each
            expense, <br></br> but can instead pay a lump sum to <br></br> one
            person at the end of the trip.
          </h2>
        </div>
      </section>
    </div>
  );
}
