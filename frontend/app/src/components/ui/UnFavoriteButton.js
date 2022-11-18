import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthGuard";
import { BsBookmarkFill } from "react-icons/bs";
import generalScenePostCss from '../../css/model/general/generalScenePostCss.module.css';

const UnFavoriteButton = ({id, changeFavorite}) => {
  const { token } = useContext(AuthContext);

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_DEV_API_URL}/user/favorites/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      changeFavorite(false);
    })
    .catch((error) => {
      console.error(error.response.data);
    });
  }

  return (
    <button type='button' onClick={handleDelete} className={generalScenePostCss.unfavorite}><BsBookmarkFill /></button>
  );
};

export default UnFavoriteButton;
