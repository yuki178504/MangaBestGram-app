import instance from "./instance";

export const generalComic = {
  //全ユーザーが閲覧できる投稿一覧を取得する
  getGeneralLatestComic: async () => {
    const res = await instance
    .get('/comics/latest')
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data
  },
  //全ユーザーが閲覧できる投稿詳細を取得
  showGeneralComic: async (comicId) => {
    const res = await instance
    .get(`/comics/${comicId}`)
    .catch((error) => {
      console.error(error.res.data);
    });
    return res.data
  }
};
