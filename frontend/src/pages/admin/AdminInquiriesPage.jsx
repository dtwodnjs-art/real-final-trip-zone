import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DataTable from "../../components/common/DataTable";
import { getAdminInquiries, updateAdminInquiryStatus } from "../../services/dashboardService";

const columns = [
  { key: "title", label: "제목" },
  { key: "type", label: "유형" },
  { key: "status", label: "상태" },
  { key: "date", label: "접수일" },
];

export default function AdminInquiriesPage() {
  const [rows, setRows] = useState(() => getAdminInquiries());
  const [selectedId, setSelectedId] = useState(rows[0]?.id ?? null);
  const selected = rows.find((row) => row.id === selectedId) ?? rows[0];

  const updateStatus = (nextStatus) => {
    if (!selected) return;
    const nextRows = updateAdminInquiryStatus(selected.id, nextStatus);
    setRows(nextRows);
  };

  return (
    <DashboardLayout role="admin">
      <div className="dash-page-header">
        <div className="dash-page-header-copy">
          <p className="eyebrow">문의 운영</p>
          <h1>상세 문의 관리</h1>
          <p>접수 {rows.filter((r) => r.status === "OPEN").length} · 답변완료 {rows.filter((r) => r.status === "ANSWERED").length} · 종료 {rows.filter((r) => r.status === "CLOSED").length}</p>
        </div>
      </div>

      <div className="dash-table-split">
        <section className="dash-content-section" style={{ marginBottom: 0 }}>
          <DataTable
            columns={columns}
            rows={rows}
            getRowKey={(row) => row.id}
            selectedKey={selectedId}
            onRowClick={(row) => setSelectedId(row.id)}
          />
        </section>

        <div className="dash-action-sheet">
          <h3>{selected?.title ?? "—"}</h3>
          <p>{selected?.type} · {selected?.date} · {selected?.owner}</p>
          <p>{selected?.summary}</p>
          <div className="inquiry-thread-list" style={{ marginTop: 20 }}>
            {selected?.messages?.map((message) => (
              <article
                key={`${selected?.id}-${message.id}`}
                className={`inquiry-message${message.sender === "회원" ? " is-user" : " is-operator"}`}
              >
                <div className="inquiry-message-head">
                  <strong>{message.sender}</strong>
                  <span>{message.time}</span>
                </div>
                <p>{message.body}</p>
              </article>
            ))}
          </div>
          <div className="dash-action-grid">
            <button type="button" className="dash-action-btn is-primary" onClick={() => updateStatus("ANSWERED")}>답변 완료</button>
            <button type="button" className="dash-action-btn" onClick={() => updateStatus("CLOSED")}>종료</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
