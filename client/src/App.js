import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import CTXH from "./pages/ctxh/Ctxh";
import Study from "./pages/study/Study";
import Profile from "./pages/profile/Profile"
import PostPage from "./pages/post/PostPage";
import Navbar from "./components/navbar/Navbar";
import CreatePost from "./pages/createPost/createPost";
import { AuthProvider } from "./context/auth/firebase-context";
// import InPost from "./components/post/Post";
import OtherProfile from "./pages/otherProfile/otherProfile";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ctxh" element={<CTXH />}>
            <Route path="/ctxh/post/:id" element={<PostPage />} />
          </Route>
          <Route path="/study" element={<Study />}>
            <Route path="/study/post/:id" element={<PostPage />} />
          </Route>
          <Route path="/create" element={<CreatePost />} />
          <Route path="/profile" element={<Profile/>   }/>       
          <Route path="/user/:id" element={<OtherProfile/>}/>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
