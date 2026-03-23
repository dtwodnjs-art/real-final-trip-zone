import { useState } from "react";
import { Link } from "react-router-dom";

export default function FindIdPage() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const canSubmit = form.name.trim() && form.phone.trim();

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
                "url(https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80)",
            }}
          >
            <div className="auth-copy-overlay">
              <p className="eyebrow">아이디 찾기</p>
              <h1>가입한 이메일을 다시 확인</h1>
              <p>이름과 전화번호를 입력하면 가입된 이메일 정보를 안내합니다.</p>
            </div>
          </div>
        </div>

        <form className="auth-panel auth-panel-strong" onSubmit={handleSubmit}>
          <div className="auth-panel-header">
            <strong>회원 확인</strong>
            <span>가입 시 입력한 이름과 전화번호를 사용합니다</span>
          </div>
          <label className="auth-field">
            <span>이름</span>
            <input className="auth-input" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          </label>
          <label className="auth-field">
            <span>전화번호</span>
            <input className="auth-input" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
          </label>
          {submitted ? (
            <div className="auth-result-card">
              <strong>가입된 이메일</strong>
              <p>tripzone@example.com</p>
            </div>
          ) : null}
          <button className={`primary-button booking-card-button${canSubmit ? "" : " is-disabled"}`} type="submit">
            아이디 확인
          </button>
          <div className="auth-links">
            <Link className="text-link" to="/login">
              로그인
            </Link>
            <Link className="text-link" to="/find-password">
              비밀번호 찾기
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
