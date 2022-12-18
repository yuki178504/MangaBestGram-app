import axios from "axios";
import instance from "./instance";

export const favorite = {
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

  getFavorites_count: async (scenePostId) => {
    const res = await instance
    .get(`/scene_posts/${scenePostId}/comments/favorites_count`)
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data;
  }
};
