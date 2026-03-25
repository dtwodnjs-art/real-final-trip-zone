import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { sellerRows } from "../../data/dashboardData";
import { readMockRows, writeMockRows } from "../../utils/mockStorage";

const columns = [
  { key: "business", label: "상호명" },
  { key: "owner", label: "대표자" },
  { key: "status", label: "승인 상태" },
  { key: "region", label: "지역" },
];

export default function AdminSellersPage() {
  const [rows, setRows] = useState(() => readMockRows("tripzone-admin-sellers", sellerRows));
  const [selectedBusiness, setSelectedBusiness] = useState(rows[0]?.business ?? null);
  const selectedSeller = rows.find((row) => row.business === selectedBusiness) ?? rows[0];

  const updateStatus = (nextStatus) => {
    if (!selectedSeller) return;
    const nextRows = rows.map((row) =>
      row.business === selectedSeller.business ? { ...row, status: nextStatus } : row
    );
    setRows(nextRows);
    writeMockRows("tripzone-admin-sellers", nextRows);
  };

  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">판매자 운영</p>
          <h1>판매자 관리</h1>
        </div>
        <div className="ops-toolbar">
          <span className="inline-chip">승인 대기 {rows.filter((item) => item.status === "PENDING").length}건</span>
          <span className="inline-chip">승인 완료 {rows.filter((item) => item.status === "APPROVED").length}건</span>
          <span className="inline-chip">운영 중지 {rows.filter((item) => item.status === "SUSPENDED").length}건</span>
        </div>
      </section>
      <section className="ops-table-section">
        <div className="ops-table-head">
          <h2>판매자 목록</h2>
          <p>승인 대기와 운영 상태를 바로 확인</p>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          getRowKey={(row) => row.business}
          selectedKey={selectedBusiness}
          onRowClick={(row) => setSelectedBusiness(row.business)}
        />
        <div className="ops-action-panel">
          <h3>{selectedSeller?.business ?? "선택된 판매자 없음"}</h3>
          <p>판매자 승인 상태를 바로 변경합니다.</p>
          <div className="ops-action-grid">
            <button type="button" className="secondary-button" onClick={() => updateStatus("APPROVED")}>승인</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("REJECTED")}>반려</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("SUSPENDED")}>운영 중지</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("PENDING")}>대기</button>
          </div>
        </div>
        <div className="booking-actions">
          <Link className="secondary-button" to="/admin/users">회원 관리</Link>
          <Link className="secondary-button" to="/admin/events">이벤트 · 쿠폰</Link>
          <Link className="secondary-button" to="/admin/inquiries">문의 모니터링</Link>
          <Link className="secondary-button" to="/admin/reviews">리뷰 운영</Link>
          <Link className="secondary-button" to="/admin/audit-logs">운영 로그</Link>
        </div>
      </section>
    </div>
  );
}
