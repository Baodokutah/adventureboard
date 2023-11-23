import React, { useState } from 'react';
import { Button } from '@mui/material';
import Frame from '../send-noti/Frame';
import './listofmem.css';

export default function ListOfMem() {
  const [buttonClickedJoin, setButtonClickedJoin] = useState(false);
  const [isFrameOpen, setFrameOpen] = useState(false);

  const handleClickJoin = () => {
    setButtonClickedJoin(!buttonClickedJoin);
  };

  const toggleFrame = () => {
    setFrameOpen(!isFrameOpen);
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
          <h4>Số lượng: 4/10</h4>
        </div>
        <Button
          onClick={toggleFrame}
          sx={{border:"1px solid black",
              borderRadius: 11,
              width: '15.5vw',
              height: '8vh',
              top:'71vh',
              left:'0.75vw',
              position:"absolute",
              color:'black',
              fontFamily:"Noto Sans",
              fontSize:'2.5vh',
              fontWeight: 700 }}
              variant="Gửi thông báo"
              >
              Gửi thông báo
        </Button>
      </div>
      {isFrameOpen && (
    <div className="popup-container">
    <Frame onCloseFrame={toggleFrame} />
  </div>)}
    </div>
  );
}

