/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Verify } from "react-puzzle-captcha";
import "react-puzzle-captcha/dist/react-puzzle-captcha.css";

export default function CaptchaSlider(props) {
  const [isTrue, setIsTrue] = useState(false);

  const success = () => {
    setIsTrue(true);
    if (props.onIsTrueChange) {
      props.onIsTrueChange(true);
    }
  };

  const fail = () => {
    setIsTrue(false);
    if (props.onIsTrueChange) {
      props.onIsTrueChange(false);
    }
  };

  useEffect(() => {
    const sliderText = document.querySelector(".sliderText");
    sliderText.innerHTML = "Please swipe captcha!";
  });

  return (
    <Verify
      width={250}
      height={125}
      visible={true}
      onSuccess={success}
      onFail={fail}
      onRefresh={() => alert("refresh")}
    />
  );
}
