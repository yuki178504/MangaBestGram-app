import { useGeneralUser } from "../../../hooks/useGeneralUser";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import subMenu from '../../../css/ui/subMenu.module.css';
import { AiFillHome } from "react-icons/ai";
import generalUser from "../../../css/model/user/generalUser.module.css";
import GeneralUserCard from "./ui/GeneralUserCard";

const GeneralUser = () => {
  const { useGetGeneralUser } = useGeneralUser();
  const { data: users, isLoading } = useGetGeneralUser();

  if(isLoading) return <ReactLoading type="spin" color='blue' className='loading' />

  return (
    <div className={subMenu.wrapper}>
      <div className={subMenu["top-list"]}>
        <div className={subMenu.title}>
          <span className={subMenu.home}>
            <Link to='/' className={subMenu["home-link"]}><span className={subMenu["react-icons"]}><AiFillHome /></span>ホーム</Link>
          </span>
          <span>/&nbsp;ユーザー一覧</span>
        </div>
      </div>
      <div className={generalUser["main-content"]}>
        {users.map((user, index) => (
          <GeneralUserCard
            key={index}
            userId={user.id}
            userName={user.name}
            userImage={user.image.url}
            userIntroduction={user.introduction}
            userUrl={user.url}
          />
        ))}
      </div>
    </div>
  );
};

export default GeneralUser;
