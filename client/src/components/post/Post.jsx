import React from 'react';
import { Comment } from '../comment.js';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import './post.css';

export function InPost({ title, tags, content, comments, author, date}) {
  return (
    <div className='postContentDisplay'>
      <h5 style={{fontWeight: 'normal'}}>{author}・{date}</h5>
      <h2>{title}</h2>
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
        <FormControl sx={{ m: 1, width: '100ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Bình luận</InputLabel>
          <Input
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{right:'-0.48vw', position:'relative'}}
                  aria-label="toggle visibility"
                >
                  <img style={{ width: '30px', height: '30px' }} alt='sendButt' src={process.env.PUBLIC_URL + '/assets/send-alt-1-svgrepo-com.svg'} />
                </IconButton>
              </InputAdornment>
            }
          />
          </FormControl>
        </div>
        <div className="ui comments">
          {comments && comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
      </div>
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
