import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthGuard";

const FavoriteButton = () => {
  const { token } = useContext(AuthContext);
  const { handleSubmit, register } = useForm({})

  const onSubmit = (data) => {
    axios.post(`${process.env.REACT_APP_DEV_API_URL}/user/favorites`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('id', { value: id })} type='hidden' />
      <input type='submit' value={'お気に入り'} />
    </form>
  );
};

export default FavoriteButton;
