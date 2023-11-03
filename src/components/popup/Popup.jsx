import React from 'react';
import Popup from 'reactjs-popup';
import {Link} from 'react-router-dom';

import './popup.css'

function Success({open, onClose, action}){
    return(
        <div onClick={onClose} className='overlayModal'>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className='modalContainer'
        >
            <img src='https://www.svgrepo.com/show/522783/check-circle.svg' />
            <div className='contentModal'>
                <h1>{action}</h1>
            </div>
                <p className='confirmButtonModal' onClick={onClose}>
                    Xác nhận
                </p>
            </div>
      </div>
    );
}

function Confirm({open, onClose, action}){
    return (
    <div onClick={onClose} className='overlay'>
        <div
        onClick={(e) => {
            e.stopPropagation();
        }}
        className='modalContainer'
        >
            <img src='https://www.svgrepo.com/show/522997/question-circle.svg'/>
            <div className='contentModal'>
                <h1>Xác nhận {action}</h1>
            </div>
            <div className='btnContainer'>
            <button className='cancelButtonModal' onClick={onClose}>
                <span className='bold'>Quay lại</span>
            </button>
            <button className='confirmButtonModal' onClick={() => {window.location.href='/study'}}>
                <span className='bold'>Xác nhận</span>
            </button>
            </div>
        </div>
    </div>
    );
}
function PopupButton({open, onClose, action}){
    console.log('pepedump')
    if (!open) return null;
    return(
        <Confirm open={open} onClose={onClose} action={action}/>
    );
  };

export default PopupButton
