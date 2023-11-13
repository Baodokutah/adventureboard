import React, {useState} from 'react';
import  { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, useLocation } from 'react-router-dom';

import './filter.css'

function FilterBox_CTXH() {
  const [Selected, setSelected] = useState(false);
  const handleClickTag = () => {
    setSelected(!Selected);
  };

  return (
  <div className='filterBigBox'>

    <div className='filterBox'><h1>Bộ lọc</h1></div>

      <h3>Cơ sở</h3>
        <div className='filterTagBox'>
          <button>Cơ sở 1</button>
          <button>Cơ sở 2</button>
        </div>

      <h3>Số ngày CTXH</h3>
        <div className='filterTagBox'>
          <button>&le; 1 ngày</button>
          <button>&gt; 1 ngày</button>
        </div>
      <h3>Thời gian</h3>
      <div className='filterTagBox'>
        <button>Sáng</button>
        <button>Chiều</button>
        <button>Tối</button>
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
  const location = useLocation();
  const currentPage = location.pathname.includes('ctxh') ? 'ctxh' : location.pathname.includes('study') ? 'study' : 'default';
  // alert(currentPage);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  return (
    <div id='filterBox' className='filter'>
      <Link to={{ pathname: '/create', state: { page: currentPage } }} className='link'>
        <div className='createPost'>
          <h2 style={{ color: 'white' }}>Tạo bài viết</h2>
        </div>
      </Link>
        {location.pathname==='/ctxh' ? (<FilterBox_CTXH/>) : location.pathname==='/study' ? (<FilterBox_Group/>) : (<></>)}
    </div>
  );
}
