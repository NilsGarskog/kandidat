//import { Parallax, Background } from "react-parallax";
//import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React, { useEffect } from "react";

export default function LoginFirstPage() {
  useEffect(() => {
    if (document) {
      let title = document.getElementById("parallaxTitle");
      window.addEventListener(
        "scroll",
        () => {
          let value = window.scrollY;

          title.style.marginTop = value * 1 + "px";
        },
        []
      );
      if (window.scrollY > 300) {
        title.style.display = "none";
      }
    }
  });

  return (
    <section className="parallax">
      <img src="../img/StartPageKandidat.jpg" id="bakgrund"></img>
      <h2 id="parallaxTitle">Planner</h2>
      <img
        src="../img/StartPageKandidatforegroundriktig.png"
        id="foreground"
      ></img>
    </section>
  );
}

{
  /* <div>
    <Parallax
      offset={0}
      className="loginBilden"
      bgImage="../img/StartPageKandidat.jpg"
      strength={800}
    >
      <div className="content">
        <span className="img-text">Travel Planner</span>
      </div>
    </Parallax>
    <Parallax
      offset={0}
      className="loginBilden"
      bgImage="../img/StartPageforeground.jpg"
      strength={-800}
    ></Parallax>
  </div> */
}
