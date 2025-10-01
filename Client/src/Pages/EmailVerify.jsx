import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);
  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContent);
  axios.defaults.withCredentials = true;

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const inputHandeler = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  useEffect(() => {
    isLoggedIn && userData && userData.isVerified && navigate("/");
  }, [isLoggedIn, userData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-tr from-blue-100 to-blue-400">
      <img
        onClick={() => {
          navigate("/");
        }}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer"
      />
      <form
        onSubmit={onSubmitHandler}
        className=" flex flex-col justify-center items-center bg-blue-950 rounded px-5 py-8 w-[400px]"
      >
        <h1 className="text-2xl text-white font-bold mb-3">Email Verify OTP</h1>
        <p className="text-blue-300 text-sm">
          Enter 6-digit code sent on your registered Email
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                ref={(e) => (inputRefs.current[index] = e)}
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 border-none outline-none bg-blue-300 text-center text-lg rounded-md mt-6 mr-1"
                onInput={(e) => inputHandeler(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full bg-gradient-to-tl from-blue-200 to-blue-700 text-lg p-1 rounded-full text-blue-950 cursor-pointer   hover:text-blue-900 transition-all">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
