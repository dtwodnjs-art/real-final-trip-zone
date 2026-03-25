import { roleData } from "../../data/homeData";

export default function RolesPage() {
  return (
    <div className="container page-stack">
      <section className="docs-section">
        <div className="docs-section-head">
          <h2>3-Role 구조</h2>
          <p>사용자, 판매자, 관리자는 화면 목적과 필요한 정보가 다르기 때문에 별도 흐름으로 관리합니다.</p>
        </div>
        <div className="role-rail">
          {roleData.map((role) => (
            <article key={role.name} className="role-rail-item">
              <span className="small-label">{role.subtitle}</span>
              <strong>{role.name}</strong>
              <p>{role.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <div className="docs-section-head">
          <h2>왜 역할 분리가 중요한가</h2>
          <p>예약 서비스라도 탐색 화면과 운영 화면은 보는 정보와 행동이 완전히 다릅니다.</p>
        </div>
        <div className="docs-principle-list">
          <div className="docs-principle-item">
            <strong>사용자 화면</strong>
            <p>숙소 탐색, 비교, 예약 흐름이 자연스럽게 이어져야 합니다.</p>
          </div>
          <div className="docs-principle-item">
            <strong>판매자 · 관리자 화면</strong>
            <p>상태값, 목록, 승인, 문의 처리가 먼저 읽히도록 운영 화면 문법을 따릅니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
