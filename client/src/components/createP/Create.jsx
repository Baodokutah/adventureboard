import './create.css'
import {Confirm, Success, Filter, newTags} from '../popup/Popup';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Create()
{
    const [openModal, setOpenModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const location = useLocation();
    const currentPage = localStorage.getItem('currentPage') || '404';
    return(
        <div className="create">
            <div className='createInput'>
                <input placeholder="Tiêu đề" className='titleInput'></input>
                <input placeholder="Nội dung (không bắt buộc)" className='contentInput'></input>
            </div>
            <div style={{display:"flex", flexDirection:"row", gap:'1.7%'}}>
                {newTags.map((tags, index) => (
                    <div key={index}  className='tag' style={{width: "7.88%", height: "3.36%"}}>
                        {tags}
                    </div>
                ))}
                <button onClick={() => setOpenFilter(true)} className='addTagButton'>+</button>
                <Filter
                open={openFilter}
                onClose={() => setOpenFilter(false)}
                page={currentPage}
                />
            </div>


            <div className='quantity'>Số lượng: <input className='quantityInput'></input></div>
            {/* <button className='postButton' onClick={PopupButton}>Đăng</button> */}
            {/* <PopupButton csstyle='postButton' buttonName='Đăng' action='đăng bài viết'/> */}
            <div>
                <button onClick={() => setOpenModal(true)} className='postButton'>
                    Đăng
                </button>
                <Success
                open={openModal}
                onClose={() => setOpenModal(false)}
                action='Tạo bài viết thành công!'
                page={currentPage}
                imgSrc={"https://www.svgrepo.com/show/522783/check-circle.svg"}
                />
            </div>
        <Filter/>
        </div>
    );
}

export default Create;
