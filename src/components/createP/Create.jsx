import './create.css'

function Create()
{
    return(
        <div className="create">
            <div className='createInput'>
                <input placeholder="Tiêu đề" className='titleInput'></input>
                <input placeholder="Nội dung (không bắt buộc)" className='contentInput'></input>
            </div>
            <button className='addTagButton'>+</button>
            <div className='quantity'>Số lượng: <input className='quantityInput'></input></div>
            <button className='postButton'>Đăng</button>
        </div>
    );
}

export default Create;
