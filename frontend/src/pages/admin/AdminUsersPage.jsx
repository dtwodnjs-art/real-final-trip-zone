import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { userRows } from "../../data/siteData";
import { readMockRows, writeMockRows } from "../../utils/mockStorage";

const columns = [
  { key: "name", label: "회원명" },
  { key: "role", label: "권한" },
  { key: "status", label: "상태" },
  { key: "email", label: "이메일" },
];

export default function AdminUsersPage() {
  const [rows, setRows] = useState(() => readMockRows("tripzone-admin-users", userRows));
  const [selectedEmail, setSelectedEmail] = useState(rows[0]?.email ?? null);
  const selectedUser = rows.find((row) => row.email === selectedEmail) ?? rows[0];

  const updateStatus = (nextStatus) => {
    if (!selectedUser) return;
    const nextRows = rows.map((row) =>
      row.email === selectedUser.email ? { ...row, status: nextStatus } : row
    );
    setRows(nextRows);
    writeMockRows("tripzone-admin-users", nextRows);
  };

  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">회원 운영</p>
          <h1>회원 관리</h1>
        </div>
        <div className="ops-toolbar">
          <span className="inline-chip">활성 {rows.filter((item) => item.status === "ACTIVE").length}명</span>
          <span className="inline-chip">휴면 {rows.filter((item) => item.status === "DORMANT").length}명</span>
          <span className="inline-chip">차단 {rows.filter((item) => item.status === "BLOCKED").length}명</span>
        </div>
      </section>
      <section className="ops-table-section">
        <div className="ops-table-head">
          <h2>회원 목록</h2>
          <p>권한과 상태 기준으로 계정 현황을 확인</p>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          getRowKey={(row) => row.email}
          selectedKey={selectedEmail}
          onRowClick={(row) => setSelectedEmail(row.email)}
        />
        <div className="ops-action-panel">
          <h3>{selectedUser?.name ?? "선택된 회원 없음"}</h3>
          <p>회원 상태를 바로 변경합니다.</p>
          <div className="ops-action-grid">
            <button type="button" className="secondary-button" onClick={() => updateStatus("ACTIVE")}>활성</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("DORMANT")}>휴면</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("BLOCKED")}>차단</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("DELETED")}>탈퇴</button>
          </div>
        </div>
        <div className="booking-actions">
          <Link className="secondary-button" to="/admin/sellers">판매자 관리</Link>
          <Link className="secondary-button" to="/admin/events">이벤트 · 쿠폰</Link>
          <Link className="secondary-button" to="/admin/audit-logs">운영 로그</Link>
        </div>
      </section>
    </div>
  );
}
