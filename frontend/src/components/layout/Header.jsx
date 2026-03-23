import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuthSession, readAuthSession } from "../../utils/authSession";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState(() => readAuthSession());

  useEffect(() => {
    setSession(readAuthSession());
  }, [location.pathname, location.search]);

  const handleLogout = () => {
    clearAuthSession();
    setSession(null);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-frame header-inner">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-wave" />
            <span className="brand-mark-sun" />
          </span>
          <span className="brand-copy">
            <span className="brand-main">TripZone</span>
            <span className="brand-sub">stay and travel</span>
          </span>
        </Link>
        <div className="header-utility">
          {session ? (
            <>
              <Link className="utility-link" to="/my">
                마이페이지
              </Link>
              <button type="button" className="utility-link" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link className="utility-link" to="/login">
                로그인
              </Link>
              <Link className="header-signup" to="/signup">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
