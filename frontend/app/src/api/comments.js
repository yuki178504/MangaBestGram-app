import axios from "axios";

export const comments = {
  getComments: async (scenePostId) => {
    const res = await axios
    .get(`scene_posts/${scenePostId}/comments`)
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data
  },

  createComments: async (params, scenePostId, token) => {
    await axios
    .post(`${process.env.REACT_APP_DEV_API_URL}/user/scene_posts/${scenePostId}/comments`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.response.data);
    });
  },

  deleteComments: async (commentId, token) => {
    await axios
    .delete(`${process.env.REACT_APP_DEV_API_URL}/user/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.response.data);
    });
  }
}
