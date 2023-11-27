import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Frame from '../send-noti/Frame';
import { Confirm } from '../popup/Popup';
import {useMockedUser} from "../../hooks/use-mocked-user"
import axios from 'axios';
import './listofmem.css';
import useIsMember from '../../hooks/use-ismember';

export default function ListOfMem({maxMem, member, author, postId,currPage}) {
  const [openModal, setOpenModal] = useState(false);
  const [isFrameOpen, setFrameOpen] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [count, setCount] = useState(0);
  const user = useMockedUser();
  const { isMember, buttonClickedJoin } = useIsMember(user, memberList);
  console.log(member)

  useEffect(() => {
    setMemberList(member ? member.map(mem => mem.name) : []);
  }, [member]);
  
  const joinPost = async () => {
    try {
      const response = await axios.post('http://localhost:6969/api/post/join', {
        pid: postId,
        token: user.id
      });
  
      if (response.data.success) {
        console.log('Join post success!');
      } else {
        console.log('Failed to join post:', response.data.message);
      }
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };

  const removeMember = async () => {
    try {
      const response = await axios.post('http://localhost:6969/api/post/removeMem', {
        pid: postId,
        uid: user._id,
        token: user.id
      });
  
      if (response.data.success) {
        console.log('Remove member success!');
      } else {
        console.log('Failed to remove member:', response.data.message);
      }
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };
  
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
      joinPost();
    }
  }

  const handleDeleteMem = (mem) => {
    if(memberList.includes(mem))
    {
      setMemberList(memberList.filter(ele => ele !== mem));
      setCount(count - 1)
      removeMember();
    }
  }

  //check auth
  const isAuth = () => {
    if((author && user) && author.id===user._id) return true;
    return false;
  }

  useEffect(() => {}, [memberList])

  return (
    <div id='listofmember' className='member'>
      <button className={`joinButton ${buttonClickedJoin ? 'clicked' : ''}`}
      onClick={() => {
        {!buttonClickedJoin ? handleSetMember(user.name) :handleDeleteMem(user.name)}
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
              {isAuth() || isMember ? (
                <Button
                variant='X'
                onClick={() => {
                  // handleDeleteMem(mem)
                  setOpenModal(true)
                  // console.log(openModal)
                }}
                sx={{borderRadius:"0%", height: '2ch', width: '1ch'}}
                >
                X
                </Button>
              ) : null}
              <Confirm
                open={openModal}
                onClose={() => {setOpenModal(false)}}
                action={`xóa thành viên ${mem} ra khỏi nhóm`}
                imgSrc={process.env.PUBLIC_URL + "/assets/button-circle-round-delete-x-svgrepo-com.svg"}
                onConfirm={() => handleDeleteMem(mem)}
              />
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
