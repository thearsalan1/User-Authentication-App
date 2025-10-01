import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center max-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
      <Navbar></Navbar>
      <Header></Header>
    </div>
  );
};

export default Home;
