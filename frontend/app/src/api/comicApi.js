import axios from "axios";

export const comicApi = {
  //ユーザーの投稿一覧を取得するapi
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
  //新規投稿をするapi
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
  //編集用api
  putComic: async (params, comicId, token) => {
    await axios
    .put(`${process.env.REACT_APP_DEV_API_URL}/user/comics/${comicId}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
  },
  //詳細api
  showComic: async (comicId, token) => {
    const res = await axios.get(`${process.env.REACT_APP_DEV_API_URL}/user/comics/${comicId}`, {
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
  //削除api
  deleteComic: async (comicId, token) => {
    await axios.delete(`${process.env.REACT_APP_DEV_API_URL}/user/comics/${comicId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
  }
};
