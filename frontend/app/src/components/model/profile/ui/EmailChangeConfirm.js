import axios from "axios";
import { useEffect, useState } from "react";
import confirm from "../../../../css/ui/Confirm.module.css";
import form from "../../../../css/ui/form.module.css";
import ReactLoading from "react-loading";
import { FcFeedback } from "react-icons/fc";
import { useUser } from "../../../../hooks/useUser";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const EmailChangeConfirm = () => {
  const navigate = useNavigate();
  const [ token, setToken ] = useState('');
  const { useGetUser } = useUser();
  const { data: users, isLoading } = useGetUser();

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
    await axios.patch(`https://dev-mqrxqmfa.us.auth0.com/api/v2/users/${users.sub}`, data, {
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error(error.response.data);
    });
    alert('メールアドレスが変更されました');
    navigate(`/my-profile/${users.id}`)
  }

  const { handleSubmit, register } = useForm({
  });

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={confirm.section}>
      <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
        <div className={confirm.content}>
          <div className={confirm.article}>
            <div className={confirm['confirm-title']}>以下の内容で登録してもよろしいですか？</div>
            <div className={confirm["detail-area"]}>
              <p className={confirm.detail}>メールアドレス</p>
              <div>{ users.e_mail }</div>
              <input
                type='hidden'
                className={form["form-input"]}
                defaultValue={ users.e_mail }
                {...register('email')}
              />
            </div>
            <div className={form["form-text-submit"]}>
              <button className={form["form-submit"]} type="submit"><span className={form["react-icon"]}><FcFeedback /></span>この内容で登録する</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailChangeConfirm;
