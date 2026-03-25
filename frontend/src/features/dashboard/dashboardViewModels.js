import {
  adminInquiryRows,
  adminTasks,
  auditLogRows,
  reservationRows,
  sellerLodgings,
  sellerMetrics,
  sellerRows,
  sellerTasks,
  userRows,
} from "../../data/dashboardData";

const monthlyOps = [
  { month: "1월", revenue: 1248, bookings: 94 },
  { month: "2월", revenue: 1386, bookings: 102 },
  { month: "3월", revenue: 1654, bookings: 121 },
  { month: "4월", revenue: 1822, bookings: 133 },
  { month: "5월", revenue: 2015, bookings: 146 },
  { month: "6월", revenue: 2243, bookings: 158 },
];

function formatMetricValue(value) {
  return String(value).padStart(2, "0");
}

export function getAdminDashboardViewModel() {
  const blockedUsers = userRows.filter((item) => item.status === "BLOCKED");
  const dormantUsers = userRows.filter((item) => item.status === "DORMANT");
  const attentionUsers = [...blockedUsers, ...dormantUsers].slice(0, 2);
  const pendingSellers = sellerRows.filter((item) => item.status === "PENDING").length;
  const openInquiries = adminInquiryRows.filter((item) => item.status === "OPEN").length;
  const peakRevenue = Math.max(...monthlyOps.map((item) => item.revenue));

  return {
    header: {
      eyebrow: "관리자센터",
      title: "운영 워크스페이스",
      description: "승인, 회원 상태, 문의 흐름을 한 화면에서 바로 판단하고 처리합니다.",
      links: [
        { label: "판매자 승인", to: "/admin/sellers" },
        { label: "회원 관리", to: "/admin/users" },
        { label: "문의 모니터링", to: "/admin/inquiries" },
        { label: "이벤트 · 쿠폰", to: "/admin/events" },
        { label: "리뷰 운영", to: "/admin/reviews" },
      ],
    },
    metrics: [
      { label: "승인 대기 판매자", value: formatMetricValue(pendingSellers) },
      { label: "미답변 문의", value: formatMetricValue(openInquiries) },
      { label: "차단 회원", value: formatMetricValue(blockedUsers.length) },
      { label: "오늘 조치", value: formatMetricValue(auditLogRows.length) },
    ],
    watchRows: [
      ...sellerRows.map((item) => ({
        kind: "판매자",
        title: item.business,
        status: item.status,
        meta: `${item.owner} · ${item.region}`,
        to: "/admin/sellers",
      })),
      ...adminInquiryRows.map((item) => ({
        kind: "문의",
        title: item.title,
        status: item.status,
        meta: `${item.owner} · ${item.type}`,
        to: "/admin/inquiries",
      })),
    ].slice(0, 6),
    logs: auditLogRows.map((item) => ({
      title: item.action,
      subtitle: item.actor,
      target: item.target,
      time: item.time,
    })),
    trends: monthlyOps.map((item) => ({
      label: item.month,
      metric: `${item.revenue}만`,
      meta: `${item.bookings}건`,
      fill: `${(item.revenue / peakRevenue) * 100}%`,
    })),
    attentionUsers: attentionUsers.map((item) => ({
      status: item.status,
      role: item.role,
      name: item.name,
      email: item.email,
    })),
    facts: [
      { label: "차단 회원", value: formatMetricValue(blockedUsers.length) },
      { label: "휴면 회원", value: formatMetricValue(dormantUsers.length) },
    ],
    checklist: adminTasks,
  };
}

export function getSellerDashboardViewModel() {
  const todayReservations = reservationRows.slice(0, 4);
  const activeLodgings = sellerLodgings.filter((item) => item.status === "ACTIVE").length;
  const waitingInquiries = sellerMetrics.find((item) => item.label === "답변 대기 문의")?.value ?? "00";
  const todayCheckIns = sellerMetrics.find((item) => item.label === "오늘 체크인")?.value ?? "00";
  const availableRooms = sellerMetrics.find((item) => item.label === "가동 객실")?.value ?? "00";

  return {
    header: {
      eyebrow: "판매자센터",
      title: "운영 워크스페이스",
      description: "오늘 체크인, 답변 대기 문의, 숙소 운영 상태를 바로 확인하고 처리합니다.",
      links: [
        { label: "예약 관리", to: "/seller/reservations" },
        { label: "문의 관리", to: "/seller/inquiries" },
        { label: "숙소 관리", to: "/seller/lodgings" },
        { label: "객실 관리", to: "/seller/rooms" },
        { label: "이미지 관리", to: "/seller/assets" },
      ],
    },
    metrics: [
      { label: "오늘 체크인", value: formatMetricValue(todayCheckIns) },
      { label: "답변 대기 문의", value: formatMetricValue(waitingInquiries) },
      { label: "운영 숙소", value: formatMetricValue(activeLodgings) },
      { label: "가동 객실", value: formatMetricValue(availableRooms) },
    ],
    reservationRows: todayReservations.map((item) => ({
      no: item.no,
      guest: item.guest,
      status: item.status,
      detail: `${item.stay} · ${item.amount}`,
      to: "/seller/reservations",
    })),
    lodgingRows: sellerLodgings.map((lodging) => ({
      region: lodging.region,
      name: lodging.name,
      status: lodging.status,
      detail: `객실 ${lodging.roomCount}개 · 문의 ${lodging.inquiryCount}건 · 점유율 ${lodging.occupancy}`,
      to: "/seller/lodgings",
    })),
    checklist: sellerTasks,
    quickLinks: [
      { title: "문의 관리", subtitle: "답변 대기 확인", to: "/seller/inquiries" },
      { title: "객실 관리", subtitle: "판매 가능 상태 확인", to: "/seller/rooms" },
      { title: "이미지 관리", subtitle: "대표 이미지 정리", to: "/seller/assets" },
      { title: "판매자 신청", subtitle: "승인 상태 확인", to: "/seller/apply" },
    ],
  };
}
