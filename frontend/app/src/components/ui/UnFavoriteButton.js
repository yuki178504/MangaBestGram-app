import { FcLike } from "react-icons/fc";
import generalScenePost from '../../css/model/general/generalScenePost.module.css';
import { useFavorite } from "../../hooks/useFavorite";

const UnFavoriteButton = ({id, changeFavorite}) => {
  const { useDeleteFavorite } = useFavorite();
  const deleteFavorite = useDeleteFavorite(id);

  const handleDelete = () => {
    deleteFavorite.mutate();
    changeFavorite(false);
  };

  return (
    <>
      <button type='button' onClick={handleDelete} className={generalScenePost.favorite}><FcLike /></button>
    </>
  );
};

export default UnFavoriteButton;
