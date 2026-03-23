import { adminMetrics, adminTasks } from "../../data/siteData";
import { Link } from "react-router-dom";

export default function AdminDashboardPage() {
  return (
    <div className="container page-stack">
      <section className="ops-hero">
        <div>
          <p className="eyebrow">관리자센터</p>
          <h1>판매자 승인, 회원 상태, 문의 운영 현황</h1>
          <p>승인 대기 판매자와 미처리 운영 이슈를 우선 확인하고 바로 처리합니다.</p>
        </div>
      </section>

      <section className="ops-board">
        <div className="summary-grid">
          {adminMetrics.map((item) => (
            <div key={item.label} className={`summary-card tone-${item.tone}`}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.meta}</p>
            </div>
          ))}
        </div>
        <div className="ops-worklist">
          {adminTasks.map((task) => (
            <div key={task} className="ops-work-item">
              {task}
            </div>
          ))}
        </div>
        <div className="hero-actions">
          <Link className="primary-button" to="/admin/users">회원 관리</Link>
          <Link className="secondary-button" to="/admin/sellers">판매자 관리</Link>
          <Link className="secondary-button" to="/admin/events">이벤트 · 쿠폰</Link>
          <Link className="secondary-button" to="/admin/inquiries">문의 모니터링</Link>
          <Link className="secondary-button" to="/admin/reviews">리뷰 운영</Link>
          <Link className="secondary-button" to="/admin/audit-logs">운영 로그</Link>
        </div>
      </section>
    </div>
  );
}
