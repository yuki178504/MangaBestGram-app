import axios from "axios";

export const user = {
  //ユーザー情報取得オブジェクト
  getUser: async (token) => {
    const res = await axios
    .get(`${process.env.REACT_APP_DEV_API_URL}/user/users`, {
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

  putUser: async (params, UserId, token) => {
    await axios
    .put(`${process.env.REACT_APP_DEV_API_URL}/user/users/${UserId}`, params, {
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
