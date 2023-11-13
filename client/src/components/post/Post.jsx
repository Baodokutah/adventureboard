import React from 'react';

import './post.css';

export function InPost({ title, tags, content}) {
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
          <input className='commentInput'></input>
          <img alt="cmt" src='https://www.svgrepo.com/show/453320/comment.svg' />
        </div>
        <div className="ui comments">
          <div className="comment">
            <div className="avatar">
              <img alt= "avatar" src="https://media.discordapp.net/attachments/1067775825048510534/1084508310272737420/IMG_0260.jpg?ex=6550f892&is=653e8392&hm=1b9ba1880c4a665705a7908585f3cdddbfda9683f832cf94d51e1e0ef7b326d9&=&width=447&height=662" />
            </div>
            <div className="content">
              <a className="author">Kao Gia Bỉm</a>
              <div className="metadata">
                <div>Today at 5:42PM</div>
              </div>
              <div className="text">Cho em hỏi mình làm cả 2 ca thì được tổng là 1 ngày CTXH đúng không ạ?</div>
              <div className="actions">
                <a className="">Trả lời</a>
              </div>
            </div>
          </div>
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



