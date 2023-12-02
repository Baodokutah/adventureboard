import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Avatar, Box, Link, Stack, Typography, FormHelperText } from '@mui/material';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useMockedUser } from '../hooks/use-mocked-user';
import { AuthContext } from '../context/auth/firebase-context';
import { useContext } from 'react';

export const Comment = ({onNewReply, ...props}) => {
  const { _id: id, author, content: message, date: createdAt, isReply, ...other } = props;
  const ago = formatDistanceToNowStrict(new Date(createdAt), { locale: vi });
  const [isReplying, setIsReplying] = useState(false);
  const [reply, setReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const user = useMockedUser();
  const { isAuthenticated } = useContext(AuthContext);
  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };
  const handleReplySubmit = async () => {
    if (!reply.trim()) {
      setIsError(true);
      setErrorMessage('Reply cannot be empty');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/api/comment/reply', {
        token: user.id,
        content: reply,
        cid: id,
      });

      if (response.data.success) {
        console.log('Reply sent successfully!');
        setReply('');
        setIsReplying(false);
        onNewReply();
        setIsError(false);
        setErrorMessage('');
      } else {
        console.log('Failed to send reply:', response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          width: '50vw',
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
            trước
          </Typography>
        </Stack>
        <Typography variant="body2"  sx={{ wordWrap: 'break-word' }}>
          {message}
        </Typography>
      </Stack>
      {!isReplying && !isReply &&  isAuthenticated   && (
      <Link
        onClick={() => setIsReplying(true)}
        color="text.primary"
        underline="hover"
        sx={{
          fontSize: '0.8rem',
          color: 'black',
          ml: 1 ,
          cursor: 'pointer'
        }}
      >
        Phản hồi
      </Link>)}
      {isReplying && (
  <FormControl sx={{ m: 1, width: '80ch', zIndex:1 }} variant="standard">
    <InputLabel htmlFor="standard-adornment-password">Phản hồi</InputLabel>
    <Input
      multiline
      required
      value={reply} // Set the value to the state
      onChange={handleReplyChange} // Update the state when input changes
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={handleReplySubmit}
            sx={{
              right:'-0.48vw',
              position:'relative'
            }}
            aria-label="toggle visibility"
          >
            <img style={{ width: '30px', height: '30px' }} alt='sendButt' src={process.env.PUBLIC_URL + '/assets/comment-normal.svg'} />
          </IconButton>
        </InputAdornment>
      }
    />
    {isError && <FormHelperText error>{errorMessage}</FormHelperText>}
  </FormControl>
)}
{reply && (
  <div>
    <Button
      onClick={() => {
          setReply('');
          setIsReplying(false);
        }}      variant="outlined"
      startIcon={<DeleteIcon />}
      sx={{ borderRadius: 50, width: '80px', height: '30px', marginRight: '10px' }}
    >
      Hủy
    </Button>
    <Button
      onClick={handleReplySubmit}
      variant="contained"
      endIcon={<SendIcon/>}
      sx={{ borderRadius: 50, width: '80px', height: '30px' }}
      disabled={isSubmitting}
    >
      Đăng
    </Button>
  </div>
)}
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
