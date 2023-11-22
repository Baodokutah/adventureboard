import FilterBox from '../../components/filter/Filter';
import { PostTitle, InPost } from '../../components/post/Post';
import ListOfMem from '../../components/listofmem/Listofmem';
import { Post, Comment } from '../../dummyData';
import './ctxh.css'
import { useNavigate, useParams } from 'react-router-dom';

function CTXH() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handlePostClick = (postId) => {
        navigate(`/ctxh/post/${postId}`);
    };

    return (
        <div className='componentDisplay'>
            {id ? <ListOfMem /> : <FilterBox />}
            {id ? (
                <div className='Inpost'><InPost {...getPostById(id)} comments={getCommentsByPostId("1")} /></div>
            ) : (
                <div key={getPostById("1").id} className='Posts' onClick={() => handlePostClick(getPostById("1").id)}>
                    <PostTitle title={getPostById("1").title} tags={getPostById("1").tags} content={getPostById("1").content} />
                </div>
            )}
        </div>
    );
}

function getPostById(id) {
    return Post.find((post) => post.id.toString() === id);
}

function getCommentsByPostId(id) {
    return Comment.filter((comment) => comment.id && comment.id.toString() === id);
}
// alert(getCommentsByPostId('1'));

export default CTXH;
