import React, { useState, useEffect, useMemo } from "react";
import Routing from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { TokenService } from "./services/token.service";
import authContext from "./hooks/authContext";
import AuthRoutes from "./routes/authRoutes"; 
const App = () => {
  const tkService = new TokenService();
  const [auth, setAuth] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    setAuth(tkService.isUserLoggedApi());
    setRefreshCheckLogin(false);
    setLoadUser(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshCheckLogin]);
  const setUser = (user) => {
    setAuth(user);
  };
  const authData = useMemo(
    () => ({
      auth,
      setUser,
      setRefreshCheckLogin,
    }),
    [auth]
  );
  if (!loadUser) return null;
  return (
    <authContext.Provider value={authData}>
      {auth ? (
        <Routing showModal={showModal} setShowModal={setShowModal} />
      ) : (
        <AuthRoutes setRefreshCheckLogin={setRefreshCheckLogin} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </authContext.Provider>
  );
};

export default App;
