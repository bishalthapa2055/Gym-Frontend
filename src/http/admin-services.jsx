import axios from "axios";
import { useDispatch } from "react-redux";
import {
  getUsers,
  deleteUser,
  updateUser,
  createUser,
  getPackages,
  deletePackage,
  updatePackage,
  createPackage,
  updateStatuss,
  getMemberships,
  createMembership,
  deleteMembership,
  updateMembership,
  getDetails,
} from "../store/Reducers";
import { api } from "./api";

export const adminService = {
  // const dispatch = useDispatch();

  //login details
  getLogin: async (dispatch) => {
    try {
      const url = `https://gym-app-server.onrender.com/api/web/login`;
      const response = await api.post(url);
      // console.log("values", values);

      // console.log("res", response);
      if (response) {
        console.log(response);
        dispatch(getDetails(response));

        // getPackages(response);
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // thhis is for packages details
  getPackages: async (dispatch, query) => {
    // const { searchTerm, rowsPerPage, page, select, sortBy } = query;
    // try {
    //   const response = await axios.get(
    //     "http://localhost:8888/package/packages"
    //   );

    //   if (response) {
    //     dispatch(getPackages(response.data));
    //     // getPackages(response);
    //     return Promise.resolve(response);
    //   }
    // } catch (error) {
    //   return Promise.reject(error);
    // }
    const { searchTerm, rowsPerPage, page, select, sortBy } = query;

    try {
      if (searchTerm) {
        const response = await axios.get(
          `http://localhost:8888/package/searchPackage?searchTerm=${searchTerm}`
        );
        if (response) {
          dispatch(getPackages(response.data));
          return Promise.resolve(response);
        }
      } else {
        const response = await axios.get(
          `http://localhost:8888/package/searchPackage?page=${page}&limit=${rowsPerPage}`
        );
        if (response) {
          dispatch(getPackages(response.data));
          return Promise.resolve(response);
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deletePackage: async (dispatch, id) => {
    try {
      const url = `http://localhost:8888/package/packages/${id}`;
      const response = await axios.delete(url);

      if (response) {
        dispatch(deletePackage(id));
        // getPackages(response);
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updatePackage: async (dispatch, id, values) => {
    try {
      const url = `http://localhost:8888/package/packages/${id}`;
      const response = await axios.patch(url, values);
      // console.log("values", values);

      // console.log("res", response);
      if (response) {
        dispatch(updatePackage(response.data));

        // getPackages(response);
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  createPackage: async (dispatch, data) => {
    try {
      const response = await axios.post(
        `http://localhost:8888/package/packages`,
        data
      );
      console.log(
        "🚀 ~ file: admin-services.jsx:98 ~ createPackage: ~ data",
        data
      );
      if (response) {
        dispatch(createPackage(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updateStatus: async (dispatch, id, values) => {
    try {
      console.log("admin id", id);
      const url = `http://localhost:8888/package/updateStatus/${id}`;
      const response = await axios.patch(url, values);
      if (response) {
        // console.log(response);
        dispatch(updateStatuss(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // this is  for users control sections
  getUserss: async (dispatch, query) => {
    // try {
    //   const url = `http://localhost:8888/users/displays`;
    //   const response = await axios.get(url);
    //   if (response) {
    //     dispatch(getUsers(response.data));
    //     return Promise.resolve(response);
    //   }
    // } catch (error) {
    //   return Promise.reject(error);
    // }
    const { searchTerm, rowsPerPage, page, select, sortBy } = query;
    try {
      if (searchTerm) {
        // console.log("search", searchTerm);
        const response = await axios.get(
          `http://localhost:8888/users/search?searchTerm=${searchTerm}&page=${page}&limit=${rowsPerPage}`
        );
        // console.log(response, "response with search term ");

        if (response) {
          dispatch(getUsers(response.data));
          // console.log("res data ", response.data);
          return Promise.resolve(response);
        }
      } else {
        const response = await axios.get(
          `http://localhost:8888/users/search?limit=${rowsPerPage}&page=${page}`
        );
        // console.log("no search res", response);

        if (response) {
          dispatch(getUsers(response.data));
          // console.log("res", response.data);
          return Promise.resolve(response);
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteUsers: async (dispatch, id) => {
    try {
      const url = `http://localhost:8888/users/delete/${id}`;
      // console.log("id", id);
      const response = await axios.delete(url);
      // console.log(
      //   "🚀 ~ file: admin-services.jsx:140 ~ deleteUsers: ~ response",
      //   response
      // );
      if (response) {
        dispatch(deleteUser(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updateUsers: async (dispatch, id, values) => {
    try {
      //processing
      const url = `http://localhost:8888/users/update/${id}`;
      // console.log("id", id);
      const response = await axios.patch(url, values);
      // console.log(
      //   "🚀 ~ file: admin-services.jsx:159 ~ updateUsers: ~ response",
      //   response
      // );

      if (response) {
        dispatch(updateUser(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      //error
      return Promise.reject(error);
    }
  },
  createUsers: async (dispatch, values) => {
    try {
      const url = `http://localhost:8888/users/create`;
      const response = await axios.post(url, values);
      if (response) {
        dispatch(createUser(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // for memberships portions

  getMembership: async (dispatch, values) => {
    try {
      const url = "http://localhost:8888/membership/memberships";
      const response = await axios.get(url);
      if (response) {
        dispatch(getMemberships(response.data));
        // console.log(response);
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  createMemberships: async (dispatch, values) => {
    try {
      //
      const url = "http://localhost:8888/membership/memberships";
      const response = await axios.post(url, values);
      if (response) {
        dispatch(createMembership(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteMemberships: async (dispatch, id) => {
    try {
      const url = `http://localhost:8888/membership/memberships/${id}`;
      const response = await axios.delete(url, id);
      // console.log(response);
      if (response) {
        // console.log(response.data);
        dispatch(deleteMembership(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updateMemberships: async (dispatch, id, values) => {
    try {
      const url = `http://localhost:8888/membership/memberships/${id}`;
      const response = await axios.patch(url, values);
      if (response) {
        dispatch(updateMembership(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  createPayment: async (dispatch, values) => {
    try {
      const url = `http://localhost:8888/payment/payments`;
      const response = await axios.post(url, values);
      if (response) {
        // console.log(response);
        dispatch(updateMembership(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updatePayment: async (dispatch, id, values) => {
    try {
      const url = `http://localhost:8888/payment/payments/${id}`;
      const response = await axios.patch(url, values);
      if (response) {
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  activeList: async (dispatch) => {
    try {
      const url = `http://localhost:8888/membership/checkdateactive`;
      const response = await axios.get(url);
      if (response) {
        dispatch(getMemberships(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  inactiveList: async (dispatch) => {
    try {
      const url = `http://localhost:8888/membership/checkdateinactive`;
      const response = await axios.get(url);
      if (response) {
        dispatch(getMemberships(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  expiredList: async (dispatch) => {
    try {
      const url = `http://localhost:8888/membership/checkdateexpired`;
      const response = await axios.get(url);
      if (response) {
        dispatch(getMemberships(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
