import { api } from "./api";

export const adminService = {
  getloginUser: async () => {
    try {
      const user = await api.get(`/login`);
      if (user) {
        console.log("user", user);
        // dispatch(getuser(user));
        //   return Promise.resolve(user);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  // To display the packages

  // getPackages : async()=>
  // {
  //   try{
  //     const packages = await api.get("/")
  //   }
  // }
};
