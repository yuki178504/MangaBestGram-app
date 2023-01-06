import axios from "axios";
import { useForm } from "react-hook-form";
import form from "../../../css/ui/form.module.css";
import { FcFeedback, FcHighPriority } from "react-icons/fc";

const PasswordChange = () => {
  const onSubmit = async (data) => {
    await axios.post('https://dev-mqrxqmfa.us.auth0.com/dbconnections/change_password', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.response.data);
    });
    alert(`確認メールが送信されました！`);
  };

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  return (
    <div className={form.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
        <div className={form["form-text"]}>
          <div className={form["form-label"]}>パスワード変更のリンクを受信するメールアドレス</div>
          { errors.email &&
            <div className={form.errors}><span className={form["react-icon"]}><FcHighPriority /></span>メールアドレスを入力してください</div> 
          }
          <input
            className={form["form-input"]}
            placeholder='メールアドレスを入力してください'
            {...register('email', {
              required: true
            })}
          />
        </div>
        <input
          type='hidden'
          defaultValue={ `${process.env.REACT_APP_AUTH0_CLIENT_ID}` }
          {...register('client_id', {
            required: true
          })}
        />
        <input
          type='hidden'
          defaultValue={ `${process.env.REACT_APP_AUTH0_CONNECTION}` }
          {...register('connection', {
            required: true
          })}
        />
        <div className={form["form-text-submit"]}>
            <button className={form["form-submit"]} type="submit"><span className={form["react-icon"]}><FcFeedback /></span>送信する</button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
