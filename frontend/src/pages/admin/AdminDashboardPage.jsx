import {
  DashboardChecklist,
  DashboardFactGrid,
  DashboardHeader,
  DashboardLogList,
  DashboardMetricBar,
  DashboardPriorityTable,
  DashboardSectionHead,
  DashboardTrendList,
  DashboardWatchList,
} from "../../features/dashboard/DashboardUI";
import { getAdminDashboardViewModel } from "../../features/dashboard/dashboardViewModels";

export default function AdminDashboardPage() {
  const vm = getAdminDashboardViewModel();

  return (
    <div className="container page-stack">
      <section className="dashboard-workspace admin-workspace">
        <DashboardHeader {...vm.header} ariaLabel="관리 메뉴" />
        <DashboardMetricBar items={vm.metrics} label="운영 요약" />

        <div className="dashboard-workgrid">
          <main className="dashboard-mainpane">
            <section className="dashboard-sheet">
              <DashboardSectionHead eyebrow="우선 처리" title="승인 대기 판매자와 운영 이슈" action={{ label: "전체 보기", to: "/admin/sellers" }} />
              <DashboardPriorityTable rows={vm.watchRows} />
            </section>

            <section className="dashboard-sheet">
              <DashboardSectionHead eyebrow="최근 조치" title="관리 로그" action={{ label: "로그 보기", to: "/admin/audit-logs" }} />
              <DashboardLogList rows={vm.logs} />
            </section>

            <section className="dashboard-sheet">
              <DashboardSectionHead eyebrow="운영 추이" title="월별 예약과 매출 흐름" />
              <DashboardTrendList rows={vm.trends} />
            </section>
          </main>

          <aside className="dashboard-sidepane">
            <section className="dashboard-sideblock">
              <DashboardSectionHead eyebrow="즉시 확인" title="주의 회원" action={{ label: "회원 관리", to: "/admin/users" }} />
              <DashboardWatchList rows={vm.attentionUsers} />
              <DashboardFactGrid items={vm.facts} />
            </section>

            <section className="dashboard-sideblock">
              <DashboardSectionHead eyebrow="오늘 점검" title="체크리스트" />
              <DashboardChecklist items={vm.checklist} />
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
