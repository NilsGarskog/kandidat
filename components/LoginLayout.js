import React from "react";
import LoginFirstpage from "./LoginFirstPage";
import LoginSecondpage from "./LoginSecondPage";
import LoginThirdpage from "./LoginThirdPage";
import LoginFourthpage from "./LoginFourthPage";
import LoginFifthpage from "./LoginFifthPage";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function LoginLayout() {
  return (
    <div className="">
      <LoginFirstpage />
      <LoginSecondpage />
      <LoginThirdpage />
      <LoginFourthpage />
      <LoginFifthpage />
      <ScrollToTop />
    </div>
  );
}
