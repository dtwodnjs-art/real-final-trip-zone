import MyPageSidebar from "./MyPageSidebar";

export default function MyPageLayout({ eyebrow, title, description, children }) {
  return (
    <div className="container page-stack">
      <section className="my-page-shell">
        <MyPageSidebar />
        <div className="my-page-main">
          <section className="my-page-head">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            {description ? <p>{description}</p> : null}
          </section>
          <section className="my-page-panel">{children}</section>
        </div>
      </section>
    </div>
  );
}
