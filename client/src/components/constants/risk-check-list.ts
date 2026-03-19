const RISK_CHECKLIST = [
  {
    value: "technology",
    label: "Rủi ro liên quan đến kĩ thuật - thi công",
    items: [
      "Lựa chọn biện pháp, công nghệ thi công không phù hợp",
      "Sai sót trong địa chất công trình",
      "Thi công sai thiết kế phải làm lại",
      "Kĩ thuật thi công phức tạp",
      "Chất lượng vật liệu xây dựng kém",
      "Quản lý tổ chức thi công của nhà thầu kém",
      "Tổ chức mặt bằng công trường chưa hợp lý",
      "Vận hành, sử dụng máy móc, thiết bị gặp sự cố, hư hỏng",
      "Trang bị, mua sắm máy móc, thiết bị không phù hợp với điều kiện thực tế công trường",
      "Chậm trễ trong việc bàn giao mặt bằng thi công",
      "Chậm trễ trong việc cung ứng vật tư, máy móc",
      "Chậm trễ trong phê duyệt hồ sơ, bản vẽ",
      "Chậm trễ trong giải quyết mâu thuẫn giữa các bên tham gia dự án",
      "Lập tiến độ thi công không hợp lý, không phù hợp với điều kiện thực tế",
      "Tranh chấp và đình công ảnh hưởng tiến độ",
      "Thiếu sự phối hợp giữa các bên tham gia dự án"
    ],
  },
  {
    value: "economy",
    label: "Rủi ro liên quan đến kinh tế - tài chính",
    items: [
      "Năng lực tài chính của Chủ đầu tư",
      "Chậm trễ thanh toán hợp đồng/ định kỳ",
      "Giá trị khối lượng công việc đã thực hiện được duyệt không được thanh toán hết",
      "Năng lực tài chính của Nhà thầu",
      "Năng lực tài chính của Nhà cung cấp, Nhà thầu phụ",
      "Trượt giá do thời gian thi công kéo dài",
      "Lạm phát tăng",
      "Khủng hoảng tài chính"
    ]
  },
  {
    value: "legal",
    label: "Rủi ro liên quan tới pháp lý - hợp đồng",
    items: [
      "Khối lượng công việc thực tế cao hơn khối lượng hợp đồng (Hợp đồng trọn gói).",
      "Chậm trễ trong việc xin/cấp giấy phép xây dựng.",
      "Điều kiện thi công thực tế khác với hợp đồng.",
      "Sự cấu kết gian lận giữa các bên tham gia dự án.",
      "Chủ đầu tư thường xuyên thay đổi phạm vi công việc trong hợp đồng.",
      "Các điều khoản hợp đồng không rõ ràng.",
      "Không tuân thủ các điều khoản trong hợp đồng."
    ]
  },
  {
    value: "design",
    label: "Rủi ro liên quan tới thiết kế",
    items:[
      "Yêu cầu thay đổi thiết kế phát hành trong thời gian quá ngắn.",
      "Thường xuyên thay đổi thiết kế trong quá trình thi công.",
      "Xung đột giữa các bản vẽ thiết kế (Kiến trúc, Kết cấu, MEP).",
      "Thiết kế phức tạp.",
      "Bản vẽ thiết kế không đầy đủ.",
      "Phát hành thiết kế chậm trễ.",
      "Năng lực của các đơn vị thiết kế không đáp ứng",
    ]
  },
  {
    value: "environment",
    label: "Rủi ro liên quan tới môi trường - an toàn - xã hội",
    items:[
      "Năng suất lao động thấp",
      "Thiếu hụt lao động thủ công.",
      "Không có sẵn lực lượng lao động tay nghề cao (Giám sát, lao động qua đào tạo).",
      "Thời tiết thất thường (mưa, bão, nắng gắt…) ảnh hưởng đến tiến độ thi công.",
      "Địa chất công trình phức tạp phải dừng thi công để xử lý.",
      "Các sự cố bất khả kháng (dịch bệnh, thiên tai vượt quá dự tính của con người).",
      "Tai nạn lao động, sự cố cháy nổ…",
      "Không có sự đồng thuận của cộng đồng, xã hội khi thi công dự án.",
      "Điều kiện an toàn vệ sinh lao động không được đảm bảo.",
    ]
  },
]

export {RISK_CHECKLIST}