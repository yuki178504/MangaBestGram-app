import instance from "./instance"

export const generalComment = {
  getGeneralComment: async (scenePostId) => {
    const res = await instance
    .get(`scene_posts/${scenePostId}/comments`)
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data
  }
}
