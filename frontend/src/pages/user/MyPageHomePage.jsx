import { Link } from "react-router-dom";
import MyPageLayout from "../../components/user/MyPageLayout";
import { myPageSections, myProfileSummary } from "../../data/siteData";

export default function MyPageHomePage() {
  return (
    <MyPageLayout
      eyebrow="마이페이지"
      title="마이페이지"
      description={`${myProfileSummary.name} · ${myProfileSummary.grade} 등급 · ${myProfileSummary.status}`}
    >
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
    </MyPageLayout>
  );
}
