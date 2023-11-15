import { subHours } from 'date-fns';

const now = new Date();

export const notifications = [
  {
    id: '5e8883f1b51cc1956a5a1ec0',
    author: 'Kao Gia Bỉm',
    avatar: 'https://media.discordapp.net/attachments/1067775825048510534/1084508310272737420/IMG_0260.jpg',
    createdAt: subHours(now, 2).getTime(),
    read: true,
    type: 'kick'
  },
  {
    id: 'bfb21a370c017acc416757c7',
    author: 'L0L1 Kam1',
    avatar: 'https://i1.sndcdn.com/artworks-O36SYjsNfoEVMOLr-yKSqBA-t500x500.jpg',
    createdAt: subHours(now, 2).getTime(),
    description: 'CTXH văn phòng mặc đồ lịch sự',
    read: false,
    type: 'noti'
  },
  {
    id: '5e8883fca0e8612044248ecf',
    author: 'Mẹo Mày Bé',
    avatar: '',
    createdAt: subHours(now, 2).getTime(),
    description: 'Nhớ add fb tui nha mấy bồ',
    read: false,
    type: 'noti'
  }
];

