/* eslint-disable react/prop-types */
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Input(props) {
  const {
    inputType,
    inputName,
    inputIcon: InputIcon,
    inputChange,
    inputId,
    inputPlaceholder,
  } = props;
  const [showPass, setShowPass] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="group flex items-center gap-3 py-1.5 px-3 rounded-md shadow-sm border border-blue-500 focus-within:shadow-md duration-300">
      <InputIcon className="text-blue-500" />
      <div className="border-l border-blue-300 h-5 border"></div>
      <input
        id={inputId}
        name={inputName}
        onChange={inputChange}
        className="focus:outline-none w-full text-neutral-700"
        type={showPass ? "text" : inputType}
        placeholder={inputPlaceholder}
      />
      {inputType === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-blue-500">
          {showPass ? <FaEyeSlash /> : <FaEye className="text-blue-500" />}
        </button>
      )}
    </div>
  );
}
