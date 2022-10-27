import axios from "axios";

export const showComic = (id, header) => {
  return axios.get(`${process.env.REACT_APP_DEV_API_URL}/user/comics/${id}`, header);
};

export const createComic = (params, header) => {
  return axios.post(`${process.env.REACT_APP_DEV_API_URL}/user/comics`, params, header);
};

export const updateComic = (id, params, header) => {
  return axios.patch(`${process.env.REACT_APP_DEV_API_URL}/user/comics/${id}`, params, header);
};

export const deleteComic = (id, header) => {
  return axios.delete(`${process.env.REACT_APP_DEV_API_URL}/user/comics/${id}`, header);
};
