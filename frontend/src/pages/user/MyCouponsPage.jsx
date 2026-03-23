import { Link } from "react-router-dom";
import { couponRows } from "../../data/siteData";

export default function MyCouponsPage() {
  return (
    <div className="container page-stack">
      <section className="my-page-head">
        <p className="eyebrow">쿠폰 리스트</p>
        <h1>보유 쿠폰을 최신순으로 확인합니다.</h1>
        <p>사용 가능 상태와 만료 일정을 함께 확인합니다.</p>
      </section>

      <section className="my-page-panel">
        <div className="reward-list">
          {couponRows.map((item) => (
            <article key={item.id} className="reward-row">
              <div className="reward-row-copy">
                <strong>{item.name}</strong>
                <p>{item.target} · {item.issuedAt} 발급 · {item.expire}</p>
              </div>
              <span className="inline-chip">{item.status}</span>
            </article>
          ))}
        </div>
        <div className="booking-actions">
          <Link className="secondary-button" to="/my/mileage">
            마일리지 보기
          </Link>
          <Link className="secondary-button" to="/lodgings">
            숙소 둘러보기
          </Link>
        </div>
      </section>
    </div>
  );
}
