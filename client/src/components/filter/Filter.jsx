import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Chip, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './filter.css'

export var newTags = [];

function FilterBoxCTXH() {
  const [ctxhTags, setCtxhTags] = useState({tags:[]});

  const [selectedTag, setSelectedTag] = useState({});
  const handleClickTag = (tag) => {
    setSelectedTag(prevState => ({...prevState, [tag]: !prevState[tag]}));

    setCtxhTags((ctxhTags) => {
      // Check if the newTag already exists in the tags array
      const tagExists = ctxhTags.tags.includes(tag);

      // If it exists, remove it; otherwise, add it
      const updatedTags = tagExists
        ? ctxhTags.tags.filter((element) => element !== tag)
        : [...ctxhTags.tags, tag];

      return { ...ctxhTags, tags: updatedTags };
    });

  };

  useEffect(() => {console.log(ctxhTags)}, [ctxhTags]);
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
  newTags = ctxhTags.tags;
  return (
    <div className='filterBigBox' >

      <div className='filterBox'><h1>Bộ lọc</h1></div>

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

    </div>
  );
}


function FilterBoxGroup() {
  const [studyTags, setStudyTags] = useState([{type:"subjectCode", tags : []}, {type:"classCode", tags : []}]);

  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {console.log(studyTags)}, [studyTags]);

  const handleAddChip = () => {
    if (inputValue.trim()) {
      setChips([...chips, inputValue]);

      const tag = {type:"classCode", value: inputValue}
      setStudyTags((studyTags) => {
          return studyTags.map((tag) => {
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

    setStudyTags((studyTags) => {
      return studyTags.map((tag) => {
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
  const handleSelectSubject = (event) => {
      setSubjectSelect(event.target.value);
      const tag = {type:"subjectCode", tags: [event.target.value]};
      const filteredTags = studyTags.filter((tag) => tag.type !== 'subjectCode');
      setStudyTags([...filteredTags,tag]);
      // console.log(tag);
  }
  // lul merger lien tuc
  newTags = studyTags.flatMap((tag) => tag.tags);

  return (
      <div className='filterBigBox'>
      <div className='filterBox'><h1>Bộ lọc</h1></div>
          <h3>Mã môn</h3>
          <div className='tagBox_Study'>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
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
                <MenuItem value='MT2003'>MT2003</MenuItem>
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
    </div>
  );
}

export default function FilterBox() {
  const location = useLocation();
  const currentPage = location.pathname.includes('ctxh') ? 'ctxh' : location.pathname.includes('study') ? 'study' : 'default';
  // alert(currentPage);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  return (
    <div id='filterBox' className='filter'>
      <Link to={{ pathname: '/create', state: { page: currentPage } }} className='link'>
        <div className='createPost'>
          <h2 style={{ color: 'white' }}>Tạo bài viết</h2>
        </div>
      </Link>
        {location.pathname==='/ctxh' ? (<FilterBoxCTXH/>) : location.pathname==='/study' ? (<FilterBoxGroup/>) : (<></>)}
    </div>
  );
}
