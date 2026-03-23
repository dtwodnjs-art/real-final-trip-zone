import { Link } from "react-router-dom";
import { myPageSections, myProfileSummary } from "../../data/siteData";

export default function MyPageHomePage() {
  return (
    <div className="container page-stack">
      <section className="my-page-head">
        <p className="eyebrow">마이페이지</p>
        <h1>내 정보와 예약 흐름을 한 번에 확인합니다.</h1>
        <p>{myProfileSummary.name} · {myProfileSummary.grade} 등급 · {myProfileSummary.status}</p>
      </section>

      <section className="my-page-panel">
        <div className="summary-grid">
          <div className="summary-card tone-mint">
            <span>회원 등급</span>
            <strong>{myProfileSummary.grade}</strong>
            <p>{myProfileSummary.gradeHint}</p>
          </div>
          <div className="summary-card tone-sand">
            <span>회원 상태</span>
            <strong>{myProfileSummary.status}</strong>
            <p>{myProfileSummary.joinedAt}</p>
          </div>
          <div className="summary-card tone-blue">
            <span>바로 가기</span>
            <strong>7개 메뉴</strong>
            <p>예약, 결제, 문의, 혜택 흐름을 바로 이동합니다.</p>
          </div>
        </div>

        <div className="my-hub-grid">
          {myPageSections.map((item) => (
            <Link key={item.href} to={item.href} className="my-hub-card">
              <strong>{item.title}</strong>
              <p>{item.subtitle}</p>
              <span>바로 이동</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
