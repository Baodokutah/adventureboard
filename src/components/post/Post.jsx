import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import './post.css';

function PostTitle({ title = null, tags }) {
  if(title == null)
  {
    return (
      <Box className='nullTitleBox'></Box>
    );
  }
  else
  {
  return (
    <Box className='postTitleBox'>
      <h3>{title}</h3>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '25px'}}>
        {tags.map((tag, index) => (
          <Box key={index} className='tag'>
            {tag}
          </Box>
        ))}
      </Box>
    </Box>
      );
  }
}

export default function Posts() {
  const post1Title = 'Hỗ trợ công tác văn phòng lấy số đo cân nặng cho mẹ của bạn';
  const post1Tags = ['Sang', '1 ngay', 'chieu'];

  const post2Title = 'Tilte go brrr brrr3';
  const post2Tags = ['tag1', 'tag2', 'tag3'];

  return (
    <div className='PostDisplay'>
      <PostTitle title={post1Title} tags={post1Tags} />
      <PostTitle title={post2Title} tags={post2Tags} />
      <PostTitle />
      <PostTitle />
    </div>
  );
}
