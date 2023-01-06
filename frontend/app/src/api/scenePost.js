import axios from "axios";

export const scenePost = {
  //取得用オブジェクト
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

  //新規作成用オブジェクト
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
  },

  //詳細用オブジェクト
  showScenePost: async (scenePostId, token) => {
    const res = await axios
    .get(`${process.env.REACT_APP_DEV_API_URL}/user/scene_posts/${scenePostId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data
  },

  //更新用オブジェクト
  putScenePost: async (params, scenePostId, token) => {
    await axios
    .put(`${process.env.REACT_APP_DEV_API_URL}/user/scene_posts/${scenePostId}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.response.data);
    });
  },

  //削除用オブジェクト
  deleteScenePost: async (scenePostId, token) => {
    await axios
    .delete(`${process.env.REACT_APP_DEV_API_URL}/user/scene_posts/${scenePostId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.response.data);
    });
  },
};
