import React, {useState} from 'react';

import './listofmem.css'

export default function ListOfMem() {
  const [buttonClickedJoin, setButtonClickedJoin] = useState(false);

  const handleClickJoin = () => {
    setButtonClickedJoin(!buttonClickedJoin);
  };

  return (
    <div id='listofmember' className='member'>
        <button className={`joinButton ${buttonClickedJoin ? 'clicked' : ''}`} onClick={handleClickJoin}>
          {/* <h2 style={{ color: 'black' }}>THAM GIA</h2> */}
          {buttonClickedJoin ? <h2 className='joinedButton'>ĐÃ THAM GIA</h2> : <h2 style={{ color: 'black' }}>THAM GIA</h2>}
        </button>
        <div className='listOfMemBigBox'>

        <div className='memberBox'><h1>Danh sách</h1></div>
            <div>
                <h4>Số lượng</h4>
            </div>
        </div>
    </div>
  );
}
