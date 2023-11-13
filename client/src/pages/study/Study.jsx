import FilterBox from '../../components/filter/Filter';
import { PostTitle, InPost  } from '../../components/post/Post';
import { Post } from '../../dummyData';
import { useNavigate, useParams } from 'react-router-dom';
import ListOfMem from '../../components/listofmem/Listofmem';
import "./study.css"

function Study() {
    const { id } = useParams(); // Assuming you have set up your route to have :id
    const navigate = useNavigate();
  
    const handlePostClick = (postId) => {
      navigate(`/study/post/${postId}`);
    };
  
    return (
      <div className='componentDisplay'>
  {id ? <ListOfMem /> : <FilterBox />}        
          {id ? (
            <div className='Inpost'><InPost {...getPostById(id)} /> </div>
          ) : (
            <div  className='Posts'  >
            <div key={getPostById("2").id} onClick={() => handlePostClick(getPostById("2").id)}>
                <PostTitle title={getPostById("2").title} tags={getPostById("2").tags} content={getPostById("2").content} />              
            </div>
            <div key={getPostById("3").id}  onClick={() => handlePostClick(getPostById("3").id)}>
                <PostTitle title={getPostById("3").title} tags={getPostById("3").tags} content={getPostById("3").content} />              
            </div>
            </div>
          )}
        </div>

    );
  }

  function getPostById(id) {
    return Post.find((post) => post.id.toString() === id);
  }
  
export default Study;
