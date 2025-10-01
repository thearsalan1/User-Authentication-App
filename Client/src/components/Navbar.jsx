import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const Navigate = new useNavigate(null);
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContent);

  const Navigation = () => {
    Navigate("/login");
  };

  const logOut = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      Navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        Navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-5 sm:p-6 sm:px-24 absolute top-0  shadow-xl z-10">
      <img src={assets.logo} alt="" className="w-28 sm:w-32" />
      {userData ? (
        <div className="flex justify-center items-center bg-blue-400 w-10 h-10 rounded-full cursor-pointer relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="flex flex-col list-none m-0 p-2 bg-gray-100 text-sm ">
              {userData.isVerified ? null : (
                <l1
                  onClick={sendVerificationOtp}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                >
                  Verify Email
                </l1>
              )}
              <l1
                onClick={logOut}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                LogOut
              </l1>
            </ul>
          </div>
        </div>
      ) : (
        <button
          className="flex items-center gap-2 cursor-pointer bg-blue-300 px-3 py-2 rounded-2xl text-gray-800 shadow-blue-400 shadow-lg hover:bg-blue-500 hover:shadow-blue-400 hover:shadow-xl transition-all  "
          onClick={Navigation}
        >
          Login
          <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
