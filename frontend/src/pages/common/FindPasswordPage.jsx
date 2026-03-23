import { useState } from "react";
import { Link } from "react-router-dom";

export default function FindPasswordPage() {
  const [form, setForm] = useState({ email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const canSubmit = form.email.trim() && form.phone.trim();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  return (
    <div className="container page-stack">
      <section className="auth-shell auth-shell-compact">
        <div className="auth-copy">
          <div
            className="auth-copy-visual"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80)",
            }}
          >
            <div className="auth-copy-overlay">
              <p className="eyebrow">비밀번호 찾기</p>
              <h1>비밀번호 재설정 안내 받기</h1>
              <p>가입한 이메일과 전화번호를 확인한 뒤 재설정 링크를 안내합니다.</p>
            </div>
          </div>
        </div>

        <form className="auth-panel auth-panel-strong" onSubmit={handleSubmit}>
          <div className="auth-panel-header">
            <strong>재설정 정보 확인</strong>
            <span>가입한 이메일과 전화번호를 입력하세요</span>
          </div>
          <label className="auth-field">
            <span>이메일</span>
            <input className="auth-input" type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
          </label>
          <label className="auth-field">
            <span>전화번호</span>
            <input className="auth-input" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
          </label>
          {submitted ? (
            <div className="auth-result-card">
              <strong>재설정 안내 완료</strong>
              <p>입력한 이메일로 비밀번호 재설정 링크를 보냈습니다.</p>
            </div>
          ) : null}
          <button className={`primary-button booking-card-button${canSubmit ? "" : " is-disabled"}`} type="submit">
            재설정 링크 받기
          </button>
          <div className="auth-links">
            <Link className="text-link" to="/login">
              로그인
            </Link>
            <Link className="text-link" to="/find-id">
              아이디 찾기
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
