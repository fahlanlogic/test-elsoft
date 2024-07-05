import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}></Route>
        <Route
          path="/dashboard"
          element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
