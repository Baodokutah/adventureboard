import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import CTXH from "./pages/ctxh/Ctxh";
import Study from "./pages/study/Study";
import Navbar from "./components/navbar/Navbar";
import CreatePost from "./pages/createPost/createPost";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
<AuthProvider>
    <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ctxh" element={<CTXH />} />
        <Route path="/study" element={<Study />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
