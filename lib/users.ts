import api from "./api";

export const users = {
  checkEmail: (email: string) =>
    api.get<{ exists: boolean }>(`/users/check-email?email=${encodeURIComponent(email)}`),
};

export default users;
