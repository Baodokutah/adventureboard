import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';

import './filter.css'

function FilterBox_CTXH() {
  // const [selected, setSelected] = React.useState(false);

  return (
  <div className='filterBigBox'>

    <div className='filterBox'><h1>Bộ lọc</h1></div>

      <h3>Cơ sở</h3>
        <div className='filterTagBox'>
          <button className='filterTagButton'>Cơ sở 1</button>
          <button className='filterTagButton'>Cơ sở 2</button>
        </div>

      <h3>Số ngày CTXH</h3>
        <div className='filterTagBox'>
          <button className='filterTagButton'>&le; 1 ngày</button>
          <button className='filterTagButton'>&gt; 1 ngày</button>
        </div>
      <h3>Thời gian</h3>
      <div className='filterTagBox'>
        <span className='filterTagButton'>Sáng</span>
        <span className='filterTagButton'>Chiều</span>
      </div>
      <div className='filterTagBox'>
      <span className='filterTagButton'>Tối</span>
      </div>
  </div>
  );
}

function FilterBox_Group() {
  return (
      <div className='filterBigBox'>
      <div className='filterBox'><h1>Bộ lọc</h1></div>
          <h3>Mã môn</h3>
          <div className='tagBox_Study'>
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
          </div>

          <h3>Nhóm lớp</h3>
          <div className='tagBox_Study'>
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
          </div>
      </div>
  );
}

export default function FilterBox() {
  return (
    <div id='filterBox' className='filter'>
      <Link to='/create' className='link'>
        <div className='createPost'>
          <h2 style={{ color: 'white' }}>Tạo bài viết</h2>
        </div>
      </Link>
        {window.location.pathname==='/ctxh' ? (<FilterBox_CTXH/>) : window.location.pathname==='/study' ? (<FilterBox_Group/>) : (<></>)}
    </div>
  );
}
