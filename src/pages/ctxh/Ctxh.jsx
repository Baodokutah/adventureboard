// import Navbar from "../../components/navbar/Navbar";
import FilterBox from '../../components/filter/Filter';
import Posts from '../../components/post/Post';
import ListOfMem from '../../components/listofmem/Listofmem';
import BasicStack from '../../components/post/Post';

import './ctxh.css'

function CTXH() {
    return (
        <>
        <h1>Hi this is CTXH</h1>
        </>
        <div className='componentDisplay'>
            {/* <FilterBox />
            <Posts /> */}
            <ListOfMem />
        </div>
    );
}

export default CTXH;
