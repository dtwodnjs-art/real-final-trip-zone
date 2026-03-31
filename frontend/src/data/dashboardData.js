export const sellerTasks = [
  "판매자 승인 상태 확인",
  "숙소/객실 등록 화면 연결",
  "예약 요청 목록 확인",
  "문의 응답 채널 확인",
];

export const adminTasks = [
  "판매자 승인/반려/중지",
  "회원 상태 변경",
  "문의 모니터링",
  "이벤트/쿠폰 운영",
];

export const sellerLodgings = [
  {
    id: 101,
    name: "해운대 오션 스테이",
    type: "오션뷰 호텔",
    region: "부산 · 해운대",
    checkTime: "15:00 / 11:00",
    status: "ACTIVE",
    roomCount: 4,
    inquiryCount: 3,
    occupancy: "82%",
  },
  {
    id: 102,
    name: "제주 포레스트 하우스",
    type: "감성 독채",
    region: "제주 · 애월",
    checkTime: "16:00 / 11:00",
    status: "INACTIVE",
    roomCount: 2,
    inquiryCount: 1,
    occupancy: "41%",
  },
];

export const reservationRows = [
  { no: "B-24031", guest: "김민수", stay: "03.25 - 03.27", status: "PENDING", amount: "298,000원" },
  { no: "B-24032", guest: "이서연", stay: "03.26 - 03.27", status: "CONFIRMED", amount: "149,000원" },
  { no: "B-24033", guest: "박준호", stay: "03.27 - 03.29", status: "CANCELED", amount: "258,000원" },
];

export const userRows = [
  { name: "김민수", role: "ROLE_USER", status: "ACTIVE", email: "minsu@tripzone.test" },
  { name: "정하늘", role: "ROLE_HOST", status: "DORMANT", email: "haneul@tripzone.test" },
  { name: "운영관리자", role: "ROLE_ADMIN", status: "ACTIVE", email: "admin@tripzone.test" },
  { name: "최다은", role: "ROLE_USER", status: "BLOCKED", email: "daeun@tripzone.test" },
];

export const sellerRows = [
  { business: "오션 스테이", owner: "김대표", status: "PENDING", region: "부산" },
  { business: "포레스트 하우스", owner: "이대표", status: "APPROVED", region: "제주" },
  { business: "코스트 라운지", owner: "박대표", status: "SUSPENDED", region: "강원" },
];

export const adminInquiryRows = [
  {
    id: 801,
    title: "결제 영수증 재발급 요청",
    type: "PAYMENT",
    status: "OPEN",
    owner: "김민수",
    target: "해운대 오션 스테이",
    date: "오늘 10:42",
    summary: "회사 제출용 결제 영수증 재발급 요청",
    detail: "회원이 3월 결제 영수증 PDF 재발송을 요청했습니다. 결제 승인 정보와 발송 이력을 함께 확인해야 합니다.",
    messages: [
      { id: 1, sender: "회원", time: "오늘 10:42", body: "3월 결제 영수증을 회사 제출용으로 다시 받고 싶습니다." },
    ],
  },
  {
    id: 802,
    title: "예약 취소 수수료 기준 확인",
    type: "BOOKING",
    status: "ANSWERED",
    owner: "박서윤",
    target: "제주 포레스트 하우스",
    date: "어제 18:10",
    summary: "체크인 3일 전 취소 수수료 문의",
    detail: "회원이 체크인 3일 전 취소 시 차감 금액과 무료 취소 마감 시점을 상세히 문의했습니다.",
    messages: [
      { id: 1, sender: "회원", time: "어제 18:10", body: "체크인 3일 전 취소 시 수수료가 어떻게 적용되는지 확인하고 싶습니다." },
      { id: 2, sender: "관리자", time: "어제 18:32", body: "예약 건 기준 무료 취소는 체크인 5일 전까지이며, 이후 취소 시 1박 요금이 차감됩니다." },
    ],
  },
  {
    id: 803,
    title: "계정 인증 메일 재발송 요청",
    type: "SYSTEM",
    status: "CLOSED",
    owner: "정하늘",
    target: "TripZone 계정",
    date: "03.21 09:04",
    summary: "인증 메일 미수신 문의",
    detail: "회원가입 후 인증 메일이 도착하지 않아 재발송과 계정 활성화 확인을 요청한 건입니다.",
    messages: [
      { id: 1, sender: "회원", time: "03.20 21:16", body: "회원가입 인증 메일이 도착하지 않아 재발송을 요청합니다." },
      { id: 2, sender: "관리자", time: "03.20 21:28", body: "인증 메일을 다시 발송했고 스팸함 확인도 함께 안내했습니다." },
      { id: 3, sender: "관리자", time: "03.21 09:04", body: "정상 인증 완료가 확인되어 문의를 종료 처리했습니다." },
    ],
  },
];

export const auditLogRows = [
  { actor: "관리자 김주임", action: "판매자 승인", target: "포레스트 하우스", time: "오늘 09:20", type: "approve" },
  { actor: "관리자 박대리", action: "회원 상태 변경", target: "최다은", time: "오늘 10:14", type: "warn" },
  { actor: "관리자 이과장", action: "쿠폰 비활성화", target: "주말 12,000원 할인", time: "어제 18:02", type: "mute" },
];

export const sellerMetrics = [
  { label: "오늘 체크인", value: "06", meta: "확정 예약 기준", tone: "mint" },
  { label: "답변 대기 문의", value: "03", meta: "OPEN 문의방", tone: "sand" },
  { label: "가동 객실", value: "12", meta: "ACTIVE / AVAILABLE", tone: "blue" },
];

export const adminMetrics = [
  { label: "승인 대기 판매자", value: "07", meta: "PENDING 상태", tone: "sand" },
  { label: "차단 회원", value: "03", meta: "BLOCKED 상태", tone: "mint" },
  { label: "미처리 운영 이슈", value: "05", meta: "문의 / 쿠폰 / 제재", tone: "blue" },
];

export const operationBoards = [
  {
    title: "문서와 구현 연결",
    copy: "설계 기준은 docs와 HTML 산출물에서 확인하고, 프론트는 그 구조를 화면으로 검증한다.",
  },
  {
    title: "운영 상태 우선",
    copy: "판매자와 관리자는 숙소 감성보다 상태, 승인, 문의, 예약 처리 흐름이 먼저 보여야 한다.",
  },
];

export const structureHighlights = [
  "루트 패키지명은 com.kh.trip 고정",
  "문의 모델은 InquiryRoom / InquiryMessage 고정",
  "프론트는 실제 API 기준으로 단계별 연동",
  "백엔드는 최소 기준만 고정 후 팀원이 확장",
];
