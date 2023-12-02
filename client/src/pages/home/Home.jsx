import { useContext } from "react";
import { AuthContext } from "../../context/auth/firebase-context";
import Carousel from "../../components/carousel/Carousel";
import Card from "../../components/card/Card";
import Preloader from "../../components/loading/Loading";

function Home() {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
    console.log('Is loading:', isLoading); // Add this line to log the loading state

    if (isLoading) {
      // Pass the isLoading state to the Preloader component
      return (
              <Preloader loading={isLoading} />
      );
  }
    
  if (isAuthenticated) {
      return <Card />;
    } else {
      return <Carousel />;
    }
  }
export default Home;