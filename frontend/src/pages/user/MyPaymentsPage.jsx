import { Link } from "react-router-dom";
import { paymentHistoryRows } from "../../data/siteData";

export default function MyPaymentsPage() {
  return (
    <div className="container page-stack">
      <section className="my-page-head">
        <p className="eyebrow">결제 내역</p>
        <h1>결제와 환불 내역을 최신순으로 확인합니다.</h1>
        <p>숙소 결제 내역과 환불 상태를 함께 보여줍니다.</p>
      </section>

      <section className="my-page-panel">
        <div className="booking-list">
          {paymentHistoryRows.map((item) => (
            <article key={item.bookingNo} className="booking-list-item">
              <div className="booking-list-copy">
                <strong>{item.lodgingName}</strong>
                <p>{item.bookingNo} · {item.detail}</p>
              </div>
              <div className="booking-list-meta">
                <span className={`table-code code-${item.status.toLowerCase()}`}>
                  {item.status === "PAID" ? "결제 완료" : "환불"}
                </span>
                <span className="price-tag">{item.amount}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="booking-actions">
          <Link className="secondary-button" to="/my/bookings">
            예약 내역 보기
          </Link>
          <Link className="secondary-button" to="/my/coupons">
            쿠폰 리스트 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
