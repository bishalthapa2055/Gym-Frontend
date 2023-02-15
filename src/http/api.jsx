import axios from "axios";

const api = axios.create({
  baseURL: "https://gym-app-server.onrender.com/api/web/",
});

api.defaults.headers.post["Content-Type"] = "application/json";
api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("accessToken");
  config.headers.authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  async (response) => {
    if (response.status >= 200 && response.status < 300) {
      //   const { data } = response;
      return Promise.resolve(response.data);
    }
  },

  async (error) => {
    if (error && error.message === "Network Error") {
      // window.location.href = '/500';
    }

    const { response, request } = error;
    if (response) {
      if (response.status === 401) {
        // localStorage.removeItem('accessToken');
        // window.location.href = '/login';
      }
      if (response.status >= 400 && response.status < 500) {
        return Promise.reject(response.data);
      }
    } else if (request) {
      return null;
    }
    return Promise.reject(error);
  }
);

export { api };
