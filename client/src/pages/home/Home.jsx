import { useContext } from "react";
import { AuthContext } from "../../context/auth/firebase-context";
import Carousel from "../../components/carousel/Carousel";
import Card from "../../components/card/Card";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Home() {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <CircularProgress />
          </Box>
        )
      }
    
  if (isAuthenticated) {
      return <Card />;
    } else {
      return <Carousel />;
    }
  }
export default Home;