import "./card.css"
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';

export default function Card() {
  return (
    <div className="card">
    <div className="ctxh">
        <h2>TÍCH LŨY</h2>
        <h1>NGÀY CTXH</h1>
        <p>Tìm kiếm và tham gia các sự kiện, cộng tác hỗ trợ do văn phòng Đoàn, Hội,... tổ chức để tích lũy ngày CTXH.</p>
        <button><EventIcon /> Đi đến CTXH </button>
    </div>
    <div className="study">
        <h2>THAM GIA</h2>
        <h1>NHÓM MÔN HỌC</h1>
        <p>Tìm kiếm, thành lập và tham gia các nhóm môn học để hoàn thành các bài tập lớn, báo cáo, đồ án,... dễ dàng hơn bao giờ hết.</p>
        <button><SchoolIcon/> Đi đến nhóm môn học</button>
    </div>
    </div>
  )
}