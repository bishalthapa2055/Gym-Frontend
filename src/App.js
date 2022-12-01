import React from "react";
import { auth } from "./firebase_config.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login.js";
import Mainpage from "./main.js";
// import Header from "./Components/Header.jsx";
// import Slider from "./Components/Slider.jsx";

function App() {
  const [user] = useAuthState(auth);
  return user ? <Mainpage /> : <Login />;
  //   if user 1 {
  //     if ($response.role=="user")
  //     {
  //       return user page /rediect to user page url
  //     }
  //     else
  //     return admin page /refirect to admin page url
  //   }
  //   else (user = 0)
  //   {
  //     redirect to login page
  //   }
  // }

  // const App = () => {
  //   return (
  //     <div>
  //       <Header />
  //       <Slider />
  //     </div>
  //   );
  // };
}
export default App;
