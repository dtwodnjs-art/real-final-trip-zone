import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMyInquiryThread, findMyInquiryThread } from "../../utils/myInquiryCenter";

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

export default function MyInquiryDetailPage() {
  const { inquiryId } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);

  useEffect(() => {
    setThread(findMyInquiryThread(inquiryId));
  }, [inquiryId]);

  if (!thread) {
    return (
      <div className="container page-stack">
        <section className="my-page-head">
          <p className="eyebrow">문의 상세</p>
          <h1>문의 정보를 찾을 수 없습니다.</h1>
        </section>
      </div>
    );
  }

  const handleDelete = () => {
    deleteMyInquiryThread(thread.id);
    navigate("/my/inquiries");
  };

  return (
    <div className="container page-stack">
      <section className="my-page-head">
        <p className="eyebrow">{TYPE_LABELS[thread.type] ?? thread.type}</p>
        <h1>{thread.title}</h1>
        <p>{thread.lodging} · {thread.bookingNo} · {thread.updatedAt}</p>
      </section>

      <section className="my-page-panel">
        <div className="summary-grid">
          <div className="summary-card tone-mint">
            <span>문의 상태</span>
            <strong>{STATUS_LABELS[thread.status] ?? thread.status}</strong>
          </div>
          <div className="summary-card tone-sand">
            <span>문의 유형</span>
            <strong>{TYPE_LABELS[thread.type] ?? thread.type}</strong>
          </div>
          <div className="summary-card tone-blue">
            <span>최근 갱신</span>
            <strong>{thread.updatedAt}</strong>
          </div>
        </div>

        <section className="inquiry-thread-panel">
          <div className="inquiry-thread-list">
            {thread.messages.map((message) => (
              <article
                key={`${thread.id}-${message.id}`}
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
        </section>

        <div className="booking-actions">
          <Link className="secondary-button" to={`/my/inquiries/${thread.id}/edit`}>
            수정
          </Link>
          <Link className="secondary-button" to="/my/inquiries">
            목록
          </Link>
          <button type="button" className="danger-button" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </section>
    </div>
  );
}
