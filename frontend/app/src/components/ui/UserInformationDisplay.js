
export const UserInformationName = ({userName}) => {
  return (
    <>
      { userName == "" && (
      <div>ユーザー名がありません</div>
    ) }
    { userName == null && (
      <div>ユーザー名がありません</div>
    ) }
    </>
  );
};

export const UserInformationIntroduction = ({userIntroduction}) => {
  return (
    <>
      { userIntroduction == "" && (
      <div>自己紹介がありません</div>
    ) }
    { userIntroduction == null && (
      <div>自己紹介がありません</div>
    ) }
    </>
  );
};

export const UserInformationWebLink = ({userUrl}) => {
  return (
    <>
      { userUrl == "" && (
      <div>webサイトのリンクがありません</div>
    ) }
    { userUrl == null && (
      <div>webサイトのリンクがありません</div>
    ) }
    </>
  );
};
