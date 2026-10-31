/* ===========================================================
   CDFF site — interactions
   - 吸顶头部阴影 / 移动端菜单
   - 语言切换（委托 i18n.js）
   - 数字滚动计数
   - 区块进场动画 + 导航高亮
   - BibTeX 复制
   =========================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------- header ----------------------------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----------------------------- language ----------------------------- */
  var langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var next = window.CDFF_i18n.current() === "zh" ? "en" : "zh";
      window.CDFF_i18n.apply(next);
    });
  }

  /* ----------------------------- counters ----------------------------- */
  function formatNum(value, decimals) {
    if (decimals > 0) return value.toFixed(decimals);
    return Math.round(value).toLocaleString("en-US");
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    if (reduceMotion) { el.textContent = formatNum(target, decimals); return; }
    var start = null, dur = 1100;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatNum(target * eased, decimals);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = formatNum(target, decimals);
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          animateCount(en.target);
          cObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cObs.observe(c); });
  } else {
    counters.forEach(function (c) {
      c.textContent = formatNum(parseFloat(c.getAttribute("data-count")), parseInt(c.getAttribute("data-decimals") || "0", 10));
    });
  }

  /* ----------------------------- reveal ----------------------------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealables = document.querySelectorAll(
      ".section-head, .problem-card, .feature, .figure, .metric-card, .pipeline, .loop-strip, .data-table, .callout, .callout-card, .boundary, .access-card, .license-block, .cite-card, .hero-stats"
    );
    var rObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          rObs.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealables.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min(i % 6, 5) * 40 + "ms";
      rObs.observe(el);
    });
  }

  /* ----------------------------- nav highlight ----------------------------- */
  var sections = ["overview", "framework", "dataset", "results", "validation", "access", "cite"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var navLinks = {};
    document.querySelectorAll('.site-nav a[href^="#"]').forEach(function (a) {
      navLinks[a.getAttribute("href").slice(1)] = a;
    });
    var sObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = navLinks[en.target.id];
        if (!link) return;
        if (en.isIntersecting) {
          Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { sObs.observe(s); });
  }

  /* ----------------------------- copy bibtex ----------------------------- */
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }

  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sel = btn.getAttribute("data-copy");
      var src = sel ? document.querySelector(sel) : null;
      if (!src) return;
      var text = src.innerText.trim();
      var done = function () {
        var label = btn.textContent;
        btn.classList.add("done");
        btn.textContent = window.CDFF_i18n.current() === "en" ? "Copied" : "已复制";
        setTimeout(function () {
          btn.classList.remove("done");
          btn.textContent = label;
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
      } else {
        fallbackCopy(text);
        done();
      }
    });
  });
})();
