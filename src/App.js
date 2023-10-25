import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import CTXH from "./pages/ctxh/Ctxh";
import Study from "./pages/study/Study";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
    <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ctxh" element={<CTXH />} />
        <Route path="/study" element={<Study />} />
      </Routes>
    </>
  );
}

export default App;
