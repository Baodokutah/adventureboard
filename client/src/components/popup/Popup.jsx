import {useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import './popup.css'

const overlayStyles = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  zIndex: 3
};

const modalContainerStyles = {
  width: '42%',
  height: '52.2%',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  backgroundColor: '#ffffff',
  boxShadow: '0px 0px 18px 0px rgba(0, 0, 0, 0.75)',
  borderRadius: '8px',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '5.4%',
  padding: '20px',
};

const imgStyles = {
  width: '12vw',
  objectFit: 'cover',
};

const contentModalStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  fontFamily: 'Noto Sans'
};

const cancelButtonStyles = {
  height: '7vh',
  width: '15vw',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  borderRadius: '30px',
  border: '1px solid #000',
  background: '#FE3939',
  color: '#FFF',
};

const confirmButtonStyles = {
  height: '7vh',
  width: '15vw',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  borderRadius: '30px',
  border: '1px solid #000',
  background: '#0DD321',
  color: '#FFF',
};

export function Success({ open, onClose, onCloseFrame, action, page, imgSrc }) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (page) {
      navigate('/' + page);
    } else {
      onClose();
      if (onCloseFrame) {
        onCloseFrame();
      }    
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={open}>
        <div style={modalContainerStyles}>
          <img alt='model' src={imgSrc} style={imgStyles} />
          <div className='contentModal'>
            <h2>
              {action}
            </h2>
          </div>
          <Button
            className='confirmButtonModal'
            onClick={handleConfirm}
            style={confirmButtonStyles}
          >
            Xác nhận
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}

export function Confirm({ open, onClose, action, onConfirm, imgSrc }) {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const handleConfirm = () => {
    // Open the SuccessModal
    setOpenSuccessModal(true);
  };

  if (!open) return null;
  return (
    <div onClick={onClose} style={overlayStyles}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={modalContainerStyles}
      >
        <img alt='random bullshjt' src={imgSrc} style={imgStyles} />
        <div className='contentModal' style={contentModalStyles}>
          <h2>Xác nhận {action}</h2>
        </div>
        <div className='btnContainer'>
          <button className='cancelButtonModal' onClick={onClose} style={cancelButtonStyles}>
            <span className='bold'>Quay lại</span>
          </button>
          <button className='confirmButtonModal' onClick={handleConfirm} style={confirmButtonStyles}>
            <span className='bold'>Xác nhận</span>
          </button>
        </div>
        {openSuccessModal && (
        <Success
          action={`Đã ${action} thành công`}
          open={openSuccessModal}
          onClose={() => {
            setOpenSuccessModal(false);
            onClose(); // Close the ConfirmModal when SuccessModal is closed
            onConfirm();
          }}
          imgSrc={"https://www.svgrepo.com/show/522783/check-circle.svg"}
        />
      )}
      </div>
    </div>
  );
}


export function Filter({open, onClose, page, tags, setTags}){
    const [allTags, setAllTags] = useState([{type:"subjectCode", tags : []}, {type:"classCode", tags : []}
                                            , {type:"ctxhCode", tags : []}]);

    const [selectedTag, setSelectedTag] = useState({});
    //ctxh
    const handleClickTag = (tag) => {
    setSelectedTag(prevState => ({...prevState, [tag]: !prevState[tag]}));
    setAllTags((allTags) => {
        const updatedTags = allTags.map((tag1) => {
          if (tag1.type === 'ctxhCode' ) {
            const isElementPresent = tag1.tags.includes(tag);
            if (!isElementPresent) {
                return { ...tag1, tags: [...tag1.tags, tag] };
            } else {
                return { ...tag1, tags: tag1.tags.filter((element) => element !== tag) };
            }
          }
          return tag1;
        });
        setTags(updatedTags.flatMap((tag) => tag.tags));
        return updatedTags;
      });
    };

    const chipStyle = {
      width: '104px',
      height: '23px',
      margin: '4px 4px 4px 0',
      fontSize: '0.75rem',
    };

    const chipContainerStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '8px',
      marginBottom: '16px',
      marginRight: '40px',
      fontWeight: 'bold',
    };

    const overlayStyles = {
      position: 'fixed',
      width: '100%',
      height: '100%',
    };

    const modalContainerStyles = {
      width: '19vw',
      height: '71vh',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#ffffff',
      boxShadow: '0px 0px 18px 0px rgba(0, 0, 0, 0.75)',
      padding: '0px',
    };

    const applyButtonStyles = {
      borderRadius: '30px',
      border: '1px solid #000',
      background: '#8B5A2B',
      display: 'flex',
      width: '80%',
      height: '9%',
      padding: '18px 24px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      flexShrink: '0',
      color: '#FFF',
      fontSize: '70%',
      bottom: '4%',
      position: 'absolute',
    };

    const filterBoxStyles = {
      cursor: 'pointer',
    };

    const tagBoxStudyStyles = {
      width: '159px',
      height: '23px',
      borderRadius: '30px',
    };

    const [chips, setChips] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleAddChip = () => {
      if (inputValue.trim()) {
        setChips([...chips, inputValue]);
        setAllTags((allTags) => {
            const updatedTags = allTags.map((tag) => {
              if (tag.type === 'classCode') {
                return { ...tag, tags: [...tag.tags, inputValue] };
              }
              return tag;
            });
            setTags(updatedTags.flatMap((tag) => tag.tags));
            return updatedTags;
          });
        setInputValue('');
      }
    };
    const handleDeleteChip = (chipToDelete) => {
      setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
      setAllTags((allTags) => {
        const updatedTags = allTags.map((tag) => {
          if (tag.type === 'classCode') {
            return { ...tag, tags: tag.tags.filter((tagValue) => tagValue !== chipToDelete) };
          }
          return tag;
        });
        setTags(updatedTags.flatMap((tag) => tag.tags));
        return updatedTags;
      });
    };

    const [subjectSelect, setSubjectSelect] = useState({});
    const handleSelectSubject = (event) => {
        setSubjectSelect(event.target.value);
        const tag = {type:"subjectCode", tags: [event.target.value]};
        const filteredTags = allTags.filter((tag) => tag.type !== 'subjectCode');
        setAllTags([...filteredTags,tag]);
        setTags([...filteredTags,tag].flatMap((tag) => tag.tags));
    }

    if (!open) return null;

    if (page === 'ctxh') {
      return (
        <div onClick={onClose} style={overlayStyles} className='overlay'>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={modalContainerStyles}
            className='modalContainerFilter filterBigBox'
          >
            <div className='filterBox' onClick={onClose}>
              <h1 style={{ cursor: 'pointer' }}>X</h1>
            </div>

            <h3>Cơ sở</h3>
            <div style={chipContainerStyle}>
              <Chip
                label='Cơ sở 1'
                clickable
                color={selectedTag['Cơ sở 1'] ? 'primary' : 'default'}
                onClick={() => handleClickTag('Cơ sở 1')}
                style={chipStyle}
              />
              <Chip
                label='Cơ sở 2'
                clickable
                color={selectedTag['Cơ sở 2'] ? 'secondary' : 'default'}
                onClick={() => handleClickTag('Cơ sở 2')}
                style={chipStyle}
              />
            </div>

            <h3>Số ngày CTXH</h3>
            <div style={chipContainerStyle}>
              <Chip
                label='≤ 1 ngày'
                clickable
                color={selectedTag['≤ 1 ngày'] ? 'error' : 'default'}
                onClick={() => handleClickTag('≤ 1 ngày')}
                style={chipStyle}
              />
              <Chip
                label='> 1 ngày'
                clickable
                color={selectedTag['> 1 ngày'] ? 'info' : 'default'}
                onClick={() => handleClickTag('> 1 ngày')}
                style={chipStyle}
              />
            </div>

            <h3>Thời gian</h3>
            <div style={chipContainerStyle}>
              <Chip
                label='Sáng'
                clickable
                color={selectedTag['Sáng'] ? 'success' : 'default'}
                onClick={() => handleClickTag('Sáng')}
                style={chipStyle}
              />
              <Chip
                label='Chiều'
                clickable
                color={selectedTag['Chiều'] ? 'warning' : 'default'}
                onClick={() => handleClickTag('Chiều')}
                style={chipStyle}
              />
              <Chip
                label='Tối'
                clickable
                color={selectedTag['Tối'] ? 'primary' : 'default'}
                onClick={() => handleClickTag('Tối')}
                style={chipStyle}
              />
            </div>
            <div style={applyButtonStyles} onClick={onClose}>
              <h1>Áp dụng</h1>
            </div>
          </div>
        </div>
      );
    }
    else
    {
    const chipStyle = {
      backgroundColor: '#9C00B6',
      borderRadius: '15px',
      maxWidth: '80px',
      color: '#FFFFFF',
      fontWeight: 'bold',
    };
    return (
      <div onClick={onClose} style={overlayStyles} className='overlay'>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={modalContainerStyles}
          className='modalContainerFilter filterBigBox'
        >
          <div style={filterBoxStyles} className='filterBox' onClick={onClose}>
            <h1>X</h1>
          </div>
          <h3>Mã môn</h3>
          <div className='tagBox_Study' style={tagBoxStudyStyles}>
            <FormControl fullWidth>
              <Select
                placeholder='Chọn mã môn học'
                labelId='simple-select-class-code-label'
                id='simple-select-class-code'
                label=''
                sx={tagBoxStudyStyles}
                value={subjectSelect}
                onChange={handleSelectSubject}
              >
                <MenuItem value={`MT2003`}>MT2003</MenuItem>
                <MenuItem value='MT2013'>MT2013</MenuItem>
                <MenuItem value='CO2014'>CO2014</MenuItem>
              </Select>
            </FormControl>
          </div>

          <h3>Nhóm lớp</h3>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <TextField
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Nhập lớp'
              variant='outlined'
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='add'
                      onClick={handleAddChip}
                      style={{
                        marginRight: '-20px',
                        cursor: 'pointer',
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  borderRadius: '20px',
                  width: '159px',
                  height: '23px',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: '20px',
                  },
                },
              }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {chips.map((chip, index) => (
              <Chip
                key={index}
                label={chip}
                onDelete={() => handleDeleteChip(chip)}
                style={chipStyle}
              />
            ))}
          </div>
          <div style={applyButtonStyles} onClick={onClose}>
            <h1>Áp dụng</h1>
          </div>
        </div>
      </div>
    );
}
}
