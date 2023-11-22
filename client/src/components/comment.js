import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { Avatar, Box, Link, Stack, Typography } from '@mui/material';

export const Comment = (props) => {
  const { id, avatar: authorAvatar, author: authorName, timestamp: createdAt, text: message, ...other } = props;

  const ago = formatDistanceToNowStrict(createdAt);

  return (
    <Stack
      alignItems="flex-start"
      direction="row"
      spacing={2}
      {...other}>
      <Avatar
        component="a"
        href="#"
        src={authorAvatar}
      />
        <Stack
      alignItems="flex-start"
      direction="column"
      {...other}>
      <Stack
        spacing={1}
        sx={{
          backgroundColor: '#F8F9FA',
          borderRadius: 1,
          flexGrow: 1,
          p: 2
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <Link
            color="text.primary"
            href="#"
            underline="hover" 
            variant="subtitle2"
          >
            {authorName}
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            color="text.secondary"
            variant="caption"
          >
            {ago}
            {' '}
            ago
          </Typography>
        </Stack>
        <Typography variant="body2">
          {message}
        </Typography>
      </Stack>
      <Link 
        href="#" 
        color="text.primary" 
        underline="hover" 
        sx={{ 
          fontSize: '0.8rem', 
          color: 'black', 
          ml: 1 
        }}
      >
        Trả lời
      </Link>
      </Stack>
    </Stack>
  );
};

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};
