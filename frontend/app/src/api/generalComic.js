import instance from "./instance";

export const generalComic = {
  //全ユーザーが閲覧できる投稿一覧を取得する
  getGeneralComic: async () => {
    const res = await instance
    .get('/comics/latest')
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data
  }
};
