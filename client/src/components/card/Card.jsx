import { useContext } from "react";
import "./card.css"
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { AuthContext } from '../../context/auth/firebase-context';
import { Button } from "@mui/material";



export default function Card() {
  const { isLoading } = useContext(AuthContext);
  return (
    <div className="card">
      <div className="ctxh">
        <h2>{isLoading ? <Skeleton width="80px" /> : 'TÍCH LŨY'}</h2>
        <h1>{isLoading ? <Skeleton width="120px" /> : 'NGÀY CTXH'}</h1>
        <p style={{fontSize:"1.5vi"}}>{isLoading ? <Skeleton width="100%" /> : 'Tìm kiếm và tham gia các sự kiện, cộng tác hỗ trợ do văn phòng Đoàn, Hội,... tổ chức để tích lũy ngày CTXH.'}</p>
        {isLoading ? <Skeleton variant="rectangular" width="140px" height="36px" /> : (
          <Link to='/ctxh' className="link">
            <Button
              sx={{
                  borderRadius: '36.55px',
                  border: '1px solid var(--neutral-colors-color-600, #D4D2E3)',
                  bgcolor: 'var(--neutral-colors-white, #FFF)',
                  textDecoration: 'none',
                  color:"black",
                  '&:hover': {
                    bgcolor: '#bababa', // Change this to your desired hover color
                  },
                  fontFamily:"Noto Sans",
                  bottom:"1.5ch",
                  whiteSpace: 'nowrap'
                }}
                variant="contained"
                startIcon={<EventIcon style={{fontSize:"xx-large"}}/>}
            >
            Đi đến CTXH </Button>
          </Link>
        )}
      </div>
      <div className="study">
        <h2>{isLoading ? <Skeleton width="100px" /> : 'THAM GIA'}</h2>
        <h1>{isLoading ? <Skeleton width="160px" /> : 'NHÓM MÔN HỌC'}</h1>
        <p style={{fontSize:"1.5vi"}}>{isLoading ? <Skeleton width="100%" /> : 'Tìm kiếm, thành lập và tham gia các nhóm môn học để hoàn thành các bài tập lớn, báo cáo, đồ án,... dễ dàng hơn bao giờ hết.'}</p>
        {isLoading ? <Skeleton variant="rectangular" width="200px" height="36px" /> : (
          <Link to='/study' className="link">
            <Button
              sx={{
                  borderRadius: '36.55px',
                  border: '1px solid var(--neutral-colors-color-600, #D4D2E3)',
                  bgcolor: 'var(--neutral-colors-white, #FFF)',
                  textDecoration: 'none',
                  color:"black",
                  '&:hover': {
                    bgcolor: '#e3b598', // Change this to your desired hover color
                  },
                  fontFamily:"Noto Sans",
                  bottom:"1.5ch",
                  whiteSpace: 'nowrap' // Add this lin
                }}
                variant="contained"
                startIcon={<SchoolIcon style={{fontSize:"xx-large"}}/>}
            >
             Đi đến nhóm môn học </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
