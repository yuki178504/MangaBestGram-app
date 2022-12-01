import axios from "axios";
import { useForm } from "react-hook-form";

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
    navigate("/");
  };

  const { handleSubmit, register, formState: { errors } } = useForm({
    criteriaMode: "all"
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>メールアドレス</div>
        { errors.email &&
          <div>【！メールアドレスを入力してください】</div> 
        }
        <input
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
        <div>
            <button type="submit">この内容で登録する</button>
          </div>
    </form>
  );
};

export default PasswordChange;
