import React, { useState } from "react";

export default function Footer() {
  const [envelopeClicked, setEnvelopeClicked] = useState(false);

  return (
    <div className="flex justify-center items-center bg-white gap-5 py-3 dark:bg-slate-800">
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
  );
}
