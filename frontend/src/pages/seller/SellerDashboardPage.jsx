import {
  DashboardChecklist,
  DashboardHeader,
  DashboardLinkList,
  DashboardLodgingTable,
  DashboardMetricBar,
  DashboardReservationTable,
  DashboardSectionHead,
} from "../../features/dashboard/DashboardUI";
import { getSellerDashboardViewModel } from "../../features/dashboard/dashboardViewModels";

export default function SellerDashboardPage() {
  const vm = getSellerDashboardViewModel();

  return (
    <div className="container page-stack">
      <section className="dashboard-workspace seller-workspace">
        <DashboardHeader {...vm.header} ariaLabel="판매자 메뉴" />
        <DashboardMetricBar items={vm.metrics} label="판매자 요약" />

        <div className="dashboard-workgrid">
          <main className="dashboard-mainpane">
            <section className="dashboard-sheet">
              <DashboardSectionHead eyebrow="오늘 예약" title="체크인과 결제 확인 대상" action={{ label: "예약 관리", to: "/seller/reservations" }} />
              <DashboardReservationTable rows={vm.reservationRows} />
            </section>

            <section className="dashboard-sheet">
              <DashboardSectionHead eyebrow="운영 숙소" title="노출 상태와 객실 가동 현황" action={{ label: "숙소 관리", to: "/seller/lodgings" }} />
              <DashboardLodgingTable rows={vm.lodgingRows} />
            </section>
          </main>

          <aside className="dashboard-sidepane">
            <section className="dashboard-sideblock">
              <DashboardSectionHead eyebrow="오늘 점검" title="운영 체크리스트" />
              <DashboardChecklist items={vm.checklist} />
            </section>

            <section className="dashboard-sideblock">
              <DashboardSectionHead eyebrow="바로 이동" title="운영 메뉴" />
              <DashboardLinkList items={vm.quickLinks} />
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
