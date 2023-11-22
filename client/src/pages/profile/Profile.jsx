import ProfileCard from "../../components/profile_card/ProfileCard";
import "./profile.css";
import { PostTitle } from '../../components/post/Post';
import { Post } from '../../dummyData';

export default function Profile() {


  return (
    <div className="profile">
    <ProfileCard className="ProfileCard"/>
    <div className="Posts">
    <PostTitle title={Post[0].title} tags={Post[0].tags} content={Post[0].content}/>
    </div>

    </div>
  )
}
