import axios from "axios";

export const comicApi = {
  getComic: async (token) => {
    const res = await axios
    .get(`${process.env.REACT_APP_DEV_API_URL}/user/comics`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data;
  },
  createComic: async (params, token) => {
    const res = await axios
    .post(`${process.env.REACT_APP_DEV_API_URL}/user/comics`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data;
  },
};
