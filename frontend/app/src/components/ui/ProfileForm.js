import React from "react";

const ProfileForm = (props) => {
  const { handleChange, handleSubmit, value, buttonType } = props

  return (
    <form>
      <div>ユーザー名</div>
      <input type='text' id='name' name='name' value={value.name} onChange={ (e) => handleChange(e) } />
      <div>自己紹介</div>
      <input type='text' id='introduction' name='introduction' value={value.introduction} onChange={ (e) => handleChange(e) } />
      <div>webサイト</div>
      <input type='text' id='url' name='url' value={value.url} onChange={ (e) => handleChange(e) } />
      <input type='submit' value={buttonType} onClick={(e) => handleSubmit(e)} />
    </form>
  )
}

export default ProfileForm;
