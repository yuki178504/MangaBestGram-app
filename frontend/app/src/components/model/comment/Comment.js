import { useComment } from "../../../hooks/useComment";
import ReactLoading from "react-loading";

const Comment = ({scene_post_id}) => {
  const { useGetComment } = useComment();

  const { data: comments, isLoading } = useGetComment(scene_post_id);

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />
  console.log(comments)

  return (
    <div>コメント一覧</div>
  )
};

export default Comment;
