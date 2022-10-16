import instance from "./instance";
import Cookies from "js-cookie";

export const signUp = (params) => {
  return instance.post("/auth", params);
};

export const signIn = (params) => {
  return instance.post("/auth/sign_in", params);
}

export const editUser = (params) => {
  return instance.put("/auth", params);
}

export const signOut = () => {
  return instance.delete("/auth/sign_out", {
    headers: {
      "access-token": Cookies.get("access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  });
};

export const getCurrentUser = () => {
  if (
    !Cookies.get("access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  )
    return;

  return instance.get("/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid"),
    }
  });
};

export const updateAccount = (id, params) => {
  return instance.put(`/accounts/${id}`, params);
}
