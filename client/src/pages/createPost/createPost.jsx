import Create from '../../components/createP/Create'
import { Filter } from '../../components/popup/Popup';
import { useState } from 'react';

function CreatePost() {
    const [tags, setTags] = useState([]);

    return (
        <div className='componentDisplay'>
            <Create tags={tags} setTags={setTags} />
            <Filter tags={tags} setTags={setTags} />
        </div>
    );
}

export default CreatePost;
