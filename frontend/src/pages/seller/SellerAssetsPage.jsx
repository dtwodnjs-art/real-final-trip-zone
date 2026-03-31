import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DataTable from "../../components/common/DataTable";
import { getSellerAssets, updateSellerAsset } from "../../services/dashboardService";

const columns = [
  { key: "lodging", label: "숙소명" },
  { key: "type", label: "이미지 유형" },
  { key: "order", label: "정렬 순서" },
  { key: "status", label: "노출 상태" },
];

export default function SellerAssetsPage() {
  const [rows, setRows] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const selected = rows.find((row) => `${row.lodging}-${row.type}` === selectedKey) ?? rows[0];

  useEffect(() => {
    let cancelled = false;

    async function loadRows() {
      try {
        setIsLoading(true);
        const nextRows = await getSellerAssets();
        if (cancelled) return;
        setRows(nextRows);
        setSelectedKey(nextRows[0] ? `${nextRows[0].lodging}-${nextRows[0].type}` : null);
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load seller assets.", error);
        setNotice("이미지 목록을 불러오지 못했습니다.");
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

  const updateSelected = async (patch) => {
    if (!selected) return;
    try {
      await updateSellerAsset(selectedKey, patch);
    } catch (error) {
      setNotice(error.message);
    }
  };

  return (
    <DashboardLayout role="seller">
      <div className="dash-page-header">
        <div className="dash-page-header-copy">
          <p className="eyebrow">이미지 운영</p>
          <h1>숙소 이미지 관리</h1>
          <p>대표 {rows.filter((r) => r.type === "대표 이미지").length}개 · 검수중 {rows.filter((r) => r.status === "검수중").length}개</p>
          {notice ? <p>{notice}</p> : null}
        </div>
      </div>

      <div className="dash-table-split">
        <section className="dash-content-section" style={{ marginBottom: 0 }}>
          {isLoading ? <div className="my-empty-inline">이미지 목록을 불러오는 중입니다.</div> : null}
          <DataTable
            columns={columns}
            rows={rows}
            getRowKey={(row) => `${row.lodging}-${row.type}`}
            selectedKey={selectedKey}
            onRowClick={(row) => setSelectedKey(`${row.lodging}-${row.type}`)}
          />
        </section>

        <div className="dash-action-sheet">
          <h3>{selected?.lodging ?? "—"}</h3>
          <p>{selected?.type} · 순서 {selected?.order}</p>
          <div className="dash-action-grid">
            <button type="button" className="dash-action-btn is-primary" onClick={() => updateSelected({ status: "노출중" })} disabled={!selected}>노출</button>
            <button type="button" className="dash-action-btn is-danger" onClick={() => updateSelected({ status: "검수중" })} disabled={!selected}>검수중</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
