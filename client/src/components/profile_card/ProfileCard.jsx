import Avatar from '@mui/material/Avatar';
import "./profileCard.css"
import Skeleton from '@mui/material/Skeleton';

export default function ProfileCard({user}) {
  if (!user) {
    return (
      <div>
        <Skeleton variant="circle" width={100} height={100} />
        <Skeleton variant="text" width={200} height={200}/>
      </div>
    );  
  }
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
