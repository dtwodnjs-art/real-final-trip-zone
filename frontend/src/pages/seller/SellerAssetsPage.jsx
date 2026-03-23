import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { sellerImageRows } from "../../data/siteData";
import { readMockRows, writeMockRows } from "../../utils/mockStorage";

const columns = [
  { key: "lodging", label: "숙소명" },
  { key: "type", label: "이미지 유형" },
  { key: "order", label: "정렬 순서" },
  { key: "status", label: "노출 상태" },
];

export default function SellerAssetsPage() {
  const [rows, setRows] = useState(() => readMockRows("tripzone-seller-assets", sellerImageRows));
  const [selectedKey, setSelectedKey] = useState(rows[0] ? `${rows[0].lodging}-${rows[0].type}` : null);
  const selected = rows.find((row) => `${row.lodging}-${row.type}` === selectedKey) ?? rows[0];

  const updateSelected = (patch) => {
    if (!selected) return;
    const nextRows = rows.map((row) =>
      `${row.lodging}-${row.type}` === selectedKey ? { ...row, ...patch } : row
    );
    setRows(nextRows);
    writeMockRows("tripzone-seller-assets", nextRows);
  };

  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">이미지 운영</p>
          <h1>숙소 이미지 관리</h1>
        </div>
        <div className="ops-toolbar">
          <span className="inline-chip">대표 이미지 2개</span>
          <span className="inline-chip">검수중 1개</span>
        </div>
      </section>
      <section className="ops-table-section">
        <div className="ops-table-head">
          <h2>이미지 목록</h2>
          <p>대표/일반 이미지와 정렬 순서를 바로 확인</p>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          getRowKey={(row) => `${row.lodging}-${row.type}`}
          selectedKey={selectedKey}
          onRowClick={(row) => setSelectedKey(`${row.lodging}-${row.type}`)}
        />
        <div className="ops-action-panel">
          <h3>{selected?.lodging ?? "선택된 이미지 없음"}</h3>
          <p>대표/일반 이미지 유형과 노출 상태를 조정합니다.</p>
          <div className="ops-action-grid">
            <button type="button" className="secondary-button" onClick={() => updateSelected({ type: "대표 이미지" })}>대표</button>
            <button type="button" className="secondary-button" onClick={() => updateSelected({ type: "일반 이미지" })}>일반</button>
            <button type="button" className="secondary-button" onClick={() => updateSelected({ status: "노출중" })}>노출</button>
            <button type="button" className="secondary-button" onClick={() => updateSelected({ status: "검수중" })}>검수중</button>
          </div>
        </div>
        <div className="booking-actions">
          <Link className="secondary-button" to="/seller/lodgings">숙소 관리</Link>
          <Link className="secondary-button" to="/seller/rooms">객실 관리</Link>
          <Link className="secondary-button" to="/seller/reservations">예약 관리</Link>
        </div>
      </section>
    </div>
  );
}
