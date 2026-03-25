import { useState } from "react";
import { Link } from "react-router-dom";
import { sellerApplicationStatus, sellerApplicationSteps } from "../../data/opsData";

export default function SellerApplyPage() {
  const [status, setStatus] = useState("PENDING");
  const [form, setForm] = useState({
    businessNo: "",
    businessName: "",
    owner: "",
    account: "",
  });

  const handleChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("PENDING");
  };

  return (
    <div className="container page-stack">
      <section className="ops-hero">
        <div>
          <p className="eyebrow">판매자 신청</p>
          <h1>판매자 신청</h1>
          <p>사업자 정보 제출부터 승인 결과 확인까지 한 화면에서 준비합니다.</p>
        </div>
      </section>

      <section className="ops-board">
        <div className="summary-grid">
          {sellerApplicationStatus.map((item) => (
            <div key={item.label} className={`summary-card tone-${item.tone}`}>
              <span>{item.label}</span>
              <strong>{item.label === "현재 상태" ? (status === "PENDING" ? "승인 대기" : status) : item.display ?? item.value}</strong>
              {item.label === "현재 상태" ? <p>{status}</p> : null}
            </div>
          ))}
        </div>
        <div className="ops-toolbar">
          <span className="inline-chip">승인 대기</span>
          <span className="inline-chip">승인 완료</span>
          <span className="inline-chip">반려</span>
          <span className="inline-chip">운영 중지</span>
        </div>
        <div className="ops-worklist">
          {sellerApplicationSteps.map((item) => (
            <div key={item} className="ops-work-item">
              {item}
            </div>
          ))}
        </div>
        <form className="my-form-sheet" onSubmit={handleSubmit}>
          <label className="field-block">
            <span>사업자번호</span>
            <input value={form.businessNo} onChange={(e) => handleChange("businessNo", e.target.value)} required />
          </label>
          <label className="field-block">
            <span>상호명</span>
            <input value={form.businessName} onChange={(e) => handleChange("businessName", e.target.value)} required />
          </label>
          <label className="field-block">
            <span>대표자명</span>
            <input value={form.owner} onChange={(e) => handleChange("owner", e.target.value)} required />
          </label>
          <label className="field-block">
            <span>정산 계좌</span>
            <input value={form.account} onChange={(e) => handleChange("account", e.target.value)} placeholder="은행 / 계좌번호" required />
          </label>
          <div className="booking-actions">
            <button type="submit" className="primary-button">신청 제출</button>
          </div>
        </form>
        <div className="hero-actions">
          <Link className="primary-button" to="/seller/lodgings">숙소 관리로 이동</Link>
          <Link className="secondary-button" to="/seller/rooms">객실 관리</Link>
          <Link className="secondary-button" to="/seller/inquiries">문의 관리</Link>
        </div>
      </section>
    </div>
  );
}
