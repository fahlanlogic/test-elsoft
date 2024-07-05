/* eslint-disable react/prop-types */
// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoute = ({ component: Component }) => {
  const [cookies] = useCookies(["authToken"]);
  // console.log(cookies);
  return cookies.authToken ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
