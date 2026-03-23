import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { reservationRows } from "../../data/siteData";
import { readMockRows, writeMockRows } from "../../utils/mockStorage";

const columns = [
  { key: "no", label: "예약번호" },
  { key: "guest", label: "예약자" },
  { key: "stay", label: "숙박일" },
  { key: "status", label: "상태" },
  { key: "amount", label: "결제금액" },
];

export default function SellerReservationsPage() {
  const [rows, setRows] = useState(() => readMockRows("tripzone-seller-reservations", reservationRows));
  const [selectedNo, setSelectedNo] = useState(rows[0]?.no ?? null);
  const selected = rows.find((row) => row.no === selectedNo) ?? rows[0];

  const updateStatus = (nextStatus) => {
    if (!selected) return;
    const nextRows = rows.map((row) => (row.no === selected.no ? { ...row, status: nextStatus } : row));
    setRows(nextRows);
    writeMockRows("tripzone-seller-reservations", nextRows);
  };

  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">예약 운영</p>
          <h1>예약 관리</h1>
        </div>
        <div className="ops-toolbar">
          <span className="inline-chip">오늘 체크인 6건</span>
          <span className="inline-chip">승인 대기 1건</span>
          <span className="inline-chip">취소 요청 1건</span>
        </div>
      </section>
      <section className="ops-table-section">
        <div className="ops-table-head">
          <h2>예약 목록</h2>
          <p>체크인 일정, 승인 대기, 취소 요청 기준으로 확인</p>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          getRowKey={(row) => row.no}
          selectedKey={selectedNo}
          onRowClick={(row) => setSelectedNo(row.no)}
        />
        <div className="ops-action-panel">
          <h3>{selected?.no ?? "선택된 예약 없음"}</h3>
          <p>예약 상태를 기준 흐름에 맞춰 처리합니다.</p>
          <div className="ops-action-grid">
            <button type="button" className="secondary-button" onClick={() => updateStatus("CONFIRMED")}>확정</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("CANCELED")}>취소</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("COMPLETED")}>숙박 완료</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("NO_SHOW")}>노쇼</button>
          </div>
        </div>
        <div className="booking-actions">
          <Link className="secondary-button" to="/seller/lodgings">숙소 관리</Link>
          <Link className="secondary-button" to="/seller/rooms">객실 관리</Link>
          <Link className="secondary-button" to="/seller/inquiries">문의 관리</Link>
        </div>
      </section>
    </div>
  );
}
