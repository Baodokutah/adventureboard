import Profile_card from "../../components/profile_card/Profile_card"
import "./profile.css"
import Posts from "../../components/post/Post"

export default function Profile() {
  return (
    <div className="profile">
    <div>
    <Profile_card />
    </div>
    <div>
<h1>Post here</h1>
    </div>
    </div>
  )
}
