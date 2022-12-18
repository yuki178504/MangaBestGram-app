import { useComic } from "../../../../hooks/useComic";
import { BsFillTrashFill } from "react-icons/bs";
import parts from "../../../../css/ui/parts.module.css";

const ComicConfirmDelete = ({ comicId, comicTitle }) => {
  const { useDeleteComic } = useComic();
  const deleteComic = useDeleteComic(comicId);

  //削除用関数
  const handleDeleteComic = () => {
    if (
      window.confirm(`${comicTitle}を削除しますか？`)
    ) {
      deleteComic.mutate();
      alert(`${comicTitle}を削除しました!`);
      navigate('/mypage');
    }
  };

  return (
    <button className={parts['delete-button']} onClick={handleDeleteComic}>
      <span className={parts['delete-button-icon']}><BsFillTrashFill /></span>
      削除
    </button>
  );
};

export default ComicConfirmDelete;
