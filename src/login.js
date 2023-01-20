import React, { useState, useEffect } from "react";
import { auth, firebase } from "./firebase_config.js";
import styled from "styled-components";
import { sendData } from "./Token.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { adminService } from "./http/admin-services.jsx";
import App1 from "./App1.jsx";
import Notallowded from "./Components/Users/Notallowded.jsx";
import { api } from "./http/api.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { userServices } from "./http/user-services.jsx";
import { useSnackbar } from "notistack";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1)
    ),
    url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  opacity: 0.8;
  border-radius: 20px;
`;

const Login = () => {
  // Inputs
  const navigate = useNavigate();
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [accessToken, setAccessToken] = useState("");
  // const [user] = useAuthState(auth);
  const [display, setDisplay] = useState(false);
  const [notallowded, setNotallowded] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const signin = () => {
    if (mynumber === "" || mynumber.length < 10) return;

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(mynumber, verify)
      .then((result) => {
        setfinal(result);
        // alert("code sent");
        enqueueSnackbar("OTP Send Sucessfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        setshow(true);
        // navigate("/home");
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
    // console.log(final);
  };

  // Validate OTP
  const ValidateOtp = async () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then(async (result) => {
        const accessToken = result.user._delegate.accessToken;
        console.log(
          "🚀 ~ file: login.js:70 ~ .then ~ accessToken",
          accessToken
        );

        // localStorage.setItem("accessToken", accessToken);

        setAccessToken(accessToken);
        const number = auth.currentUser.phoneNumber;

        const res = await sendData(number, accessToken);
        // if (user && res.data.isAdmin === true) {
        //   // navigate("/users") ||
        //   return <App1 />;
        // } else {
        //   navigate("/") || <Login />;
        // }
        // user && res.data.status === true ? <App1 /> : <Notallowded />;
        function fetchData() {
          if (res.data.status === true) {
            // return Promise.resolve(res);
            localStorage.setItem("accessToken", accessToken);
            setDisplay(true);
            enqueueSnackbar("LogIn Sucessfully", {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
            navigate("/");
          } else if (res.data.status === false) {
            setNotallowded(true);
          }
        }
        fetchData();
        console.log("🚀 ~ file: login.js:81 ~ .then ~ res", res.data.status);
        // const res = await userServices.login(accessToken, number);
        // console.log("resr", res);
        // try {
        //   const data = sendData(accessToken);
        //   console.log(data);
        // } catch (err) {
        //   console.log(err);
        // }
      })
      .catch((err) => {
        // alert("Wrong code");s
        setNotallowded(true);
      });
  };

  return (
    <>
      {display ? (
        <App1 />
      ) : (
        <>
          {notallowded ? (
            <Notallowded />
          ) : (
            <>
              <Container>
                <Wrapper>
                  <div style={{ marginTop: "30px" }}>
                    <center>
                      <div style={{ display: !show ? "block" : "none" }}>
                        <h1>Please Enter Your Phone Number</h1>
                        <input
                          value={mynumber}
                          onChange={(e) => {
                            setnumber(e.target.value);
                          }}
                          style={{ borderRadius: "10px", marginTop: "10px" }}
                          placeholder="+977 "
                        />
                        <br />
                        <br />
                        <div id="recaptcha-container"></div>
                        <button
                          onClick={signin}
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "grey",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          Send OTP
                        </button>
                      </div>
                      <div style={{ display: show ? "block" : "none" }}>
                        <h1>Please Enter Your OTP</h1>
                        <input
                          type="text"
                          placeholder={"Enter your OTP"}
                          onChange={(e) => {
                            setotp(e.target.value);
                          }}
                          style={{ borderRadius: "10px", marginTop: "10px" }}
                        ></input>
                        <br />
                        <br />
                        <button
                          onClick={ValidateOtp}
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "grey",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          Verify
                        </button>
                      </div>
                    </center>
                  </div>
                </Wrapper>
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Login;
