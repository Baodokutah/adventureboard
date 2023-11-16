import { useContext } from "react";
import { AuthContext } from "../../context/auth/firebase-context";
import Carousel from "../../components/carousel/Carousel";
import Card from "../../components/card/Card";

function Home() {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) return (
        <Card />
    )
    else return (
        <Carousel />
    );
}

export default Home;