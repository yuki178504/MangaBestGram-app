import { useComment } from "../../../hooks/useComment";
import ReactLoading from "react-loading";
import commentCss from '../../../css/model/comment/comment.module.css';
import CommentDelete from "./ui/CommentDelete";
import { useUser } from "../../../hooks/useUser";
import noimage from "../../../image/default.png";
import { AuthContext } from "../../../providers/AuthGuard";
import { useContext } from "react";
import { useGeneralComment } from "../../../hooks/useGeneralComment";

const Comment = ({scene_post_id}) => {
  const { useGetComment } = useComment();
  const { useGetGeneralComment } = useGeneralComment();
  const { useGetUser } = useUser();
  const { isAuthenticated } = useContext(AuthContext);

  const { data: comments, isLoading } = useGetComment(scene_post_id);
  const { data: generalComments, isLoading: generalLoading } = useGetGeneralComment(scene_post_id);
  const { data: user, isLoading: userLoading } = useGetUser();

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  if(generalLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  if(userLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  console.log(comments)
  console.log(generalComments)

  return (
    <>
      {isAuthenticated ? (
        <>
          {comments.data?.map((comment) => (
            <div key={comment.id} className={commentCss["innner-content"]}>
              <div className={commentCss.list}>
                <div className={commentCss["user-name"]}><img className={commentCss["user-image"]} src={ comment.attributes.comment_user_image.url } alt='画像' onError={(e) => e.target.src = noimage} />{ comment.attributes.comment_user_name }</div>
                <div className={commentCss["detail-area"]}>
                  <div>{ comment.attributes.body }</div>
                </div>
                {user.id === comment.attributes.user_id && (
                  <div className={commentCss["form-text-delete"]}>
                    <CommentDelete comment_id={comment.id} scene_post_id={scene_post_id} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {generalComments.data?.map((general_comment) => (
            <div key={general_comment.id} className={commentCss["innner-content"]}>
            <div className={commentCss.list}>
              <div className={commentCss["user-name"]}><img className={commentCss["user-image"]} src={ general_comment.attributes.commentUserImage.url } alt='画像' onError={(e) => e.target.src = noimage} />{ general_comment.attributes.commentUserName }</div>
              <div className={commentCss["detail-area"]}>
                <div>{ general_comment.attributes.body }</div>
              </div>
            </div>
          </div>
          ))}
        </>
      )}
    </>
  );
};

export default Comment;
