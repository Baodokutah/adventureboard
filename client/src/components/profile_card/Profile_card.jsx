import Avatar from '@mui/material/Avatar';
import "./profile_card.css"


export default function Profile_card() {
  return (
    <div className='pcard'>
    <Avatar
  alt="Avatar"
  src={process.env.PUBLIC_URL+'/assets/avatar/avatar.png'}
  sx={{ width: 100, height: 100 }}
    />
    <h1>Mẹo mày bé</h1>
    </div>
  )
}
