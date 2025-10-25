/* ===============================
   Panda Min's ChemLab - script.js (CLEAN)
   - Anchor smooth scroll (no hardcoded offset)
   - Mobile menu toggle (ARIA-ready)
   - Active link highlight via IntersectionObserver
   - Video modal open/close
   - (Optional) Parallax disabled to avoid visual overlap
   =============================== */

(function () {
  // -----------------------------
  // Utilities
  // -----------------------------
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Read CSS var if you ever need it (we don't offset in JS; CSS handles it)
  const getCssVar = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  // -----------------------------
  // Smooth Anchor Navigation
  // (No -80px offset; rely on CSS `scroll-margin-top`)
  // -----------------------------
  function initSmoothAnchors() {
    // Remove any duplicate/legacy listeners by delegating once
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = qs(href);
      if (!target) return;

      // internal anchor -> smooth scroll + prevent default
      e.preventDefault();

      // Let CSS `scroll-margin-top` handle the fixed nav offset
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Close mobile menu after navigation
      closeMobileMenuIfOpen();
    });
  }

  // -----------------------------
  // Mobile Menu
  // -----------------------------
  function initMobileMenu() {
    const btn = qs("#mobileMenuBtn");
    const nav = qs("#primary-navigation");
    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
    });
  }

  function closeMobileMenuIfOpen() {
    const btn = qs("#mobileMenuBtn");
    const nav = qs("#primary-navigation");
    if (!btn || !nav) return;

    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  }

  // -----------------------------
  // Active Link Highlight (on scroll)
  // -----------------------------
  function initActiveLinkObserver() {
    const links = qsa('.nav-link[href^="#"]');
    const sections = links
      .map((a) => a.getAttribute("href"))
      .filter((href) => href && href.startsWith("#"))
      .map((href) => qs(href))
      .filter(Boolean);

    if (sections.length === 0) return;

    // Clear active states
    const setActive = (id) => {
      links.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // find the most visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible && visible.target && visible.target.id) {
          setActive(visible.target.id);
        }
      },
      {
        // rootMargin top should account for fixed nav, but we'll let CSS handle spacing.
        // Using a small negative top margin makes top sections considered when near top.
        root: null,
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  // -----------------------------
  // Video Modal
  // -----------------------------
  function initVideoModal() {
    const modal = qs("#videoModal");
    if (!modal) return;

    // Expose functions globally because HTML uses onclick attributes
    window.openVideoModal = function () {
      modal.style.display = "flex";
    };
    window.closeVideoModal = function () {
      modal.style.display = "none";
    };

    // Click outside to close
    modal.addEventListener("click", (e) => {
      const box = e.target.closest("[data-modal-box]");
      if (!box) window.closeVideoModal();
    });
  }

  // -----------------------------
  // Optional: Parallax (Disabled)
  // If you re-enable, use a tiny factor and apply to a background wrapper,
  // not the layout box of `.section-hero` itself.
  // -----------------------------
  function initParallaxDisabled() {
    // Intentionally left disabled to avoid visual overlap illusions.
    // Example (if you ever want it back, prefer a bg wrapper):
    // const hero = document.querySelector('.section-hero');
    // if (!hero) return;
    // window.addEventListener('scroll', () => {
    //   const y = Math.round(window.scrollY * 0.1); // gentle
    //   hero.style.setProperty('--hero-parallax', `${y}px`);
    // }, { passive: true });
  }

  // -----------------------------
  // Init on DOMContentLoaded
  // -----------------------------
  document.addEventListener("DOMContentLoaded", () => {
    // Ensure we have the CSS var (not used for offset, but useful if needed)
    // const navH = getCssVar('--nav-height');

    initSmoothAnchors();
    initMobileMenu();
    initActiveLinkObserver();
    initVideoModal();
    initParallaxDisabled();
  });

  // Close mobile menu on ESC for accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenuIfOpen();
  });
})();
