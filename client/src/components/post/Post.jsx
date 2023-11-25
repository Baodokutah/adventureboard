import React from 'react';
import { Comment } from '../comment.js';
import { TextField } from '@mui/material';
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
          <TextField
                id="PostDesc"
                label=""
                multiline
                rows={1}
                defaultValue=""
                type='string'
                sx={{width:'70dvw'}}
            />
          <img alt="cmt" src='https://www.svgrepo.com/show/453320/comment.svg' />
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
