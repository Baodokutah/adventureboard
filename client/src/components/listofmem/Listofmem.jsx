import * as React from 'react';

import './listofmem.css'

export default function ListOfMem() {
  return (
    <div id='listofmember' className='member'>
        <div className='joinButton'>
          <h2 style={{ color: 'black' }}>THAM GIA</h2>
        </div>
        <div className='listOfMemBigBox'>

        <div className='memberBox'><h1>Danh sách</h1></div>
            <div>
                <h4>Số lượng</h4>
            </div>
        </div>
    </div>
  );
}
