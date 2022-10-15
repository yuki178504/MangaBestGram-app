import React, { useContext, useState } from 'react';
import { AuthContext } from '../route/Routers';


const ProfileEdit = () => {
  const { currentUser } = useContext(AuthContext);
  const [ name, setName ] = useState(currentUser.name);
  const [ password, setPassword ] = useState("●●●●●●●●●");
  const [ email, setEmail ] = useState(currentUser.email);

  return (
    <div>
      <div>ユーザー名</div>
      <input type='name' id='name' name='name' value={name} onChange={ (e) => setName(e.target.value) } />
      <div>メールアドレス</div>
      <input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>パスワード</div>
      <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      { email }
    </div>
  )
}

export default ProfileEdit;
