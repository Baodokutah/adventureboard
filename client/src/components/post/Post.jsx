import React, { useState, useContext, useEffect } from 'react';
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
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/firebase-context';
import FormHelperText from '@mui/material/FormHelperText';



const Delete = ({ className, style }) => {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/assets/delete-svgrepo-com.svg`)
      .then((response) => response.text())
      .then((text) => setSvgContent(text));
  }, []);

  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};




export function InPost({ title, tags, content, comments, author, date, postId, onNewComment,onDeletePost, onNewReply}) {
  const [comment, setComment] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname.includes('ctxh') ? '/ctxh' : location.pathname.includes('study') ? '/study' : '404';
  const [countCmt, setCountCmt] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const user = useMockedUser()

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setIsClicked(false);
      }, 2000);
    }
  }, [isClicked]);

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
    // Prevent empty comments
    if (!comment.trim()) {
      setIsError(true);
      setErrorMessage('Bình luận không được để trống!');
      return;
    }

    setIsSubmitting(true);
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
      setIsError(false);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className='postContentDisplay'>
      <h5 style={{fontWeight: 'normal'}}>
      <Link
       className="author-link"
        to={author ? `/user/${author._id}` : '#'}

      >

      {(author) ? author.name : null }
      </Link>
      ・{date}</h5>
      <h2>{title}</h2>
      {isAuth() ? (
      <div className='imgLoc'>
          <IconButton aria-label='toggle visibility' onClick={handleEditPost}>
          <i className="fa-regular fa-pen-to-square fa-xl" style={{color: '#000000'}}></i>          
          </IconButton>
        <IconButton sx={{width: '48px', height: '48px'}}  aria-label='toggle visibility'  onClick={() => {
          setIsClicked(true) 
          handleOpenConfirmModal()
        }}>
        <Delete className={`iconbutton large ${isClicked ? 'poof' : ''}`} style={{width: '48px', height: '48px'}}/>
        </IconButton>
      </div>
      ): null}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '25px', flexWrap: 'wrap' }}>
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
                    onClick={() => {setCountCmt(countCmt + 1)}}
                  >
                    <img style={{ width: '30px', height: '30px' }} alt='sendButt' src={countCmt === 69 ? process.env.PUBLIC_URL + '/assets/comment-rainbow.svg' : process.env.PUBLIC_URL + '/assets/comment-normal.svg'} />
                  </IconButton>
              </InputAdornment>
            }
          />
          {isError && <FormHelperText error>{errorMessage}</FormHelperText>}
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
            disabled={isSubmitting}
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
      <div className='postTitleBox'>
              <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
        <h3>{title}</h3>
        <div style={{fontWeight: 'normal', marginLeft: 'auto', whiteSpace: 'nowrap'}}>{author}・{date}</div>
        </div>
        <div style={{ display: 'flex', gap: '25px', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
        
          {tags.map((tag, index) => (
            <div key={index} className='tag'>
              {tag}
            </div>

          ))}
        </div>
      </div>
    );
  }
}
