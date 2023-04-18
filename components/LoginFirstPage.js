import React, { useEffect, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useAuth } from "../context/authContext";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";

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
  const [isLoggingIn, setIsLogginIn] = useState(true);
  const [passwordShow, setPasswordShow] = useState(false);

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
    await signUp(email, password);
  }
  async function submitForgottenPassword() {
    try {
      await forgotPassword(email);
      toast.success("Email was successfully sent, check your inbox!");
    } catch (error) {
      toast.error("No existing account with that email address");
    }
  }
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const size = useWindowSize();
  const [stateBig, setStateBig] = useState(0);
  const [stateSmall, setStateSmall] = useState(0);

  useEffect(() => {
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
          <Popup
            trigger={
              <button className="border bg-white text-black text-2xl sm:text-4xl ml-[25%] font-bold py-4 px-6 rounded-full shadow-md hover:shadow-lg">
                Get Started!
              </button>
            }
            position="relative"
            modal
            closeOnDocumentClick={false}
          >
            {(close) => (
              <div className="flex flex-col items-center space-y-4 font-medium text-base rounded-lg w-full">
                <div className="inline-block">
                  <i
                    onClick={close}
                    className="text-3xl fa-solid fa-xmark cursor-pointer absolute top-0 right-2 "
                  ></i>

                  <h1 className="text-3xl text-center pb-10">Sign up</h1>
                  {error && (
                    <div className="w-full select-none mb-3 max-w-[40ch] border-rose-400 text-rose-400 py-2 border border-solid text-center">
                      {error}
                    </div>
                  )}
                  <h2 className="text-2xl text-black">Email adress</h2>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                    className="mb-4 border border-black outline-none duration-300  border-solid  focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
                  ></input>
                  <h2 className="text-2xl text-black">Password</h2>
                  <input
                    type={passwordShow ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="mb-4 border border-black outline-none duration-300  border-solid  focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
                  ></input>
                  <h2 className="text-2xl text-black">Confirm password</h2>
                  <input
                    type={passwordShow ? "text" : "password"}
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    placeholder="Confirm password"
                    className="mb-4 border border-black outline-none duration-300  border-solid  focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
                  ></input>
                  {/*  {!passwordShow && (
                  <i
                    onClick={togglePassword}
                    className=" fa-solid fa-eye text-xl sm:text-2xl"
                  ></i>
                )}
                {passwordShow && (
                  <i
                    onClick={togglePassword}
                    className=" fa-solid fa-eye-slash text-xl sm:text-2xl"
                  ></i>
                )} */}
                  <button
                    className="w-full max-w-[40ch] mt-4 uppercase py-2 duration-300 relative text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center mr-2 mb-2 "
                    onClick={() => {
                      setIsLogginIn(!isLoggingIn);
                      submitHandler();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </Popup>

          <Popup
            trigger={
              <button className="border bg-white text-black font-bold text-2xl sm:text-4xl py-4 px-6 rounded-full shadow-md hover:shadow-lg mr-[5%]">
                Login
              </button>
            }
            position="relative"
            modal
            closeOnDocumentClick={false}
          >
            {(close) => (
              <div className="flex flex-col items-center space-y-4 font-medium text-base rounded-lg w-full">
                <div className="inline-block">
                  <i
                    onClick={close}
                    className="text-3xl fa-solid fa-xmark cursor-pointer absolute top-0 right-2 "
                  ></i>

                  <h1 className="text-3xl text-center pb-10">Sign in</h1>
                  {error && (
                    <div className="w-full select-none mb-3 max-w-[40ch] border-rose-400 text-rose-400 py-2 border border-solid text-center">
                      {error}
                    </div>
                  )}
                  <h2 className="text-2xl text-black">Email adress</h2>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                    className=" mb-4 border border-black outline-none duration-300  border-solid  focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
                  ></input>
                  <h2 className="text-2xl text-black">Password</h2>
                  <div className="flex flex-row gap-4 ">
                    <input
                      type={passwordShow ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="outline-none  duration-300  flex-wrap border-solid  focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
                    ></input>
                    {/*  {!passwordShow && (
                      <i
                        onClick={togglePassword}
                        className=" fa-solid fa-eye text-xl flex-nowrap m-auto sm:text-2xl"
                      ></i>
                    )}
                    {passwordShow && (
                      <i
                        onClick={togglePassword}
                        className=" fa-solid fa-eye-slash text-xl flex-nowrap m-auto sm:text-2xl"
                      ></i>
                    )} */}
                  </div>
                  <button
                    onClick={() => {
                      setIsLogginIn(isLoggingIn);
                      submitHandler();
                    }}
                    className="w-full max-w-[40ch] mt-4 uppercase py-2 duration-300 relative text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center mr-2 mb-2"
                  >
                    <h2 className="relative z-20">SUBMIT</h2>
                  </button>
                  <Popup
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
                      <div className="flex flex-col items-center space-y-4 font-medium text-base rounded-lg w-full">
                        <div className="inline-block">
                          <i
                            onClick={close}
                            className="text-3xl fa-solid fa-xmark cursor-pointer absolute top-0 right-2 "
                          ></i>

                          <h1 className="text-3xl pb-10">Forgot password?</h1>
                          <h2 className="text-2xl text-black">Email adress</h2>
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                            className=" border border-black outline-none duration-300  border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
                          ></input>
                          <button
                            className="w-full max-w-[40ch] mt-4 uppercase py-2 duration-300 relative text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm  text-center mr-2 mb-2"
                            disabled={!email}
                            onClick={() => {
                              submitForgottenPassword(), close();
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </section>
    </>
  );
}
