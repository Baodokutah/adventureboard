import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import './post.css'
export default function BasicStack() {
  return (
    <Stack spacing={4} sx={{marginTop:'4.75%', marginLeft:'5.2%', width:'958px'}}>

      <Box className='tagBox'>
        <h2>Hỗ trợ công tác văn phòng lấy số đo cân nặng cho mẹ của bạn</h2>
          <Box sx={{display: 'flex', flexDirection: 'row', gap:'25px', marginTop:"3.63%"}}>
            <Box className='tag'>Sang</Box>
            <Box className='tag'>1 ngay</Box>
            <Box className='tag'>chieu</Box>
          </Box>
      </Box>

      <Box className='tagBox'>
        <h3>Tilte go brrr brrr3</h3>
          <Box sx={{display: 'flex', flexDirection: 'row', gap:'25px', marginTop:"3.63%"}}>
            <Box className='tag'>tag1</Box>
            <Box className='tag'>tag2</Box>
            <Box className='tag'>tag3</Box>
          </Box>
      </Box>
    </Stack>
  );
}
