import { useCallback, useState } from 'react';
import Bell01Icon from '@untitled-ui/icons-react/build/esm/Bell01';
import { Badge, IconButton, SvgIcon, Tooltip } from '@mui/material';
import { usePopover } from '../../hooks/use-popover';
import { NotificationsPopover } from './notifications-popover';
import { useMockedUser } from '../../hooks/use-mocked-user';
import axios from 'axios';

const transformNotifications = (notifications) => {
  return notifications.map(notification => {
    const author = notification?.post?.author || {}; 
    let type;
    if (notification.content.includes('đã xóa bạn khỏi nhóm của họ') || 
        notification.content.includes('Bạn đã rời khỏi nhóm!') ||
        notification.content.includes('have joined your post!')) {
      type = 'system';
    } else {
      type = 'noti';
    }

    return {
      id: notification._id,
      type: type,
      description: notification.content,
      avatar: author.avatar,
      author: author.name,
      createdAt: notification.date,
      post: notification.post,
      authorId: author._id
    };
  });
};

const useNotifications = () => {
  const user = useMockedUser();
  const [notifications, setNotifications] = useState(transformNotifications(user.noti));

  const handleRemoveOne = useCallback((notificationId) => {
    // Optimistically update the state
    setNotifications((prevState) => prevState.filter((notification) => notification.id !== notificationId));

    axios.post(process.env.REACT_APP_API_URL + '/api/noti/remove', {
      token: user.id, 
      nid: [notificationId]
    })
    .then(response => {
      if (!response.data.success) {
        console.error('Failed to remove notification:', response.data.message);
        // If the request failed, revert the state update
        setNotifications(user.noti);
      }
    })
    .catch(error => {
      console.error('Error removing notification:', error);
      // If there was an error, revert the state update
      setNotifications(user.noti);
    });
  }, [user.id, user.noti]);

  const removeAll = useCallback(() => {
    // Optimistically update the state
    setNotifications([]);

    axios.post(process.env.REACT_APP_API_URL + '/api/noti/remove', {
      token: user.id, 
      nid: notifications.map(notification => notification.id)
    })
    .then(response => {
      if (!response.data.success) {
        console.error('Failed to remove notifications:', response.data.message);
        setNotifications(user.noti);
      }
    })
    .catch(error => {
      console.error('Error removing notifications:', error);
      // If there was an error, revert the state update
      setNotifications(user.noti);
    });
  }, [notifications, user.id, user.noti]);

  return {
    removeAll,
    handleRemoveOne,
    notifications,
  };
};

export const NotificationsButton = () => {
  const popover = usePopover();

  const { handleRemoveOne, removeAll, notifications } = useNotifications();

  return (
    <>
      <Tooltip title="Thông báo">
        <IconButton
          ref={popover.anchorRef}
          onClick={popover.handleOpen}
        >
          <Badge
            color="error"
            badgeContent={notifications.length}
          >
            <SvgIcon style={{fontSize:'xx-large'}}>
              <Bell01Icon />
            </SvgIcon>
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsPopover
        anchorEl={popover.anchorRef.current}
        notifications={notifications}
        onClose={popover.handleClose}
        onRemoveAll={removeAll}
        onRemoveOne={handleRemoveOne}
        open={popover.open}
      />
    </>
  );
};
