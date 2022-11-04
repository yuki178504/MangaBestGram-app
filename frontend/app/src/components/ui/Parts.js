import { BsFillTrashFill } from "react-icons/bs";
import parts from "../../css/ui/parts.module.css"

export const ScenePostDeleteButton = ({ handleDeleteScenePost }) => {
  return (
    <button className={parts['delete-button']} onClick={handleDeleteScenePost}>
      <span className={parts['delete-button-icon']}><BsFillTrashFill /></span>
      削除
    </button>
  )
};

export const ComicDeleteButton = ({ handleDeleteComic }) => {
  return (
    <button className={parts['delete-button']} onClick={handleDeleteComic}>
      <span className={parts['delete-button-icon']}><BsFillTrashFill /></span>
      削除
    </button>
  )
};
