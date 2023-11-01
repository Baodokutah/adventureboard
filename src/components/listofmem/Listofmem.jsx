import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './listofmem.css'

export default function ListOfMem() {
  return (
    <div id='listofmember' style={{ width: '19.16%', height:"440px", left:'3.286%', maxWidth:'276px', position:'relative'}}>
        <Box className='joinButton'>
          <h2 style={{ color: 'black' }}>THAM GIA</h2>
        </Box>
        <Box className='filterBigBox'>

        <Box className='filterBox'><h1>Danh sách</h1></Box>
            <Box>
                <h4>Số lượng</h4>
            </Box>
        </Box>
    </div>
  );
}
