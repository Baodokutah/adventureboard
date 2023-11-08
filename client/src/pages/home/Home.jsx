// import Navbar from "../../components/navbar/Navbar";
import Carousel from "../../components/carousel/Carousel";
import Card from "../../components/card/Card";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Home() {
    const { loggedIn } = useContext(AuthContext);
    if (loggedIn) return (
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