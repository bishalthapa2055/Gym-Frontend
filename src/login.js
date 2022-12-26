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
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const signin = () => {
    if (mynumber === "" || mynumber.length < 10) return;

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(mynumber, verify)
      .then((result) => {
        setfinal(result);
        alert("code sent");
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
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        const accessToken = result.user._delegate.accessToken;

        localStorage.setItem("accessToken", accessToken);
        setAccessToken(accessToken);
        const number = auth.currentUser.phoneNumber;

        sendData(number);
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };

  return (
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
  );
};

export default Login;
