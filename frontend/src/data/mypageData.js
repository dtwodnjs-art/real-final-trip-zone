export const myBookingSummaries = [
  { label: "확정 예약", value: "08", tone: "mint" },
  { label: "대기 예약", value: "02", tone: "sand" },
  { label: "완료 예약", value: "24", tone: "blue" },
];

export const myPageSections = [
  { title: "내 정보 관리", subtitle: "등급과 회원 정보를 확인하고 수정 흐름을 준비합니다.", href: "/my/profile" },
  { title: "쿠폰 리스트", subtitle: "보유 쿠폰을 최신순으로 확인합니다.", href: "/my/coupons" },
  { title: "예약 내역", subtitle: "최신 예약 상태와 후기 작성 흐름을 확인합니다.", href: "/my/bookings" },
  { title: "마일리지 내역", subtitle: "보유 마일리지와 적립/사용 내역을 확인합니다.", href: "/my/mileage" },
  { title: "위시리스트", subtitle: "찜한 숙소에서 상세 페이지로 바로 이동합니다.", href: "/my/wishlist" },
  { title: "결제 내역", subtitle: "숙소 결제와 환불 내역을 최신순으로 봅니다.", href: "/my/payments" },
  { title: "문의센터", subtitle: "문의 등록, 상세, 수정, 삭제 흐름을 확인합니다.", href: "/my/inquiries" },
];

export const myProfileSummary = {
  name: "카카오회원 김민수",
  grade: "Gold",
  gradeHint: "최근 3개월 4회 예약 · 누적 마일리지 18,400",
  status: "활성 회원",
  joinedAt: "2025.06.14 가입",
};

export const myProfileDetails = [
  { label: "이메일", value: "tripzone@example.com" },
  { label: "전화번호", value: "010-1234-5678" },
  { label: "로그인 방식", value: "카카오 간편 로그인" },
  { label: "회원 등급", value: "Gold" },
  { label: "마케팅 수신", value: "동의" },
  { label: "최근 로그인", value: "2026.03.23 10:42" },
];

export const myBookingRows = [
  {
    lodgingId: 2,
    name: "제주 포레스트 하우스",
    stay: "04.04 - 04.06",
    status: "PENDING",
    price: "378,000원",
  },
  {
    lodgingId: 2,
    name: "제주 포레스트 하우스",
    stay: "02.08 - 02.10",
    status: "COMPLETED",
    price: "358,000원",
  },
  {
    lodgingId: 1,
    name: "해운대 오션 스테이",
    stay: "03.25 - 03.27",
    status: "CONFIRMED",
    price: "298,000원",
  },
  {
    lodgingId: 3,
    name: "강릉 코스트 라운지",
    stay: "02.15 - 02.16",
    status: "COMPLETED",
    price: "129,000원",
  },
];

export const wishlistSummaries = [
  { label: "찜한 숙소", value: "12", tone: "mint" },
  { label: "이번 주 특가", value: "03", tone: "sand" },
  { label: "가격 변동 알림", value: "02", tone: "blue" },
];

export const wishlistRows = [
  {
    lodgingId: 2,
    name: "제주 포레스트 하우스",
    meta: "제주 · 애월 · 감성 독채",
    price: "189,000원",
    status: "연박 혜택",
  },
  {
    lodgingId: 1,
    name: "해운대 오션 스테이",
    meta: "부산 · 해운대 · 오션뷰 호텔",
    price: "149,000원",
    status: "즉시 확정",
  },
  {
    lodgingId: 5,
    name: "여수 선셋 마리나",
    meta: "전남 · 여수 · 마리나 리조트",
    price: "209,000원",
    status: "노을 특가",
  },
];

export const rewardSummaries = [
  { label: "보유 쿠폰", value: "04", tone: "mint" },
  { label: "사용 가능 마일리지", value: "18,400", tone: "sand" },
  { label: "이번 달 적립", value: "2,100", tone: "blue" },
];

export const couponRows = [
  { id: 1, name: "주말 12,000원 할인", status: "사용 가능", expire: "04.14 만료", target: "국내 숙소", issuedAt: "2026.03.20" },
  { id: 2, name: "제주 연박 10% 할인", status: "사용 가능", expire: "04.30 만료", target: "제주 숙소", issuedAt: "2026.03.18" },
  { id: 3, name: "신규 회원 웰컴 쿠폰", status: "사용 완료", expire: "사용 완료", target: "전 숙소", issuedAt: "2026.03.04" },
  { id: 4, name: "벚꽃 시즌 8,000원 할인", status: "만료 예정", expire: "03.31 만료", target: "서울 숙소", issuedAt: "2026.03.01" },
];

export const mileageHistoryRows = [
  { label: "해운대 오션 스테이 예약 적립", amount: "+1,200", time: "2026.03.18", type: "적립" },
  { label: "제주 포레스트 하우스 예약 사용", amount: "-8,000", time: "2026.03.11", type: "사용" },
  { label: "리뷰 작성 보너스", amount: "+500", time: "2026.03.02", type: "적립" },
  { label: "3월 프로모션 적립", amount: "+400", time: "2026.02.26", type: "적립" },
];

export const paymentHistoryRows = [
  {
    bookingNo: "P-24041",
    lodgingName: "해운대 오션 스테이",
    amount: "298,000원",
    status: "PAID",
    detail: "카카오페이 · 2026.03.18",
  },
  {
    bookingNo: "P-24037",
    lodgingName: "강릉 코스트 라운지",
    amount: "-129,000원",
    status: "REFUNDED",
    detail: "신용/체크카드 환불 · 2026.03.12",
  },
  {
    bookingNo: "P-24029",
    lodgingName: "제주 포레스트 하우스",
    amount: "378,000원",
    status: "PAID",
    detail: "네이버페이 · 2026.03.04",
  },
];

export const inquiryRooms = [
  {
    id: 301,
    title: "체크인 시간 문의",
    type: "LODGING",
    status: "OPEN",
    actor: "회원",
    lodging: "해운대 오션 스테이",
    bookingNo: "B-24032",
    updatedAt: "오늘 14:24",
    preview: "당일 객실 상황 확인 후 16시 이전 답변 예정입니다.",
  },
  {
    id: 302,
    title: "예약 변경 요청",
    type: "BOOKING",
    status: "ANSWERED",
    actor: "회원",
    lodging: "제주 포레스트 하우스",
    bookingNo: "B-24031",
    updatedAt: "어제 18:40",
    preview: "체크아웃 날짜 변경 가능 여부를 확인해 드렸습니다.",
  },
  {
    id: 303,
    title: "결제 취소 문의",
    type: "PAYMENT",
    status: "CLOSED",
    actor: "회원",
    lodging: "강릉 코스트 라운지",
    bookingNo: "B-24029",
    updatedAt: "03.20 11:10",
    preview: "카드 취소와 환불 예정 시각을 안내했습니다.",
  },
];

export const inquiryMessages = {
  301: [
    { id: 1, sender: "회원", time: "오늘 14:10", body: "체크인 시간을 1시간 정도 앞당길 수 있는지 문의드립니다." },
    { id: 2, sender: "판매자", time: "오늘 14:24", body: "당일 객실 상황 확인 후 16시 이전 다시 안내드리겠습니다." },
  ],
  302: [
    { id: 1, sender: "회원", time: "어제 18:02", body: "체크아웃 날짜를 하루 연장할 수 있을까요?" },
    { id: 2, sender: "판매자", time: "어제 18:40", body: "연장 가능한 객실로 확인되어 추가 결제 후 변경 가능합니다." },
  ],
  303: [
    { id: 1, sender: "회원", time: "03.20 09:55", body: "결제 취소 처리되었는지 확인 부탁드립니다." },
    { id: 2, sender: "관리자", time: "03.20 11:10", body: "결제 취소 완료되었고 카드사 환불 반영은 영업일 기준 2~3일 소요됩니다." },
  ],
};

export const myInquiryThreadsSeed = inquiryRooms.map((room) => ({
  id: room.id,
  title: room.title,
  type: room.type,
  status: room.status,
  lodging: room.lodging,
  bookingNo: room.bookingNo,
  updatedAt: room.updatedAt,
  createdAt: room.updatedAt,
  body: inquiryMessages[room.id]?.[0]?.body ?? room.preview,
  preview: room.preview,
  messages: inquiryMessages[room.id] ?? [],
}));
