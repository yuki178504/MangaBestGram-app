import { useGeneralUser } from "../../../hooks/useGeneralUser";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import subMenu from '../../../css/ui/subMenu.module.css';
import { AiFillHome } from "react-icons/ai";
import generalUser from "../../../css/model/user/generalUser.module.css";
import GeneralUserCard from "./ui/GeneralUserCard";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { usePagination } from "../../../hooks/usePagination";
import { useState } from "react";

const GeneralUser = () => {
  const { useGetGeneralUser } = useGeneralUser();
  const { data: users, isLoading } = useGetGeneralUser();

  // ページネーション用
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;

  let data = users === undefined ? [{ length: 0 }] : users;

  // ページネーション
  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);
  const handleChange = (_e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

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
        {_DATA.currentData().map((user, index) => (
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
      <div style={{textAlign: "center"}}>
        <Pagination
        className={generalUser.pagination}
        count={count}
        page={page}
        renderItem={(item) => (
          <PaginationItem
            components={{
              previous: ArrowBackIcon,
              next: ArrowForwardIcon,
            }}
            {...item}
          />
        )}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default GeneralUser;
