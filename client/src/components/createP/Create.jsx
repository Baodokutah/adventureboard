import './create.css'
import {Confirm, Success, Filter, newTags} from '../popup/Popup';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Create()
{
    const [openModal, setOpenModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const location = useLocation();
    const currentPage = localStorage.getItem('currentPage') || '404';
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
                id="PostTilte"
                label="Tiêu đề"
                multiline
                rows={1}
                defaultValue=""
                type='string'
                color="info"
                sx={{width:'70dvw'}}
            />
            <TextField
                id="PostDesc"
                label="Mô tả (không bắt buộc)"
                multiline
                rows={11}
                defaultValue=""
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
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 0, // Set the minimum value to 0
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
                    onClick={() => setOpenModal(true)}>
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
