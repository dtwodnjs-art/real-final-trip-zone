import { Link } from "react-router-dom";
import MyPageLayout from "../../components/user/MyPageLayout";
import { myBookingRows, myBookingSummaries } from "../../data/siteData";

export default function MyBookingsPage() {
  return (
    <MyPageLayout eyebrow="예약" title="내 예약" description="다가오는 예약과 지난 숙소 기록을 한 번에 확인합니다.">
        <div className="summary-grid">
          {myBookingSummaries.map((item) => (
            <div key={item.label} className={`summary-card tone-${item.tone}`}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
        <div className="booking-list">
          {myBookingRows.map((item) => (
            <article key={`${item.name}-${item.stay}`} className="booking-list-item">
              <div className="booking-list-copy">
                <strong>{item.name}</strong>
                <p>{item.stay}</p>
              </div>
              <div className="booking-list-meta">
                <span className={`table-code code-${item.status.toLowerCase()}`}>
                  {item.status === "CONFIRMED" ? "확정" : item.status === "PENDING" ? "대기" : "숙박 완료"}
                </span>
                <span className="price-tag">{item.price}</span>
                {item.status === "COMPLETED" ? (
                  <Link className="text-link" to={`/lodgings/${item.lodgingId}#reviews`}>
                    후기 작성
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <div className="booking-actions">
          <Link className="secondary-button" to="/my">
            마이페이지
          </Link>
          <Link className="secondary-button" to="/lodgings">
            숙소 더 보기
          </Link>
          <Link className="secondary-button" to="/my/inquiries">
            문의 내역 보기
          </Link>
        </div>
    </MyPageLayout>
  );
}
