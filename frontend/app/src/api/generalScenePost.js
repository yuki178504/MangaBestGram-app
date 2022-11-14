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
  }
};
