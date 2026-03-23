import { Link } from "react-router-dom";
import MyPageLayout from "../../components/user/MyPageLayout";
import { couponRows } from "../../data/siteData";

export default function MyCouponsPage() {
  return (
    <MyPageLayout eyebrow="쿠폰 리스트" title="보유 쿠폰" description="사용 가능 상태와 만료 일정을 최신순으로 확인합니다.">
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
    </MyPageLayout>
  );
}
