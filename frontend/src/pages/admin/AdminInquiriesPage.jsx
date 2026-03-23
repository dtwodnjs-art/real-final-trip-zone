import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { adminInquiryRows } from "../../data/siteData";
import { readMockRows, writeMockRows } from "../../utils/mockStorage";

const columns = [
  { key: "title", label: "문의 제목" },
  { key: "type", label: "유형" },
  { key: "status", label: "상태" },
  { key: "owner", label: "작성자" },
];

export default function AdminInquiriesPage() {
  const [rows, setRows] = useState(() => readMockRows("tripzone-admin-inquiries", adminInquiryRows));
  const [selectedTitle, setSelectedTitle] = useState(rows[0]?.title ?? null);
  const selectedRow = rows.find((row) => row.title === selectedTitle) ?? rows[0];

  const updateStatus = (nextStatus) => {
    if (!selectedRow) return;
    const nextRows = rows.map((row) =>
      row.title === selectedRow.title ? { ...row, status: nextStatus } : row
    );
    setRows(nextRows);
    writeMockRows("tripzone-admin-inquiries", nextRows);
  };

  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">문의 모니터링</p>
          <h1>관리자 문의 모니터링</h1>
        </div>
        <div className="ops-toolbar">
          <span className="inline-chip">접수 {rows.filter((item) => item.status === "OPEN").length}건</span>
          <span className="inline-chip">답변 완료 {rows.filter((item) => item.status === "ANSWERED").length}건</span>
          <span className="inline-chip">종료 {rows.filter((item) => item.status === "CLOSED").length}건</span>
        </div>
      </section>

      <section className="ops-table-section">
        <div className="ops-table-head">
          <h2>문의 목록</h2>
          <p>문의방 상태와 유형을 운영 기준으로 모니터링</p>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          getRowKey={(row) => row.title}
          selectedKey={selectedTitle}
          onRowClick={(row) => setSelectedTitle(row.title)}
        />
        <div className="ops-action-panel">
          <h3>{selectedRow?.title ?? "선택된 문의 없음"}</h3>
          <p>문의 상태를 바로 변경합니다.</p>
          <div className="ops-action-grid">
            <button type="button" className="secondary-button" onClick={() => updateStatus("OPEN")}>접수</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("ANSWERED")}>답변 완료</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("CLOSED")}>종료</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("BLOCKED")}>차단</button>
          </div>
        </div>
        <div className="booking-actions">
          <Link className="secondary-button" to="/admin/users">회원 관리</Link>
          <Link className="secondary-button" to="/admin/sellers">판매자 관리</Link>
          <Link className="secondary-button" to="/admin/reviews">리뷰 운영</Link>
          <Link className="secondary-button" to="/admin/audit-logs">운영 로그</Link>
        </div>
      </section>
    </div>
  );
}
