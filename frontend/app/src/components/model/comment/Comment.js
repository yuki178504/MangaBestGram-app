import { useComment } from "../../../hooks/useComment";
import ReactLoading from "react-loading";
import commentCss from '../../../css/model/comment/comment.module.css';

const Comment = ({scene_post_id}) => {
  const { useGetComment } = useComment();

  const { data: comments, isLoading } = useGetComment(scene_post_id);

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  console.log(comments)

  return (
    <>
      {comments?.map((comment) => (
        <div key={comment.id} className={commentCss["innner-content"]}>
          <div className={commentCss.list}>
            <div className={commentCss["detail-area"]}>
              <div>{ comment.body }</div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
};

export default Comment;
