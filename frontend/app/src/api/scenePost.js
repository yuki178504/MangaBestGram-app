import axios from "axios";

export const scenePost = {
  getScenePost: async (comicId, token) => {
    const res = await axios
    .get(`${process.env.REACT_APP_DEV_API_URL}/user/comics/${comicId}/scene_posts`, {
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

  createScenePost: async (params, comicId, token) => {
    await axios
    .post(`${process.env.REACT_APP_DEV_API_URL}/user/comics/${comicId}/scene_posts`, params, {
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
