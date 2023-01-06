import instance from "./instance"

export const generalUser = {
  getGeneralUser: async () => {
    const res = await instance
    .get('/users')
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data
  },

  showGeneralUser: async (userId) => {
    const res = await instance
    .get(`/users/${userId}`)
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data
  },

  getGeneralUserComic: async (userId) => {
    const res = await instance
    .get(`/users/${userId}/user_comics`)
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data
  },

  getGeneralUserScenePostCount: async (userId) => {
    const res = await instance
    .get(`/users/${userId}/user_comics/scene_post_count`)
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data
  }
};
