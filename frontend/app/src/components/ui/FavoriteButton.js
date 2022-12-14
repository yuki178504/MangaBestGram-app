import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthGuard";
import { FcLikePlaceholder } from "react-icons/fc";
import generalScenePost from '../../css/model/general/generalScenePost.module.css';

const FavoriteButton = ({id, changeFavorite}) => {
  const { token } = useContext(AuthContext);
  const { handleSubmit, register } = useForm({})

  const onSubmit = (data) => {
    axios.post(`${process.env.REACT_APP_DEV_API_URL}/user/favorites`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      changeFavorite(true);
    })
    .catch((error) => {
      console.error(error.response.data);
    });
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('scene_post_id', { value: id })} type='hidden' />
      <button type='submit' className={generalScenePost.favorite}><FcLikePlaceholder /></button>
    </form>
  );
};

export default FavoriteButton;
