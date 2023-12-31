import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Mail04Icon from '@untitled-ui/icons-react/build/esm/Mail04';
import MessageChatSquareIcon from '@untitled-ui/icons-react/build/esm/MessageChatSquare';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Stack,
  SvgIcon,
  Tooltip,
  Typography
} from '@mui/material';
import { Scrollbar } from '../scrollbar';
import { useNavigate } from 'react-router-dom';

const renderContent = (notification, navigate) => {
  let createdAt;
  if (notification.createdAt) {
    createdAt = format(new Date(notification.createdAt), "dd MMMM, h:mm a", { locale: vi });
  } else {
    createdAt = 'Invalid date';
  }

  switch (notification.type) {
    case 'system': {
      return (
        <>
          <ListItemAvatar sx={{ mt: 0.5 }}>
          <Avatar>
              <SvgIcon>
                <MessageChatSquareIcon />
              </SvgIcon>
            </Avatar>
            </ListItemAvatar>
          <ListItemText
            primary={(
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                <Typography
                  sx={{ mr: 0.5 }}
                  variant="subtitle2"
                >
                 <strong>Hệ thống</strong> 
                </Typography>
                <Typography
                  sx={{ mr: 0.5 }}
                  variant="body2"
                >
                  {notification.description}
                </Typography>
              </Box>
            )}
            secondary={(
              <Typography
                color="text.secondary"
                variant="caption"
              >
                {createdAt}
              </Typography>
            )}
            sx={{ my: 0 }}
          />
        </>
      );
    }
    case 'noti': {
      return (
        <>
          <ListItemAvatar sx={{ mt: 0.5 }}>
            <Avatar src={notification.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={(
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ mr: 0.5 }}
                >
              <span
                style={{ cursor: 'pointer', color: '#000000E5' }} 
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                onClick={(event) => {
                  event.stopPropagation(); 
                  navigate(`/user/${notification.authorId}`);
                }}
              >  
                <strong>{notification.author}</strong>
              </span> 
                  </Typography>
                <Typography variant="body2">
                  {notification.description}
                </Typography>
              </Box>
            )}
            secondary={(
              <Typography
                color="text.secondary"
                variant="caption"
              >
                {createdAt}
              </Typography>
            )}
            sx={{ my: 0 }}
          />
        </>
      );
    }
    default:
      return null;
  }
};

const NotificationItem = React.memo(({ notification, navigate, onRemoveOne }) => {
  const handleNotificationClick = (notification) => {
    if (notification.post) {
      (notification.post.types === 'Group') ? navigate(`/study/post/${notification.post._id}`) :navigate(`/ctxh/post/${notification.post._id}`) ;
    }
  };

  return (
    <ListItem
      onClick={() => handleNotificationClick(notification)}
      divider
      key={notification.id}
      sx={{
        cursor: 'pointer',
        alignItems: 'flex-start',
        '&:hover': {
          backgroundColor: 'action.hover'
        },
        '& .MuiListItemSecondaryAction-root': {
          top: '24%'
        }
      }}
      secondaryAction={(
        <Tooltip title="Xóa">
          <IconButton
            edge="end"
            onClick={() => onRemoveOne?.(notification.id)}
            size="small"
          >
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Tooltip>
      )}
    >
      {renderContent(notification, navigate)}
    </ListItem>
  );
});

export const NotificationsPopover = (props) => {
  const {
    anchorEl,
    notifications,
    onClose,
    onRemoveAll,
    onRemoveOne,
    open = false,
    ...other
  } = props;
  const navigate = useNavigate();
  console.log(notifications); // log the notifications prop

  const isEmpty = notifications.length === 0;
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      disableScrollLock
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 380 } }}
      {...other}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          px: 3,
          py: 2
        }}
      >
        <Typography
          color="inherit"
          variant="h6"
        >
          Thông báo
        </Typography>
        <Tooltip title="Nhấn để xóa tất cả thông báo">
          <IconButton
            onClick={onRemoveAll}
            size="small"
            color="inherit"
          >
            <SvgIcon>
              <Mail04Icon />
            </SvgIcon>
          </IconButton>
        </Tooltip>
      </Stack>
      {isEmpty
        ? (
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              Hiện tại không có thông báo nào
            </Typography>
          </Box>
        )
        : (
          <Scrollbar sx={{ maxHeight: 400 }}>
            <List disablePadding>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  navigate={navigate}
                  onRemoveOne={onRemoveOne}
                />
              ))}
            </List>
          </Scrollbar>
        )}
    </Popover>
  );
};

NotificationsPopover.propTypes = {
  anchorEl: PropTypes.any,
  notifications: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onRemoveOne: PropTypes.func,
  open: PropTypes.bool
};
