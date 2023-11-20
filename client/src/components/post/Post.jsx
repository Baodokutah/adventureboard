import React from 'react';
import TextField from '@mui/material/TextField';
import './post.css';

export function InPost({ title, tags, content, comments}) {
  return (
    <div className='postContentDisplay'>
      <h3>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '25px' }}>
        {tags.map((tag, index) => (
          <div key={index} className='tag'>
            {tag}
          </div>
        ))}
      </div>
      <div className='content'><pre>{content}</pre></div>
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
          {comments.map((comment) => (
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


export function Comment({ id, avatar, author, timestamp, text }) {
  return (
    <div className="comment">
      <div className="avatar">
        <img alt="avatar" src={avatar} />
      </div>
      <div className="content">
        <a className="author">{author}</a>
        <div className="metadata">
          <div>{timestamp}</div>
        </div>
        <div className="text">{text}</div>
        <div className="actions">
          <a className="">Trả lời</a>
        </div>
      </div>
    </div>
  );
}
