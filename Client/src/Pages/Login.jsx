import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("Sign Up");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
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
      <div className=" flex flex-col items-center justify-center p-10 rounded-xl bg-blue-900  ">
        <h1 className="text-white text-3xl font-bold mb-3">
          {state === "Sign Up" ? "Create account" : "Login"}
        </h1>
        <p className="text-blue-200 mb-5">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>
        <form onSubmit={(e) => onSubmitHandler(e)}>
          {state === "Sign Up" ? (
            <div className="flex items-center justify-center bg-blue-300 py-2 px-3 rounded-full mb-3 w-[350px] h-[50px]">
              <img className="invert mr-3" src={assets.person_icon} alt="" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="outline-none border-none placeholder:text-sm"
                placeholder="Full Name"
                required
              />
            </div>
          ) : null}
          <div className="flex items-center justify-center bg-blue-300 py-2 px-3 rounded-full mb-3 w-[350px] h-[50px]">
            <img className="invert mr-3" src={assets.mail_icon} alt="" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="outline-none border-none placeholder:text-sm"
              placeholder="Email id"
              required
            />
          </div>
          <div className="flex items-center justify-center bg-blue-300 py-2 px-3 rounded-full mb-3 w-[350px] h-[50px]">
            <img className="invert mr-3" src={assets.lock_icon} alt="" />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="outline-none border-none placeholder:text-sm"
              placeholder="password"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="text-blue-400 text-sm cursor-pointer mb-2"
          >
            Forgot password?
          </p>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-700 cursor-pointer font-lg text-blue-100">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-sm mt-4 text-blue-200">
            Already have an account?{"  "}{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
              className="cursor-pointer underline text-blue-300"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-sm mt-2 text-blue-200">
            Don't have an account?{"  "}{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
              className="cursor-pointer underline text-blue-300"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
