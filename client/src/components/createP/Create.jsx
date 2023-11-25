import './create.css'
import { Success, Filter, newTags} from '../popup/Popup';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

function Create()
{

    const [openModal, setOpenModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const currentPage = localStorage.getItem('currentPage') || '404';

    // Define states for each input field
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [quantity, setQuantity] = useState(0);

    const handleSubmit = async () => {
        const postData = {
            type: quantity,
            title: title,
            content: description,
            tags: tags
        };

        try {
            const response = await axios.post('http://your-backend-endpoint.com', postData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="create">
            <Box
            component="form"
            sx={{
            '& > :not(style)': {marginBottom:2},
            display: "flex",
            flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
            >
            <TextField
                required
                id="PostTitle"
                label="Tiêu đề"
                multiline
                rows={1}
                value={title} // Set the value to the state
                onChange={(e) => setTitle(e.target.value)} // Update the state when input changes
                type='string'
                color="info"
                sx={{width:'70dvw'}}
            />
            <TextField
                id="PostDesc"
                label="Mô tả (không bắt buộc)"
                multiline
                rows={11}
                value={description} // Set the value to the state
                onChange={(e) => setDescription(e.target.value)} // Update the state when input changes
                type='string'
                sx={{width:'70dvw'}}
            />
            </Box>

            <div style={{display:"flex", flexDirection:"row", gap:'1.7%'}}>
                {newTags.map((tags, index) => (
                    <div key={index}  className='tag' style={{width: "7.88%", height: "3.36%"}}>
                        {tags}
                    </div>
                ))}
                {/* <button onClick={() => setOpenFilter(true)} className='addTagButton'>+</button> */}
                <Button
                sx={{border:"1px solid black",
                    borderRadius: 11,
                    width:"104px", height:"23px",
                    color:'black',
                    fontWeight: 1000 }}
                    variant="+"
                    onClick={() => setOpenFilter(true)}>
                    +
                </Button>
                <Filter
                open={openFilter}
                onClose={() => setOpenFilter(false)}
                page={currentPage}
                />
            </div>
            <div className='quantity'>Số lượng:
                <TextField
                    id="NumOfMemPost"
                    type="number"
                    value={quantity} // Set the value to the state
                    onChange={(e) => setQuantity(e.target.value)} // Update the state when input changes
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1, // Set the minimum value to 0
                    }}
                    size='small'
                    sx={{
                        "& .MuiInputBase-input": {
                        height: '1vh', // Adjust the minHeight value as needed
                        width: "8vh",
                        }
                    }}
                />
            </div>
            <div>
                {/* <button onClick={() => setOpenModal(true)} className='postButton'>
                    Đăng
                </button> */}
                <Button
                sx={{border:"1px solid black",
                    borderRadius: 11,
                    width:"15dvh", height:"5dvh",
                    color:'black',
                    bottom: '3vh',
                    right: '3vh',
                    position: 'absolute',
                    fontWeight: 1000,
                    fontFamily: "Noto Sans",
                    fontSize: '2.2vh'
                    }}
                    variant="Đăng"
                    onClick={() => {
                        setOpenModal(true);
                        handleSubmit();
                    }}>
                    Đăng
                </Button>
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