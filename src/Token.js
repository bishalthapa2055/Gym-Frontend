import axios from "axios";
// import firebase from "./firebase_config.js";
import { firebase } from "./firebase_config.js";

const url = "http://localhost:8888/api/web/login";

const createToken = async () => {
  const user = firebase.auth().currentUser;
  const token = user && (await user.getIdToken());
  console.log(token, ["token"]);

  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};

const sendData = async (number, token) => {
  const header = await createToken();
  console.log("header", header);
  const tokens = header.authorization;
  // console.log("tokens", tokens);

  const payload = {
    number,
    tokens,
  };
  try {
    // console.log(payload);
    const res = await axios.post(url, payload.tokens, header);
    console.log("🚀 ~ file: Token.js:34 ~ sendData ~ res", res);
    // console.log(["res"], res)
    return Promise.resolve(res);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};

const getData = async () => {
  const header = await createToken();

  try {
    const res = await axios.get(url, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export { sendData, getData };
