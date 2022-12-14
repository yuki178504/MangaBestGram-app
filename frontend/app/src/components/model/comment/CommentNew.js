import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import form from '../../../css/ui/form.module.css';
import subMenu from "../../../css/ui/subMenu.module.css";
import { useComment } from "../../../hooks/useComment";
import { FiSend } from "react-icons/fi";

const CommentNew = () => {
  const { scene_post_id, comic_title } = useParams();
  const navigate = useNavigate();

  const { useCreateComment } = useComment();
  const createComment = useCreateComment(scene_post_id);

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  const onSubmit = (data) => {
    try {
      createComment.mutate(data);
    } catch (error) {
      console.error(error.response.data);
    }
    alert('コメントが投稿されました!')
    navigate(`/general_scene_post/${comic_title}/general_scene_post_show/${scene_post_id}`)
  };

  return (
    <div className={subMenu.content}>
      <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
        <div className={form["form-text"]}>
          <div className={form["form-label"]}>コメント</div>
          { errors.body &&
            <div className={form.errors}>【！コメントを入力してください】</div> 
          }
          <input
            className={form["form-input"]}
            placeholder="コメントを入力してください"
            {...register('body', {
              required: true
            })}
          />
        </div>
        <div className={form["form-text-submit"]}>
          <button className={form["form-submit"]} type="submit"><span className={form["fi-send"]}><FiSend /></span>この内容で登録する</button>
        </div>
      </form>
    </div>
  );
};

export default CommentNew;
