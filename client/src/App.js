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
import { SearchProvider, PostTitleContext, StudyPostTitleContext } from './context/search-context';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [postTitles, setPostTitles] = useState([]);
  const [studyPostTitles, setStudyPostTitles] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:6969/api/post/CTXH');
        setPostTitles(response.data.Posts.map(post => post.title));
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:6969/api/post/Group');
        setStudyPostTitles(response.data.Posts.map(post => post.title));
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, []);



  return (
    <>
      <AuthProvider>
      <SearchProvider>
      <PostTitleContext.Provider value={postTitles}>
      <StudyPostTitleContext.Provider value={studyPostTitles}>
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
        </StudyPostTitleContext.Provider>
        </PostTitleContext.Provider>
        </SearchProvider>
      </AuthProvider>
    </>
  );
}

export default App;

