import Slider from "./Components/Slider/Slider";
import DashboardContent from "./Components/Home";
import Users from "./Components/Users/Userstable";
import Packages from "./Components/Packages";
// import { Routes, Route } from "react-router-dom";
import Memberships from "./Components/Membership";
const routes = [
  {
    path: "/",
    element: <Slider />,
    children: [
      {
        path: "/",
        element: <DashboardContent />,
      },
      //   {
      //     path: "users",
      //     children: [
      //       {
      //         path: "/users",
      //         element: <Users />,
      //       },
      //       // {
      //       //   path: "/users/:id",
      //       //   element: <UsersDetail />,
      //       // },
      //     ],
      //   },
      {
        path: "memberships",
        children: [
          {
            path: "/memberships",
            element: <Memberships />,
          },
          //   {
          //     path: "/students/:id",
          //     element: <StudentDetail />,
          //   },
        ],
      },
      {
        path: "users",
        children: [
          {
            path: "/users",
            element: <Users />,
          },
          //   {
          //     path: "/students/:id",
          //     element: <StudentDetail />,
          //   },
        ],
      },
      {
        path: "packages",
        children: [
          {
            path: "/packages",
            element: <Packages />,
          },
          //   {
          //     path: "/students/:id",
          //     element: <StudentDetail />,
          //   },
        ],
      },
    ],
  },
];

//   {
//     path: '/',
//     children: [
//       // {
//       //   path: '/ModelSet',
//       //   element: <ModelSet />,
//       // },
//       {
//         path: '/modelSet',
//         element: <ModelSet />,
//       },
//       {
//         path: '/modelSet/:id',
//         element: <ModelDetail />,
//       },
//     ],
//   },

//   {
//     path: "/",
//     children: [
//       {
//         path: "/class",
//         element: <ClassComponent />,
//       },
//       {
//         path: "/class/:id",
//         element: <ClassDetail />,
//       },
//     ],
//   },
// ],
//   },

//   {
//     path: "/",
//     children: [
//       {
//         path: "login",
//         element: <CoreAuth />,
//       },
// ],
//   },
// ];

export default routes;

// function routes() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Slider />} />
//         <Route path="/users" element={<Users />} />
//         <Route path="/users/count" element={<DashboardContent />} />
//       </Routes>
//     </>
//   );
// }

// export default routes;

/*

const BasicExample = () => (
  <BrowserRouter>
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <hr />

        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </div>
    </Router>
  </BrowserRouter>
);
const About = () => (
  <div>
    <h2>About</h2>
  </div>
);
const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

export default BasicExample;
*/

// import { BrowserRouter as Router, Link } from "react-router-dom";
// import React from "react";
// const BasicExample = () => {
//   function refreshPage() {
//     setTimeout(() => {
//       window.location.reload(false);
//     }, 0);
//   }
//   return (
//     <>
//       <React.StrictMode>
//         <Router>
//           {/* <Link to="/home" onClick={() => refreshPage()}>
//             HOME
//           </Link> */}
//           <Link to={{ pathname: "/about" }} onClick={refreshPage}>
//             About
//           </Link>
//           <Link to={{ pathname: "/" }} onClick={refreshPage}>
//             ABOUT ME
//           </Link>
//           <Link to="/trading" onClick={() => refreshPage()}>
//             TRADING (BUY / SELL)
//           </Link>
//           <Link to="/details" onClick={() => refreshPage()}>
//             DETAILS
//           </Link>
//           <Link to="/proloss" onClick={() => refreshPage()}>
//             PORFIT / LOSS
//           </Link>

//           {/* <a href="#">Link</a> */}
//         </Router>
//       </React.StrictMode>
//     </>
//   );
// };

// export default BasicExample;
