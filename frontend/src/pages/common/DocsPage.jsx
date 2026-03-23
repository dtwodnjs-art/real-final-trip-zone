import { docsPrinciples, quickLinks } from "../../data/siteData";

export default function DocsPage() {
  return (
    <div className="container page-stack">
      <section className="docs-intro">
        <p className="eyebrow">문서 허브</p>
        <h1>제출 문서와 발표 자료 모음</h1>
        <p>요구사항, 구조, DB 문서와 발표 자료를 한곳에 모았습니다.</p>
      </section>

      <section className="docs-section">
        <div className="docs-section-head">
          <h2>산출물 바로가기</h2>
          <p>제출 문서와 발표 자료를 용도별로 확인합니다.</p>
        </div>
        <div className="docs-link-list">
          {quickLinks.map((item) => (
            <a key={item.title} className="docs-link-row" href={item.href}>
              <span className="small-label">{item.kind}</span>
              <strong>{item.title}</strong>
              <p>
                {item.kind === "발표"
                  ? "설계 기준 발표 자료"
                  : "제출용 문서"}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <div className="docs-section-head">
          <h2>문서 사용 원칙</h2>
          <p>문서, 발표, 구현 결과물을 용도별로 구분합니다.</p>
        </div>
        <div className="docs-principle-list">
          {docsPrinciples.map((item) => (
            <div key={item.title} className="docs-principle-item">
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
