import { API } from "../shared/api";

export const logoutUser = () => {
  return API.post("logout");
};

export const userService = {
  loginUser: async (email, password) => {
    const data = await API.post("login", { email, password });
    console.log(data);
    return data;
  },
  registerUser: async (
    first_name,
    last_name,
    email,
    password,
    password_confirmation
  ) => {
    const data = await API.post("register", {
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
    });
    return data;
  },
  logoutUser: async () => {
    await API.post("logout");
    return true;
  },
};
