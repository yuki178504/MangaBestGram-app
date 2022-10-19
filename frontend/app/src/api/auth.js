import instance from "./instance";

export const updateAccount = (id, params) => {
  return instance.put(`/accounts/${id}`, params);
}

export const getDetail = (id) => {
  return instance.get(`/accounts/${id}`);
};
