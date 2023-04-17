import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props) {
  const { children } = props;
  return (
    <div className="flex flex-col min-h-screen relative text-white">
      <Header />
      <main className="flex-1 flex-col ">{children}</main>
      <Footer />
    </div>
  );
}
