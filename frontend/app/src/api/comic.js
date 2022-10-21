import instance from "./instance";

export const getComic = () => {
  return instance.get('/user/comics');
};

export const showComic = (id) => {
  return instance.get(`/user/comics/${id}`);
};

export const createComic = (params) => {
  return instance.post('/user/comics', params);
};

export const updateComic = (id, params) => {
  return instance.patch(`/user/comics/${id}`, params);
};

export const deleteComic = (id) => {
  return instance.delete(`/user/comics/${id}`);
};
