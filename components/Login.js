import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";
import { ScrollToTop } from "@/components/ScrollToTop";

function validateEmailAddress(input) {
  var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  if (regex.test(input)) {
    return 1;
  } else {
    return -1;
  }
}

export default function Login() {
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

  return (
    <div className="flex sm:flex-row flex-col p-10 h-[300vh] ">
      <div className=" relative z-30">
        <h1 className="font-bold sm:text-xl sm:w-1/2  break-word ">
          Welcome to Travel Planner!<br></br> Finding the best way fit all of
          the activities and places you want to visit has never been easier.
          <br></br> To get started, please sign in or register.
        </h1>
      </div>
      <div className="flex-1 text-xs sm:text-sm relative z-30 flex flex-col  items-center gap-2 sm:gap-4">
        <h1 className="font-extrabold text-2xl sm:text-4xl select-none uppercase">
          {isLoggingIn ? "Login" : "Register"}
        </h1>
        {error && (
          <div className="w-full select-none max-w-[40ch] border-rose-400 text-rose-400 py-2 border border-solid text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Adress..."
          className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
        ></input>
        <input
          type={passwordShow ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
        ></input>
        {!isLoggingIn && (
          <input
            type={passwordShow ? "text" : "password"}
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            placeholder="Confirm password"
            className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
          ></input>
        )}
        {!passwordShow && (
          <i
            onClick={togglePassword}
            className=" fa-solid fa-eye text-xl flex-nowrap sm:text-2xl"
          ></i>
        )}
        {passwordShow && (
          <i
            onClick={togglePassword}
            className=" fa-solid fa-eye-slash text-xl flex-nowrap sm:text-2xl"
          ></i>
        )}

        <button
          onClick={submitHandler}
          className="w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full 
      after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900"
        >
          <h2 className="relative z-20">SUBMIT</h2>
        </button>
        <Popup
          trigger={
            <h2 className="duration-300 hover:scale-110 cursor-pointer">
              {!isLoggingIn ? "" : "Forgot Password?"}
            </h2>
          }
          position="relative"
          modal
          closeOnDocumentClick={false}
        >
          {(close) => (
            <div className="flex flex-col items-center space-y-4 font-medium text-base rounded-lg w-full">
              <i
                onClick={close}
                className="text-3xl fa-solid fa-xmark cursor-pointer absolute top-0 right-2 "
              ></i>

              <h1 className="text-3xl pb-10">Forgot password</h1>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Adress..."
                required
                className=" border border-black outline-none duration-300  border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]"
              ></input>
              <button
                className="border w-1/2 bg-green-300 "
                disabled={!email}
                onClick={() => {
                  submitForgottenPassword(), close();
                }}
              >
                Submit
              </button>
            </div>
          )}
        </Popup>

        <h2
          className="duration-300 hover:scale-110 cursor-pointer "
          onClick={() => setIsLogginIn(!isLoggingIn)}
        >
          {!isLoggingIn ? "Login" : "Register"}
        </h2>
      </div>
      <ScrollToTop />
    </div>
  );
}
