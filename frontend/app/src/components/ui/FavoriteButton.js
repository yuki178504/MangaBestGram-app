import { useForm } from "react-hook-form";
import { FcLikePlaceholder } from "react-icons/fc";
import generalScenePost from '../../css/model/general/generalScenePost.module.css';
import { useFavorite } from "../../hooks/useFavorite";

const FavoriteButton = ({id, changeFavorite}) => {
  const { handleSubmit, register } = useForm({})
  const { useCreateFavorite } = useFavorite();
  const createFavorite = useCreateFavorite();

  const onSubmit = async (data) => {
    try {
      createFavorite.mutate(data);
      changeFavorite(true);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('scene_post_id', { value: id })} type='hidden' />
      <button type='submit' className={generalScenePost.favorite}><FcLikePlaceholder /></button>
    </form>
  );
};

export default FavoriteButton;
