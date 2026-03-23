import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createMyInquiryThread } from "../../utils/myInquiryCenter";

const DEFAULT_FORM = {
  title: "",
  type: "LODGING",
  lodging: "",
  bookingNo: "",
  body: "",
};

export default function MyInquiryCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(DEFAULT_FORM);

  const handleChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMyInquiryThread(form);
    navigate("/my/inquiries");
  };

  return (
    <div className="container page-stack">
      <section className="my-page-head">
        <p className="eyebrow">문의 등록</p>
        <h1>문의 내용을 입력합니다.</h1>
        <p>완료를 누르면 새 문의가 포함된 상세 화면으로 이동합니다.</p>
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
          <input value={form.lodging} onChange={(e) => handleChange("lodging", e.target.value)} placeholder="예: 해운대 오션 스테이" />
        </label>
        <label className="field-block">
          <span>관련 예약번호</span>
          <input value={form.bookingNo} onChange={(e) => handleChange("bookingNo", e.target.value)} placeholder="예: B-24032" />
        </label>
        <label className="field-block">
          <span>문의 내용</span>
          <textarea value={form.body} onChange={(e) => handleChange("body", e.target.value)} required rows={6} />
        </label>
        <div className="booking-actions">
          <button type="submit" className="primary-button">완료</button>
          <Link className="secondary-button" to="/my/inquiries">취소</Link>
        </div>
      </form>
    </div>
  );
}
