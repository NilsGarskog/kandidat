import React from "react";
import LoginFirstpage from "./LoginFirstPage";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function LoginLayout() {
  return (
    <div className="h-[300vh]">
      <LoginFirstpage />
      <ScrollToTop />
    </div>
  );
}
