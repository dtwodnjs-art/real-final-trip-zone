import { Link } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { auditLogRows } from "../../data/dashboardData";

const columns = [
  { key: "actor", label: "작업자" },
  { key: "action", label: "작업 내용" },
  { key: "target", label: "대상" },
  { key: "time", label: "시각" },
];

export default function AdminAuditLogsPage() {
  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">운영 로그</p>
          <h1>운영 로그</h1>
        </div>
        <div className="ops-toolbar">
          <span className="inline-chip">오늘 로그 12건</span>
          <span className="inline-chip">승인/제재 4건</span>
        </div>
      </section>
      <section className="ops-table-section">
        <div className="ops-table-head">
          <h2>감사 로그</h2>
          <p>주요 운영 행위를 시간순으로 추적</p>
        </div>
        <DataTable columns={columns} rows={auditLogRows} />
        <div className="booking-actions">
          <Link className="secondary-button" to="/admin/users">회원 관리</Link>
          <Link className="secondary-button" to="/admin/sellers">판매자 관리</Link>
          <Link className="secondary-button" to="/admin/events">이벤트 · 쿠폰</Link>
          <Link className="secondary-button" to="/admin/inquiries">문의 모니터링</Link>
          <Link className="secondary-button" to="/admin/reviews">리뷰 운영</Link>
        </div>
      </section>
    </div>
  );
}
