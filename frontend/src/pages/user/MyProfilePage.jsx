import { Link, useNavigate } from "react-router-dom";
import { myProfileDetails, myProfileSummary } from "../../data/siteData";
import { clearAuthSession } from "../../utils/authSession";

export default function MyProfilePage() {
  const navigate = useNavigate();

  const handleWithdraw = () => {
    const confirmed = window.confirm("회원 탈퇴를 진행하시겠습니까?");
    if (!confirmed) return;
    clearAuthSession();
    navigate("/");
  };

  return (
    <div className="container page-stack">
      <section className="my-page-head">
        <p className="eyebrow">내 정보 관리</p>
        <h1>{myProfileSummary.name}</h1>
        <p>{myProfileSummary.gradeHint}</p>
      </section>

      <section className="my-page-panel">
        <div className="summary-grid">
          <div className="summary-card tone-mint">
            <span>회원 등급</span>
            <strong>{myProfileSummary.grade}</strong>
            <p>{myProfileSummary.joinedAt}</p>
          </div>
          <div className="summary-card tone-sand">
            <span>회원 상태</span>
            <strong>{myProfileSummary.status}</strong>
            <p>로그인/예약/혜택 이용 가능</p>
          </div>
          <div className="summary-card tone-blue">
            <span>탈퇴 안내</span>
            <strong>본인 확인 필요</strong>
            <p>예약 및 환불 내역 확인 후 탈퇴를 진행합니다.</p>
          </div>
        </div>

        <section className="my-page-panel">
          <div className="my-detail-sheet">
            {myProfileDetails.map((item) => (
              <div key={item.label} className="my-detail-row">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <div className="booking-actions">
            <Link className="secondary-button" to="/my">
              마이페이지로
            </Link>
            <button type="button" className="danger-button" onClick={handleWithdraw}>
              회원 탈퇴
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}
