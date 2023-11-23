import {useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import  { useEffect } from 'react';
import Chip from '@mui/material/Chip';
// import { Link, useLocation } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import './popup.css'

export function Success({open, onClose, action, page, imgSrc}){
    const navigate = useNavigate();
    if (!open) return null;
    return(
        <div onClick={onClose} className='overlayModal'>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className='modalContainer'
        >
            <img src={imgSrc} />
            <div className='contentModal'>
                <h1>{action}</h1>
            </div>
                <p className='confirmButtonModal' onClick={() => {navigate('/' + page)}}>
                    Xác nhận
                </p>
            </div>
      </div>
    );
}

export function Confirm({open, onClose, action, page, imgSrc}){
    const navigate = useNavigate();
    if (!open) return null;
    return (
    <div onClick={onClose} className='overlay'>
        <div
        onClick={(e) => {
            e.stopPropagation();
        }}
        className='modalContainer'
        >
            <img src={imgSrc}/>
            <div className='contentModal'>
                <h1>Xác nhận {action}</h1>
            </div>
            <div className='btnContainer'>
            <button className='cancelButtonModal' onClick={onClose}>
                <span className='bold'>Quay lại</span>
            </button>
            <button className='confirmButtonModal' onClick={() => {navigate('/' + page)}}>
                <span className='bold'>Xác nhận</span>
            </button>
            </div>
        </div>
    </div>
    );
}

export var newTags = [];

export function Filter({open, onClose, page}){
    //all tags to send
    const [allTags, setAllTags] = useState([{type:"subjectCode", tags : []}, {type:"classCode", tags : []}
                                            , {type:"ctxhCode", tags : []}]);

    const [selectedTag, setSelectedTag] = useState({});
    //ctxh
    const handleClickTag = (tag) => {
    setSelectedTag(prevState => ({...prevState, [tag]: !prevState[tag]}));
    //   console.log(tag);
    setAllTags((allTags) => {
        return allTags.map((tag1) => {
          if (tag1.type === 'ctxhCode' ) {
            const elementsToCheck = [tag];
            const isElementPresent = tag1.tags.includes(tag);
            // If the element is not present, add it to the tags array
            if (!isElementPresent) {
                return { ...tag1, tags: [...tag1.tags, tag] };
            } else {
                // If the element is already present, remove it from the tags array
                return { ...tag1, tags: tag1.tags.filter((element) => element !== tag) };
            }
          }
          // Otherwise, keep the tag unchanged
          return tag1;
        });
      });
    };

    // Custom styles for the chip
    const chipStyle = {
      width: '104px', // Fixed width for each chip
      height: '23px', // Fixed height for each chip
      margin: '4px 4px 4px 0', // Margin to space out the chips
      fontSize: '0.75rem', // Adjust font size as needed
    };

    // Custom styles for the container of the chips
    const chipContainerStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)', // Two columns layout
      gap: '8px', // Space between chips
      marginBottom: '16px', // Space below each row of chips
      marginRight: '40px',
      fontWeight: 'bold',
    };

    const [chips, setChips] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleAddChip = () => {
      if (inputValue.trim()) {
        setChips([...chips, inputValue]);

        const tag = {type:"classCode", value: inputValue}
        setAllTags((allTags) => {
            return allTags.map((tag) => {
              if (tag.type === 'classCode') {
                // If the tag has the same type, update the tags array
                return { ...tag, tags: [...tag.tags, inputValue] };
              }
              // Otherwise, keep the tag unchanged
              return tag;
            });
          });
        setInputValue('');
      }
    };
    const handleDeleteChip = (chipToDelete) => {
      setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
    //   setAllTags((allTags) => allTags.filter((tag) => tag.value !== chipToDelete));

      setAllTags((allTags) => {
        return allTags.map((tag) => {
          if (tag.type === 'classCode') {
            // If the tag has the same type, update the tags array
            return { ...tag, tags: tag.tags.filter((tagValue) => tagValue !== chipToDelete) };
          }
          // Otherwise, keep the tag unchanged
          return tag;
        });
      });
    };

    const [subjectSelect, setSubjectSelect] = useState('');
    // console.log(page);
    //use eff
    useEffect(() => {}, [allTags]);
    ///////
    const handleSelectSubject = (event) => {
        setSubjectSelect(event.target.value);
        const tag = {type:"subjectCode", tags: [event.target.value]};
        const filteredTags = allTags.filter((tag) => tag.type !== 'subjectCode');
        setAllTags([...filteredTags,tag]);
    }
    //lul merger lien tuc
    newTags = allTags.flatMap((tag) => tag.tags);
    // console.log(newTags);

    if (!open) return null;

    if(page==='ctxh')
    {
        return (
        <div onClick={onClose} className='overlay'>
            <div
            onClick={(e) => {
                e.stopPropagation();
            }}
            className='modalContainerFilter filterBigBox'
            >
            <div className='filterBox' onClick={onClose}><h1>X</h1></div>

            <h3>Cơ sở</h3>
            <div style={chipContainerStyle}>
            <Chip
                label="Cơ sở 1"
                clickable
                color={selectedTag["Cơ sở 1"] ? "primary" : "default"}
                onClick={() => handleClickTag("Cơ sở 1")}
                style={chipStyle}
            />
            <Chip
                label="Cơ sở 2"
                clickable
                color={selectedTag["Cơ sở 2"] ? "secondary" : "default"}
                onClick={() => handleClickTag("Cơ sở 2")}
                style={chipStyle}
            />
            </div>

            <h3>Số ngày CTXH</h3>
            <div style={chipContainerStyle}>
            <Chip
                label="≤ 1 ngày"
                clickable
                color={selectedTag["≤ 1 ngày"] ? "error" : "default"}
                onClick={() => handleClickTag("≤ 1 ngày")}
                style={chipStyle}
            />
            <Chip
                label="> 1 ngày"
                clickable
                color={selectedTag["> 1 ngày"] ? "info" : "default"}
                onClick={() => handleClickTag("> 1 ngày")}
                style={chipStyle}
            />
            </div>

            <h3>Thời gian</h3>
            <div style={chipContainerStyle}>
            <Chip
                label="Sáng"
                clickable
                color={selectedTag["Sáng"] ? "success" : "default"}
                onClick={() => handleClickTag("Sáng")}
                style={chipStyle}
            />
            <Chip
                label="Chiều"
                clickable
                color={selectedTag["Chiều"] ? "warning" : "default"}
                onClick={() => handleClickTag("Chiều")}
                style={chipStyle}
            />
            <Chip
                label="Tối"
                clickable
                color={selectedTag["Tối"] ? "primary" : "default"}
                onClick={() => handleClickTag("Tối")}
                style={chipStyle}
            />
            </div>
            <div className='applyButton' onClick={onClose}><h1>Áp dụng</h1></div>
            </div>
        </div>
        );
    }
    else
    {
    return (
    <div onClick={onClose} className='overlay'>
            <div
            onClick={(e) => {
                e.stopPropagation();
            }}
            className='modalContainerFilter filterBigBox'
            >
        <div className='filterBox' onClick={onClose}><h1>X</h1></div>
            <h3>Mã môn</h3>
            <div className='tagBox_Study'>
              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label"></InputLabel> */}
                <Select
                placeholder='Chọn mã môn học'
                  labelId="simple-select-class-code-label"
                  id="simple-select-class-code"
                  label=""
                  sx={{
                    width: '159px',
                    height: '23px',
                    borderRadius:30,
                  }}
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
    placeholder="Nhập lớp"
    variant="outlined"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
  <IconButton
    aria-label="add"
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
              style={{
                backgroundColor: '#9C00B6',
                borderRadius: '15px',
                maxWidth: '80px',
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}
            />
          ))}
        </div>
        <div className='applyButton' onClick={onClose}><h1>Áp dụng</h1></div>
      </div>
      </div>
    );
}
}


// function PopupButton({open, onClose, action, page}){
//     console.log('pepedump')
//     if (!open) return null;
//     return(
//         <Success open={open} onClose={onClose} action={action} page={page}/>
//     );
//   };

// export default PopupButton
