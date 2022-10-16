import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateAccount } from '../api/auth';
import { AuthContext } from '../route/Routers';
import ProfileForm from './ui/ProfileForm';


const ProfileEdit = () => {
  const { currentUser } = useContext(AuthContext);
  const [ value, setValue ] = useState({
    name: currentUser.name
  });

  const query = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await updateAccount(query.id, value)
      console.log(res)
      navigate('/mypage')
      alert("プロフィールを更新しました")
    } catch(e) {
      console.log(e)
      alert("もう一度入力してください")
    };
  };

  return (
    <div>
      <ProfileForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={value}
        buttonType='プロフィール更新'
      />
    </div>
  )
}

export default ProfileEdit;
