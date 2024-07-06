import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { CookiesProvider } from "react-cookie";
import Item from "./pages/Item";

export default function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path="/list/item"
            element={<PrivateRoute component={Item} />}
          />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}