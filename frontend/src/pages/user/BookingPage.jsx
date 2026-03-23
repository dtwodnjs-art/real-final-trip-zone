import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  bookingChecklist,
  bookingCouponOptions,
  bookingGuestOptions,
  bookingPaymentOptions,
  bookingStatusNotes,
  lodgings,
} from "../../data/siteData";
import { readAuthSession } from "../../utils/authSession";

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function parseISO(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function monthGrid(baseDate) {
  const first = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
}

function sameDate(left, right) {
  return (
    left &&
    right &&
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function betweenDate(day, start, end) {
  if (!start || !end) return false;
  const time = day.getTime();
  return time > start.getTime() && time < end.getTime();
}

function computePosition(anchorRect, wantedWidth, wantedHeight) {
  const margin = 12;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const left = clamp(anchorRect.left, margin, viewportWidth - wantedWidth - margin);
  let top = anchorRect.bottom + 8;

  if (top + wantedHeight > viewportHeight - margin) {
    top = clamp(anchorRect.top - wantedHeight - 8, margin, viewportHeight - wantedHeight - margin);
  }

  return { left, top };
}

function formatDateSummary(checkIn, checkOut) {
  const start = parseISO(checkIn);
  const end = parseISO(checkOut);
  if (!start || !end) return "날짜를 선택하세요";
  const nights = Math.max(0, Math.floor((end.getTime() - start.getTime()) / 86400000));
  return `${start.getMonth() + 1}.${start.getDate()} ${WEEK_DAYS[start.getDay()]} - ${end.getMonth() + 1}.${end.getDate()} ${WEEK_DAYS[end.getDay()]} · ${nights}박`;
}

function CalendarMonth({ baseDate, startDate, endDate, onPick }) {
  const days = monthGrid(baseDate);

  return (
    <div className="calendar-month">
      <div className="calendar-month-head">
        <strong>
          {baseDate.getFullYear()}.{String(baseDate.getMonth() + 1).padStart(2, "0")}
        </strong>
      </div>
      <div className="calendar-week-row">
        {WEEK_DAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="calendar-grid">
        {days.map((day) => {
          const isCurrentMonth = day.getMonth() === baseDate.getMonth();
          const isStart = sameDate(day, startDate);
          const isEnd = sameDate(day, endDate);
          const isBetween = betweenDate(day, startDate, endDate);

          if (!isCurrentMonth) {
            return <span key={toISO(day)} className="calendar-day-placeholder" aria-hidden="true" />;
          }

          return (
            <button
              key={toISO(day)}
              type="button"
              className={`calendar-day${isStart ? " is-start" : ""}${isEnd ? " is-end" : ""}${isBetween ? " is-between" : ""}`}
              onClick={() => onPick(day)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DateRangePopover({ open, anchorRef, panelRef, visibleMonth, setVisibleMonth, checkIn, checkOut, onPick, onClose }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!open || !anchorRef.current) return;

    const update = () => {
      const rect = anchorRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth <= 960;
      const wantedWidth = isMobile ? Math.min(window.innerWidth - 24, 420) : Math.min(window.innerWidth - 24, 720);
      const next = computePosition(rect, wantedWidth, isMobile ? 540 : 500);
      setPosition({
        left: next.left,
        top: next.top,
        width: wantedWidth,
        maxHeight: clamp(window.innerHeight - next.top - 12, 320, isMobile ? 540 : 500),
        isMobile,
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [anchorRef, open]);

  if (!open || !position) return null;

  const startDate = parseISO(checkIn);
  const endDate = parseISO(checkOut);

  return createPortal(
    <div
      ref={panelRef}
      className="search-floating-panel search-calendar-panel"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        width: `${position.width}px`,
        maxHeight: `${position.maxHeight}px`,
      }}
    >
      <div className="calendar-toolbar">
        <button type="button" className="calendar-nav" onClick={() => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}>
          이전
        </button>
        <button type="button" className="calendar-nav" onClick={() => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}>
          다음
        </button>
      </div>
      <div className="calendar-month-grid" style={{ gridTemplateColumns: position.isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))" }}>
        <CalendarMonth baseDate={visibleMonth} startDate={startDate} endDate={endDate} onPick={onPick} />
        {!position.isMobile ? (
          <CalendarMonth
            baseDate={new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1)}
            startDate={startDate}
            endDate={endDate}
            onPick={onPick}
          />
        ) : null}
      </div>
      <div className="calendar-footer">
        <span className="calendar-footer-text">{formatDateSummary(checkIn, checkOut)}</span>
        <button type="button" className="primary-button calendar-apply-button" onClick={onClose}>
          적용
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default function BookingPage() {
  const { lodgingId } = useParams();
  const [searchParams] = useSearchParams();
  const lodging = lodgings.find((item) => String(item.id) === lodgingId) ?? lodgings[0];
  const authSession = readAuthSession();
  const roomOptions = [
    lodging.room,
    `${lodging.room} · 조식 포함`,
    `${lodging.room} · 환불형`,
  ];
  const initialRoom = searchParams.get("room");
  const [form, setForm] = useState({
    checkIn: "2026-03-28",
    checkOut: "2026-03-30",
    guests: 2,
    room: roomOptions.includes(initialRoom) ? initialRoom : lodging.room,
    couponLabel: bookingCouponOptions[1].label,
    paymentMethod: bookingPaymentOptions[0].value,
    request: "",
  });
  const [openMenu, setOpenMenu] = useState(null);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const calendarPanelRef = useRef(null);
  const [visibleMonth, setVisibleMonth] = useState(parseISO("2026-03-01") ?? new Date());

  const selectedCoupon = bookingCouponOptions.find((item) => item.label === form.couponLabel) ?? bookingCouponOptions[0];
  const selectedPayment = bookingPaymentOptions.find((item) => item.value === form.paymentMethod) ?? bookingPaymentOptions[0];
  const baseAmount = Number(String(lodging.price).replace(/[^\d]/g, ""));
  const checkInDate = new Date(form.checkIn);
  const checkOutDate = new Date(form.checkOut);
  const nightCount = Math.max(1, Math.round((checkOutDate.getTime() - checkInDate.getTime()) / 86400000));
  const serviceFee = 9000;
  const roomTotal = baseAmount * nightCount;
  const totalAmount = useMemo(
    () => Math.max(roomTotal - selectedCoupon.discount + serviceFee, 0),
    [roomTotal, selectedCoupon.discount],
  );
  const ctaHref = authSession ? "/my/bookings" : "/login";
  const formatBookingDate = (value) =>
    new Date(value).toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "short",
    });

  useEffect(() => {
    const handlePointerDown = (event) => {
      const dateAnchor = openMenu === "date-start" ? checkInRef.current : checkOutRef.current;
      if (
        dateAnchor &&
        !dateAnchor.contains(event.target) &&
        (!calendarPanelRef.current || !calendarPanelRef.current.contains(event.target))
      ) {
        if (openMenu === "date-start" || openMenu === "date-end") {
          setOpenMenu(null);
        }
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [openMenu]);

  const handleDatePick = (day) => {
    const picked = toISO(day);
    if (openMenu === "date-start") {
      setForm((current) => ({
        ...current,
        checkIn: picked,
        checkOut: current.checkOut && current.checkOut <= picked ? "" : current.checkOut,
      }));
      return;
    }

    setForm((current) => ({
      ...current,
      checkOut: picked <= current.checkIn ? current.checkIn : picked,
    }));
  };

  return (
    <div className="container page-stack">
      <section className="booking-hero">
        <div className="booking-hero-main">
          <p className="eyebrow">예약</p>
          <h1>{lodging.name} 예약</h1>
          <p>{lodging.address}</p>
          <div className="feature-chip-row">
            <span className="inline-chip">예약 상태 PENDING</span>
            <span className="inline-chip">결제 상태 READY</span>
            <span className="inline-chip">{nightCount}박 일정</span>
          </div>
        </div>
      </section>

      <section className="booking-section">
        <div className="booking-layout">
          <div className="booking-column">
            <div className="booking-form-surface">
              <div className={`booking-login-banner${authSession ? " is-active" : ""}`}>
                <div>
                  <strong>{authSession ? `${authSession.name}님 예약을 진행합니다` : "로그인 시 예약이 가능합니다"}</strong>
                  <p>
                    {authSession
                      ? "예약 완료 후 내 예약과 숙박 완료 후기 작성 흐름으로 바로 이어집니다."
                      : "예약 내역과 혜택을 회원 정보와 연결하려면 먼저 로그인해 주세요."}
                  </p>
                </div>
                {!authSession && (
                  <Link className="secondary-button" to="/login">
                    로그인하기
                  </Link>
                )}
              </div>

              <div className="booking-inline-guide">
                {bookingChecklist.map((item) => (
                  <span key={item} className="booking-guide-chip">
                    {item}
                  </span>
                ))}
              </div>

              <div className="booking-section-head">
                <h2>투숙 정보 입력</h2>
              </div>

              <div className="booking-form-mock booking-form-grid">
                <label className="booking-field booking-date-field" ref={checkInRef}>
                  <span>체크인</span>
                  <strong>{formatBookingDate(form.checkIn)}</strong>
                  <small>{lodging.checkInTime} 이후 입실</small>
                  <button
                    type="button"
                    className="booking-date-hitbox"
                    onClick={() => {
                      setVisibleMonth(parseISO(form.checkIn) ?? new Date());
                      setOpenMenu((current) => (current === "date-start" ? null : "date-start"));
                    }}
                  />
                </label>

                <label className="booking-field booking-date-field" ref={checkOutRef}>
                  <span>체크아웃</span>
                  <strong>{formatBookingDate(form.checkOut)}</strong>
                  <small>{lodging.checkOutTime} 이전 퇴실</small>
                  <button
                    type="button"
                    className="booking-date-hitbox"
                    onClick={() => {
                      setVisibleMonth(parseISO(form.checkIn) ?? new Date());
                      setOpenMenu((current) => (current === "date-end" ? null : "date-end"));
                    }}
                  />
                </label>

                <label className="booking-field booking-field-full">
                  <span>객실 타입</span>
                  <div className="booking-picker">
                    <button
                      type="button"
                      className={`booking-picker-trigger${openMenu === "room" ? " is-open" : ""}`}
                      onClick={() => setOpenMenu((current) => (current === "room" ? null : "room"))}
                    >
                      <div className="booking-picker-copy">
                        <strong>{form.room}</strong>
                        <span>선택 가능한 객실 옵션 확인</span>
                      </div>
                      <span className="booking-picker-arrow">⌄</span>
                    </button>
                    {openMenu === "room" && (
                      <div className="booking-picker-menu">
                        {roomOptions.map((option) => {
                          const isActive = form.room === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              className={`booking-picker-item${isActive ? " is-active" : ""}`}
                              onClick={() => {
                                setForm((current) => ({ ...current, room: option }));
                                setOpenMenu(null);
                              }}
                            >
                              <strong>{option}</strong>
                              <span>객실 조건과 포함 혜택 확인</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </label>

                <label className="booking-field">
                  <span>투숙 인원</span>
                  <div className="booking-guest-stepper">
                    <div className="booking-guest-copy">
                      <strong>성인 {form.guests}명</strong>
                      <span>객실 1개 기준</span>
                    </div>
                    <div className="booking-guest-controls">
                      <button
                        type="button"
                        className="booking-guest-button"
                        onClick={() =>
                          setForm((current) => ({ ...current, guests: Math.max(1, current.guests - 1) }))
                        }
                      >
                        -
                      </button>
                      <strong>{form.guests}</strong>
                      <button
                        type="button"
                        className="booking-guest-button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            guests: current.guests + 1,
                          }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </label>

                <label className="booking-field">
                  <span>쿠폰</span>
                  <div className="booking-picker">
                    <button
                      type="button"
                      className={`booking-picker-trigger${openMenu === "coupon" ? " is-open" : ""}`}
                      onClick={() => setOpenMenu((current) => (current === "coupon" ? null : "coupon"))}
                    >
                      <div className="booking-picker-copy">
                        <strong>{selectedCoupon.label}</strong>
                        <span>{selectedCoupon.discount > 0 ? `-${selectedCoupon.discount.toLocaleString()}원` : "할인 없음"}</span>
                      </div>
                      <span className="booking-picker-arrow">⌄</span>
                    </button>
                    {openMenu === "coupon" && (
                      <div className="booking-picker-menu">
                        {bookingCouponOptions.map((item) => {
                          const isActive = form.couponLabel === item.label;
                          return (
                            <button
                              key={item.label}
                              type="button"
                              className={`booking-picker-item${isActive ? " is-active" : ""}`}
                              onClick={() => {
                                setForm((current) => ({ ...current, couponLabel: item.label }));
                                setOpenMenu(null);
                              }}
                            >
                              <strong>{item.label}</strong>
                              <span>{item.discount > 0 ? `-${item.discount.toLocaleString()}원` : "할인 없음"}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </label>

                <label className="booking-field booking-field-full">
                  <span>결제 수단</span>
                  <div className="booking-picker">
                    <button
                      type="button"
                      className={`booking-picker-trigger${openMenu === "payment" ? " is-open" : ""}`}
                      onClick={() => setOpenMenu((current) => (current === "payment" ? null : "payment"))}
                    >
                      <div className="booking-picker-copy">
                        <strong>{selectedPayment.label}</strong>
                        <span>{selectedPayment.pg}</span>
                      </div>
                      <span className="booking-picker-arrow">⌄</span>
                    </button>
                    {openMenu === "payment" && (
                      <div className="booking-picker-menu booking-picker-menu-wide">
                        {bookingPaymentOptions.map((item) => {
                          const isActive = form.paymentMethod === item.value;
                          return (
                            <button
                              key={item.value}
                              type="button"
                              className={`booking-picker-item${isActive ? " is-active" : ""}`}
                              onClick={() => {
                                setForm((current) => ({ ...current, paymentMethod: item.value }));
                                setOpenMenu(null);
                              }}
                            >
                              <strong>{item.label}</strong>
                              <span>{item.pg}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </label>

                <label className="booking-field booking-field-full">
                  <span>요청사항</span>
                  <textarea
                    className="booking-textarea"
                    rows="3"
                    value={form.request}
                    placeholder="얼리 체크인, 침대 요청 등 필요한 내용을 남겨주세요"
                    onChange={(event) => setForm((current) => ({ ...current, request: event.target.value }))}
                  />
                </label>
              </div>
            </div>
          </div>

          <aside className="booking-column booking-sidebar">
            <div className="booking-payment-card">
              <div className="booking-payment-head">
                <span className="small-label">선택 숙소</span>
                <h2>{lodging.name}</h2>
                <div className="booking-place-meta">
                  <span>{lodging.region} · {lodging.district}</span>
                  <span>{lodging.reviewCount}</span>
                </div>
                <span className="small-label">1박 기준 {baseAmount.toLocaleString()}원</span>
                <strong>{totalAmount.toLocaleString()}원</strong>
                <p>{selectedPayment.label} · {selectedPayment.pg}</p>
              </div>

              <div className="booking-summary-box">
                <div className="booking-summary-row">
                  <span>객실 요금</span>
                  <strong>{roomTotal.toLocaleString()}원</strong>
                </div>
                <div className="booking-summary-row">
                  <span>숙박 일정</span>
                  <strong>{nightCount}박</strong>
                </div>
                <div className="booking-summary-row">
                  <span>선택 객실</span>
                  <strong>{form.room}</strong>
                </div>
                <div className="booking-summary-row">
                  <span>쿠폰 할인</span>
                  <strong>-{selectedCoupon.discount.toLocaleString()}원</strong>
                </div>
                <div className="booking-summary-row">
                  <span>서비스 수수료</span>
                  <strong>{serviceFee.toLocaleString()}원</strong>
                </div>
                <div className="booking-summary-row total">
                  <span>총 결제 예정</span>
                  <strong>{totalAmount.toLocaleString()}원</strong>
                </div>
              </div>

              <div className="booking-status-stack">
                <span className="inline-chip">PG 연동 준비</span>
                <span className="inline-chip">결제 완료 후 예약 확정</span>
              </div>

              <div className="booking-summary-box booking-note-box">
                {bookingStatusNotes.map((item) => (
                  <div key={item} className="booking-summary-row booking-summary-row-note">
                    <span className="booking-note-dot" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link className="primary-button booking-card-button" to={ctaHref}>
                {authSession ? "예약 완료 화면으로 이동" : "로그인 후 예약 진행"}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <DateRangePopover
        open={openMenu === "date-start" || openMenu === "date-end"}
        anchorRef={openMenu === "date-start" ? checkInRef : checkOutRef}
        panelRef={calendarPanelRef}
        visibleMonth={visibleMonth}
        setVisibleMonth={setVisibleMonth}
        checkIn={form.checkIn}
        checkOut={form.checkOut}
        onPick={handleDatePick}
        onClose={() => setOpenMenu(null)}
      />
    </div>
  );
}
