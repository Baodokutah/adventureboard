import { useContext } from "react";
import "./card.css"
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { AuthContext } from '../../context/auth/firebase-context';



export default function Card() {
  const { isLoading } = useContext(AuthContext);
  return (
    <div className="card">
      <div className="ctxh">
        <h2>{isLoading ? <Skeleton width="80px" /> : 'TÍCH LŨY'}</h2>
        <h1>{isLoading ? <Skeleton width="120px" /> : 'NGÀY CTXH'}</h1>
        <p>{isLoading ? <Skeleton width="100%" /> : 'Tìm kiếm và tham gia các sự kiện, cộng tác hỗ trợ do văn phòng Đoàn, Hội,... tổ chức để tích lũy ngày CTXH.'}</p>
        {isLoading ? <Skeleton variant="rectangular" width="140px" height="36px" /> : (
          <Link to='/ctxh' className="link">
            <button><EventIcon /> Đi đến CTXH </button>
          </Link>
        )}
      </div>
      <div className="study">
        <h2>{isLoading ? <Skeleton width="100px" /> : 'THAM GIA'}</h2>
        <h1>{isLoading ? <Skeleton width="160px" /> : 'NHÓM MÔN HỌC'}</h1>
        <p>{isLoading ? <Skeleton width="100%" /> : 'Tìm kiếm, thành lập và tham gia các nhóm môn học để hoàn thành các bài tập lớn, báo cáo, đồ án,... dễ dàng hơn bao giờ hết.'}</p>
        {isLoading ? <Skeleton variant="rectangular" width="200px" height="36px" /> : (
          <Link to='/study' className="link">
            <button><SchoolIcon/> Đi đến nhóm môn học</button>
          </Link>
        )}
      </div>
    </div>
  )
}