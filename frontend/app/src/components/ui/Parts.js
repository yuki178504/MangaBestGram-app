import { BsFillTrashFill } from "react-icons/bs";
import parts from "../../css/ui/parts.module.css"

export const DeleteButton = ({ handleDeleteScenePost }) => {
  return (
    <button className={parts['delete-button']} onClick={handleDeleteScenePost}>
      <span className={parts['delete-button-icon']}><BsFillTrashFill /></span>
      削除
    </button>
  )
};
