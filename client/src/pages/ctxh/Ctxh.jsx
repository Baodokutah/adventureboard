import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBox from '../../components/filter/Filter';
import { PostTitle, InPost } from '../../components/post/Post';
import { Comment } from '../../dummyData';
import { useNavigate, useParams } from 'react-router-dom';
import ListOfMem from '../../components/listofmem/Listofmem';
import { format } from 'date-fns';
import "./ctxh.css"

function CTXH() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [triggerUpdate, setTriggerUpdate] = useState(false);

    const handleNewComment = () => {
      setTriggerUpdate(!triggerUpdate);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:6969/api/post/CTXH');
                setPosts(response.data.Posts);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };
        fetchPosts();
    }, []);

        useEffect(() => {
          const fetchPostContent = async () => {
            try {
              const response = await axios.get(`http://localhost:6969/api/post/${id}`);
              setPostContent(response.data.Post);
            } catch (error) {
              console.error('Failed to fetch post content:', error);
            }
          };

          if (id) {
            fetchPostContent();
          }
        }, [id, triggerUpdate]);
      



    function getPostById(id) {
      return posts.find((post) => post._id === id);
  }

    const handlePostClick = (postId) => {
        navigate(`/ctxh/post/${postId}`);
    };
    let date;
    let readableDate;
    if (postContent.date) {
      date = new Date(postContent.date);
      readableDate = format(date, 'dd-MM-yyyy HH:mm:ss');
  }

    return (
        <div className='componentDisplay'>
            {id ? <ListOfMem /> : <FilterBox />}        
            {id ? (
                
              <div className='Inpost'>
                <InPost {...getPostById(id)} title={postContent.title} postId={id} content={postContent.content} date={readableDate} author={postContent && postContent.author ? postContent.author.name : ''} comments={postContent.comments} onNewComment={handleNewComment}/>
              </div>
             ) : (
                <div className='Posts'>
                    {posts.map((post) => {
                      const date = new Date(post.date);
                      const readableDate = format(date, 'dd-MM-yyyy');                      
                      return (
                        <div key={post._id} onClick={() => handlePostClick(post._id)}>
                            <PostTitle title={post.title} tags={post.tags}  author={post.author.name} date={readableDate} />
                        </div>
                      );
                    })}
                </div>
            )}
        </div>
    );
}



function getCommentsByPostId(id) {
    return Comment.filter((comment) => comment.id && comment.id.toString() === id);
}

export default CTXH;
