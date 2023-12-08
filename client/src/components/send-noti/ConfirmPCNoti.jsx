import styled from "styled-components";
import axios from 'axios';

const XcNhn = styled.p`
  margin-block-start: 0;
  margin-block-end: 5px;
`;
const GiThngBo = styled.p`
  margin: 0;
`;
const XcNhnGiContainer = styled.div`
  position: absolute;
  height: 28.54%;
  width: 86.96%;
  top: 42.7%;
  left: 6.44%;
  font-size: 50px;
  line-height: 60px;
  color: #000;
  display: inline-block;
`;
const LineRoundedsearchIcon = styled.img`
  position: relative;
  width: 18px;
  height: 18px;
  overflow: hidden;
  flex-shrink: 0;
  display: none;
`;
const ButtonText = styled.b`
  position: relative;
  line-height: 18px;
`;
const MasterPrimaryButton = styled.div`
  position: absolute;
  top: 343px;
  left: 348px;
  border-radius: 30px;
  background-color: #0dd321;
  border: 1px solid #000;
  box-sizing: border-box;
  width: 223px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 18px 24px;
  gap: 8px;
  cursor: pointer; 
`;
const MasterPrimaryButton1 = styled.div`
  position: absolute;
  top: 343px;
  left: 44px;
  border-radius: 30px;
  background-color: #fe3939;
  border: 1px solid #000;
  box-sizing: border-box;
  width: 223px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 18px 24px;
  gap: 8px;
  cursor: pointer; 
`;
const VectorIcon = styled.img`
  position: absolute;
  height: 31.69%;
  width: 19.14%;
  top: 5.17%;
  right: 40.43%;
  bottom: 63.15%;
  left: 40.43%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
`;
const ConfirmPcNotiRoot = styled.div`
  position: relative;
  border-radius: 11px;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  width: 606px;
  height: 445px;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
  text-align: center;
  font-size: 24px;
  color: #fff;
  font-family: "Noto Sans";
`;

const ConfirmPCNoti = ({ onClose, onConfirm, onCloseFrame, user, postId, content }) => {



  const sendNotification = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/api/noti/send', {
        pid: postId, // replace with your post id
        token: user.id, // replace with your token
        content: content,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async () => {
    // handle confirm action here
    console.log('Confirmed');
    await sendNotification();
    onConfirm();
    onClose();
  };

  const handleReturn = () => {
    // handle return action here
    console.log('Returned');
    onClose();
  };

  return (
    <ConfirmPcNotiRoot>
      <XcNhnGiContainer>
        <XcNhn>Xác nhận</XcNhn>
        <GiThngBo>gửi thông báo?</GiThngBo>
      </XcNhnGiContainer>
      <MasterPrimaryButton onClick={handleConfirm}>
        <LineRoundedsearchIcon alt="" src="/line-roundedsearch1.svg" />
        <ButtonText>XÁC NHẬN</ButtonText>
        <LineRoundedsearchIcon alt="" src="/line-roundedarrow-right1.svg" />
      </MasterPrimaryButton>
      <MasterPrimaryButton1 onClick={handleReturn}>
        <LineRoundedsearchIcon alt="" src="/line-roundedsearch2.svg" />
        <ButtonText>QUAY LẠI</ButtonText>
        <LineRoundedsearchIcon alt="" src="/line-roundedarrow-right2.svg" />
      </MasterPrimaryButton1>
      <VectorIcon alt="" src={process.env.PUBLIC_URL + '/assets/Noti.svg'} />
    </ConfirmPcNotiRoot>
  );
};

export default ConfirmPCNoti;
