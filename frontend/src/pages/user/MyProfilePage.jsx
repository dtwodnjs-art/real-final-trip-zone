import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPageLayout from "../../components/user/MyPageLayout";
import { getProfileFieldGroups } from "../../features/mypage/mypageViewModels";
import { clearAuthSession } from "../../utils/authSession";
import { useEffect } from "react";
import { getMyProfileDetails, getMyProfileSummary } from "../../services/mypageService";

export default function MyProfilePage() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { accountInfoRows, accountMetaRows } = getProfileFieldGroups(details);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    nextPassword: "",
    confirmPassword: "",
  });
  const [accountActionNotice, setAccountActionNotice] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        setIsLoading(true);
        const [nextSummary, nextDetails] = await Promise.all([getMyProfileSummary(), getMyProfileDetails()]);
        if (cancelled) return;
        setSummary(nextSummary);
        setDetails(nextDetails);
      } catch (error) {
        console.error("Failed to load my profile.", error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  const handlePasswordChange = (key, value) => {
    setPasswordForm((current) => ({ ...current, [key]: value }));
  };

  const handlePasswordSave = () => {
    if (!passwordForm.nextPassword.trim()) {
      setAccountActionNotice("새 비밀번호를 입력해 주세요.");
      return;
    }

    if (passwordForm.nextPassword.length < 8) {
      setAccountActionNotice("비밀번호는 8자 이상으로 입력해 주세요.");
      return;
    }

    if (passwordForm.nextPassword !== passwordForm.confirmPassword) {
      setAccountActionNotice("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    setAccountActionNotice("비밀번호 변경 API 보강 후 실제 저장을 연결합니다.");
  };

  const handleWithdraw = () => {
    setAccountActionNotice("회원 탈퇴는 백엔드 보강 후 열립니다.");
  };

  const handleLogoutAll = () => {
    clearAuthSession();
    navigate("/login");
  };

  return (
    <MyPageLayout>
      <section className="my-list-sheet profile-sheet profile-sheet-v2">
        {isLoading ? (
          <div className="my-empty-panel">
            <strong>회원 정보를 불러오는 중입니다.</strong>
            <p>프로필 요약과 계정 정보를 동기화하고 있습니다.</p>
          </div>
        ) : null}
        <div className="mypage-section-top">
          <strong>내 정보 관리</strong>
        </div>
        <section className="profile-form-section">
          <div className="profile-form-head">
            <div>
              <strong>회원 정보</strong>
              <p>현재 정보 수정은 앱에서 가능해요.</p>
            </div>
          </div>
          <div className="mypage-guide-banner">
            <span>가려진 내 정보를 확인할 수 있어요!</span>
          </div>
          <div className="profile-form-grid">
            {accountInfoRows.map((item) => (
              <div key={item.label} className="profile-form-field">
                <span>{item.label}</span>
                <input value={item.value ?? ""} readOnly />
              </div>
            ))}
            {accountMetaRows.map((item) => (
              <div key={item.label}>
                <div className={`profile-form-field${item.label === "비밀번호" ? " is-password" : ""}`}>
                  <span>{item.label}</span>
                  <div className="profile-form-input-wrap">
                    <input value={item.value ?? ""} readOnly />
                    {item.label === "비밀번호" ? (
                      <button
                        type="button"
                        className="profile-inline-edit-button"
                        aria-label="비밀번호 변경"
                        onClick={() => {
                          setIsPasswordEditing((current) => !current);
                          setAccountActionNotice("");
                        }}
                      >
                        <span aria-hidden="true">✎</span>
                      </button>
                    ) : null}
                  </div>
                </div>
                {item.label === "비밀번호" && isPasswordEditing ? (
                  <div className="profile-password-panel profile-password-panel-inline">
                    <div className="profile-password-head">
                      <strong>비밀번호 변경</strong>
                      <p>비밀번호 변경 API가 아직 없어 실제 저장은 막아 둔 상태입니다.</p>
                    </div>
                    <div className="profile-password-grid">
                      <label className="profile-form-field">
                        <span>새 비밀번호</span>
                        <input
                          type="password"
                          value={passwordForm.nextPassword}
                          onChange={(event) => handlePasswordChange("nextPassword", event.target.value)}
                          placeholder="8자 이상 입력"
                        />
                      </label>
                      <label className="profile-form-field">
                        <span>비밀번호 확인</span>
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(event) => handlePasswordChange("confirmPassword", event.target.value)}
                          placeholder="비밀번호 다시 입력"
                        />
                      </label>
                    </div>
                    <div className="profile-password-actions">
                      <button type="button" className="coupon-action-button" onClick={handlePasswordSave}>변경 저장</button>
                      <button
                        type="button"
                        className="ghost-action-button"
                        onClick={() => {
                          setIsPasswordEditing(false);
                          setAccountActionNotice("");
                          setPasswordForm({ nextPassword: "", confirmPassword: "" });
                        }}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
        <section className="profile-summary-note">
          <span>{summary?.status ?? "회원 상태 확인 중"}</span>
          <span>{summary?.grade ? `${summary.grade} 등급` : "등급 확인 중"}</span>
          <span>{summary?.joinedAt ?? "가입일 확인 중"}</span>
          {accountActionNotice ? <span>{accountActionNotice}</span> : null}
        </section>
        <section className="profile-device-strip">
          <div>
            <strong>세션 종료</strong>
            <p>현재 기기 로그인 세션만 종료합니다.</p>
          </div>
          <button type="button" className="coupon-action-button" onClick={handleLogoutAll}>로그아웃</button>
        </section>
        <section className="profile-exit-row">
          <span>회원 탈퇴는 백엔드 보강 후 이 화면에서 이어집니다.</span>
          <button type="button" className="profile-withdraw-link" onClick={handleWithdraw}>
            회원탈퇴
          </button>
        </section>
      </section>
    </MyPageLayout>
  );
}
