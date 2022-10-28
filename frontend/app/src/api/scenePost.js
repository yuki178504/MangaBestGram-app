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
};
