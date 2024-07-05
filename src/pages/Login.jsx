/* eslint-disable no-unused-vars */
import Input from "../components/Input";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import CaptchaSlider from "../components/CaptchaSlider";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";

export default function Login() {
  const [captchaPassed, setCaptchaPassed] = useState(false); // state untuk mengecek captcha

  const handleIsTrueChange = isTrue => {
    setCaptchaPassed(isTrue);
    if (isTrue) {
      toast.success("Captcha passed!");
    } else {
      toast.error("Captcha failed!");
    }
  };

  return (
    <main className="relative">
      <Toaster
        position="top-right"
        reverseOrder={false}
        // containerStyle={{ marginTop: "65px" }}
      />
      <div className="h-56 w-full bg-purple-500 absolute -z-50 top-0 left-0"></div>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="login-box flex bg-white w-full h-screen max-w-4xl max-h-[34rem] rounded-md shadow-xl">
          <div className="w-1/2">
            <img
              className="w-full h-full object-cover rounded-l-md"
              src="https://img.freepik.com/free-photo/3d-illustration-computer-monitor-login-screen_107791-16390.jpg?t=st=1720152739~exp=1720156339~hmac=fb343fb0864c5d300809f38774f0415297ce1fc099201557b63d05a8be8508d4&w=740"
              alt=""
            />
          </div>
          <div className="w-1/2 p-10">
            <h1 className="text-3xl text-neutral-700 font-bold mb-2">Login</h1>
            <p className="text-neutral-500 font-normal text-sm mb-4">
              Welcome back, please login to your account.
            </p>
            <div className="">
              <div className="space-y-3">
                <Input
                  inputIcon={FaUser}
                  inputName="Username"
                  inputType="text"
                />
                <Input
                  inputIcon={FaKey}
                  inputName="Password"
                  inputType="password"
                />
              </div>
              <div className="my-4">
                <CaptchaSlider onIsTrueChange={handleIsTrueChange} />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1.5 text-sm">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 accent-purple-500"
                  />
                  <label htmlFor="remember">Remember Me</label>
                </div>
                <a
                  href="#"
                  className="text-red-500 text-sm">
                  Forgot Password?
                </a>
              </div>
              <div className="my-3">
                <Button>Login</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
