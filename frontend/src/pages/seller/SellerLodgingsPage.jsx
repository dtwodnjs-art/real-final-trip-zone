import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { sellerLodgings } from "../../data/siteData";
import { readMockRows, writeMockRows } from "../../utils/mockStorage";

const columns = [
  { key: "name", label: "숙소명" },
  { key: "type", label: "유형" },
  { key: "region", label: "지역" },
  { key: "checkTime", label: "체크인/체크아웃" },
  { key: "status", label: "상태" },
  { key: "roomCount", label: "객실" },
  { key: "inquiryCount", label: "문의 건수" },
  { key: "occupancy", label: "점유율" },
];

export default function SellerLodgingsPage() {
  const [rows, setRows] = useState(() => readMockRows("tripzone-seller-lodgings", sellerLodgings));
  const [selectedId, setSelectedId] = useState(rows[0]?.id ?? null);
  const selected = rows.find((row) => row.id === selectedId) ?? rows[0];

  const updateStatus = (nextStatus) => {
    if (!selected) return;
    const nextRows = rows.map((row) => (row.id === selected.id ? { ...row, status: nextStatus } : row));
    setRows(nextRows);
    writeMockRows("tripzone-seller-lodgings", nextRows);
  };

  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">숙소 운영</p>
          <h1>숙소 관리</h1>
        </div>
        <div className="ops-toolbar">
          <span className="inline-chip">운영중 1곳</span>
          <span className="inline-chip">비노출 1곳</span>
          <span className="inline-chip">총 객실 6개</span>
        </div>
      </section>
      <section className="ops-table-section">
        <div className="ops-table-head">
          <h2>숙소 목록</h2>
          <p>운영 상태, 객실 수, 문의 건수, 점유율 기준으로 확인</p>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          getRowKey={(row) => row.id}
          selectedKey={selectedId}
          onRowClick={(row) => setSelectedId(row.id)}
        />
        <div className="ops-action-panel">
          <h3>{selected?.name ?? "선택된 숙소 없음"}</h3>
          <p>숙소 노출 상태를 바로 변경합니다.</p>
          <div className="ops-action-grid">
            <button type="button" className="secondary-button" onClick={() => updateStatus("ACTIVE")}>운영</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("INACTIVE")}>비노출</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("SUSPENDED")}>중지</button>
          </div>
        </div>
        <div className="booking-actions">
          <Link className="secondary-button" to="/seller/rooms">객실 관리</Link>
          <Link className="secondary-button" to="/seller/assets">이미지 관리</Link>
          <Link className="secondary-button" to="/seller/reservations">예약 관리</Link>
        </div>
      </section>
    </div>
  );
}
