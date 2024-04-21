import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.token.value);
  const navigate = useNavigate();
  const locatin = useLocation();

  useEffect(() => {
    if (!token && locatin.pathname != "/register") {
      navigate("/login");
    }
  }, [navigate, token]);

  function HandleProtect({ children, isAutification, redirectTo = "/login" }) {
    if (!isAutification) {
      navigate(redirectTo);
    }
    return children;
  }

  return (
    <Routes>
      {/* public */}
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      {/* porotected */}
      <Route
        path="/"
        element={
          <HandleProtect isAutification={token ? true : false}>
            <Home></Home>
          </HandleProtect>
        }
      ></Route>
    </Routes>
  );
}

export default App;
