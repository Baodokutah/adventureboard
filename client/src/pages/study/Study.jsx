import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBox from '../../components/filter/Filter';
import { PostTitle, InPost } from '../../components/post/Post';
import { useNavigate, useParams } from 'react-router-dom';
import ListOfMem from '../../components/listofmem/Listofmem';
import { format } from 'date-fns';
import { SearchContext } from '../../context/search-context';
import { useContext } from 'react';
import Pagination from '@mui/material/Pagination';

import "./study.css"

function Study() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [refreshPosts, setRefreshPosts] = useState(false);
    const { searchQuery } = useContext(SearchContext);
    const [page, setPage] = useState(1);

    const handleNewComment = () => {
      setTriggerUpdate(!triggerUpdate);
    };

    const handleNewReply = () => {
      setTriggerUpdate(!triggerUpdate);
    };

    const handleTagsChange = (tags) => {
      setSelectedTags(tags);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL + '/api/post/Group');
                setPosts(response.data.Posts);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };
        fetchPosts();
    }, [refreshPosts]);

    useEffect(() => {
      setPage(1);
    }, [selectedTags, searchQuery]);

    useEffect(() => {
      const fetchPostContent = async () => {
        try {
          const response = await axios.get(process.env.REACT_APP_API_URL + `/api/post/${id}`);
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
        navigate(`/study/post/${postId}`);
    };
    let date;
    let readableDate;
    if (postContent.date) {
      date = new Date(postContent.date);
      readableDate = format(date, 'dd-MM-yyyy HH:mm:ss');
    }

    const filteredPosts = posts.filter((post) =>
    selectedTags.every((tag) => post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())) &&
    (post.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    post.content?.toLowerCase().includes(searchQuery?.toLowerCase()))
    );

    return (
        <div className='componentDisplay'>
        {id ? <ListOfMem postId={postContent._id} author={postContent.author}  maxMem={postContent.maxuser} member={postContent.joined_users} currPage={`post/${id}`}/> : <FilterBox onTagsChange={handleTagsChange} />}
            {id ? (
              <div className='Inpost'>
                <InPost {...getPostById(id)} title={postContent.title} postId={id} content={postContent.content} date={readableDate} author={postContent.author} comments={postContent.comments} onNewComment={handleNewComment}   onDeletePost={() => setRefreshPosts(!refreshPosts)} onNewReply={handleNewReply}/>
              </div>
             ) : (
                <div className='Posts'>
                  <div className='PostDisplay'>
                   {filteredPosts.slice((page - 1) * 7, page * 7).sort((a, b) => new Date(b.date) - new Date(a.date)).map((post) => {
                      const date = new Date(post.date);
                      const readableDate = format(date, 'dd-MM-yyyy');
                      return (
                        <div key={post._id} onClick={() => handlePostClick(post._id)} style={{width:"90%"}}>
                            <PostTitle title={post.title} tags={post.tags}  author={post.author.name} date={readableDate} />
                        </div>
                      );
                    })}
                    <div style={{ display: 'flex', justifyContent: 'center', height: '100px', marginBottom: "3ch"}}>
                      <Pagination count={Math.ceil(filteredPosts.length / 7)} page={page} onChange={(event, value) => setPage(value)} />
                    </div>
                  </div>
                </div>
            )}
        </div>
    );
}



export default Study;
