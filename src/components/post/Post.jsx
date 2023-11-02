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
      <pre className='content'>{content}</pre>
      <div className='comment'>
        <input className='commentInput'></input>
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
