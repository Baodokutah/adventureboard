import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import Frame from '../send-noti/Frame';
import { Confirm } from '../popup/Popup';
import {useMockedUser} from "../../hooks/use-mocked-user"
import axios from 'axios';
import { AuthContext } from '../../context/auth/firebase-context';
import './listofmem.css';
import { Link } from 'react-router-dom';

const useIsMember = (user, memberList) => {
  const [buttonClickedJoin, setButtonClickedJoin] = useState(false);

  useEffect(() => {
    if (user && memberList.some(mem => mem && mem._id === user._id)) {
      setButtonClickedJoin(true);
    }
  }, [memberList, user]);

  return [buttonClickedJoin, setButtonClickedJoin];
};

export default function ListOfMem({maxMem, member, author, postId,currPage}) {
  const [openModal, setOpenModal] = useState(false);
  const [isFrameOpen, setFrameOpen] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [count, setCount] = useState(0);
  const user = useMockedUser();
  const [buttonClickedJoin, setButtonClickedJoin] = useIsMember(user, memberList);
  const [memberToRemove, setMemberToRemove] = useState(null); // Add this line
  console.log(member)

  useEffect(() => {
    setMemberList(member ? member : []);
  }, [member]);

  const joinPost = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/api/post/join', {
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

  const removeMember = async (mem) => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/api/post/removeMem', {
        pid: postId,
        uid: mem._id,
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

  const handleSetMember = (mem) => {
    if(memberList.length >= maxMem) {
      alert("OUI WUT ARE U DOING");
      return null;
    }
    if(!buttonClickedJoin) {
      setMemberList([...memberList, mem]);
      setCount(count + 1);
      joinPost();
      setButtonClickedJoin(true);
    }
  }


  const handleDeleteMem = async (mem) => {
    const userToRemove = memberList.find(member => member._id === mem._id);
    if(userToRemove) {
      await removeMember(userToRemove); // Await here
      setMemberList(memberList.filter(member => member !== userToRemove));
      setCount(count - 1);
      setButtonClickedJoin(false);

    }
  }


  //check auth
  const isAuth = () => {
    if((author && user) && author._id===user._id) return true;
    return false;
  }

  const isMem = (mem) => {
    if((user) && mem._id===user._id) return true;
    return false;
  }
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {}, [memberList])

  return (
    <div id='listofmember' className='member'>
      <button className={`joinButton ${buttonClickedJoin ? 'clicked' : ''}`}
        onClick={() => {
          buttonClickedJoin ? handleDeleteMem(user) : handleSetMember(user);
        }}
        style={{ visibility: isAuthenticated ? 'visible' : 'hidden' }}
      >
        {buttonClickedJoin ? <h2 className='joinedButton'>ĐÃ THAM GIA</h2> : <h2 style={{ color: 'black' }}>THAM GIA</h2>}
      </button>
      <div className='listOfMemBigBox'>
        <div className='memberBox'><h1>Danh sách</h1></div>
        <div className='memberContainer'>
          <h4>Số lượng: {memberList.length}/{maxMem}</h4>
          {memberList.map((mem, idx) => (
            <div key={idx}>
            <Link
       className="author-link"
        to={mem ? `/user/${mem._id}` : '#'}
          >
              <h5>{mem.name}</h5>
              </Link>
              {isAuth() || isMem(mem) ? (
                <Button
                variant='X'
                onClick={() => {
                  setMemberToRemove(mem); // Set the member to be removed here
                  setOpenModal(true);
                }}
                sx={{borderRadius:"0%", height: '2ch', width: '1ch'}}
                >
                X
                </Button>
              ) : null}
              <Confirm
                open={openModal}
                onClose={() => setOpenModal(false)}
                action={`xóa thành viên ${memberToRemove ? memberToRemove.name : ''} ra khỏi nhóm`} // Use the memberToRemove here
                imgSrc={process.env.PUBLIC_URL + "/assets/button-circle-round-delete-x-svgrepo-com.svg"}
                onConfirm={() => handleDeleteMem(memberToRemove)} // And here
              />
            </div>
          ))}
        </div>
        {isAuth() ? (
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
              fontWeight: 700,
              fontSize:"1vi" }}
              variant="Gửi thông báo"
              >
              Gửi thông báo
        </Button>
        ) : null}
      </div>
      {isFrameOpen && (
    <div className="popup-container">
    <Frame user={user} postId={postId} onCloseFrame={toggleFrame} />
  </div>)}
    </div>
  );
}
