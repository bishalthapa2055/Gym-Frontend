import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "./firebase_config.js";

const Mainpage = () => {
  const [data, setData] = useState([]);

  const url = "http://localhost:8888/users/display";
  useEffect(() => {
    axios
      //   .get("https://jsonplaceholder.typicode.com/posts")
      .get(url)
      .then((data) => {
        // console.log(data);
        setData({ ...data.data });
      })
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    auth.signOut();
  };

  return (
    <div>
      <center>
        <h3>Welcome{auth.currentUser.phoneNumber}</h3>
      </center>
      {/* <h1>{data.name}</h1>
        <h1>{data.role}</h1> */}
      <>
        <table style={{ width: `100%` }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>phoneNumber</th>
              <th>Role</th>
              <th>EmergencyNumber</th>
            </tr>
          </thead>
          <tbody>
            {data.data &&
              data.data.map((post) => (
                <tr>
                  <td>{post.name}</td>
                  <td>{post.email}</td>
                  <td>{post.phone}</td>
                  <td>{post.role}</td>
                  <td>{post.emergency_number}</td>
                  {/* <td>{post.TransactionDate}</td> */}
                  {/* <td>{post.Amount}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </>
      <button style={{ marginLeft: "20px" }} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Mainpage;
