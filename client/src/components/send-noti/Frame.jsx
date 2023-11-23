import { useState, useCallback } from "react";
import ConfirmPCNoti from "./ConfirmPCNoti";
import PortalPopup from "./PortalPopUp";
import styled from "styled-components";
import { Button } from '@mui/material';

const GroupChild = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 11px;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  width: 1025px;
  height: 517px;
`;
const GroupContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 1025px;
  height: 517px;
`;


const GroupItem = styled.textarea`
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 11px;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  width: 783px;
  height: 462px;
  font-size: 16px; 
  padding: 10px; 
  
  &::placeholder {
    font-size: 16px; 
    padding: 1px; 
  }
`;
const RectangleContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 783px;
  height: 462px;
`;

const GroupDiv = styled.div`
  position: absolute;
  top: 26px;
  left: 34px;
  width: 783px;
  height: 462px;
  text-align: left;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.5);
`;
const VectorIcon = styled.img`
  position: absolute;
  height: 8.51%;
  width: 3.32%;
  top: 4.45%;
  right: 7.8%;
  bottom: 87.04%;
  left: 88.88%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  cursor: pointer;
`;
const GroupParentRoot = styled.div`
  position: relative;
  width: 100%;
  height: 517px;
  text-align: center;
  font-size: 32px;
  color: #000;
  font-family: "Noto Sans";
`;

const Frame = ({ onCloseFrame }) => { 
    const [isConfirmPCNotiOpen, setConfirmPCNotiOpen] = useState(false);

  const openConfirmPCNoti = useCallback(() => {
    setConfirmPCNotiOpen(true);
  }, []);

  const closeConfirmPCNoti = useCallback(() => {
    setConfirmPCNotiOpen(false);
  }, []);

  return (
    <>
      <GroupParentRoot>
        <GroupContainer>
          <GroupContainer>
            <GroupChild />
          </GroupContainer>
        <Button
          onClick={openConfirmPCNoti}
           sx={{
          position: 'absolute',
          height: '11.22%',
          width: '14.93%',
          top: '83.17%',
          right: '2.05%',
          bottom: '5.61%',
          left: '83.02%',
          borderRadius: '30px',
          backgroundColor: '#fff',
          border: '1px solid #000',
          boxSizing: 'border-box',
          display: 'flex',
          color: 'black',
          fontWeight: 'bold',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '18px 24px',
          gap: '8px',
          cursor: 'pointer',
          variant: 'Gửi'
        }}
              >
              Gửi
        </Button>
          <GroupDiv>
            <RectangleContainer>
            <GroupItem placeholder="Nội dung" />            
            </RectangleContainer>
          </GroupDiv>
          <VectorIcon  onClick={onCloseFrame} alt="" src={process.env.PUBLIC_URL + '/assets/Delete.svg'} />
        </GroupContainer>
      </GroupParentRoot>
      {isConfirmPCNotiOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeConfirmPCNoti}
        >
          <ConfirmPCNoti onClose={closeConfirmPCNoti} onCloseFrame={onCloseFrame} /> 
        </PortalPopup>
      )}
    </>
  );
};

export default Frame;
