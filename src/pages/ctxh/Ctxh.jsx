// import Navbar from "../../components/navbar/Navbar";
import FilterBox from '../../components/filter/Filter';
import BasicStack from '../../components/post/Post';

import './ctxh.css'

function CTXH() {
    return (
        <div className='componentDisplay'>
            <FilterBox />
            <BasicStack />
        </div>
    );
}

export default CTXH;
