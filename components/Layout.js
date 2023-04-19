import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props) {
  const { children } = props;
  return (
    <div className="">
      <Header />
      <main className='flex-1 flex-col p-4'>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
