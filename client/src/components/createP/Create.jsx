import './create.css'
import PopupButton from '../popup/Popup';
import React, { useState } from 'react';

function Create()
{
    const [openModal, setOpenModal] = useState(false);

    return(
        <div className="create">
            <div className='createInput'>
                <input placeholder="Tiêu đề" className='titleInput'></input>
                <input placeholder="Nội dung (không bắt buộc)" className='contentInput'></input>
            </div>
            <button className='addTagButton'>+</button>
            <div className='quantity'>Số lượng: <input className='quantityInput'></input></div>
            {/* <button className='postButton' onClick={PopupButton}>Đăng</button> */}
            {/* <PopupButton csstyle='postButton' buttonName='Đăng' action='đăng bài viết'/> */}
            <div>
                <button onClick={() => setOpenModal(true)} className='postButton'>
                    Đăng
                </button>
                <PopupButton
                open={openModal}
                onClose={() => setOpenModal(false)}
                action='Tạo bài viết thành công!' />
            </div>
        </div>
    );
}

export default Create;
