(function () {
  const header = document.querySelector(".floating-header");
  const navLinks = Array.from(document.querySelectorAll(".sidebar-nav a[href^='#']"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!navLinks.length || !sections.length) return;

  function setActiveById(id) {
    navLinks.forEach((link) => {
      const match = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", match);
      if (match) {
        link.scrollIntoView({
          block: "nearest",
          inline: "nearest",
          behavior: "smooth",
        });
      }
    });
  }

  function getHeaderOffset() {
    return (header ? header.offsetHeight : 0) + 18;
  }

  function syncByHash() {
    const hash = window.location.hash.replace("#", "");
    if (hash) setActiveById(hash);
  }

  function syncByScroll() {
    const offset = getHeaderOffset();
    let currentId = sections[0].id;

    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top - offset <= 12) currentId = section.id;
    });

    setActiveById(currentId);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").replace("#", "");
      setActiveById(id);
    });
  });

  window.addEventListener("hashchange", syncByHash);
  window.addEventListener("scroll", syncByScroll, { passive: true });
  window.addEventListener("load", () => {
    syncByHash();
    syncByScroll();
  });
})();
