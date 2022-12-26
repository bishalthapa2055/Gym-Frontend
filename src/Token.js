import axios from "axios";
// import firebase from "./firebase_config.js";
import { firebase } from "./firebase_config.js";

const url = "http://localhost:8888/api/tokens";

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

const sendData = async (number) => {
  const header = await createToken();
  console.log(header);
  const tokens = header.authorization;

  const payload = {
    number,
    tokens,
  };
  try {
    // console.log(payload);
    const res = await axios.post(url, payload, header);
    return res.data;
  } catch (e) {
    console.error(e);
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
