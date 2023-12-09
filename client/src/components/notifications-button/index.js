import { useCallback, useState, useEffect, useRef } from 'react';
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
        notification.content.includes('đã tham gia nhóm của bạn!')) {
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
  const [notifications, setNotifications] = useState([]);
  const [deletionInProgress, setDeletionInProgress] = useState(false);
  const intervalId = useRef(null);



  const fetchNotifications = useCallback(async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        mail: user.email,
        avatar: user.avatar ,
        token: user.id ,
      }),
    });
  
    const data = await response.json();
    if (data && data.User) {
      setNotifications(prevNotifications => {
        const newNotifications = transformNotifications(data.User.notification);
        console.log(newNotifications)
        if ((JSON.stringify(newNotifications) !== JSON.stringify(prevNotifications)) && !deletionInProgress) {
          return newNotifications;
        }
        return prevNotifications;
      });
    }
  }, [user, deletionInProgress]);

  useEffect(() => {
    fetchNotifications();
    if (!deletionInProgress) {
      intervalId.current = setInterval(fetchNotifications, 5000);
    }
    return () => clearInterval(intervalId.current);
  }, [fetchNotifications, deletionInProgress]);




  const handleRemoveOne = useCallback((notificationId) => {
    let newNotifications = notifications.filter((notification) => notification.id !== notificationId);
    setDeletionInProgress(true);

    axios.post(process.env.REACT_APP_API_URL + '/api/noti/remove', {
      token: user.id, 
      nid: [notificationId]
    })
    .then(response => {
      if (response.data.success) {
        // If the request succeeded, update the state
        setNotifications(newNotifications);
        setDeletionInProgress(false);
      } else {
        console.error('Failed to remove notification:', response.data.message);
        // If the request failed, revert the state update
        setNotifications(prevState => [...prevState]);
      }
    })
    .catch(error => {
      console.error('Error removing notification:', error);
      // If there was an error, revert the state update
      setNotifications(prevState => [...prevState]);
      setDeletionInProgress(false);
    });
  }, [user.id, notifications]);

  const removeAll = useCallback(() => {
    axios.post(process.env.REACT_APP_API_URL + '/api/noti/remove', {
      token: user.id, 
      nid: notifications.map(notification => notification.id)
    })
    .then(response => {
      if (response.data.success) {
        // If the request succeeded, update the state
        setNotifications([]);
      } else {
        console.error('Failed to remove notifications:', response.data.message);
      }
    })
    .catch(error => {
      console.error('Error removing notifications:', error);
    });
  }, [notifications, user.id]);

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
