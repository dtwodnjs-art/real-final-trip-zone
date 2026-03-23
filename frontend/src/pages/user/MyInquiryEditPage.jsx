import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findMyInquiryThread, updateMyInquiryThread } from "../../utils/myInquiryCenter";

export default function MyInquiryEditPage() {
  const { inquiryId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const thread = findMyInquiryThread(inquiryId);
    if (!thread) return;
    setForm({
      title: thread.title,
      type: thread.type,
      lodging: thread.lodging,
      bookingNo: thread.bookingNo,
      body: thread.body,
    });
  }, [inquiryId]);

  if (!form) {
    return (
      <div className="container page-stack">
        <section className="my-page-head">
          <p className="eyebrow">문의 수정</p>
          <h1>문의 정보를 찾을 수 없습니다.</h1>
        </section>
      </div>
    );
  }

  const handleChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateMyInquiryThread(inquiryId, form);
    navigate(`/my/inquiries/${inquiryId}`);
  };

  return (
    <div className="container page-stack">
      <section className="my-page-head">
        <p className="eyebrow">문의 수정</p>
        <h1>기존 문의 내용을 수정합니다.</h1>
      </section>

      <form className="my-form-sheet" onSubmit={handleSubmit}>
        <label className="field-block">
          <span>문의 제목</span>
          <input value={form.title} onChange={(e) => handleChange("title", e.target.value)} required />
        </label>
        <label className="field-block">
          <span>문의 유형</span>
          <select value={form.type} onChange={(e) => handleChange("type", e.target.value)}>
            <option value="LODGING">숙소 문의</option>
            <option value="BOOKING">예약 문의</option>
            <option value="PAYMENT">결제 문의</option>
            <option value="SYSTEM">시스템 문의</option>
          </select>
        </label>
        <label className="field-block">
          <span>관련 숙소</span>
          <input value={form.lodging} onChange={(e) => handleChange("lodging", e.target.value)} />
        </label>
        <label className="field-block">
          <span>관련 예약번호</span>
          <input value={form.bookingNo} onChange={(e) => handleChange("bookingNo", e.target.value)} />
        </label>
        <label className="field-block">
          <span>문의 내용</span>
          <textarea value={form.body} onChange={(e) => handleChange("body", e.target.value)} required rows={6} />
        </label>
        <div className="booking-actions">
          <button type="submit" className="primary-button">편집</button>
          <Link className="secondary-button" to={`/my/inquiries/${inquiryId}`}>취소</Link>
        </div>
      </form>
    </div>
  );
}
