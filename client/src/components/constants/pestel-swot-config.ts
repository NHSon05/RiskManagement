const PESTEL_CONFIG = [
    { 
      code: 'P',
      title: 'Chính trị',
      label: 'P - Political (Chính trị)',
      lists: ['Ảnh hưởng từ chính phủ', 'Chính sách','Ổn định chính trị']
    },
    { 
      code: 'E',
      title: 'Kinh tế',
      label: 'E - Economy (Kinh tế)',
      lists: [ 'Lãi suất','Tỷ giá','Lạm phát','Thị trường'] },
    { 
      code: 'S',
      title: 'Xã hội',
      label: 'S - Social (Xã hội)',
      lists: ['Hành vi khách hàng','Nhân khẩu học','Xu hướng xã hội'] },
    {
      code: 'T',
      title: 'Công nghệ',
      label: 'T - Technology (Công nghệ)',
      lists: ['Đổi mới','Công nghệ thông tin','Tự động hoá'] },
    {
      code: 'E2',
      title: 'Môi trường',
      label: 'E - Environment (Môi trường)',
      lists: ['Khí hậu', 'Biến đổi môi trường', 'Thiên tai']
    },
    {
      code: 'L',
      title: 'Pháp luật',
      label: 'L - Legal (Pháp luật)',
      lists: ['Nghĩa vụ pháp luật', 'Hợp đồng', 'Trách nhiệm']
    }
];

const SWOT_CONFIG = [
    {
      code: 'S',
      label: 'S - Strengths (Điểm mạnh)'
    },
    { 
      code: 'W',
      label: 'W - Weakness (Điểm yếu)'
    },
    {
      code: 'O',
      label: 'O - Oppotunities (Cơ hội)'
    },
    {
      code: 'T',
      label: 'T - Threats (Thách thức)'
    },
];


export const PESTEL_MAP = [
  { key: 'political', label: 'P - Political (Chính trị)' },
  { key: 'economic', label: 'E - Economy (Kinh tế)' },
  { key: 'social', label: 'S - Social (Xã hội)' },
  { key: 'technological', label: 'T - Technology (Công nghệ)' },
  { key: 'environmental', label: 'E - Environment (Môi trường)' },
  { key: 'legal', label: 'L - Legal (Pháp luật)' }
];

export const SWOT_MAP = [
  { key: 'strengths', label: 'S - Strengths (Điểm mạnh)' },
  { key: 'weaknesses', label: 'W - Weakness (Điểm yếu)' },
  { key: 'opportunities', label: 'O - Oppotunities (Cơ hội)' },
  { key: 'threats', label: 'T - Threats (Thách thức)' },
];

export {PESTEL_CONFIG, SWOT_CONFIG}