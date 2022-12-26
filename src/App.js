import React from "react";
import { auth } from "./firebase_config.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login.js";

import App1 from "./App1.jsx";
function App() {
  const [user] = useAuthState(auth);
  // console.log(user);

  // return user ? <Mainpage /> : <Login />;
  return user ? <App1 /> : <Login />;
  // return <Login />;
  //   if user  {
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
