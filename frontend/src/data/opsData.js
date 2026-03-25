export const sellerApplicationStatus = [
  { label: "현재 상태", value: "PENDING", display: "승인 대기", tone: "sand" },
  { label: "제출 서류", value: "03", display: "3건 제출", tone: "mint" },
  { label: "최근 보완 요청", value: "01", display: "1건 확인", tone: "blue" },
];

export const sellerApplicationSteps = [
  "사업자 정보와 정산 계좌 등록",
  "대표 숙소 기본 정보 입력",
  "운영 정책과 취소 규정 확인",
  "승인 결과는 판매자센터에서 확인",
];

export const sellerRoomRows = [
  {
    name: "디럭스 더블",
    type: "더블",
    lodging: "해운대 오션 스테이",
    status: "AVAILABLE",
    capacity: "2인",
    price: "149,000원",
  },
  {
    name: "오션 스위트",
    type: "스위트",
    lodging: "해운대 오션 스테이",
    status: "UNAVAILABLE",
    capacity: "4인",
    price: "229,000원",
  },
  {
    name: "독채 스위트",
    type: "패밀리",
    lodging: "제주 포레스트 하우스",
    status: "AVAILABLE",
    capacity: "4인",
    price: "189,000원",
  },
];

export const sellerImageRows = [
  { lodging: "해운대 오션 스테이", type: "대표 이미지", order: "1", status: "노출중" },
  { lodging: "해운대 오션 스테이", type: "일반 이미지", order: "2", status: "노출중" },
  { lodging: "제주 포레스트 하우스", type: "대표 이미지", order: "1", status: "검수중" },
];

export const adminEventRows = [
  { title: "제주 봄 시즌 특가", status: "노출중", target: "국내숙소", period: "03.22 - 04.14" },
  { title: "주말 즉시 할인 쿠폰", status: "발급중", target: "전 회원", period: "상시" },
  { title: "서울 시티 스테이 기획전", status: "검수중", target: "서울 숙소", period: "04.01 - 04.30" },
];

export const adminReviewRows = [
  { lodging: "해운대 오션 스테이", author: "김민수", score: "4.8", status: "노출", report: "0건", summary: "전망과 접근성 만족도가 높다는 후기" },
  { lodging: "제주 포레스트 하우스", author: "이서연", score: "4.5", status: "숨김", report: "2건", summary: "객실 청결 이슈로 검토 중인 후기" },
  { lodging: "강릉 코스트 라운지", author: "박준호", score: "5.0", status: "노출", report: "0건", summary: "조식과 오션뷰 만족도가 높은 후기" },
];
