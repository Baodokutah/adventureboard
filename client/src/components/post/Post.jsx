import React from 'react';
import { Comment } from '../comment.js';

import './post.css';

export function InPost({ title, tags, content, comments}) {
  return (
    <div className='postContentDisplay'>
      <h3>{title}</h3>
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
          <input className='commentInput'></input>
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

export function PostTitle({ title = null, tags}) {
  if (title == null) {
    return <div className='PostDisplay'><div className='nullTitleBox'></div></div>;
  } else {
    return (
      <div className='PostDisplay'>
      <div className='postTitleBox'>
        <h3>{title}</h3>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '25px' }}>
          {tags.map((tag, index) => (
            <div key={index} className='tag'>
              {tag}
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  }
}
