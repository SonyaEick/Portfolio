(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeBtn");
  const pdfBtn = document.getElementById("pdfBtn");
  const yearEl = document.getElementById("year");
  const backdrop = document.getElementById("drawerBackdrop");
  const drawer = document.getElementById("projectDrawer");
  const drawerTitle = document.getElementById("drawerTitle");
  const drawerTags = document.getElementById("drawerTags");
  const drawerBody = document.getElementById("drawerBody");
  const drawerClose = document.getElementById("drawerClose");
  const projectCards = document.querySelectorAll("[data-project]");
  const navToggle = document.getElementById("navToggle");
  const navClose = document.getElementById("navClose");
  const navBackdrop = document.getElementById("navBackdrop");
  const siteNav = document.getElementById("siteNav");
  const navProjectButtons = document.querySelectorAll("[data-nav-project]");

  let lastFocus = null;
  let lastNavFocus = null;

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function getPreferredTheme() {
    const stored = localStorage.getItem("portfolio-theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      themeBtn.innerHTML = '<span aria-hidden="true">☀</span> Light';
    } else {
      root.removeAttribute("data-theme");
      themeBtn.innerHTML = '<span aria-hidden="true">☾</span> Dark';
    }
    localStorage.setItem("portfolio-theme", theme);
  }

  applyTheme(getPreferredTheme());

  themeBtn.addEventListener("click", () => {
    const next =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  pdfBtn.addEventListener("click", () => window.print());

  function renderProject(project) {
    drawerTitle.textContent = project.title;
    drawerTags.innerHTML = "";
    project.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      drawerTags.appendChild(span);
    });

    drawerBody.innerHTML = "";

    if (project.links && project.links.length) {
      const links = document.createElement("div");
      links.className = "drawer-links";
      project.links.forEach((link) => {
        const a = document.createElement("a");
        a.href = link.href;
        a.className = "drawer-link";
        a.textContent = link.label;
        if (/^https?:\/\//i.test(link.href)) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        links.appendChild(a);
      });
      drawerBody.appendChild(links);
    }

    project.sections.forEach((section) => {
      const h3 = document.createElement("h3");
      h3.textContent = section.heading;
      const p = document.createElement("p");
      p.textContent = section.body;
      drawerBody.appendChild(h3);
      drawerBody.appendChild(p);
    });
  }

  function getFocusable(container) {
    return Array.from(
      container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
  }

  function openDrawer(projectId) {
    const project = window.PORTFOLIO_PROJECTS[projectId];
    if (!project) return;

    closeNav(true);

    lastFocus = document.activeElement;
    renderProject(project);

    backdrop.hidden = false;
    drawer.hidden = false;
    void drawer.offsetWidth;
    backdrop.classList.add("is-open");
    drawer.classList.add("is-open");
    document.body.classList.add("drawer-open");

    drawerClose.focus();
  }

  function closeDrawer() {
    if (drawer.hidden) return;

    backdrop.classList.remove("is-open");
    drawer.classList.remove("is-open");
    document.body.classList.remove("drawer-open");

    const onEnd = () => {
      drawer.hidden = true;
      backdrop.hidden = true;
      drawer.removeEventListener("transitionend", onEnd);
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
    };
    drawer.addEventListener("transitionend", onEnd);
  }

  function openNav() {
    closeDrawer();
    lastNavFocus = document.activeElement;
    navBackdrop.hidden = false;
    siteNav.hidden = false;
    void siteNav.offsetWidth;
    navBackdrop.classList.add("is-open");
    siteNav.classList.add("is-open");
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    navClose.focus();
  }

  function closeNav(skipFocus) {
    if (siteNav.hidden) return;

    navBackdrop.classList.remove("is-open");
    siteNav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");

    const onEnd = () => {
      siteNav.hidden = true;
      navBackdrop.hidden = true;
      siteNav.removeEventListener("transitionend", onEnd);
      if (!skipFocus && lastNavFocus && typeof lastNavFocus.focus === "function") {
        lastNavFocus.focus();
      }
    };
    siteNav.addEventListener("transitionend", onEnd);
  }

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      openDrawer(card.getAttribute("data-project"));
    });
  });

  navProjectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openDrawer(button.getAttribute("data-nav-project"));
    });
  });

  drawerClose.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);
  navToggle.addEventListener("click", openNav);
  navClose.addEventListener("click", () => closeNav());
  navBackdrop.addEventListener("click", () => closeNav());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!drawer.hidden) {
        closeDrawer();
        return;
      }
      if (!siteNav.hidden) {
        closeNav();
      }
      return;
    }

    const activePanel = !drawer.hidden
      ? drawer
      : !siteNav.hidden
        ? siteNav
        : null;
    if (event.key !== "Tab" || !activePanel) return;

    const focusable = getFocusable(activePanel);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
