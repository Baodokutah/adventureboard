// import Navbar from "../../components/navbar/Navbar";
import Carousel from "../../components/carousel/Carousel";
import Card from "../../components/card/Card";

function Home(logged_in=false) {
    if (logged_in===true) return (
        <>
            <Card />
        </>
      )
    else return (
        <>
        <Carousel />
        </>
    );
}

export default Home;