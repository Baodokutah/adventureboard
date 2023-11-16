import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import CTXH from "./pages/ctxh/Ctxh";
import Study from "./pages/study/Study";
import Profile from "./pages/profile/Profile";
import Navbar from "./components/navbar/Navbar";
import CreatePost from "./pages/createPost/createPost";
import { AuthProvider } from "./context/auth/firebase-context";
// import InPost from "./components/post/Post";

function App() {

  return (
    <>
<AuthProvider>
    <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ctxh" element={<CTXH />}>
        <Route path="/ctxh/post/:id" element={<Study />} />
        </Route>
        <Route path="/study" element={<Study />}>
          <Route path="/study/post/:id" element={<Study />} />
        </Route>
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
