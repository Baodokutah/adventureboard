import Avatar from '@mui/material/Avatar';
import "./profileCard.css"
import { useMockedUser } from '../../hooks/use-mocked-user';

export default function ProfileCard() {
  const user = useMockedUser();
  return (
    <div className='pcard'>
    <Avatar
  alt="Avatar"
  src= {user.avatar}
  sx={{ width: 100, height: 100 }}
    />
    <h1>{user.name}</h1>
    </div>
  )
}
