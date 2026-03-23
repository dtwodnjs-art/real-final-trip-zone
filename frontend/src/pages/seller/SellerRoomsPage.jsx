import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { sellerRoomRows } from "../../data/siteData";
import { readMockRows, writeMockRows } from "../../utils/mockStorage";

const columns = [
  { key: "name", label: "객실명" },
  { key: "type", label: "유형" },
  { key: "lodging", label: "숙소명" },
  { key: "status", label: "상태" },
  { key: "capacity", label: "최대 인원" },
  { key: "price", label: "가격" },
];

export default function SellerRoomsPage() {
  const [rows, setRows] = useState(() => readMockRows("tripzone-seller-rooms", sellerRoomRows));
  const [selectedName, setSelectedName] = useState(rows[0]?.name ?? null);
  const selected = rows.find((row) => row.name === selectedName) ?? rows[0];

  const updateStatus = (nextStatus) => {
    if (!selected) return;
    const nextRows = rows.map((row) => (row.name === selected.name ? { ...row, status: nextStatus } : row));
    setRows(nextRows);
    writeMockRows("tripzone-seller-rooms", nextRows);
  };

  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">객실 운영</p>
          <h1>객실 관리</h1>
        </div>
        <div className="ops-toolbar">
          <span className="inline-chip">예약 가능 2개</span>
          <span className="inline-chip">예약 불가 1개</span>
        </div>
      </section>
      <section className="ops-table-section">
        <div className="ops-table-head">
          <h2>객실 목록</h2>
          <p>예약 가능 여부, 인원, 가격 기준으로 바로 확인</p>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          getRowKey={(row) => `${row.lodging}-${row.name}`}
          selectedKey={selected ? `${selected.lodging}-${selected.name}` : null}
          onRowClick={(row) => setSelectedName(row.name)}
        />
        <div className="ops-action-panel">
          <h3>{selected?.name ?? "선택된 객실 없음"}</h3>
          <p>객실 예약 가능 상태를 변경합니다.</p>
          <div className="ops-action-grid">
            <button type="button" className="secondary-button" onClick={() => updateStatus("AVAILABLE")}>예약 가능</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("UNAVAILABLE")}>예약 불가</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("SUSPENDED")}>운영 중지</button>
          </div>
        </div>
        <div className="booking-actions">
          <Link className="secondary-button" to="/seller/lodgings">숙소 관리</Link>
          <Link className="secondary-button" to="/seller/reservations">예약 관리</Link>
          <Link className="secondary-button" to="/seller/inquiries">문의 관리</Link>
        </div>
      </section>
    </div>
  );
}
