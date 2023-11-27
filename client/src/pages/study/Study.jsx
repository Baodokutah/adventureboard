import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBox from '../../components/filter/Filter';
import { PostTitle, InPost } from '../../components/post/Post';
import { useNavigate, useParams } from 'react-router-dom';
import ListOfMem from '../../components/listofmem/Listofmem';
import { format } from 'date-fns';
import { SearchContext, StudyPostTitleContext } from '../../context/search-context';
import { useContext } from 'react';

import "./study.css"

function Study() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const { searchQuery } = useContext(SearchContext);

    const handleNewComment = () => {
      setTriggerUpdate(!triggerUpdate);
    };

    const handleTagsChange = (tags) => {
      setSelectedTags(tags);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:6969/api/post/Group');
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
      <StudyPostTitleContext.Provider value={posts.map(post => post.title)}>
        <div className='componentDisplay'>
            {id ?  <ListOfMem  maxMem={postContent.maxuser}/>: <FilterBox onTagsChange={handleTagsChange} />}        
            {id ? (
              <div className='Inpost'>
                <InPost {...getPostById(id)} title={postContent.title} postId={id} content={postContent.content} date={readableDate} author={postContent && postContent.author ? postContent.author.name : ''} comments={postContent.comments} onNewComment={handleNewComment}/>
              </div>
             ) : (
                <div className='Posts'>
                   {filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).map((post) => {
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
        </StudyPostTitleContext.Provider>
    );
}



export default Study;
