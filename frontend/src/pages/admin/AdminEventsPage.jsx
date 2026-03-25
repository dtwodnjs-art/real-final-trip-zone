import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { adminEventRows } from "../../data/opsData";
import { readMockRows, writeMockRows } from "../../utils/mockStorage";

const columns = [
  { key: "title", label: "이벤트/쿠폰명" },
  { key: "status", label: "상태" },
  { key: "target", label: "대상" },
  { key: "period", label: "운영 기간" },
];

export default function AdminEventsPage() {
  const [rows, setRows] = useState(() => readMockRows("tripzone-admin-events", adminEventRows));
  const [selectedTitle, setSelectedTitle] = useState(rows[0]?.title ?? null);
  const [draft, setDraft] = useState({
    title: rows[0]?.title ?? "",
    target: rows[0]?.target ?? "",
    period: rows[0]?.period ?? "",
  });
  const selectedEvent = rows.find((row) => row.title === selectedTitle) ?? rows[0];

  const syncDraft = (title) => {
    const target = rows.find((row) => row.title === title);
    if (!target) return;
    setDraft({ title: target.title, target: target.target, period: target.period });
  };

  const updateStatus = (nextStatus) => {
    if (!selectedEvent) return;
    const nextRows = rows.map((row) =>
      row.title === selectedEvent.title ? { ...row, status: nextStatus } : row
    );
    setRows(nextRows);
    writeMockRows("tripzone-admin-events", nextRows);
  };

  const handleSave = () => {
    if (!selectedEvent) return;
    const nextRows = rows.map((row) =>
      row.title === selectedEvent.title ? { ...row, ...draft } : row
    );
    setRows(nextRows);
    writeMockRows("tripzone-admin-events", nextRows);
  };

  const handleCreate = () => {
    const nextRow = { ...draft, status: "검수중" };
    const nextRows = [nextRow, ...rows];
    setRows(nextRows);
    setSelectedTitle(nextRow.title);
    writeMockRows("tripzone-admin-events", nextRows);
  };

  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">이벤트 운영</p>
          <h1>이벤트 · 쿠폰 관리</h1>
        </div>
        <div className="ops-toolbar">
          <span className="inline-chip">노출중 {rows.filter((item) => item.status === "노출중").length}건</span>
          <span className="inline-chip">발급중 {rows.filter((item) => item.status === "발급중").length}건</span>
          <span className="inline-chip">검수중 {rows.filter((item) => item.status === "검수중").length}건</span>
        </div>
      </section>
      <section className="ops-table-section">
        <div className="ops-table-head">
          <h2>이벤트/쿠폰 목록</h2>
          <p>노출 상태와 운영 기간을 바로 확인</p>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          getRowKey={(row) => row.title}
          selectedKey={selectedTitle}
          onRowClick={(row) => {
            setSelectedTitle(row.title);
            syncDraft(row.title);
          }}
        />
        <div className="ops-action-panel">
          <h3>{selectedEvent?.title ?? "선택된 이벤트 없음"}</h3>
          <p>이벤트/쿠폰 등록, 수정, 숨김 상태를 mock으로 처리합니다.</p>
          <div className="field-block">
            <span>이벤트/쿠폰명</span>
            <input value={draft.title} onChange={(e) => setDraft((current) => ({ ...current, title: e.target.value }))} />
          </div>
          <div className="field-block">
            <span>대상</span>
            <input value={draft.target} onChange={(e) => setDraft((current) => ({ ...current, target: e.target.value }))} />
          </div>
          <div className="field-block">
            <span>운영 기간</span>
            <input value={draft.period} onChange={(e) => setDraft((current) => ({ ...current, period: e.target.value }))} />
          </div>
          <div className="ops-action-grid">
            <button type="button" className="secondary-button" onClick={handleCreate}>등록</button>
            <button type="button" className="secondary-button" onClick={handleSave}>수정</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("노출중")}>노출</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("발급중")}>발급</button>
            <button type="button" className="secondary-button" onClick={() => updateStatus("숨김")}>숨김</button>
          </div>
        </div>
        <div className="booking-actions">
          <Link className="secondary-button" to="/admin/users">회원 관리</Link>
          <Link className="secondary-button" to="/admin/sellers">판매자 관리</Link>
          <Link className="secondary-button" to="/admin/inquiries">문의 모니터링</Link>
          <Link className="secondary-button" to="/admin/reviews">리뷰 운영</Link>
          <Link className="secondary-button" to="/admin/audit-logs">운영 로그</Link>
        </div>
      </section>
    </div>
  );
}
