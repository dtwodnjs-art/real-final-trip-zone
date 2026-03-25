import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SubmissionHtmlRedirect() {
  const location = useLocation();

  useEffect(() => {
    const targetPath =
      location.pathname === "/submission-html" || location.pathname === "/submission-html/"
        ? "/submission-html/index.html"
        : location.pathname;

    const nextUrl = `${targetPath}${location.search}${location.hash}`;
    window.location.replace(nextUrl);
  }, [location]);

  return null;
}
