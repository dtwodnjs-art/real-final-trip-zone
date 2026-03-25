export const quickLinks = [
  { title: "요구사항 명세서", href: "/submission-html/docs/requirements.html", kind: "문서" },
  { title: "기능 명세서", href: "/submission-html/docs/features.html", kind: "문서" },
  { title: "구조 명세서", href: "/submission-html/docs/structure.html", kind: "문서" },
  { title: "DB 명세서", href: "/submission-html/docs/database.html", kind: "문서" },
  { title: "발표 자료", href: "/submission-html/presentation/index.html", kind: "발표" },
];

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
