import React, { useEffect, useState } from "react";
import { auth } from "./firebase_config.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login.js";
import { api } from "./http/api.jsx";
import App1 from "./App1.jsx";
import { useSnackbar } from "notistack";
// let status = false;
// status = localStorage.getItem("accessToken") ? true : false;
// console.log(status);

function App() {
  const [status, setStatus] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // const [user] = useAuthState(auth);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.get("/isAdmin");

        const status = data?.status;
        if (status) {
          setStatus(true);
        }
      } catch (e) {
        localStorage.removeItem("accessToken");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* <Login />; */}

      {status ? <App1 /> : <Login />}
    </>
  );
}
export default App;
