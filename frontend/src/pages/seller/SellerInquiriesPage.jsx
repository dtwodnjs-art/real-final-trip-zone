import { useMemo, useState } from "react";
import { inquiryMessages, inquiryRooms } from "../../data/siteData";

const statusLabel = {
  OPEN: "접수",
  ANSWERED: "답변 완료",
  CLOSED: "종료",
  BLOCKED: "차단",
};

const typeLabel = {
  LODGING: "숙소 문의",
  BOOKING: "예약 문의",
  PAYMENT: "결제 문의",
  SYSTEM: "시스템 문의",
};

export default function SellerInquiriesPage() {
  const [selectedRoomId, setSelectedRoomId] = useState(inquiryRooms[0]?.id ?? null);

  const selectedRoom = useMemo(
    () => inquiryRooms.find((room) => room.id === selectedRoomId) ?? inquiryRooms[0],
    [selectedRoomId]
  );
  const messages = inquiryMessages[selectedRoom?.id] ?? [];

  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">문의 운영</p>
          <h1>문의 관리</h1>
        </div>
        <div className="ops-toolbar">
          <span className="inline-chip">접수 1건</span>
          <span className="inline-chip">답변 완료 1건</span>
          <span className="inline-chip">종료 1건</span>
        </div>
      </section>

      <section className="inquiry-layout">
        <aside className="inquiry-room-list">
          {inquiryRooms.map((room) => (
            <button
              key={room.id}
              type="button"
              className={`inquiry-room-card${selectedRoom?.id === room.id ? " is-active" : ""}`}
              onClick={() => setSelectedRoomId(room.id)}
            >
              <div className="inquiry-room-top">
                <strong>{room.title}</strong>
                <span className={`table-code code-${room.status.toLowerCase()}`}>
                  {statusLabel[room.status] ?? room.status}
                </span>
              </div>
              <div className="inquiry-room-meta">
                <span>{typeLabel[room.type] ?? room.type}</span>
                <span>{room.updatedAt}</span>
              </div>
              <p>{room.preview}</p>
              <div className="inquiry-room-foot">
                <span>{room.lodging}</span>
                <span>{room.bookingNo}</span>
              </div>
            </button>
          ))}
        </aside>

        <section className="inquiry-thread-panel">
          <div className="inquiry-thread-head">
            <div>
              <p className="eyebrow">{typeLabel[selectedRoom?.type] ?? "문의"}</p>
              <h2>{selectedRoom?.title}</h2>
            </div>
            <div className="inquiry-thread-meta">
              <span>{selectedRoom?.lodging}</span>
              <span>{selectedRoom?.bookingNo}</span>
            </div>
          </div>

          <div className="inquiry-thread-list">
            {messages.map((message) => (
              <article
                key={`${selectedRoom?.id}-${message.id}`}
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
      </section>
    </div>
  );
}
