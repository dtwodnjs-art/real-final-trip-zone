import { Link } from "react-router-dom";
import { mileageHistoryRows, rewardSummaries } from "../../data/siteData";

export default function MyMileagePage() {
  return (
    <div className="container page-stack">
      <section className="my-page-head">
        <p className="eyebrow">마일리지 내역</p>
        <h1>현재 마일리지와 사용 내역을 확인합니다.</h1>
        <p>적립과 사용 내역을 최신순으로 보여줍니다.</p>
      </section>

      <section className="my-page-panel">
        <div className="summary-grid">
          {rewardSummaries.map((item) => (
            <div key={item.label} className={`summary-card tone-${item.tone}`}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="reward-list">
          {mileageHistoryRows.map((item) => (
            <article key={`${item.label}-${item.time}`} className="reward-row">
              <div className="reward-row-copy">
                <strong>{item.label}</strong>
                <p>{item.type} · {item.time}</p>
              </div>
              <strong className="reward-amount">{item.amount}</strong>
            </article>
          ))}
        </div>

        <div className="booking-actions">
          <Link className="secondary-button" to="/my/coupons">
            쿠폰 리스트 보기
          </Link>
          <Link className="secondary-button" to="/my/payments">
            결제 내역 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
