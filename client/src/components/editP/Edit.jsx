import './edit.css'
import { Success, Filter } from '../popup/Popup';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useMockedUser } from '../../hooks/use-mocked-user';

function Edit({ tags, setTags, Ptitle, Pdescription, Pquantity, Pid, type }) // Add the new props here
{

    const [openModal, setOpenModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [link, setLink] = useState('');
    const user = useMockedUser();
    let page;
    (type === 'Group') ? page = "study" : page =  "ctxh";
    console.log(page)
    useEffect(() => {
        setTitle(Ptitle);
        setDescription(Pdescription);
        setQuantity(Pquantity);
      }, [Ptitle, Pdescription, Pquantity]);
    

      const handleUpdate = async () => {
        const postData = {
          pid: Pid,
          token: user.id,
          title: title,
          content: description,
          tags: tags,
          maxuser: quantity,
        };
      
        try {
          const response = await axios.post('/api/post/update', postData);
          console.log(response.data);
          setLink(response.data.Post); // Set the link state
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
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                type='string'
                color="info"
                sx={{width:'70dvw'}}
            />
            <TextField
                id="PostDesc"
                label="Mô tả (không bắt buộc)"
                multiline
                rows={11}
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                type='string'
                sx={{width:'70dvw'}}
            />
            </Box>

            <div style={{display:"flex", flexDirection:"row", gap:'1.7%'}}>
                {tags.map((tag, index) => (
                    <div key={index}  className='tag' style={{width: "7.88%", height: "3.36%"}}>
                        {tag}
                    </div>
                ))}
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
                page={page}
                tags={tags}
                setTags={setTags}
                />
            </div>
            <div className='quantity'>Số lượng:
                <TextField
                    disabled
                    id="NumOfMemPost"
                    type="number"
                    value={quantity} // Set the value to the state
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1, 
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
                        handleUpdate();
                    }}>
                    Đăng
                </Button>
                <Success
                open={openModal}
                onClose={() => setOpenModal(false)}
                action='Cập nhật bài viết thành công!'
                page={`${page}/post/${link}`}
                imgSrc={"https://www.svgrepo.com/show/522783/check-circle.svg"}
                />
            </div>
        </div>
    );
}

export default Edit;