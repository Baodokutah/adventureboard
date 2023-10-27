import "./carousel.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
 
function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div className="arrow arrow-prev" onClick={onClick} />
    );
}

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div className="arrow arrow-next" onClick={onClick} />
    );
}

 const CarouselComponent = () => {
     const settings = {
         dots: true,
         infinite: true,
         arrows: true,
         nextArrow: <SampleNextArrow />,
         prevArrow: <SamplePrevArrow />,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1
     };
 
     return (
         <Slider {...settings}>
             <div>
                 <h1>Welcome to</h1>
                 <h2>ADVENTURE BOARD</h2>
                 <p>Tìm kiếm và tham gia các sự để kiện tích lũy ngày CTXH, hoặc kết nối với sinh viên khác để lập nhóm môn học.</p>
                 <button > <Link to="logged"> Bắt đầu <i class="fas fa-arrow-right"></i> </Link></button>
             </div>

             <div>
                 <h1>TÍCH LŨY</h1>
                 <h2>NGÀY CTXH</h2>
                 <p>Tìm kiếm và tham gia các sự kiện, cộng tác hỗ trợ do văn phòng Đoàn, Hội,... tổ chức để tích lũy ngày CTXH.</p>
                 <button> <Link to="logged">Bắt đầu <i class="fas fa-arrow-right"></i> </Link></button>
             </div>
             <div>
                 <h1>THAM GIA</h1>
                 <h2>NHÓM MÔN HỌC</h2>
                 <p>Tìm kiếm, thành lập và tham gia các nhóm môn học để hoàn thành các bài tập lớn, báo cáo, đồ án,... dễ dàng hơn bao giờ hết.</p>
                 <button > <Link to="logged">Bắt đầu <i class="fas fa-arrow-right"></i> </Link></button>
             </div>

         </Slider>
     );
 }
 
 export default CarouselComponent;
 