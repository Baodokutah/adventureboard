import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import CTXH from "./pages/ctxh/Ctxh";
import Study from "./pages/study/Study";
import Profile from "./pages/profile/Profile"
import Navbar from "./components/navbar/Navbar";
import CreatePost from "./pages/createPost/createPost";
import { AuthProvider } from "./context/auth/firebase-context";
import OtherProfile from "./pages/otherProfile/otherProfile";
import { SearchProvider, PostTitleContext, StudyPostTitleContext } from './context/search-context';
import UpdatePost from "./pages/updatePost/updatePost";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Snow404 from "./pages/404/404";
import pathToRegexp from 'path-to-regexp';

function App() {
  const [postTitles, setPostTitles] = useState([]);
  const [studyPostTitles, setStudyPostTitles] = useState([]);
  const location = useLocation();
  const paths = ['/', '/ctxh', '/ctxh/post/:id', '/study', '/study/post/:id', '/create', '/profile', '/user/:id', '/edit/:postId'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/api/post/CTXH');
        const allPostTitles = response.data.Posts.map(post => post.title);
        const uniquePostTitles = allPostTitles.filter((title, index, self) => 
          self.indexOf(title) === index
        );
        setPostTitles(uniquePostTitles);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/api/post/Group');
        const allStudyPostTitles = response.data.Posts.map(post => post.title);
        const uniqueStudyPostTitles = allStudyPostTitles.filter((title, index, self) => 
          self.indexOf(title) === index
        );
        setStudyPostTitles(uniqueStudyPostTitles);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, []);


  const Flag = () => {
    const Fixed_Text = "M30_M3Y_B3"; 
    return (
      <h1 className="text-black text-2xl md:text-5xl" >{`BKISC{${Fixed_Text}}`}</h1>
    );
  }
  

  function pathMatches(pathname, pattern) {
    const match = pathToRegexp(pattern);
    return match.test(pathname);
  }
  const is404 = paths.every(path => !pathMatches(location.pathname, path));
  
  return (
    <>
      <AuthProvider>
        <SearchProvider>
          <PostTitleContext.Provider value={postTitles}>
            <StudyPostTitleContext.Provider value={studyPostTitles}>
              {!is404 && <Navbar />}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ctxh" element={<CTXH />}>
                  <Route path="/ctxh/post/:id" element={<CTXH />} />
                </Route>
                <Route path="/study" element={<Study />}>
                  <Route path="/study/post/:id" element={<Study />} />
                </Route>
                <Route path="/create" element={<CreatePost />} />
                <Route path="/profile" element={<Profile/>   }/>       
                <Route path="/user/:id" element={<OtherProfile/>}/>
                <Route path="/edit/:postId" element={<UpdatePost />} />
                <Route path="/flag" element={<Flag />} />
                <Route path="*" element={<Snow404 />} />        
              </Routes>
            </StudyPostTitleContext.Provider>
          </PostTitleContext.Provider>
        </SearchProvider>
      </AuthProvider>
    </>
  );
}

export default App;
