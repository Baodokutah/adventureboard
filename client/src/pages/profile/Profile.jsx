import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ProfileCard from "../../components/profile_card/ProfileCard";
import "./profile.css";
import { PostTitle } from '../../components/post/Post';
import { useMockedUser } from '../../hooks/use-mocked-user';
import CircularProgress from '@mui/material/CircularProgress';

export default function Profile() {
  const user = useMockedUser();
  const id = user?._id;
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${id}`);
        setUserData(response.data.User);
        setUserPosts(response.data.Posts);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  const handlePostClick = (postId) => {
    navigate(`/study/post/${postId}`);
};

  return (
    <div className="profile">
    <ProfileCard user={userData} className="ProfileCard"/>
    <div className="Posts">
    {userPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((post) => {
                      const date = new Date(post.date);
                      const readableDate = format(date, 'dd-MM-yyyy');                      
                      return (
                        <div key={post._id} onClick={() => handlePostClick(post._id)}>
                            <PostTitle title={post.title} tags={post.tags}  author={post.author.name} date={readableDate} />
                        </div>
                      );
                    })}   
        </div>
    </div>
  )
}
