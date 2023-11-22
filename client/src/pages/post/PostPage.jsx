import { useParams } from 'react-router-dom';
import { InPost } from '../../components/post/Post';
import { Post as PostData, Comment } from '../../dummyData';
import ListOfMem from '../../components/listofmem/Listofmem';
import "./postpage.css";

function PostPage() {
  const { id } = useParams();

  const post = getPostById(id);
  const comments = getCommentsByPostId(id);

  return (
    <div className='post'>
    <ListOfMem />
      <InPost {...post} comments={comments} />
    </div>
  );
}

function getPostById(id) {
  return PostData.find((post) => post.id.toString() === id);
}

function getCommentsByPostId(id) {
  return Comment.filter((comment) => comment.postId && comment.postId.toString() === id);
}

export default PostPage;
