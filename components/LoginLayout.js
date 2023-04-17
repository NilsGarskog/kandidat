import React from "react";
import LoginFirstpage from "./LoginFirstPage";
import LoginSecondpage from "./LoginSecondPage";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function LoginLayout() {
  return (
    <div className="">
      <LoginFirstpage />
      <LoginSecondpage />
      <ScrollToTop />
    </div>
  );
}
