import axios from "axios";
import instance from "./instance";

export const favorite = {
  // お気に入り取得用
  getFavorite: async (token) => {
    const res = await axios
    .get(`${process.env.REACT_APP_DEV_API_URL}/user/favorites`, {
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

  // お気に入りカウント用
  getFavorites_count: async (scenePostId) => {
    const res = await instance
    .get(`/scene_posts/${scenePostId}/comments/favorites_count`)
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data;
  },

  // お気に入り登録用
  createFavorite: async (params, token) => {
    const response = await axios
    .post(`${process.env.REACT_APP_DEV_API_URL}/user/favorites`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.response.data);
    });
    return response.data;
  },

  // お気に入り削除用
  deleteFavorite: async (FavoriteId, token) => {
    await axios.delete(`${process.env.REACT_APP_DEV_API_URL}/user/favorites/${FavoriteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.response.data);
    });
  }
};
