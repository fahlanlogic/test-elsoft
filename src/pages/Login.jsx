/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Input from "../elements/Input";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import CaptchaSlider from "../components/CaptchaSlider";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../elements/Button";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Login() {
  const [captchaPassed, setCaptchaPassed] = useState(false); // state untuk mengecek captcha
  const [formData, setFormData] = useState({
    UserName: "",
    Password: "",
  });
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["authToken"]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (
      formData.UserName !== "testcase" ||
      formData.Password !== "testcase123"
    ) {
      return toast.error("Invalid Username or Password!");
    }

    if (!captchaPassed) {
      return toast.error("Please solve captcha first!");
    }

    const requestData = {
      ...formData,
      Company: "d3170153-6b16-4397-bf89-96533ee149ee",
      browserInfo: {
        chrome: true,
        chrome_view: false,
        chrome_mobile: false,
        chrome_mobile_ios: false,
        safari: false,
        safari_mobile: false,
        msedge: false,
        msie_mobile: false,
        msie: false,
      },
      machineInfo: {
        brand: "Apple",
        model: "",
        os_name: "Mac",
        os_version: "10.15",
        type: "desktop",
      },
      osInfo: {
        android: false,
        blackberry: false,
        ios: false,
        windows: false,
        windows_phone: false,
        mac: true,
        linux: false,
        chrome: false,
        firefox: false,
        gamingConsole: false,
      },
      osNameInfo: {
        name: "Mac",
        version: "10.15",
        platform: "",
      },
      Device: "web_1703742830368",
      Model: "Admin Web",
      Source: "103.242.150.163",
      Exp: 3,
    };

    try {
      const res = await fetch(
        "https://core.api.elsoft.id/portal/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Login failed!");
      }

      setCookie("authToken", data.access_token, { path: "/" });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred!");
    }
  };

  const handleIsTrueChange = isTrue => {
    setCaptchaPassed(isTrue);
    if (isTrue) {
      toast.success("Captcha passed!");
    } else {
      toast.error("Captcha failed!");
    }
  };

  return (
    <main className="relative font-quicksand">
      <Toaster
        position="top-right"
        reverseOrder={false}
        // containerStyle={{ marginTop: "65px" }}
      />
      <div className="h-56 w-full bg-blue-500 absolute -z-50 top-0 left-0"></div>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="login-box flex bg-white w-full h-screen max-w-4xl max-h-[34rem] rounded-md shadow-xl">
          <div className="w-1/2">
            <img
              className="w-full h-full object-cover rounded-l-md"
              src="https://img.freepik.com/free-photo/bank-card-mobile-phone-online-payment_107791-16646.jpg?t=st=1720188112~exp=1720191712~hmac=15ce1062b6d37129e3effb5f7629e7cc2b1fc22b2f2147d2254d1db1d3d90f40&w=826"
              alt=""
            />
          </div>
          <div className="w-1/2 p-10">
            <h1 className="text-3xl text-neutral-700 font-bold mb-2">Login</h1>
            <p className="text-neutral-500 font-normal text-sm mb-4">
              Welcome back, please login to your account.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-3">
                <Input
                  inputName="UserName"
                  inputChange={handleChange}
                  inputIcon={FaUser}
                  inputPlaceholder="Username"
                  inputType="text"
                  inputValue={formData.UserName}
                />
                <Input
                  inputName="Password"
                  inputChange={handleChange}
                  inputIcon={FaKey}
                  inputPlaceholder="Password"
                  inputType="password"
                  inputValue={formData.Password}
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
                    className="w-4 h-4 accent-blue-500"
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
                <Button typeButton={"submit"}>Login</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
