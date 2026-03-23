import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { adminReviewRows } from "../../data/siteData";
import { readMockRows, writeMockRows } from "../../utils/mockStorage";

const columns = [
  { key: "lodging", label: "숙소" },
  { key: "author", label: "작성자" },
  { key: "score", label: "평점" },
  { key: "status", label: "노출 상태" },
  { key: "report", label: "신고" },
];

export default function AdminReviewsPage() {
  const [rows, setRows] = useState(() => readMockRows("tripzone-admin-reviews", adminReviewRows));
  const [selectedKey, setSelectedKey] = useState(rows[0]?.lodging ?? null);
  const selectedRow = rows.find((row) => row.lodging === selectedKey) ?? rows[0];

  const updateStatus = (nextStatus) => {
    if (!selectedRow) return;
    const nextRows = rows.map((row) =>
      row.lodging === selectedRow.lodging ? { ...row, status: nextStatus } : row
    );
    setRows(nextRows);
    writeMockRows("tripzone-admin-reviews", nextRows);
  };

  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">리뷰 운영</p>
          <h1>리뷰 운영 관리</h1>
        </div>
        <div className="ops-toolbar">
          <span className="inline-chip">노출 {rows.filter((item) => item.status === "노출").length}건</span>
          <span className="inline-chip">숨김 {rows.filter((item) => item.status === "숨김").length}건</span>
          <span className="inline-chip">신고 {rows.filter((item) => item.report !== "0건").length}건</span>
        </div>
      </section>

      <section className="ops-table-section">
        <div className="ops-table-head">
          <h2>리뷰 목록</h2>
          <p>노출, 숨김, 신고 상태를 운영 기준으로 확인</p>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          getRowKey={(row) => row.lodging}
          selectedKey={selectedKey}
          onRowClick={(row) => setSelectedKey(row.lodging)}
        />
        <div className="ops-action-panel">
          <h3>{selectedRow?.lodging ?? "선택된 리뷰 없음"}</h3>
          <p>{selectedRow?.summary ?? "리뷰 요약 없음"}</p>
          <div className="ops-action-grid">
            <button type="button" className="secondary-button" onClick={() => updateStatus("노출")}>노출</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("숨김")}>숨김</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("검토중")}>신고 검토</button>
          </div>
        </div>
        <div className="booking-actions">
          <Link className="secondary-button" to="/admin/users">회원 관리</Link>
          <Link className="secondary-button" to="/admin/events">이벤트 · 쿠폰</Link>
          <Link className="secondary-button" to="/admin/inquiries">문의 모니터링</Link>
          <Link className="secondary-button" to="/admin/audit-logs">운영 로그</Link>
        </div>
      </section>
    </div>
  );
}
