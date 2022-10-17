import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetail, updateAccount } from '../api/auth';
import { AuthContext } from '../route/Routers';
import ProfileForm from './ui/ProfileForm';


const ProfileEdit = () => {
  const { currentUser } = useContext(AuthContext);
  const [ value, setValue ] = useState({
    name: currentUser.name,
    introduction: currentUser.introduction,
    url: currentUser.url
  });

  const query = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetData(query)
  },[query])

  const handleGetData = async (query) => {
    try {
      const res = await getDetail(query.id)
      console.log(res.data)
      setValue({
        name: res.data.name,
        introduction: res.data.introduction,
        url: res.data.url
      })
    } catch (e) {
      console.log(e)
    }
  }

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
