export const bookingChecklist = [
  "체크인과 체크아웃 날짜 확인",
  "투숙 인원과 요청사항 입력",
  "할인 쿠폰과 적립 혜택 확인",
  "결제 전 취소 규정과 총액 재확인",
];

export const bookingCouponOptions = [
  { label: "쿠폰 미사용", discount: 0 },
  { label: "주말 12,000원 할인", discount: 12000 },
  { label: "제주 연박 10% 할인", discount: 18000 },
];

export const bookingGuestOptions = [1, 2, 3, 4];

export const bookingPaymentOptions = [
  { label: "신용/체크카드", value: "CARD", pg: "KG이니시스" },
  { label: "카카오페이", value: "KAKAOPAY", pg: "카카오페이" },
  { label: "네이버페이", value: "NAVERPAY", pg: "네이버페이" },
  { label: "무통장입금", value: "BANK", pg: "가상계좌" },
];

export const bookingStatusNotes = [
  "체크인 전까지 예약 정보와 요청사항을 마이페이지에서 수정 가능",
  "무료 취소 가능 시점은 숙소마다 다르므로 결제 전 마지막으로 확인",
  "예약 완료 후 숙소 문의는 내 문의내역에서 바로 이어서 남길 수 있음",
];
