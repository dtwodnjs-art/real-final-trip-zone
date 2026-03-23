export const quickLinks = [
  { title: "요구사항 명세서", href: "/submission-html/docs/requirements.html", kind: "문서" },
  { title: "기능 명세서", href: "/submission-html/docs/features.html", kind: "문서" },
  { title: "구조 명세서", href: "/submission-html/docs/structure.html", kind: "문서" },
  { title: "DB 명세서", href: "/submission-html/docs/database.html", kind: "문서" },
  { title: "발표 자료", href: "/submission-html/presentation/index.html", kind: "발표" },
];

export const authProviders = [
  { key: "LOCAL", label: "이메일 로그인", description: "이메일과 비밀번호로 로그인" },
  { key: "KAKAO", label: "카카오", description: "카카오 계정으로 간편 로그인" },
  { key: "NAVER", label: "네이버", description: "네이버 계정으로 간편 로그인" },
  { key: "GOOGLE", label: "구글", description: "구글 계정으로 간편 로그인" },
];

export const defaultLoginForm = {
  provider: "LOCAL",
  email: "tripzone@example.com",
  password: "",
  remember: true,
};

export const defaultSignupForm = {
  provider: "LOCAL",
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "ROLE_USER",
  marketing: false,
};

export const quickThemes = [
  { label: "오션뷰", emoji: "View", to: "/lodgings?theme=ocean" },
  { label: "독채", emoji: "Stay", to: "/lodgings?theme=private" },
  { label: "이번 주말", emoji: "Weekend", to: "/lodgings?theme=weekend" },
  { label: "제주", emoji: "Jeju", to: "/lodgings?region=제주" },
  { label: "부산", emoji: "Busan", to: "/lodgings?region=부산" },
  { label: "가성비", emoji: "Deal", to: "/lodgings?theme=deal" },
];

export const promoBanners = [
  {
    title: "제주 연박 고객\n조식 업그레이드",
    subtitle: "애월과 중문 중심으로 2박 이상 예약 시 혜택을 바로 적용합니다.",
    date: "03.22 - 04.14",
    accent: "sunset",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "서울 시티 스테이\n금토 체크인 특가",
    subtitle: "성수와 도심권에서 금요일 체크인 가능한 객실을 먼저 보여줍니다.",
    date: "03.28 - 03.30",
    accent: "peach",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=80",
  },
];

export const eventBanners = [
  {
    title: "제주 봄 시즌 특가",
    subtitle: "애월과 중문 중심으로 2박 이상 예약 시 조식 업그레이드와 연박 혜택을 바로 적용합니다.",
    action: "제주 숙소 보기",
    href: "/lodgings?region=제주&theme=deal",
  },
  {
    title: "서울 시티 스테이 특가",
    subtitle: "금토 체크인 가능한 도심 숙소를 먼저 보여주고, 체크인 당일 무료 취소 가능한 객실 위주로 구성합니다.",
    action: "서울 숙소 보기",
    href: "/lodgings?region=서울&theme=deal",
  },
  {
    title: "부산 오션뷰 위크",
    subtitle: "해운대와 광안리 중심으로 오션뷰 객실과 주말 쿠폰 적용 숙소를 한 번에 모아둡니다.",
    action: "부산 숙소 보기",
    href: "/lodgings?region=부산&theme=ocean",
  },
];

export const docsPrinciples = [
  {
    title: "문서형 산출물",
    copy: "요구사항, 기능, 구조, DB 문서는 정보 위계와 제출 가독성을 우선한다.",
  },
  {
    title: "발표형 산출물",
    copy: "발표 deck은 왜 이런 구조를 택했는지 빠르게 이해시키는 서사에 집중한다.",
  },
  {
    title: "구현형 산출물",
    copy: "프론트는 목업으로 흐름을 검증하고 나중에 API를 연결하는 방식으로 진행한다.",
  },
];

export const roleData = [
  {
    name: "User",
    subtitle: "탐색과 예약 중심",
    copy: "회원가입, 로그인, 숙소 탐색, 예약, 결제, 리뷰, 문의",
  },
  {
    name: "Seller",
    subtitle: "운영과 응답 중심",
    copy: "판매자 승인 신청, 숙소/객실 등록, 예약 처리, 문의 응답",
  },
  {
    name: "Admin",
    subtitle: "통제와 정책 중심",
    copy: "판매자 승인, 회원 상태 관리, 이벤트/쿠폰, 문의 모니터링",
  },
];

export const lodgings = [
  {
    id: 1,
    name: "해운대 오션 스테이",
    region: "부산",
    district: "해운대",
    type: "오션뷰 호텔",
    price: "149,000원",
    summary: "체크인 15:00 · 체크아웃 11:00 · 리뷰 4.8",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    intro: "해운대 앞에서 일출과 야경을 모두 담는 오션프론트 스테이",
    address: "부산 해운대구 해운대해변로 287",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    highlights: ["도보 3분 해변 접근", "2인 조식 포함", "24시간 프런트"],
    rating: "4.8",
    benefit: "오션뷰 객실 즉시 확정",
    review: "해변 접근성과 객실 전망이 특히 만족스럽다는 후기가 많음",
    cancellation: "체크인 3일 전까지 무료 취소",
    room: "디럭스 더블 · 최대 2인",
    reviewCount: "후기 318개",
    latitude: 35.1587,
    longitude: 129.1604,
  },
  {
    id: 2,
    name: "제주 포레스트 하우스",
    region: "제주",
    district: "애월",
    type: "감성 독채",
    price: "189,000원",
    summary: "최대 4인 · 바비큐 가능 · 리뷰 4.9",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
    intro: "돌담과 숲 사이에 놓인 독채 숙소로 조용한 체류에 맞춘 공간",
    address: "제주 제주시 애월읍 곽지9길 24",
    checkInTime: "16:00",
    checkOutTime: "11:00",
    highlights: ["독립 마당", "바비큐 존", "공항 40분"],
    rating: "4.9",
    benefit: "연박 시 바비큐 세트 제공",
    review: "조용한 동선과 독립적인 공간감 덕분에 가족 단위 선호가 높음",
    cancellation: "체크인 5일 전까지 무료 취소",
    room: "독채 스위트 · 최대 4인",
    reviewCount: "후기 194개",
    latitude: 33.4637,
    longitude: 126.3098,
  },
  {
    id: 3,
    name: "강릉 코스트 라운지",
    region: "강원",
    district: "강릉",
    type: "리조트",
    price: "129,000원",
    summary: "인피니티풀 · 조식 제공 · 리뷰 4.7",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    intro: "바다를 정면으로 바라보는 리조트형 숙소로 짧은 휴식에도 강한 인상",
    address: "강원 강릉시 창해로 307",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    highlights: ["인피니티풀", "오션 라운지", "조식 포함"],
    rating: "4.7",
    benefit: "주중 예약 시 라운지 쿠폰 지급",
    review: "수영장과 조식 만족도가 높고 짧은 1박 일정에 특히 잘 맞음",
    cancellation: "체크인 2일 전까지 무료 취소",
    room: "시그니처 트윈 · 최대 3인",
    reviewCount: "후기 276개",
    latitude: 37.7719,
    longitude: 128.9472,
  },
  {
    id: 4,
    name: "서울 시티 모먼트",
    region: "서울",
    district: "성수",
    type: "부티크 호텔",
    price: "169,000원",
    summary: "도심 접근 · 루프탑 바 · 리뷰 4.6",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=80",
    intro: "성수의 카페 거리와 한강 동선 사이에 놓인 감도 높은 도심형 스테이",
    address: "서울 성동구 연무장길 31",
    checkInTime: "15:00",
    checkOutTime: "12:00",
    highlights: ["루프탑 라운지", "셀프 체크인", "성수역 8분"],
    rating: "4.6",
    benefit: "주말 체크인 고객 웰컴 드링크 제공",
    review: "도심 접근성과 객실 감도가 좋아 짧은 시티 브레이크에 적합",
    cancellation: "체크인 1일 전까지 50% 환불",
    room: "어반 퀸 · 최대 2인",
    reviewCount: "후기 143개",
    latitude: 37.5447,
    longitude: 127.0557,
  },
  {
    id: 5,
    name: "여수 선셋 마리나",
    region: "전남",
    district: "여수",
    type: "마리나 리조트",
    price: "209,000원",
    summary: "마리나 뷰 · 노을 명소 · 리뷰 4.8",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    intro: "선셋 시간대가 가장 아름다운 마리나 앞 리조트형 숙소",
    address: "전남 여수시 오동도로 61-15",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    highlights: ["마리나 선착장", "인룸 다이닝", "오션 테라스"],
    rating: "4.8",
    benefit: "노을 시간 웰컴 플래터 제공",
    review: "노을 전망과 테라스 동선이 강점이라 커플 수요가 높음",
    cancellation: "체크인 4일 전까지 무료 취소",
    room: "테라스 스위트 · 최대 2인",
    reviewCount: "후기 211개",
    latitude: 34.7448,
    longitude: 127.7458,
  },
  {
    id: 6,
    name: "경주 헤리티지 한옥",
    region: "경북",
    district: "경주",
    type: "한옥 스테이",
    price: "159,000원",
    summary: "전통 마당 · 조용한 골목 · 리뷰 4.9",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
    intro: "황리단길과 가까우면서도 밤에는 조용하게 쉬기 좋은 한옥 숙소",
    address: "경북 경주시 포석로 1085",
    checkInTime: "15:30",
    checkOutTime: "11:00",
    highlights: ["전통 마당", "다도 세트", "황리단길 도보권"],
    rating: "4.9",
    benefit: "체크인 고객 전통차 제공",
    review: "분위기와 위치 밸런스가 좋아 재방문 후기 비율이 높음",
    cancellation: "체크인 3일 전까지 무료 취소",
    room: "한옥 온돌룸 · 최대 3인",
    reviewCount: "후기 167개",
    latitude: 35.8384,
    longitude: 129.2111,
  },
];

export const lodgingCollections = [
  { title: "이번 주말 예약 가능한 부산 숙소", region: "부산", ids: [1, 4, 3, 5] },
  { title: "제주 감도 높은 독채 스테이", region: "제주", ids: [2, 6, 5, 1] },
  { title: "짧은 휴식에 맞는 바다 숙소", region: "강원", ids: [3, 1, 5, 4] },
];

export const searchSuggestions = [
  "제주",
  "부산",
  "강릉",
  "서울",
  "여수",
  "경주",
  "해운대",
  "애월",
  "성수",
  "오션뷰",
  "독채",
  "리조트",
];

export const searchSuggestionItems = [
  { label: "영종도", subtitle: "인천광역시 중구", type: "region" },
  { label: "인스파이어 엔터테인먼트 리조트", subtitle: "호텔, 인천 중구", type: "hotel" },
  { label: "영등포역", subtitle: "서울특별시 > 1호선", type: "station" },
  { label: "을왕리", subtitle: "인천광역시 중구", type: "region" },
  { label: "안면도", subtitle: "충청남도 태안군", type: "region" },
  { label: "용산역", subtitle: "서울특별시 > 1호선,경의중앙", type: "station" },
  { label: "오이도", subtitle: "경기도 시흥시", type: "region" },
  { label: "여의도", subtitle: "서울특별시 영등포구", type: "region" },
  { label: "해운대", subtitle: "부산광역시 해운대구", type: "region" },
  { label: "제주신라호텔", subtitle: "호텔, 제주 서귀포시", type: "hotel" },
];

export const homeSearchDefaults = {
  keyword: "",
  checkIn: "2026-03-29",
  checkOut: "2026-03-30",
  guests: "2",
};

export const destinationStats = [
  { label: "오늘 확인 가능한 숙소", value: "128+" },
  { label: "이번 주말 특가", value: "24" },
  { label: "즉시 확정 객실", value: "56" },
];

export const listFilters = [
  { label: "전체", value: "all" },
  { label: "오션뷰", value: "ocean" },
  { label: "무료 취소", value: "cancel" },
  { label: "조식 포함", value: "breakfast" },
  { label: "가성비", value: "deal" },
  { label: "독채", value: "private" },
];

export const lodgingSortOptions = [
  { label: "추천순", value: "recommended" },
  { label: "랭킹순", value: "ranking" },
  { label: "평점순", value: "rating" },
  { label: "후기 많은순", value: "reviews" },
  { label: "가격 낮은순", value: "price_low" },
  { label: "가격 높은순", value: "price_high" },
];

export const detailMoments = [
  "숙소 위치와 주변 분위기를 먼저 확인",
  "가격, 후기, 취소 조건을 한 번에 비교",
  "예약 전 문의와 객실 선택 동선을 바로 이어가기",
];

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

export const lodgingReviews = [
  {
    author: "김민지",
    score: "5.0",
    stay: "친구와 1박",
    body: "해변이 가까워서 이동이 편했고, 객실 컨디션이 예상보다 좋았습니다.",
  },
  {
    author: "박준호",
    score: "4.8",
    stay: "커플 2박",
    body: "오션뷰와 조식 만족도가 높았고 체크인 동선도 깔끔했습니다.",
  },
  {
    author: "이서연",
    score: "4.7",
    stay: "가족 1박",
    body: "객실이 넓고 취소 규정이 명확해서 예약 결정이 쉬웠습니다.",
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

export const sellerTasks = [
  "판매자 승인 상태 확인",
  "숙소/객실 등록 화면 연결",
  "예약 요청 목록 확인",
  "문의 응답 채널 확인",
];

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

export const reservationRows = [
  { no: "B-24031", guest: "김민수", stay: "03.25 - 03.27", status: "PENDING", amount: "298,000원" },
  { no: "B-24032", guest: "이서연", stay: "03.26 - 03.27", status: "CONFIRMED", amount: "149,000원" },
  { no: "B-24033", guest: "박준호", stay: "03.27 - 03.29", status: "CANCELED", amount: "258,000원" },
];

export const userRows = [
  { name: "김민수", role: "ROLE_USER", status: "ACTIVE", email: "minsu@tripzone.test" },
  { name: "정하늘", role: "ROLE_HOST", status: "DORMANT", email: "haneul@tripzone.test" },
  { name: "최다은", role: "ROLE_USER", status: "BLOCKED", email: "daeun@tripzone.test" },
];

export const sellerRows = [
  { business: "오션 스테이", owner: "김대표", status: "PENDING", region: "부산" },
  { business: "포레스트 하우스", owner: "이대표", status: "APPROVED", region: "제주" },
  { business: "코스트 라운지", owner: "박대표", status: "SUSPENDED", region: "강원" },
];

export const adminEventRows = [
  { title: "제주 봄 시즌 특가", status: "노출중", target: "국내숙소", period: "03.22 - 04.14" },
  { title: "주말 즉시 할인 쿠폰", status: "발급중", target: "전 회원", period: "상시" },
  { title: "서울 시티 스테이 기획전", status: "검수중", target: "서울 숙소", period: "04.01 - 04.30" },
];

export const adminInquiryRows = [
  { title: "해운대 오션 스테이 체크인 시간 문의", type: "BOOKING", status: "OPEN", owner: "김민수", target: "해운대 오션 스테이" },
  { title: "제주 포레스트 하우스 결제 영수증 요청", type: "PAYMENT", status: "ANSWERED", owner: "박서윤", target: "제주 포레스트 하우스" },
  { title: "서울 시티 모먼트 시설 점검 문의", type: "SYSTEM", status: "CLOSED", owner: "정하늘", target: "서울 시티 모먼트" },
];

export const adminReviewRows = [
  { lodging: "해운대 오션 스테이", author: "김민수", score: "4.8", status: "노출", report: "0건", summary: "전망과 접근성 만족도가 높다는 후기" },
  { lodging: "제주 포레스트 하우스", author: "이서연", score: "4.5", status: "숨김", report: "2건", summary: "객실 청결 이슈로 검토 중인 후기" },
  { lodging: "강릉 코스트 라운지", author: "박준호", score: "5.0", status: "노출", report: "0건", summary: "조식과 오션뷰 만족도가 높은 후기" },
];

export const auditLogRows = [
  { actor: "관리자 김주임", action: "판매자 승인", target: "포레스트 하우스", time: "오늘 09:20" },
  { actor: "관리자 박대리", action: "회원 상태 변경", target: "최다은", time: "오늘 10:14" },
  { actor: "관리자 이과장", action: "쿠폰 비활성화", target: "주말 12,000원 할인", time: "어제 18:02" },
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
  "프론트는 mock 기반으로 우선 개발",
  "백엔드는 최소 기준만 고정 후 팀원이 확장",
];
