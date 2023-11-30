import React, { useState, useContext } from 'react';
import { Comment } from '../comment.js';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useMockedUser } from '../../hooks/use-mocked-user.js';
import './post.css';
import axios from 'axios';
import { Confirm } from '../popup/Popup.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/firebase-context';



export function InPost({ title, tags, content, comments, author, date, postId, onNewComment,onDeletePost, onNewReply}) {
  const [comment, setComment] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname.includes('ctxh') ? '/ctxh' : location.pathname.includes('study') ? '/study' : '404';

  const user = useMockedUser()

  const handleDeletePost = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: process.env.REACT_APP_API_URL + '/api/post/delete',
        data: {
          pid: postId,
          token: user.id, 
        },
      });
      if (response.data.success) {
        console.log('Delete post success!');
        onDeletePost();
        navigate(currentPage)
        
      } else {
        console.log('Failed to delete post:', response.data.message);
      }

      // You might want to do something with the response here, like updating the UI
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPost = () => {
    navigate(`/edit/${postId}`);
  };




  const isAuth = () => {    
    if((author && user) && author._id===user._id) return true;
    return false;
  }
console.log(author)
// console.log(user._id)

  const handleOpenConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleCommentSubmit = async () => {
    const commentData = {
      token: user.id,
      content: comment,
      pid: postId,
    };

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/api/comment/create', commentData);
      console.log(response.data);
      setComment('');
      onNewComment();

    } catch (error) {
      console.error(error);
    }
  };

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className='postContentDisplay'>
      <h5 style={{fontWeight: 'normal'}}>{(author) ? author.name : null }・{date}</h5>
      <h2>{title}</h2>
      {isAuth() ? (
      <div className='imgLoc'>
          <IconButton aria-label='toggle visibility' onClick={handleEditPost}>
          <img alt='editButt' style={{width:'45px', height:'45px'}} src={process.env.PUBLIC_URL + '/assets/edit-svgrepo-com.svg'}/>
        </IconButton>
        <IconButton aria-label='toggle visibility' onClick={handleOpenConfirmModal}>
        <img alt='deleteButt' style={{width:'48px', height:'48px'}} src={process.env.PUBLIC_URL + '/assets/delete-svgrepo-com.svg'}/>
      </IconButton>
      </div>
      ): null}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '25px' }}>
        {tags && tags.map((tag, index) => (
          <div key={index} className='tag'>
            {tag}
          </div>
        ))}
      </div>
      <div className='content'>{content}</div>
      <div className='cmt'>
        <div className='cmtInput'>
        {isAuthenticated && (
        <FormControl sx={{ m: 1, width: '100ch', zIndex:1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Bình luận</InputLabel>
          <Input
            multiline
            required
            value={comment} // Set the value to the state
            onChange={(e) => setComment(e.target.value)} // Update the state when input changes
            endAdornment={
              <InputAdornment position="end">
                  <IconButton
                    sx={{
                      right:'-0.48vw',
                      position:'relative'
                    }}
                    aria-label="toggle visibility"
                  >
                    <img style={{ width: '30px', height: '30px' }} alt='sendButt' src={process.env.PUBLIC_URL + '/assets/comment-material-2-svgrepo-com.svg'} />
                  </IconButton>
              </InputAdornment>
            }
          />
          </FormControl>)}
        </div>
        {/* Display the buttons when the comment input field is not empty */}
        {comment && (
                <div>
          <Button
            onClick={() => setComment('')} variant="outlined" startIcon={<DeleteIcon />}
            sx={{ borderRadius: 50, width: '80px', height: '30px', marginRight: '10px' }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleCommentSubmit} variant="contained" endIcon={<SendIcon/>}
            sx={{ borderRadius: 50, width: '80px', height: '30px' }}
          >
            Đăng
          </Button>
        </div>
        )}
        <div className="ui comments">
        {comments && comments.map((comment) => (
          <React.Fragment key={comment._id}>
          <Comment {...comment} onNewReply={onNewReply} />
            <div style={{ marginLeft: '50px' }}>
              {comment.replied.map((reply) => (
                <div style={{ marginBottom: '30px' }}>
                <Comment key={reply._id} {...reply} isReply={true}/>
                </div>

              ))}
            </div>
          </React.Fragment>
        ))}
          </div>
      </div>
      {showConfirmModal && (
        <Confirm
          open={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          action={"xóa bài viết"}
          onConfirm={() => handleDeletePost()}
          imgSrc={process.env.PUBLIC_URL + "/assets/Delete.svg"}
        />
      )}
    </div>
  );
}

export function PostTitle({ title = null, tags, date, author}) {
  if (title == null) {
    return <div className='PostDisplay'><div className='nullTitleBox'></div></div>;
  } else {
    return (
      <div className='PostDisplay'>
      <div className='postTitleBox'>
        <h3>{title}</h3>
        <div style={{ display: 'flex', gap: '25px', justifyContent: 'flex-start'}}>
          {tags.map((tag, index) => (
            <div key={index} className='tag'>
              {tag}
            </div>

          ))}
          <h4 style={{fontWeight: 'normal', marginLeft: 'auto'}}>{author}・{date}</h4>
        </div>
      </div>
      </div>
    );
  }
}
