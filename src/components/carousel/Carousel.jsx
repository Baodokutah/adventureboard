 import "./carousel.css"
 import Slider from "react-slick";
 import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
 
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
                 <button >Bắt đầu <i class="fas fa-arrow-right"></i></button>
             </div>

             <div>
                 <h1>Welcome to</h1>
                 <h2>ADVENTURE BOARD</h2>
                 <p>Tìm kiếm và tham gia các sự để kiện tích lũy ngày CTXH, hoặc kết nối với sinh viên khác để lập nhóm môn học.</p>
                 <button >Bắt đầu <i class="fas fa-arrow-right"></i></button>
             </div>
             <div>
                 <h1>Welcome to</h1>
                 <h2>ADVENTURE BOARD</h2>
                 <p>Tìm kiếm và tham gia các sự để kiện tích lũy ngày CTXH, hoặc kết nối với sinh viên khác để lập nhóm môn học.</p>
                 <button >Bắt đầu <i class="fas fa-arrow-right"></i></button>
             </div>

         </Slider>
     );
 }
 
 export default CarouselComponent;
 