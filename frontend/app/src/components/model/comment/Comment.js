import { useComment } from "../../../hooks/useComment";
import ReactLoading from "react-loading";
import commentCss from '../../../css/model/comment/comment.module.css';
import CommentDelete from "./ui/CommentDelete";
import { useUser } from "../../../hooks/useUser";

const Comment = ({scene_post_id}) => {
  const { useGetComment } = useComment();
  const { useGetUser } = useUser();

  const { data: comments, isLoading } = useGetComment(scene_post_id);
  const { data: user, isLoading: userLoading } = useGetUser();

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  if(userLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  console.log(comments)

  return (
    <>
      {comments?.map((comment) => (
        <div key={comment.id} className={commentCss["innner-content"]}>
          <div className={commentCss.list}>
            <div className={commentCss["detail-area"]}>
              <div>{ comment.body }</div>
            </div>
            { user.id === comment.user_id && (
              <div className={commentCss["form-text-delete"]}>
                <CommentDelete comment_id={comment.id} scene_post_id={scene_post_id} />
              </div>
            ) }
          </div>
        </div>
      ))}
    </>
  )
};

export default Comment;
