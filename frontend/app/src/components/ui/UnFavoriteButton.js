import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthGuard";

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
    <button type='button' onClick={handleDelete}>
      お気に入り済み
    </button>
  );
};

export default UnFavoriteButton;
