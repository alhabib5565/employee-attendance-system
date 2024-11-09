import { jwtDecode } from "jwt-decode";

export const decodeUser = (token: string) => {
  return jwtDecode(token);
};
