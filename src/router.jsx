import Slider from "./Components/Slider/Slider";
import DashboardContent from "./Components/Home";
import Users from "./Components/Users/Userstable";
import Packages from "./Components/Packages";
// import { Routes, Route } from "react-router-dom";
import Memberships from "./Components/Membership";
import Login from "./login";
import Profile from "../src/Components/profile";

let status = true;
status = localStorage.getItem("accessToken") ? true : false;

/*
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
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
      // {
      //   path: "login",
      //   children: [
      //     {
      //       path: "/login",
      //       element: <Login />,
      //     },
      //     //   {
      //     //     path: "/students/:id",
      //     //     element: <StudentDetail />,
      //     //   },
      //   ],
      // },
    ],
  },
  {
    path: "/login",
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
    // path: "/login",
    // element: <Login />,
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


*/

const routes = [
  {
    path: "/",
    element: <Slider />,
    children: [
      {
        path: "/",
        element: <DashboardContent />,
      },
      {
        path: "users",
        children: [
          {
            path: "/users",
            element: <Users />,
          },
        ],
      },

      {
        path: "/",
        children: [
          {
            path: "/memberships",
            element: <Memberships />,
          },
        ],
      },

      {
        path: "/",
        children: [
          {
            path: "/packages",
            element: <Packages />,
          },
        ],
      },
      {
        path: "/",
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },

  {
    path: "/",
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
];

export default routes;
