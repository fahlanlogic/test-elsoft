/* eslint-disable react/prop-types */
export default function Button({ children, typeButton }) {
  return (
    <button
      type={typeButton}
      className="w-full bg-gradient-to-b from-blue-500 to-blue-600 text-white font-semibold py-1.5 px-4 rounded-md hover:opacity-80 shadow-lg duration-300">
      {children}
    </button>
  );
}
