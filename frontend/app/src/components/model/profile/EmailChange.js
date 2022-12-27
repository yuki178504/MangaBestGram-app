import axios from "axios";
import { useForm } from "react-hook-form";
import { useUser } from "../../../hooks/useUser";
import ReactLoading from "react-loading";
import { useContext, useEffect, useState } from "react";
import form from "../../../css/ui/form.module.css";
import { FcFeedback, FcHighPriority } from "react-icons/fc";
import { AuthContext } from "../../../providers/AuthGuard";

const EmailChange = () => {
  const { user, logout, loginWithRedirect } = useContext(AuthContext);
  const { useGetUser } = useUser();
  const { data: users, isLoading } = useGetUser();
  const [ token, setToken ] = useState('');

  const options = {
    method: 'POST',
    url: 'https://dev-mqrxqmfa.us.auth0.com/oauth/token',
    data: {client_id: process.env.REACT_APP_AUTH0_MANAGEMENT_CLIENT_ID, client_secret : process.env.REACT_APP_AUTH0_MANAGEMENT_CLIENT_SECRET, audience: process.env.REACT_APP_AUTH0_MANAGEMENT_CLIENT_AUDIENCE, grant_type: process.env.REACT_APP_AUTH0_MANAGEMENT_GRANT_TYPE }
  };

  const getToken = async () => {
    try {
      const access_token = await axios(options);
      setToken(access_token)
    } catch (e) {
      console.log(e.message)
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const onSubmit = async (data) => {
    if (
      window.confirm('メールアドレスを変更しますか？')
    ) {
      await axios.patch(`https://dev-mqrxqmfa.us.auth0.com/api/v2/users/${users.sub}`, data, {
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.response.data);
    });
    alert('メールアドレスが変更されました!');
    logout({ returnTo: window.location.origin })
    loginWithRedirect({ redirect_url: `${window.location.origin}/mypage` })
    }
  };

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={form.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
        <div className={form["form-text"]}>
          <div className={form["form-label"]}>現在のメールアドレス</div>
          <div>{ user.email }</div>
        </div>
        <div className={form["form-text"]}>
          <div className={form["form-label"]}>変更するメールアドレス</div>
          { errors.e_mail && <div className={form.errors}><span className={form["react-icon"]}><FcHighPriority /></span>メールアドレスを入力してください</div> }
          <input
          className={form["form-input"]}
          placeholder='メールアドレスを入力してください'
          {...register('email', {
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
