import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContent);
  return (
    <div className="flex justify-center items-center z-10">
      <div className="flex flex-col items-center p-3 absolute top-30 bg-blue-400  w-[800px] h-[600px] text-gray-800 rounded-2xl ">
        <img
          src={assets.header_img}
          alt=""
          className="w-36 h-36 rounded-full mb-6 hover:w-38 hover:h-38 transition-all"
        />
        <h1 className="text-2xl mb-2">
          Hey {userData ? userData.name : "User"}{" "}
        </h1>
        <img
          src={assets.hand_wave}
          className="w-8 aspect-square mb-6 "
          alt=""
        />
        <h2 className="text-3xl mb-4 font-bold">
          Welcome to Authentication System
        </h2>
        <p className=" text-white text-center text-xl m-5">
          Let’s kick things off with a quick spin through the product. It won’t
          take long, and by the end, you’ll be ready to hit the ground running
          with confidence.
        </p>
        <button className="absolute bottom-15 bg-white p-4 rounded-full cursor-pointer hover:text-xl transition-all">
          Get started
        </button>
      </div>
    </div>
  );
};

export default Header;
