(() => {
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".nav__toggle");
  const mobile = document.getElementById("mobile-menu");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("is-open");
      mobile.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    });
    mobile.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobile.classList.remove("is-open");
        mobile.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  const revealTargets = document.querySelectorAll(
    ".section__heading, .prose, .card, .who__item, .prompts li, .framework__strip, .hero__title, .hero__lede, .hero__body, .hero__cta"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const form = document.getElementById("contact-form");
  const thanks = document.getElementById("contact-thanks");
  if (form && thanks) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) submitBtn.disabled = true;

      const action = form.getAttribute("action") || "";
      const isPlaceholder = action.includes("YOUR_FORM_ID") || !action;

      if (!isPlaceholder) {
        try {
          await fetch(action, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" },
          });
        } catch (_) {
          /* still show the thanks state — visitor experience over telemetry */
        }
      }

      form.hidden = true;
      thanks.hidden = false;
      thanks.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
})();
