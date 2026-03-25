import { Link } from "react-router-dom";

export function DashboardHeader({ eyebrow, title, description, links, ariaLabel }) {
  return (
    <header className="dashboard-topbar">
      <div className="dashboard-topbar-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <nav className="dashboard-topbar-links" aria-label={ariaLabel}>
        {links.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function DashboardMetricBar({ items, label }) {
  return (
    <section className="dashboard-metric-bar" aria-label={label}>
      {items.map((item) => (
        <div key={item.label} className="dashboard-metric">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </section>
  );
}

export function DashboardSectionHead({ eyebrow, title, action }) {
  return (
    <div className="dashboard-section-head">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action ? (
        <Link className="text-link" to={action.to}>
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

export function DashboardPriorityTable({ rows }) {
  return (
    <div className="dashboard-table">
      <div className="dashboard-table-head">
        <span>구분</span>
        <span>대상</span>
        <span>상태</span>
        <span>메모</span>
        <span>이동</span>
      </div>
      {rows.map((item) => (
        <div key={`${item.kind}-${item.title}`} className="dashboard-table-row">
          <span>{item.kind}</span>
          <strong>{item.title}</strong>
          <span className={`status-pill status-${item.status.toLowerCase()}`}>{item.status}</span>
          <span>{item.meta}</span>
          <Link className="text-link" to={item.to}>
            보기
          </Link>
        </div>
      ))}
    </div>
  );
}

export function DashboardReservationTable({ rows }) {
  return (
    <div className="dashboard-table">
      <div className="dashboard-table-head">
        <span>예약</span>
        <span>투숙객</span>
        <span>상태</span>
        <span>일정 / 금액</span>
        <span>이동</span>
      </div>
      {rows.map((item) => (
        <div key={item.no} className="dashboard-table-row">
          <span>{item.no}</span>
          <strong>{item.guest}</strong>
          <span className={`status-pill status-${item.status.toLowerCase()}`}>{item.status}</span>
          <span>{item.detail}</span>
          <Link className="text-link" to={item.to}>
            보기
          </Link>
        </div>
      ))}
    </div>
  );
}

export function DashboardLodgingTable({ rows }) {
  return (
    <div className="dashboard-table">
      <div className="dashboard-table-head">
        <span>지역</span>
        <span>숙소</span>
        <span>상태</span>
        <span>운영 메모</span>
        <span>이동</span>
      </div>
      {rows.map((item) => (
        <div key={`${item.region}-${item.name}`} className="dashboard-table-row">
          <span>{item.region}</span>
          <strong>{item.name}</strong>
          <span className={`status-pill status-${item.status.toLowerCase()}`}>{item.status}</span>
          <span>{item.detail}</span>
          <Link className="text-link" to={item.to}>
            보기
          </Link>
        </div>
      ))}
    </div>
  );
}

export function DashboardLogList({ rows }) {
  return (
    <div className="dashboard-log-list">
      {rows.map((item) => (
        <div key={`${item.title}-${item.time}`} className="dashboard-log-row">
          <div>
            <strong>{item.title}</strong>
            <p>{item.subtitle}</p>
          </div>
          <span>{item.target}</span>
          <time>{item.time}</time>
        </div>
      ))}
    </div>
  );
}

export function DashboardTrendList({ rows }) {
  return (
    <div className="dashboard-trend-list">
      {rows.map((item) => (
        <div key={item.label} className="dashboard-trend-row">
          <span>{item.label}</span>
          <div className="dashboard-trend-track">
            <div className="dashboard-trend-fill" style={{ width: item.fill }} />
          </div>
          <strong>{item.metric}</strong>
          <span>{item.meta}</span>
        </div>
      ))}
    </div>
  );
}

export function DashboardWatchList({ rows }) {
  return (
    <div className="dashboard-watch-list">
      {rows.map((item) => (
        <div key={item.email} className="dashboard-watch-row">
          <div className="ops-inline-meta">
            <span className={`status-pill status-${item.status.toLowerCase()}`}>{item.status}</span>
            <span>{item.role}</span>
          </div>
          <strong>{item.name}</strong>
          <p>{item.email}</p>
        </div>
      ))}
    </div>
  );
}

export function DashboardFactGrid({ items }) {
  return (
    <div className="dashboard-fact-grid">
      {items.map((item) => (
        <div key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

export function DashboardChecklist({ items }) {
  return (
    <div className="dashboard-check-list">
      {items.map((item) => (
        <div key={item} className="dashboard-check-row">
          <span />
          <strong>{item}</strong>
        </div>
      ))}
    </div>
  );
}

export function DashboardLinkList({ items }) {
  return (
    <div className="dashboard-link-list">
      {items.map((item) => (
        <Link key={item.to} className="dashboard-link-row" to={item.to}>
          <strong>{item.title}</strong>
          <span>{item.subtitle}</span>
        </Link>
      ))}
    </div>
  );
}
