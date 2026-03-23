import { sellerMetrics, sellerTasks } from "../../data/siteData";
import { Link } from "react-router-dom";

export default function SellerDashboardPage() {
  return (
    <div className="container page-stack">
      <section className="ops-hero">
        <div>
          <p className="eyebrow">판매자센터</p>
          <h1>오늘 처리할 예약, 문의, 숙소 상태</h1>
          <p>체크인 예정 객실, 답변 대기 문의, 운영 중 숙소를 먼저 확인합니다.</p>
        </div>
      </section>

      <section className="ops-board">
        <div className="summary-grid">
          {sellerMetrics.map((item) => (
            <div key={item.label} className={`summary-card tone-${item.tone}`}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.meta}</p>
            </div>
          ))}
        </div>
        <div className="ops-worklist">
          {sellerTasks.map((task) => (
            <div key={task} className="ops-work-item">
              {task}
            </div>
          ))}
        </div>
        <div className="hero-actions">
          <Link className="secondary-button" to="/seller/apply">판매자 신청</Link>
          <Link className="primary-button" to="/seller/lodgings">숙소 관리</Link>
          <Link className="secondary-button" to="/seller/rooms">객실 관리</Link>
          <Link className="secondary-button" to="/seller/assets">이미지 관리</Link>
          <Link className="secondary-button" to="/seller/reservations">예약 관리</Link>
          <Link className="secondary-button" to="/seller/inquiries">문의 관리</Link>
        </div>
      </section>
    </div>
  );
}
