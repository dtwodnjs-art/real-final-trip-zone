import { del, get, patch, post } from "../lib/appClient";
import { readAuthSession } from "../features/auth/authSession";

// Current backend note:
// Booking/payment can adapt to current backend DTOs.
// Inquiry must keep design-doc target shape first:
// InquiryRoom + InquiryMessage, OPEN/ANSWERED/CLOSED/BLOCKED.

export async function getMyHome() {
  return get("/api/mypage/home");
}

export async function getMyProfileSummary() {
  const response = await get("/api/mypage/profile");
  return response.summary;
}

export async function getMyProfileDetails() {
  const response = await get("/api/mypage/profile");
  return response.details ?? [];
}

export async function getMyBookings() {
  const response = await get("/api/mypage/bookings");
  return response.items ?? [];
}

export async function getMyBookingById(bookingId) {
  const rows = await getMyBookings();
  return rows.find((item) => String(item.bookingId) === String(bookingId)) ?? null;
}

export async function getMyPayments() {
  const response = await get("/api/mypage/payments");
  return response.items ?? [];
}

export async function getMyPaymentByBookingId(bookingId) {
  const rows = await getMyPayments();
  return rows.find((item) => String(item.bookingId) === String(bookingId)) ?? null;
}

function resolveCouponTarget(name = "") {
  if (name.includes("제주")) return "제주 숙소";
  if (name.includes("서울")) return "서울 숙소";
  if (name.includes("국내")) return "국내 숙소";
  if (name.includes("첫구매")) return "첫 예약 숙소";
  return "전 숙소";
}

function toCouponStatusLabel(status) {
  if (status === "ACTIVE") return "사용 가능";
  if (status === "USED") return "사용 완료";
  return "만료 예정";
}

function formatDateValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function formatExpiryLabel(value, status) {
  if (status === "USED") return "사용 완료";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")} 만료`;
}

function mapUserCouponDto(dto) {
  const coupon = dto.couponDTO ?? {};
  const couponStatus = toCouponStatusLabel(dto.status);
  const target = resolveCouponTarget(coupon.couponName);

  return {
    id: dto.userCouponNo ?? dto.couponNo,
    userCouponId: dto.userCouponNo,
    couponName: coupon.couponName,
    name: coupon.couponName,
    couponType: coupon.discountType,
    discountValue: coupon.discountValue,
    discountLabel: coupon.discountType === "RATE" ? `${coupon.discountValue}%` : `${Number(coupon.discountValue ?? 0).toLocaleString()}원`,
    status: couponStatus,
    statusLabel: couponStatus,
    expire: formatExpiryLabel(coupon.endDate, dto.status),
    expiredAt: coupon.endDate,
    target,
    appliesTo: target,
    isUsable: dto.status === "ACTIVE",
    issuedAt: formatDateValue(dto.issuedAt),
  };
}

function mapCouponCatalogDto(dto) {
  const target = resolveCouponTarget(dto.couponName);

  return {
    couponNo: dto.couponNo,
    couponName: dto.couponName,
    name: dto.couponName,
    couponType: dto.discountType,
    discountValue: dto.discountValue,
    discountLabel: dto.discountType === "RATE" ? `${dto.discountValue}%` : `${Number(dto.discountValue ?? 0).toLocaleString()}원`,
    status: toCouponStatusLabel(dto.status),
    statusLabel: toCouponStatusLabel(dto.status),
    expire: formatExpiryLabel(dto.endDate, dto.status),
    expiredAt: dto.endDate,
    target,
    appliesTo: target,
    isUsable: dto.status === "ACTIVE",
    issuedAt: formatDateValue(dto.regDate),
  };
}

export async function fetchCouponCatalog() {
  const rows = await get("/api/coupon/list");
  return rows.map(mapCouponCatalogDto);
}

export async function fetchMyCoupons() {
  const response = await get("/api/usercoupon/list?page=1&size=100");
  return (response.dtoList ?? []).map(mapUserCouponDto);
}

export async function claimMyCoupon(coupon) {
  await post("/api/usercoupon", {
    couponNo: coupon.couponNo ?? coupon.id,
    issuedAt: new Date().toISOString(),
  });

  return { ok: true, rows: await fetchMyCoupons() };
}

export async function getMyMileage() {
  return get("/api/mypage/mileage");
}

export async function getMyWishlist() {
  const response = await get("/api/mypage/wishlist");
  return response.items ?? [];
}

export function getMyInquiryThreads() {
  const session = readAuthSession();
  if (!session?.userNo) return Promise.resolve([]);

  return get(`/api/inquiry/list/${session.userNo}?page=1&size=100`).then((response) =>
    (response.dtoList ?? []).map((item) => ({
      id: item.inquiryNo,
      title: item.title,
      type: item.inquiryType,
      status: item.status,
      bookingNo: "-",
      lodging: "운영 문의",
      updatedAt: formatDateValue(item.updDate || item.regDate) || "방금 전",
      body: item.content ?? "",
    })),
  );
}

export function getMyInquiryThreadById(threadId) {
  return Promise.all([
    get(`/api/inquiry/${threadId}`),
    get("/api/comment/list?page=1&size=200").catch((error) => {
      if (error.message === "HTTP 404") {
        return { dtoList: [] };
      }
      throw error;
    }),
  ]).then(([inquiry, commentResponse]) => {
    const comments = (commentResponse.dtoList ?? []).filter(
      (item) => String(item.inquiryNo) === String(threadId),
    );

    return {
      id: inquiry.inquiryNo,
      title: inquiry.title,
      type: inquiry.inquiryType,
      status: inquiry.status,
      bookingNo: "-",
      lodging: "운영 문의",
      updatedAt: formatDateValue(inquiry.updDate || inquiry.regDate) || "방금 전",
      body: inquiry.content ?? "",
      messages: [
        {
          id: `inquiry-${inquiry.inquiryNo}`,
          sender: "회원",
          time: formatDateValue(inquiry.regDate) || "방금 전",
          body: inquiry.content ?? "",
        },
        ...comments.map((item) => ({
          id: `comment-${item.commentNo}`,
          sender: "운영팀",
          time: "답변 도착",
          body: item.content ?? "",
        })),
      ],
    };
  });
}

export function createInquiryThread(payload) {
  const session = readAuthSession();
  return post("/api/inquiry", {
    userNo: session?.userNo,
    title: payload.title,
    inquiryType: payload.type,
    content: payload.body,
  });
}

export function updateInquiryThread(threadId, payload) {
  return patch(`/api/inquiry/${threadId}`, {
    title: payload.title,
    inquiryType: payload.type,
    content: payload.body,
  });
}

export function removeInquiryThread(threadId) {
  return del(`/api/inquiry/${threadId}`);
}
