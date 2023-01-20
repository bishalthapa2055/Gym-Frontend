import { api } from "./api";

export const userServices = {
  login: async (accessToken, number) => {
    try {
      const response = await api.post("/login", accessToken);
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
