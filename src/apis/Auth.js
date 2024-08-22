import HttpInstance from "./axios";

export const Login = async ({ email, password }) => {
  try {
    const response = await HttpInstance.post("/api/v1/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const Signup = async ({ email, password, name }) => {
  try {
    const response = await HttpInstance.post("/api/v1/auth/signup", {
      email,
      password,
      name,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
