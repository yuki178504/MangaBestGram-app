import axios from "axios";
import { useForm } from "react-hook-form";
import { useUser } from "../../../hooks/useUser";
import ReactLoading from "react-loading";
import { useContext } from "react";
import form from "../../../css/ui/form.module.css";
import { FcFeedback, FcHighPriority } from "react-icons/fc";
import { AuthContext } from "../../../providers/AuthGuard";
import { useNavigate } from "react-router-dom";

const EmailChange = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const { useGetUser } = useUser();
  const { data: users, isLoading } = useGetUser();

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  const onSubmit = async (data) => {
    await axios.put(`${process.env.REACT_APP_DEV_API_URL}/user/users/${users.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((error) => {
      console.error(error.res.data);
    });
    navigate('/email-change-confirm');
    window.location.reload();
  }

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={form.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
        <div className={form["form-text"]}>
          <div className={form["form-label"]}>現在のメールアドレス</div>
          {users.e_mail === null && (
            <div>{ user.email }</div>
          )}
          <div>{ users.e_mail }</div>
        </div>
        <div className={form["form-text"]}>
          <div className={form["form-label"]}>変更するメールアドレス</div>
          { errors.e_mail && <div className={form.errors}><span className={form["react-icon"]}><FcHighPriority /></span>メールアドレスを入力してください</div> }
          <input
          className={form["form-input"]}
          placeholder='メールアドレスを入力してください'
          {...register('e_mail', {
            required: true
          })}
          />
        </div>
        <div className={form["form-text-submit"]}>
          <button className={form["form-submit"]} type="submit"><span className={form["react-icon"]}><FcFeedback /></span>この内容で登録する</button>
        </div>
      </form>
    </div>
  );
};

export default EmailChange;
