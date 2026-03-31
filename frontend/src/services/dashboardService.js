import { readAuthSession } from "../features/auth/authSession";
import { get } from "../lib/appClient";
import { getSellerInquiryRooms } from "./sellerInquiryService";

function formatDateLabel(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function formatDateTimeLabel(value) {
  if (!value) return "아직 제출 전";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatMoney(value) {
  const numeric = Number(value ?? 0);
  if (!Number.isFinite(numeric) || numeric <= 0) return "-";
  return `${numeric.toLocaleString()}원`;
}

function formatDateRange(startDate, endDate) {
  if (!startDate || !endDate) return "-";
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "-";
  return `${String(start.getMonth() + 1).padStart(2, "0")}.${String(start.getDate()).padStart(2, "0")} - ${String(end.getMonth() + 1).padStart(2, "0")}.${String(end.getDate()).padStart(2, "0")}`;
}

function mapEnabledStatus(enabled) {
  return enabled === "1" || enabled === "true" || enabled === true ? "ACTIVE" : "DELETED";
}

function mapInquiryStatus(status) {
  if (status === "COMPLETED") return "ANSWERED";
  if (status === "DELETE") return "CLOSED";
  return "OPEN";
}

function mapAdminUserDto(dto) {
  return {
    id: dto.userNo,
    name: dto.userName ?? `회원 ${dto.userNo}`,
    role: "ROLE_USER",
    status: mapEnabledStatus(dto.enabled),
    email: dto.email ?? "-",
    phone: dto.phone ?? "-",
    grade: dto.gradeName ?? "-",
  };
}

function mapHostProfileDto(dto) {
  return {
    id: dto.hostNo,
    hostNo: dto.hostNo,
    userNo: dto.userNo,
    business: dto.businessName ?? `호스트 ${dto.hostNo}`,
    owner: dto.ownerName ?? "-",
    status: dto.approvalStatus ?? "PENDING",
    region: "-",
    businessNo: dto.businessNumber ?? "-",
    rejectReason: dto.rejectReason ?? "",
  };
}

function mapEventDto(dto) {
  return {
    id: dto.eventNo,
    title: dto.title ?? `이벤트 ${dto.eventNo}`,
    status: dto.status ?? "-",
    target: dto.couponNames?.length ? dto.couponNames.join(", ") : "전체 회원",
    period: formatDateRange(dto.startDate, dto.endDate),
    content: dto.content ?? "",
  };
}

function mapInquiryDto(dto, comments = []) {
  return {
    id: dto.inquiryNo,
    title: dto.title ?? `문의 ${dto.inquiryNo}`,
    type: dto.inquiryType ?? "SYSTEM",
    status: mapInquiryStatus(dto.status),
    date: formatDateLabel(dto.regDate),
    owner: `회원 ${dto.userNo ?? "-"}`,
    summary: dto.content ?? "",
    messages: [
      {
        id: `inquiry-${dto.inquiryNo}`,
        sender: "회원",
        time: formatDateLabel(dto.regDate),
        body: dto.content ?? "",
      },
      ...comments.map((comment) => ({
        id: `comment-${comment.commentNo}`,
        sender: "운영팀",
        time: "답변 도착",
        body: comment.content ?? "",
      })),
    ],
  };
}

function mapReservationDto(dto) {
  return {
    id: dto.bookingNo,
    no: dto.bookingNo,
    guest: dto.userNo ? `회원 ${dto.userNo}` : "-",
    stay: `${formatDateLabel(dto.checkInDate)} - ${formatDateLabel(dto.checkOutDate)}`,
    status: dto.status ?? "PENDING",
    amount: formatMoney(dto.totalPrice),
    detail: `${dto.lodgingName ?? "숙소 확인"} · ${dto.roomName ?? "객실 확인"}`,
  };
}

function mapSellerLodgingDto(dto) {
  const roomCount = dto.rooms?.reduce((sum, room) => sum + Number(room.roomCount ?? 0), 0) ?? 0;

  return {
    id: dto.lodgingNo,
    name: dto.lodgingName ?? `숙소 ${dto.lodgingNo}`,
    type: dto.lodgingType ?? "-",
    region: dto.region ?? "-",
    status: dto.status ?? "INACTIVE",
    roomCount,
    occupancy: "-",
    inquiryCount: 0,
    uploadFileNames: dto.uploadFileNames ?? [],
    rooms: dto.rooms ?? [],
  };
}

function mapSellerRoomDto(room, lodgingName) {
  return {
    id: room.roomNo,
    name: room.roomName ?? `객실 ${room.roomNo}`,
    type: room.roomType ?? "-",
    lodging: lodgingName,
    status: room.status ?? "UNAVAILABLE",
    capacity: room.maxGuestCount ? `${room.maxGuestCount}인` : "-",
    price: formatMoney(room.pricePerNight),
  };
}

function mapSellerAssetRows(lodging) {
  const images = lodging.uploadFileNames?.length ? lodging.uploadFileNames : [];
  if (!images.length) {
    return [
      {
        id: `${lodging.id}-placeholder`,
        lodging: lodging.name,
        type: "대표 이미지",
        order: "1",
        status: "미등록",
      },
    ];
  }

  return images.map((_, index) => ({
    id: `${lodging.id}-${index}`,
    lodging: lodging.name,
    type: index === 0 ? "대표 이미지" : "일반 이미지",
    order: String(index + 1),
    status: "노출중",
  }));
}

async function getCurrentHostProfile() {
  const session = readAuthSession();
  if (!session?.userNo) return null;

  const hosts = await get("/api/hosts");
  return hosts.find((item) => Number(item.userNo) === Number(session.userNo)) ?? null;
}

export function getDashboardDataSource() {
  return "http";
}

export function getAdminTasks() {
  return [];
}

export function getSellerTasks() {
  return [];
}

export async function getAdminUsers() {
  const response = await get("/api/admin/admin/userlist?page=1&size=100");
  return (response.dtoList ?? []).map(mapAdminUserDto);
}

export async function updateAdminUserStatus() {
  throw new Error("회원 상태 변경 API 계약 확인 후 연결합니다.");
}

export async function getAdminSellers() {
  const rows = await get("/api/hosts");
  return rows.map(mapHostProfileDto);
}

export async function updateAdminSellerStatus() {
  throw new Error("판매자 승인/반려 액션은 백엔드 계약 정리 후 연결합니다.");
}

export async function getAdminEvents() {
  const response = await get("/api/event/list?page=1&size=100");
  return (response.dtoList ?? []).map(mapEventDto);
}

export async function updateAdminEventStatus() {
  throw new Error("이벤트 상태 변경은 백엔드 폼 계약 정리 후 연결합니다.");
}

export async function saveAdminEvent() {
  throw new Error("이벤트 수정은 백엔드 폼 계약 정리 후 연결합니다.");
}

export async function getAdminInquiries() {
  const [inquiryResponse, commentResponse] = await Promise.all([
    get("/api/inquiry/list?page=1&size=100"),
    get("/api/comment/list?page=1&size=200").catch(() => ({ dtoList: [] })),
  ]);
  const comments = commentResponse.dtoList ?? [];
  return (inquiryResponse.dtoList ?? []).map((dto) =>
    mapInquiryDto(
      dto,
      comments.filter((comment) => Number(comment.inquiryNo) === Number(dto.inquiryNo)),
    ),
  );
}

export async function updateAdminInquiryStatus() {
  throw new Error("관리자 문의 상태 변경은 백엔드 상태값 정리 후 연결합니다.");
}

export async function getAdminReviews() {
  const lodgings = await get("/api/lodgings/list");
  const reviewGroups = await Promise.all(
    lodgings.map(async (lodging) => ({
      lodging,
      reviews: await get(`/api/reviews/lodgings/${lodging.lodgingNo}`).catch(() => []),
    })),
  );

  return reviewGroups.flatMap(({ lodging, reviews }) =>
    reviews.map((review) => ({
      id: review.reviewNo,
      lodging: lodging.lodgingName ?? `숙소 ${lodging.lodgingNo}`,
      author: `회원 ${review.userNo ?? "-"}`,
      score: Number(review.rating ?? 0).toFixed(1),
      status: "VISIBLE",
      report: "0건",
      summary: review.content ?? "",
    })),
  );
}

export async function updateAdminReviewStatus() {
  throw new Error("리뷰 운영 상태 변경 API가 없어 읽기 전용으로 유지합니다.");
}

export function getAdminAuditLogs() {
  return [];
}

export async function getSellerLodgings() {
  const host = await getCurrentHostProfile();
  if (!host) return [];

  const lodgings = await get("/api/lodgings/list");
  return lodgings
    .filter((item) => Number(item.hostNo) === Number(host.hostNo))
    .map(mapSellerLodgingDto);
}

export async function updateSellerLodgingStatus() {
  throw new Error("숙소 상태 변경은 백엔드 수정 계약 정리 후 연결합니다.");
}

export async function getSellerReservations() {
  const host = await getCurrentHostProfile();
  if (!host) return [];

  const response = await get(`/api/seller/hostlist/${host.hostNo}?page=1&size=100`);
  return (response.dtoList ?? []).map(mapReservationDto);
}

export async function updateSellerReservationStatus() {
  throw new Error("예약 상태 변경 API가 없어 읽기 전용으로 유지합니다.");
}

export async function getSellerRooms() {
  const lodgings = await getSellerLodgings();
  return lodgings.flatMap((lodging) =>
    (lodging.rooms ?? []).map((room) => mapSellerRoomDto(room, lodging.name)),
  );
}

export async function updateSellerRoomStatus() {
  throw new Error("객실 상태 변경은 백엔드 수정 계약 정리 후 연결합니다.");
}

export async function getSellerAssets() {
  const lodgings = await getSellerLodgings();
  return lodgings.flatMap(mapSellerAssetRows);
}

export async function updateSellerAsset() {
  throw new Error("이미지 운영 수정 API가 없어 읽기 전용으로 유지합니다.");
}

export function getSellerApplicationTemplate() {
  return [
    { label: "현재 상태", value: "PENDING", display: "승인 대기", tone: "sand" },
    { label: "서류 접수", value: "PENDING", display: "백엔드 보강 대기", tone: "mint" },
    { label: "계좌 연동", value: "BLOCKED", display: "정산 계좌 컬럼 필요", tone: "blue" },
  ];
}

export function getSellerApplicationSteps() {
  return [
    "사업자 정보와 정산 계좌 등록",
    "대표 숙소 기본 정보 입력",
    "운영 정책과 취소 규정 확인",
    "승인 결과는 판매자센터에서 확인",
  ];
}

export async function getSellerApplicationDraft() {
  const host = await getCurrentHostProfile();
  return {
    status: host?.approvalStatus ?? "PENDING",
    businessNo: host?.businessNumber ?? "",
    businessName: host?.businessName ?? "",
    owner: host?.ownerName ?? "",
    account: "",
    submittedAt: host ? formatDateTimeLabel(new Date().toISOString()) : null,
  };
}

export async function getSellerMetrics() {
  const [lodgings, reservations, inquiries] = await Promise.all([
    getSellerLodgings(),
    getSellerReservations(),
    getSellerInquiryRooms().catch(() => []),
  ]);

  return [
    { label: "오늘 체크인", value: String(reservations.filter((item) => item.status === "CONFIRMED").length).padStart(2, "0") },
    { label: "답변 대기 문의", value: String(inquiries.filter((item) => item.status === "OPEN").length).padStart(2, "0") },
    { label: "운영 숙소", value: String(lodgings.filter((item) => item.status === "ACTIVE").length).padStart(2, "0") },
    { label: "가동 객실", value: String(lodgings.reduce((sum, item) => sum + Number(item.roomCount ?? 0), 0)).padStart(2, "0") },
  ];
}

export async function getAdminDashboardSnapshot() {
  const [users, sellers, adminInquiries] = await Promise.all([
    getAdminUsers().catch(() => []),
    getAdminSellers().catch(() => []),
    getAdminInquiries().catch(() => []),
  ]);

  return {
    adminTasks: [],
    adminInquiries,
    auditLogs: [],
    sellers,
    users,
  };
}

export async function getSellerDashboardSnapshot() {
  const [lodgings, reservations, metrics] = await Promise.all([
    getSellerLodgings().catch(() => []),
    getSellerReservations().catch(() => []),
    getSellerMetrics().catch(() => []),
  ]);

  return {
    sellerTasks: [],
    metrics,
    lodgings,
    reservations,
    inquiries: [],
  };
}
