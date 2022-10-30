import { useNavigate, useParams } from "react-router-dom";
import { useScenePost } from "../../../hooks/useScenePost";
import { useForm } from 'react-hook-form';

const ScenePostNewForm = () => {
  const { comic_id } = useParams();
  const navigate = useNavigate();
  const { useCreateScenePost } = useScenePost();
  const createScenePost = useCreateScenePost(comic_id);

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  const onSubmit = (data) => {
    try {
      createScenePost.mutate(data);
      console.log(data)
    } catch (e) {
      console.log(e);
    }
    navigate('/mypage');
    alert("登録されました！")
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>おすすめシーンの章</div>
        <input
          placeholder="おすすめのシーンの章を入力してください"
          {...register('scene_title',{
            required: true
          })}
        />
        <div>おすすめのシーン</div>
        <input
          placeholder="おすすめのシーンを入力してください"
          {...register('scene_title',{
            required: true
          })}
        />
        <div>おすすめシーンの内容</div>
        <input
          placeholder="おすすめのシーンの内容を入力してください"
          {...register('scene_content',{
            required: true
          })}
        />
        <button type="submit">この内容で登録する</button>
      </form>
    </>
  )
}

export default ScenePostNewForm;
