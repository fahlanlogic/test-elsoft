/* eslint-disable react/prop-types */
export default function Button({ children }) {
  return (
    <button className="w-full bg-gradient-to-b from-purple-500 to-purple-600 text-white font-semibold py-1.5 px-4 rounded-md hover:opacity-80 shadow-lg duration-300">
      {children}
    </button>
  );
}
