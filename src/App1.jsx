import React from "react";
import { BrowserRouter, useRoutes, Routes } from "react-router-dom";

// import BasicExample from "./router";
// import  useRoutes  from "react-router-dom";

import routes from "./router";

function App1() {
  const content = useRoutes(routes);

  return <>{content}</>;
}

export default App1;
