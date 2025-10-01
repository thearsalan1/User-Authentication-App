import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        {
          otp,
          email,
          newPassword,
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
        return;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    }
  };

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

      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="flex flex-col justify-center items-center bg-blue-950 rounded-xl px-10 py-8 w-[450px]"
        >
          <h1 className="text-2xl text-white font-bold mb-3">Reset Password</h1>
          <p className="text-blue-300 text-sm mb-5">
            Enter your registered email address.
          </p>
          <div className="flex justify-center items-center bg-blue-300 w-[300px] rounded-full py-2 mb-5">
            <img
              src={assets.mail_icon}
              alt=""
              className="w-4 h-4 invert mr-2"
            />
            <input
              type="email"
              placeholder="Email id"
              className="border-none outline-none"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <button className="w-[300px] bg-gradient-to-tl from-blue-200 to-blue-700 text-lg px-1 py-1.5  rounded-full text-blue-950 cursor-pointer   hover:text-blue-900 transition-all">
            Verify Email
          </button>
        </form>
      )}

      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          className=" flex flex-col justify-center items-center bg-blue-950 rounded px-5 py-8 w-[400px]"
        >
          <h1 className="text-2xl text-white font-bold mb-3">
            Reset Password OTP
          </h1>
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
            Submit
          </button>
        </form>
      )}

      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="flex flex-col justify-center items-center bg-blue-950 rounded-xl px-10 py-8 w-[450px]"
        >
          <h1 className="text-2xl text-white font-bold mb-3">New Password</h1>
          <p className="text-blue-300 text-sm mb-5">Enter your new password.</p>
          <div className="flex justify-center items-center bg-blue-300 w-[300px] rounded-full py-2 mb-5">
            <img
              src={assets.lock_icon}
              alt=""
              className="w-4 h-4 invert mr-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-none outline-none"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              required
            />
          </div>
          <button className="w-[300px] bg-gradient-to-tl from-blue-200 to-blue-700 text-lg px-1 py-1.5  rounded-full text-blue-950 cursor-pointer   hover:text-blue-900 transition-all">
            Verify Email
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
