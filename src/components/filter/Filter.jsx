import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './filter.css'

function FilterBox_CTXH() {
  // const [selected, setSelected] = React.useState(false);

  return (
    <Box className='filterBigBox'>

    <Box className='filterBox'><h1>Bộ lọc</h1></Box>

      <h3>Cơ sở</h3>
        <Box
          sx={{
            display: 'flex',
            // alignItems: 'flex-start',
            flexDirection: 'row',
            bgcolor: 'white',
            borderRadius: 0,
          }}
        >
        </Box>

      <h3>Số ngày CTXH</h3>
        <Box
          sx={{
            display: 'flex',
            // alignItems: 'flex-start',
            flexDirection: 'row',
            bgcolor: 'white',
            borderRadius: 0,
          }}
        >
        </Box>

      <h3>Thời gian</h3>
        <Box
          sx={{
            display: 'flex',
            // alignItems: 'flex-start',
            flexDirection: 'row',
            bgcolor: 'white',
            borderRadius: 0,
          }}
        >

        </Box>
  </Box>
  );
}

function FilterBox_Group() {
  return (
      <Box className='filterBigBox'>
      <Box className='filterBox'><h1>Bộ lọc</h1></Box>
          <h3>Mã môn</h3>
          <Box className='tagBox_Study'>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="simple-select-class-code-label"
                id="simple-select-class-code"
                label=""
                sx={{
                  width: '159px', // Set the desired width
                  height: '23px', // Set the desired height
                  borderRadius:30,
                }}
              >
                <MenuItem value={1}>MT2003</MenuItem>
                <MenuItem value={2}>MT2013</MenuItem>
                <MenuItem value={3}>CO2014</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <h3>Nhóm lớp</h3>
          <Box className='tagBox_Study'>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="simple-select-class-code-label"
                id="simple-select-class-code"
                label=""
                sx={{
                  width: '159px', // Set the desired width
                  height: '23px', // Set the desired height
                  borderRadius:30,
                }}
              >
                <MenuItem value={1}>CN</MenuItem>
                <MenuItem value={2}>CC</MenuItem>
                <MenuItem value={3}>LA</MenuItem>
              </Select>
            </FormControl>
          </Box>
      </Box>
  );
}

export default function FilterBox() {
  return (
    <div id='filterBox' style={{ width: '19.16%', height:"440px", left:'3.286%', maxWidth:'276px', position:'relative'}}>
        <Box className='createPost'>
          <h2 style={{ color: 'white' }}>Tạo bài viết</h2>
        </Box>
        {window.location.pathname==='/ctxh' ? (<FilterBox_CTXH/>) : window.location.pathname==='/study' ? (<FilterBox_Group/>) : (<></>)}
    </div>
  );
}
