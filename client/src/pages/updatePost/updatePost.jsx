import Edit from '../../components/editP/Edit';
import { Filter } from '../../components/popup/Popup';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UpdatePost() {
    const [tags, setTags] = useState([]);
    const [postContent, setPostContent] = useState('');
    const { postId } = useParams();


    useEffect(() => {
        const fetchPostContent = async () => {
          try {
            const response = await axios.get(`/api/post/${postId}`);
            setPostContent(response.data.Post);
            setTags(response.data.Post.tags);
          } catch (error) {
            console.error('Failed to fetch post content:', error);
          }
        };
  
        if (postId) {
          fetchPostContent();
        }
      }, [postId]);



    return (
        <div className='componentDisplay'>
            <Edit tags={tags} setTags={setTags} Ptitle={postContent.title} Pdescription={postContent.content} Pquantity={postContent.maxuser} Pid={postId} type={postContent.types} />
            <Filter tags={tags} setTags={setTags} />
        </div>
    );
}

export default UpdatePost;
