import { Link } from "react-router-dom";
import { wishlistRows, wishlistSummaries } from "../../data/siteData";

export default function MyWishlistPage() {
  return (
    <div className="container page-stack">
      <section className="my-page-head">
        <p className="eyebrow">찜</p>
        <h1>찜한 숙소</h1>
        <p>나중에 다시 보고 싶은 숙소와 지금 특가가 붙은 숙소를 함께 확인합니다.</p>
      </section>
      <section className="my-page-panel">
        <div className="summary-grid">
          {wishlistSummaries.map((item) => (
            <div key={item.label} className={`summary-card tone-${item.tone}`}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
        <div className="booking-list">
          {wishlistRows.map((item) => (
            <article key={item.name} className="booking-list-item">
              <div className="booking-list-copy">
                <strong>{item.name}</strong>
                <p>{item.meta}</p>
              </div>
              <div className="booking-list-meta">
                <span className="inline-chip">{item.status}</span>
                <span className="price-tag">{item.price}</span>
                <Link className="text-link" to={`/lodgings/${item.lodgingId}`}>
                  상세보기
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="booking-actions">
          <Link className="secondary-button" to="/my">
            마이페이지
          </Link>
          <Link className="secondary-button" to="/lodgings">
            전체 숙소 보기
          </Link>
          <Link className="secondary-button" to="/my/coupons">
            쿠폰 리스트 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
