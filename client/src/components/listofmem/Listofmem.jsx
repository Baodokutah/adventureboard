import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Frame from '../send-noti/Frame';
import './listofmem.css';

export default function ListOfMem({userN, maxMem}) {
  const [buttonClickedJoin, setButtonClickedJoin] = useState(false);
  const [isFrameOpen, setFrameOpen] = useState(false);
  const [memberList, setMemberList] = useState(['Py Xẹt Mờ Píp In Sì Tồ','b','c','d','e','f','g','h','p']);
  const [count, setCount] = useState(0);

  const toggleFrame = () => {
    setFrameOpen(!isFrameOpen);
  };

  const handleSetMember = (mem) =>
  {
    if(memberList.length >= maxMem)
    {
      alert("OUI WUT ARE U DOING");
      return null;
    }
    // console.log(memberList);
    if(!buttonClickedJoin)
    {
      setMemberList([...memberList, mem]);
      setCount(count + 1)
      setButtonClickedJoin(true);
    }
  }

  const handleDeleteMem = (mem) => {
    console.log(memberList)
    if(memberList.includes(mem))
    {
      setMemberList(memberList.filter(ele => ele !== mem));
      setCount(count - 1)
      if(buttonClickedJoin) setButtonClickedJoin(false);
    }
    console.log(memberList);
  }

  //check auth
  const isAuth = (id) => {
    if(id === '1') return true;
    return false;
  }

  //check Mem
  const isMem = (id) => {
    if(id === userN) return true;
    return false;
  }

  useEffect(() => {console.log(memberList)}, [memberList])

  return (
    <div id='listofmember' className='member'>
      <button className={`joinButton ${buttonClickedJoin ? 'clicked' : ''}`}
      onClick={() => {
        {!buttonClickedJoin ? handleSetMember(userN) :handleDeleteMem(userN)}
      }}>
        {/* <h2 style={{ color: 'black' }}>THAM GIA</h2> */}
        {buttonClickedJoin ? <h2 className='joinedButton'>ĐÃ THAM GIA</h2> : <h2 style={{ color: 'black' }}>THAM GIA</h2>}
      </button>
      <div className='listOfMemBigBox'>
        <div className='memberBox'><h1>Danh sách</h1></div>
        <div className='memberContainer'>
          <h4>Số lượng: {memberList.length}/{maxMem}</h4>
          {memberList.map((mem, idx) => (
            <div key={idx}>
              <h5>{mem}</h5>
              {isAuth('0') || isMem(mem) ? (
                <Button
                variant='X'
                onClick={() => {
                  handleDeleteMem(mem)
                }}
                sx={{borderRadius:"0%", height: '2ch', width: '1ch'}}
                >
                X
                </Button>
              ) : null}
            </div>
          ))}
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

