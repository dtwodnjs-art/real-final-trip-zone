import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DataTable from "../../components/common/DataTable";
import { getAdminReviews, updateAdminReviewStatus } from "../../services/dashboardService";

const columns = [
  { key: "lodging", label: "숙소" },
  { key: "author", label: "작성자" },
  { key: "score", label: "평점" },
  { key: "status", label: "상태" },
  { key: "report", label: "신고" },
];

export default function AdminReviewsPage() {
  const [rows, setRows] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const selected = rows.find((row) => `${row.lodging}-${row.author}` === selectedKey) ?? rows[0];

  useEffect(() => {
    let cancelled = false;

    async function loadRows() {
      try {
        setIsLoading(true);
        const nextRows = await getAdminReviews();
        if (cancelled) return;
        setRows(nextRows);
        setSelectedKey(nextRows[0] ? `${nextRows[0].lodging}-${nextRows[0].author}` : null);
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load admin reviews.", error);
        setNotice("리뷰 목록을 불러오지 못했습니다.");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadRows();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateStatus = async (nextStatus) => {
    if (!selected) return;
    try {
      await updateAdminReviewStatus(selectedKey, nextStatus);
    } catch (error) {
      setNotice(error.message);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="dash-page-header">
        <div className="dash-page-header-copy">
          <p className="eyebrow">리뷰 운영</p>
          <h1>리뷰 관리</h1>
          <p>노출 {rows.filter((r) => r.status === "VISIBLE").length} · 숨김 {rows.filter((r) => r.status === "HIDDEN").length} · 신고 {rows.filter((r) => r.status === "REPORTED").length}</p>
          {notice ? <p>{notice}</p> : null}
        </div>
      </div>

      <div className="dash-table-split">
        <section className="dash-content-section" style={{ marginBottom: 0 }}>
          {isLoading ? <div className="my-empty-inline">리뷰 목록을 불러오는 중입니다.</div> : null}
          <DataTable
            columns={columns}
            rows={rows}
            getRowKey={(row) => `${row.lodging}-${row.author}`}
            selectedKey={selectedKey}
            onRowClick={(row) => setSelectedKey(`${row.lodging}-${row.author}`)}
          />
        </section>

        <div className="dash-action-sheet">
          <h3>{selected?.lodging ?? "—"}</h3>
          <p>{selected?.author} · ★{selected?.score}</p>
          <div className="dash-action-grid">
            <button type="button" className="dash-action-btn is-primary" onClick={() => updateStatus("VISIBLE")} disabled={!selected}>노출</button>
            <button type="button" className="dash-action-btn is-danger" onClick={() => updateStatus("HIDDEN")} disabled={!selected}>숨김</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
