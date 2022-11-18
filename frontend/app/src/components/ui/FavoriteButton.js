import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthGuard";
import { BsBookmark } from "react-icons/bs";
import generalScenePostCss from '../../css/model/general/generalScenePostCss.module.css';

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
      <button type='submit' className={generalScenePostCss.favorite}><BsBookmark /></button>
    </form>
  );
};

export default FavoriteButton;
