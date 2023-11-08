import React from 'react';

import './post.css';

function InPost({ title, tags, content}) {
  return (
    <div className='postContentDisplay'>
      <h3>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '25px' }}>
        {tags.map((tag, index) => (
          <div key={index} className='tag'>
            {tag}
          </div>
        ))}
      </div>
      <div className='content'><pre>{content}</pre></div>
      <div className='cmt'>
        <div className='cmtInput'>
          <input className='commentInput'></input>
          <img src='https://www.svgrepo.com/show/453320/comment.svg' />
        </div>
        <div className="ui comments">
          <div className="comment">
            <div className="avatar">
              <img src="https://media.discordapp.net/attachments/1067775825048510534/1084508310272737420/IMG_0260.jpg?ex=6550f892&is=653e8392&hm=1b9ba1880c4a665705a7908585f3cdddbfda9683f832cf94d51e1e0ef7b326d9&=&width=447&height=662" />
            </div>
            <div className="content">
              <a className="author">Kao Gia Bỉm</a>
              <div className="metadata">
                <div>Today at 5:42PM</div>
              </div>
              <div className="text">Cho em hỏi mình làm cả 2 ca thì được tổng là 1 ngày CTXH đúng không ạ?</div>
              <div className="actions">
                <a className="">Trả lời</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function PostTitle({ title = null, tags}) {
  if (title == null) {
    return <div className='nullTitleBox'></div>;
  } else {
    return (
      <div className='postTitleBox'>
        <h3>{title}</h3>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '25px' }}>
          {tags.map((tag, index) => (
            <div key={index} className='tag'>
              {tag}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default function Posts() {

  const post1Title = 'Hỗ trợ công tác văn phòng lấy số đo cân nặng cho mẹ của bạn';
  const post1Tags = ['Sang', '1 ngay', 'chieu'];
  const post1Content = "[CTXH] TUYỂN 10 CTV HỖ TRỢ VĂN PHÒNG\n1. Nội dung: Lấy số đo cân nặng mẹ của bạn xong làm khảo sát\n2. Thời gian: 8h15 – 11h00 (ca sáng) và 13h15 - 16h00 (ca chiều), Ngày 31/02/2069 (Thứ Nhất).\n3. Địa điểm: Tập trung tại Văn phòng Đoàn (114B1) – Cơ sở Lý Thường Kiệt để được điều phối.\n4. Quyền lợi: 0.5 ngày CTXH\n5. Lưu ý:\n- Ăn mặc lịch sự\n- Đúng giờ.\n- Bắt buộc làm khảo sát nộp về mới tính CTXH.\n- Liên hệ điểm danh: 0969 420 420 (A. Tèo)";
  // const post2Title = 'Tilte go brrr brrr3';
  // const post2Tags = ['tag1', 'tag2', 'tag3'];

  return (
    <div className='inPostDisplay'>
      <InPost title={post1Title} tags={post1Tags} content={post1Content}/>
    </div>
  );
}
