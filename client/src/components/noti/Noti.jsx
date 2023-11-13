import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import "./noti.css"

const StyledPopover = styled(Popover)({
  '& .MuiPopover-paper': {
    marginTop: 8,
    maxWidth: 300, // Adjust the width as needed
    height: 300, // Adjust the height as needed. Use 'auto' for automatically adjusting to content or set a specific value.
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    display: 'flex', 
    flexDirection: 'column',
    // padding: '10px', // You can adjust the padding or set a specific height
  }
});

const StyledAvatar = styled(Avatar)({
  width: 50, // Avatar size
  height: 50, // Avatar size
  marginRight: 8, // Spacing between avatar and text
});

const NotificationContent = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '10px',
  paddingLeft: '10px',
  height: 60,
  width: 300,
  borderBottom: '1px solid black',
});

function Noti() {
  const [anchorEl, setAnchorEl] = useState(null);
  const notificationCount = 2; // Replace with the actual dynamic count

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Badge badgeContent={notificationCount} color="warning" size="large">
     <NotificationsActiveIcon 
  onClick={handleClick} 
  style={{ cursor: 'pointer' }} 
  fontSize="large" 
/>
</Badge>
      <StyledPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <NotificationContent>
        <StyledAvatar 
          src="https://media.discordapp.net/attachments/1067775825048510534/1084508310272737420/IMG_0260.jpg" 
        />
          <Typography>
            <strong>Kao Gia Bỉm</strong> đã xóa bạn khỏi nhóm của họ.
          </Typography>
        </NotificationContent>
        <NotificationContent>
        <StyledAvatar 
          src="https://media.discordapp.net/attachments/1067775825048510534/1084508310272737420/IMG_0260.jpg" 
        />
          <Typography>
            <strong>Kao Gia Bỉm</strong> đã xóa bạn khỏi nhóm của họ.
          </Typography>
        </NotificationContent>
        
      </StyledPopover>
    </>
  );
}

export default Noti;
