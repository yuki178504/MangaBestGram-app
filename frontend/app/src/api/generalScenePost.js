import axios from "axios";
import instance from "./instance";

export const generalScenePost = {
  getGeneralScenePost: async (comicId) => {
    const res = await instance
    .get(`comics/${comicId}/scene_posts`)
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data
  },
  showGeneralScenePost: async (scenePostId) => {
    const res = await instance
    .get(`scene_posts/${scenePostId}`)
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data
  },
  getLoginGeneralScenePost: async (comicId, token) => {
    const res = await axios
    .get(`${process.env.REACT_APP_DEV_API_URL}/general/comics/${comicId}/scene_posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.response.data);
    });
    return res.data
  },
  getFavoritesRanking: async () => {
    const res = await instance
    .get(`favorites_ranking`)
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data
  },
  getLoginFavoriteRanking: async () => {
    const response = await axios
    .get(`${process.env.REACT_APP_DEV_API_URL}/general/favorites_ranking`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.response.data);
    });
    return response.data
  }
};
