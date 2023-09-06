import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./index.css";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import Inbox from "./pages/Inbox";
export const userContext = React.createContext();

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/"
            element={user ? <Home handleLogout={handleLogout} /> : <Login />}
          />
          <Route path={`/:username`} element={user ? <Profile /> : <Login />} />
          <Route path={`/auth/reset/:token`} element={<ChangePassword />} />
          <Route path="/auth/reset" element={<ResetPassword />} />
          <Route path="/direct/inbox" element={<Inbox />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
