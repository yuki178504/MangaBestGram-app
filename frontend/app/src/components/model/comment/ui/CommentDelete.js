import { useComment } from "../../../../hooks/useComment";
import { BsFillTrashFill } from "react-icons/bs";
import commentCss from '../../../../css/model/comment/comment.module.css';

const CommentDelete = ({scene_post_id, comment_id}) => {
  const { useDeleteComments } = useComment();
  const deleteComment = useDeleteComments(scene_post_id, comment_id );

  const handleDeleteComment = () => {
    if (
      window.confirm('コメントを削除しますか?')
    ) {
      deleteComment.mutate();
      alert('コメントを削除しました');
    }
  }

  return (
    <>
      <button className={commentCss['delete-button']} onClick={handleDeleteComment}>
      <span className={commentCss['delete-button-icon']}><BsFillTrashFill /></span>
      削除
      </button>
    </>
  );
};

export default CommentDelete;
