import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { Avatar, Box, Link, Stack, Typography } from '@mui/material';

export const Comment = (props) => {
  const { _id: id, author, content: message, date: createdAt, ...other } = props;
  const ago = formatDistanceToNowStrict(new Date(createdAt));

  return (
    <Stack
      alignItems="flex-start"
      direction="row"
      spacing={2}
      {...other}>
      <Avatar
        component="a"
        href={`/user/${author._id}`}
        src={author.avatar}
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
            href={`/user/${author._id}`}
            underline="hover" 
            variant="subtitle2"
          >
            {author.name}
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
  _id: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};
