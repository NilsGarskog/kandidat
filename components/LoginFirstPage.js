import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import LoginSecondpage from "./LoginSecondPage";
import { useRef } from 'react';



function validateEmailAddress(input) {
  var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  if (regex.test(input)) {
    return 1;
  } else {
    return -1;
  }
}

export default function LoginFirstPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState(null);
  let [isLoggingIn, setIsLogginIn] = useState(null);
  const [passwordShow, setPasswordShow] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState("");
  const [isMediumScreen, setIsMediumScreen] = useState("");
  const isMobile = window.innerWidth < 640;
  const contentStyle1 = {
    width: '400px',
    height: "500px",
    borderRadius: "0.7em",
    boxShadow: "0px 3px 7px rgba(0, 0, 0, 0.2)",
  }
  const contentStyleMobile1 = {
    
      width: '350px',
      height: "500px",
      borderRadius: "0.7em",
      boxShadow: "0px 3px 7px rgba(0, 0, 0, 0.2)",
    
  }

  const contentStyle2 = {
    width: "400px",
    height: "440px",
    borderRadius: "0.7em",
    boxShadow: "0px 3px 7px rgba(0, 0, 0, 0.2)",
  }
  const contentStyleMobile2 = {
    
      width: '350px',
      height: "420px",
      borderRadius: "0.7em",
      boxShadow: "0px 3px 7px rgba(0, 0, 0, 0.2)",
    
  }

const buttonRef = useRef(null);

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      if (buttonRef.current) {
        console.log("Enter");
    buttonRef.current.click();
  }
      
    }
  }

  function resetFields() {
    setEmail("");
    setError("");
    setPassword("");
    setPasswordCheck("");
  }
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




  const { login, signUp, currentUser, forgotPassword } = useAuth();
  async function submitHandler() {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (isLoggingIn) {
      try {
        await login(email, password);
      } catch (err) {
        setError("Incorrect email or password");
      }
      return;
    }
    if (validateEmailAddress(email) === -1) {
      setError("Invalid Email");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    } else if (password !== passwordCheck) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp(email, password);
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        setError("Email already in use.");
      } else {
        setError(error.message);
      }
      return;
    }
  }

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const [stateBig, setStateBig] = useState(0);
  const [stateSmall, setStateSmall] = useState(0);

  /* useEffect(() => {
    const paraBig = () => {
      const parallaxTitleBig = document.getElementById("parallaxTitleBig");
      setStateBig(5 + window.scrollY * 0.05);
      if (parallaxTitleBig) {
        parallaxTitleBig.style.marginTop = stateBig + "%";
      }
    };

    window.addEventListener("scroll", paraBig);
    paraBig();

    const paraSmall = () => {
      const parallaxTitleSmall = document.getElementById("parallaxTitleSmall");
    };

    return () => window.removeEventListener("scroll", paraBig);

     if (parallaxTitleSmall) {
      parallaxTitleSmall.style.marginTop = 30 + "%";
    }
    window.addEventListener("scroll", () => {
      if (parallaxTitleSmall) {
        parallaxTitleSmall.style.marginTop = 30 + window.scrollY * 0.2 + "%";
      }
    }); 
   if (parallaxTitleBig) {
      parallaxTitleBig.style.marginTop = 5 + "%";
    }
    window.addEventListener("scroll", () => {
      if (parallaxTitleBig) {
        parallaxTitleBig.style.marginTop = 5 + window.scrollY * 0.05 + "%";
      }
    });  
  }, []); */

  return (
    <>
      {/* {isSmallScreen === true && (
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
      {isSmallScreen !== true && (
        <Parallax
          pages={2}
          style={{ top: "0", left: "0" }}
          className="animation"
        >
          <ParallaxLayer offset={0} speed={0.1}>
            <div className="animation_layer parallax" id="background"></div>
          </ParallaxLayer>
          <ParallaxLayer offset={0} speed={-0.7}>
            <div className="animation_layer parallax" id="title">
              <h2
                id="parallaxTitleBig"
                className="text-black z-0 uppercase mt-[8%] lg:mt-[6%] absolute text-4xl  lg:text-8xl 
          font-bold mr-[55%]"
              >
                Planner
              </h2>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={0} speed={0.1}>
            <div className="animation_layer parallax" id="foreground"></div>
          </ParallaxLayer>
          <ParallaxLayer offset={1} speed={0.1}>
            <LoginSecondpage />
          </ParallaxLayer>
        </Parallax>

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
      )} */}

      <section className=" relative ">
        <div className="Wrapper bg-white flex flex-col lg:flex-row items-center ">
          {!isSmallScreen && !isMediumScreen ? (
            <h2 className="text-black text-4xl sm:text-2xl font-light sm:pl-16 mt-10 sm:text-center text-left px-4 sm:px-8 select-none">
              The social and interactive travel planner for
              you and your friends
            </h2>
          ) : null}
          {isMediumScreen && !isSmallScreen ? (
            <h2 className="text-black text-4xl sm:text-xl md:mb-4 font-bold text-left px-4 sm:px-8 select-none">
              The social and interactive travel planner for you and your friends
            </h2>
          ) : null}
          {isSmallScreen === true && (
            <h2 className="text-black text-xl sm:text-4xl mt-4 sm:mt-0 font-light  text-center pt-4 px-4 sm:px-8 select-none">
              The social and interactive travel planner for you and your friends
            </h2>
          )}
          <div className="Wrapper bg-white mt-8 sm:mt-10 mt-0 flex flex-1 space-between flex-row z-999 items-center md:justify-center">
            <Popup
              contentStyle={isMobile? contentStyleMobile1 : contentStyle1}
              trigger={
                <button className="sm:-ml-10 border bg-buttonGreen text-black text-lg sm:text-2xl font-bold sm:font-medium uppercase  sm:mr-6 sm:hover:opacity-70 duration-300 mr-10 py-4 px-6 sm:ml-[30%] gap-2 rounded-full shadow-md hover:shadow-lg">
                  Register
                </button>
              }
              onOpen={() => {
                setIsLogginIn((isLoggingIn = false));
              }}
              position="relative"
              modal
              closeOnDocumentClick={false}
            >
              {(close) => (
                <div className="flex flex-col items-center space-y-4 font-medium text-base rounded-lg w-full">
                  <div className="inline-block">
                    <i
                      onClick={() => {
                        close();
                        resetFields();
                      }}
                      className="text-3xl sm:text-4xl opacity:100 hover:opacity-50 duration-300 fa-solid fa-xmark cursor-pointer absolute top-2 right-4 "
                    ></i>

                    <h1 className="text-4xl mt-6 text-center pb-10 uppercase sm:text-5xl sm:mt-8">Sign up</h1>
                    {error && (
                      <div className="w-full select-none mb-3 max-w-[40ch] border-rose-400 text-rose-400 py-2 border border-solid text-center">
                        {error}
                      </div>
                    )}

                    <div className="mt-4">
                      
                      <h2 className="text-2xl text-black uppercase">Email adress</h2>
                      <input
                      onKeyDown={handleKeyPress}
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                        className="mb-4 border border-black outline-none   border-solid  focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
                      ></input>
                      <h2 className="text-2xl text-black uppercase">Password</h2>
                      <div className="flex flex-row gap-4 items-center ">
                      <input
                      onKeyDown={handleKeyPress}
                        type={passwordShow ? "text":"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className=" border  outline-none   border-solid  focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
                      ></input>

                      {!passwordShow && (
                        <i
                          onClick={togglePassword}
                          className=" fa-solid fa-eye text-xl absolute  sm:right-16 mr-2 right-12 sm:text-2xl"
                        ></i>
                      )}
                      {passwordShow && (
                        <i
                          onClick={togglePassword}
                          className=" fa-solid fa-eye-slash text-xl absolute sm:right-16 mr-2 right-12 sm:text-2xl"
                        ></i>
                      )}
                      </div>
                      <h2 className="text-2xl mt-4 text-black uppercase">Confirm password</h2>
                      <input
                      onKeyDown={handleKeyPress}
                        type={passwordShow ? "text":"password"}
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                        placeholder="Confirm password"
                        className="mb-4 border border-black outline-none   border-solid  focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
                      ></input>

                      {email && password && passwordCheck && (
                        <button
                        ref={buttonRef}
                          
                          className="w-full  mt-4 uppercase py-2 duration-300 relative text-white  bg-buttonGreen  opacity-100 hover:opacity-80 font-medium rounded-lg text-sm  text-center mr-2 mb-2 "
                          onClick={() => {
                            submitHandler();
                          }}
                        >
                          Submit
                        </button>
                      )}

                         
                      {(!email || !password || !passwordCheck) && (
                        <button
                        
                          className="w-full  mt-4 uppercase py-2 duration-300 relative text-white  bg-buttonGreen  opacity-40  font-medium rounded-lg text-sm  text-center mr-2 mb-2 "
                          disabled={!email || !password || !passwordCheck}
                        >
                          Submit
                        </button>
                      )}
                      
                    </div>
                  </div>
                </div>
              )}
            </Popup>

            <Popup
              contentStyle={isMobile? contentStyleMobile2 : contentStyle2}
              trigger={
                <button className="border bg-buttonGreen text-black mr-[20%]  md:mr-[20vh] text-lg sm:text-2xl font-bold sm:font-medium uppercase  py-4 px-6 rounded-full duration-300 sm:hover:opacity-70 shadow-md hover:shadow-lg mr-[5%]">
                  Login
                </button>
              }
              onOpen={() => {
                setIsLogginIn((isLoggingIn = true));
              }}
              position="relative"
              modal
              closeOnDocumentClick={false}
            >
              {(close) => (
                <div className="flex flex-col items-center space-y-4 font-medium text-base rounded-lg w-full">
                  <div className="inline-block ">
                    <i
                      onClick={() => {
                        close();
                        resetFields();
                      }}
                      className="text-3xl sm:text-4xl opacity:100 hover:opacity-50 duration-300 fa-solid fa-xmark cursor-pointer absolute top-2 right-4"
                    ></i>

                    <h1 className="text-4xl mt-6 text-center pb-10 uppercase sm:text-5xl sm:mt-8">Sign in</h1>
                    {error && (
                      <div className="w-full select-none mb-3 max-w-[40ch] border-rose-400 text-rose-400 py-2 border border-solid text-center">
                        {error}
                      </div>
                    )}

                    <div className="mt-4">
                      <h2 className="text-2xl text-black uppercase">Email adress</h2>
                      <input
                      onKeyDown={handleKeyPress}
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                        className=" mb-4 border border-black outline-none   border-solid  focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
                      ></input>
                      <h2 className="text-2xl text-black uppercase">Password</h2>
                      <div className="flex flex-row  items-center">
                        <input
                        onKeyDown={handleKeyPress}
                          type={passwordShow ? "text":"password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          className="outline-none   flex-wrap border-solid  focus:border-cyan-300 text-slate-900 p-2 w-[25ch]"
                        ></input>
                          {!passwordShow && (
                      <i
                        onClick={togglePassword}
                        className=" fa-solid fa-eye text-xl absolute  sm:end-20 end-14 sm:mr-0 mr-1 sm:text-2xl"
                      ></i>
                    )}
                    {passwordShow && (
                      <i
                        onClick={togglePassword}
                        className=" fa-solid fa-eye-slash text-xl absolute  sm:end-20  end-14 sm:mr-0 mr-1 sm:text-2xl"
                      ></i>
                    )} 
                      </div>
                      {email && password && (
                        <button
                        ref={buttonRef}
                          onClick={() => {
                            setIsLogginIn(isLoggingIn);
                            submitHandler();
                          }}
                          className="w-full max-w-[40ch] mt-4 uppercase py-2 duration-300 relative text-white bg-buttonGreen opacity-100 hover:opacity-80 font-medium rounded-lg text-sm  text-center mr-2 mb-2"
                        >
                          <h2 className="relative z-20">SUBMIT</h2>
                        </button>
                      )}
                      {(!email || !password) && (
                        <button
                          disabled={!email || !password}
                          className="w-full max-w-[40ch] mt-4 uppercase py-2 duration-300 relative text-white bg-buttonGreen opacity-40  font-medium rounded-lg text-sm  text-center mr-2 mb-2"
                        >
                          <h2 className="relative z-20">SUBMIT</h2>
                        </button>
                      )}
                    </div>

                    <Popup
                      contentStyle={isMobile? contentStyleMobile2 : contentStyle2}
                      overlayStyle={{ background: "rgba(0,0,0,0)" }}
                      trigger={
                        <h2 className="forgot-password duration-300 hover:scale-110 text-right cursor-pointer">
                          <a href="#">Forgot password?</a>
                        </h2>
                      }
                      position="relative"
                      modal
                      closeOnDocumentClick={false}
                    >
                      {(close) => (
                        <div className="flex flex-col items-center space-y-4 font-medium text-base rounded-lg h-full w-full">
                          <div className="inline-block">
                            <i
                              onClick={close}
                              className="text-3xl fa-solid fa-arrow-left cursor-pointer absolute top-1.5 left-3 hover:opacity-50 duration-300"
                            ></i>

                            <h1 className="sm:text-3xl  text-2xl mt-14 text-center pb-10 uppercase">
                              Forgot password?
                            </h1>
                            <div className="mt-10 flex flex-col px-10 ">
                              <h2 className="text-2xl text-black uppercase">
                                Email adress
                              </h2>
                              <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                                required
                                className=" border border-black border-solid outline-none  border-solid items-start focus:border-cyan-300 text-slate-900 p-2 w-full sm:max-w-[40ch]"
                              ></input>
                              <div className="items-center">
                              {!email && (
                                <button
                                  className="w-full max-w-[40ch] mt-4 uppercase py-2 duration-300 relative text-white bg-buttonGreen  opacity-40 font-medium rounded-lg text-sm  text-center  mb-2"
                                  disabled={!email}
                                  onClick={() => {
                                    submitForgottenPassword(), close();
                                  }}
                                >
                                  Reset password
                                </button>
                              )}

                              {email && (
                                <button
                                  className="w-full max-w-[40ch] mt-4 uppercase py-2 duration-300 relative text-white bg-buttonGreen  opacity-100 hover:opacity-80 font-medium rounded-lg text-sm  text-center  mb-2"
                                  onClick={() => {
                                    submitForgottenPassword(), close();
                                  }}
                                >
                                  Reset password
                                </button>
                              )}
                              </div>
                            </div>
                          </div>
            
                        </div>
                      )}
                    </Popup>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </section>
    </>
  );
}
