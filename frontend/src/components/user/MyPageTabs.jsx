import { NavLink } from "react-router-dom";

const TAB_ITEMS = [
  { to: "/my", label: "홈", end: true },
  { to: "/my/profile", label: "내 정보" },
  { to: "/my/bookings", label: "예약" },
  { to: "/my/payments", label: "결제" },
  { to: "/my/coupons", label: "쿠폰" },
  { to: "/my/mileage", label: "마일리지" },
  { to: "/my/wishlist", label: "찜" },
  { to: "/my/inquiries", label: "문의" },
];

export default function MyPageTabs() {
  return (
    <nav className="my-page-tabs" aria-label="마이페이지 메뉴">
      {TAB_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `my-page-tab${isActive ? " is-active" : ""}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
