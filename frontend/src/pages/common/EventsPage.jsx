import { Link } from "react-router-dom";
import { bookingCouponOptions } from "../../data/bookingData";
import { eventBanners, promoBanners } from "../../data/homeData";

export default function EventsPage() {
  return (
    <div className="container page-stack">
      <section className="events-hero">
        <div className="events-hero-copy">
          <p className="eyebrow">이벤트 · 특가</p>
          <h1>지금 예약 가능한 특가와 쿠폰 혜택을 모아봅니다.</h1>
          <p>메인에서 바로 보이는 특가와 운영 중인 쿠폰 혜택을 한곳에 정리했습니다.</p>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <h2>진행 중인 이벤트</h2>
          <Link className="text-link" to="/lodgings?theme=deal">
            특가 숙소 보기
          </Link>
        </div>
        <div className="event-rail" aria-label="진행 중인 이벤트 목록">
          {eventBanners.map((item) => (
            <Link key={item.title} to={item.href} className="event-rail-card">
              <strong>{item.title}</strong>
              <p>{item.subtitle}</p>
              <span>{item.action}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <h2>오늘 예약이 빠른 특가</h2>
          <Link className="text-link" to="/lodgings?theme=deal">
            전체 숙소 보기
          </Link>
        </div>
        <div className="promo-grid">
          {promoBanners.map((item) => (
            <article
              key={item.title}
              className={`promo-card promo-${item.accent}`}
              style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 24, 34, 0.12), rgba(8, 24, 34, 0.58)), url(${item.image})` }}
            >
              <strong>{item.title}</strong>
              <p>{item.subtitle}</p>
              <span className="promo-date">{item.date}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <h2>지금 적용 가능한 할인</h2>
          <Link className="text-link" to="/my/coupons">
            내 쿠폰 보기
          </Link>
        </div>
        <div className="event-summary-list">
          {bookingCouponOptions
            .filter((item) => item.discount > 0)
            .map((item) => (
              <article key={item.label} className="event-summary-row">
                <div className="event-summary-copy">
                  <strong>{item.label}</strong>
                  <p>예약 단계에서 바로 적용 가능한 사용자 혜택</p>
                </div>
                <span className="price-tag">-{item.discount.toLocaleString()}원</span>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
}
