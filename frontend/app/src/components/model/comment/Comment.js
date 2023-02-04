import { useComment } from "../../../hooks/useComment";
import commentCss from '../../../css/model/comment/comment.module.css';
import CommentDelete from "./ui/CommentDelete";
import { useUser } from "../../../hooks/useUser";
import noimage from "../../../image/default.png";
import { AuthContext } from "../../../providers/AuthGuard";
import { useContext } from "react";
import { useGeneralComment } from "../../../hooks/useGeneralComment";
import moment from 'moment';
import { FcCalendar } from "react-icons/fc";
import { Link } from "react-router-dom";

const Comment = ({scene_post_id}) => {
  const { useGetComment } = useComment();
  const { useGetGeneralComment } = useGeneralComment();
  const { useGetUser } = useUser();
  const { isAuthenticated } = useContext(AuthContext);

  const { data: comments, isLoading } = useGetComment(scene_post_id);
  const { data: generalComments, isLoading: generalLoading } = useGetGeneralComment(scene_post_id);
  const { data: user, isLoading: userLoading } = useGetUser();

  if(isLoading) return <></>
  if(generalLoading) return <></>
  if(userLoading) return <></>

  return (
    <>
      {isAuthenticated ? (
        <>
          {comments.data?.map((comment) => (
            <div key={comment.id} className={commentCss["innner-content"]}>
              <div className={commentCss.list}>
                <div className={commentCss["user-name"]}>
                <Link to={`/users/${comment.attributes.user_id}/comics`} >
                  <img className={commentCss["user-image"]} src={ comment.attributes.comment_user_image.url } alt='画像' onError={(e) => e.target.src = noimage} />
                </Link>
                  { comment.attributes.comment_user_name }</div>
                <div className={commentCss["detail-area"]}>
                  <div>{ comment.attributes.body }</div>
                </div>
                {user.id === comment.attributes.user_id && (
                  <div className={commentCss["form-text-delete"]}>
                    <CommentDelete comment_id={comment.id} scene_post_id={scene_post_id} />
                  </div>
                )}
                <div className={commentCss["create-at"]}><span className={commentCss["detail-text"]}><span className={commentCss["react-icon"]}><FcCalendar /></span>{ moment(comment.attributes.created_at).format('YYYY年MM月DD日HH:mm') }</span></div>
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
              <div className={commentCss["create-at"]}><span className={commentCss["detail-text"]}><span className={commentCss["react-icon"]}><FcCalendar /></span>{ moment(general_comment.attributes.createdAt).format('YYYY年MM月DD日HH:mm') }</span></div>
            </div>
          </div>
          ))}
        </>
      )}
    </>
  );
};

export default Comment;
