import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyPageLayout from "../../components/user/MyPageLayout";
import { readMyInquiryThreads } from "../../utils/myInquiryCenter";

const STATUS_LABELS = {
  OPEN: "접수",
  ANSWERED: "답변 완료",
  CLOSED: "종료",
  BLOCKED: "차단",
};

const TYPE_LABELS = {
  LODGING: "숙소 문의",
  BOOKING: "예약 문의",
  PAYMENT: "결제 문의",
  SYSTEM: "시스템 문의",
};

export default function MyInquiriesPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(readMyInquiryThreads());
  }, []);

  return (
    <MyPageLayout eyebrow="문의센터" title="문의센터" description="제목을 누르면 상세로 이동하고, 등록 버튼으로 새 문의를 작성할 수 있습니다.">
        <div className="ops-toolbar">
          <Link className="primary-button" to="/my/inquiries/new">
            문의 등록
          </Link>
        </div>

        <div className="booking-list">
          {rows.map((item) => (
            <article key={item.id} className="booking-list-item">
              <div className="booking-list-copy">
                <Link className="text-link" to={`/my/inquiries/${item.id}`}>
                  {item.title}
                </Link>
                <p>{TYPE_LABELS[item.type] ?? item.type} · {item.lodging} · {item.updatedAt}</p>
              </div>
              <div className="booking-list-meta">
                <span className={`table-code code-${item.status.toLowerCase()}`}>
                  {STATUS_LABELS[item.status] ?? item.status}
                </span>
                <span>{item.bookingNo}</span>
              </div>
            </article>
          ))}
        </div>
    </MyPageLayout>
  );
}
