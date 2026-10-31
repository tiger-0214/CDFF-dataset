/* ===========================================================
   CDFF site — bilingual dictionary (EN)
   中文文案直接写在 index.html 里，作为默认语言与回退；
   本文件只维护英文词条。缺失 key 自动回退中文。
   =========================================================== */
(function () {
  "use strict";

  var EN = {
    "a11y.skip": "Skip to content",
    "brand.sub": "Synthetic data for low-slow-small targets",

    "nav.overview": "Overview",
    "nav.framework": "Framework",
    "nav.dataset": "Dataset",
    "nav.results": "Results",
    "nav.validation": "Validation",
    "nav.access": "Access",
    "nav.cite": "Cite",

    "hero.eyebrow": "Neurocomputing · Manuscript under review",
    "hero.title": "Synthetic data whose geometry is <em>declared before rendering</em> — and verified after",
    "hero.lead": "A synthetic dataset generation framework for low-slow-small (LSS) aerial targets. Two adversarial agents and a closed feedback loop: every sample's target position, scale and bounding box are fixed before rendering, then independently verified afterwards.",
    "hero.cta1": "See dataset specs",
    "hero.cta2": "Browse the code",
    "hero.stat1": "real backgrounds · nine scene classes",
    "hero.stat2": "pixel-aligned RGB–pseudo-IR pairs",
    "hero.stat3": "centroid position error E<sub>pos</sub>",
    "hero.stat4": "per generated pair",
    "hero.figcap": "The two-agent architecture of CDFF: the generator (M1–M6) derives spatial conditions from the background image itself, the validator (V1–V9) audits the result stage by stage, and structured failure codes drive incremental fine-tuning.",

    "overview.kicker": "Why it exists",
    "overview.h2": "Two obstacles, one solution",
    "overview.lead": "At 200–500 m, an LSS target occupies only 15×15 to 30×30 pixels, with a small radar cross-section and weak acoustic and thermal signatures — real data is extremely hard to collect. Batch-generating training data with diffusion models looks like a shortcut, but two things get in the way.",
    "overview.p1h": "Geometry cannot be controlled unattended",
    "overview.p1p": "Layout-conditioned models need a hand-made condition map per sample; prompt conditioning delivers neither trustworthy coordinates nor scale. The generator does not know where the target should land or how large it should be, so there is no bounding box to speak of.",
    "overview.p2h": "There is no way to tell which samples to keep",
    "overview.p2p": "Perceptual metrics such as BRISQUE and ImageReward are computed on finished images and decoupled from the geometric consistency a detector needs: an image can look convincing while violating perspective or scale.",
    "overview.p3h": "CDFF treats them as one problem",
    "overview.p3p": "Turn an ordinary background photograph into a sample whose geometry is declared up front and verifiable afterwards. The geometry comes from the background itself — monocular relative depth plus a rule-based affordance map — with no manual layout.",
    "overview.figcap": "Figure 1. Three constraints of low-slow-small targets: tiny pixel footprint, cluttered backgrounds, and a modality gap between visible and infrared imagery.",

    "feat.1h": "Geometry declared first",
    "feat.1p": "Target position, scale and bounding box are derived analytically from the declared distance before rendering; afterwards we only check whether the render honoured them.",
    "feat.2h": "No manual layout",
    "feat.2p": "Insertion points are inferred from monocular relative depth and an affordance map, so batch generation needs no per-image condition maps.",
    "feat.3h": "Closed feedback loop",
    "feat.3p": "The validator emits structured failure codes, routes them back to the responsible module, and triggers incremental fine-tuning plus weight replacement once a threshold is hit.",
    "feat.4h": "Pixel-aligned RGB–IR",
    "feat.4p": "The pseudo-infrared image is converted pixel by pixel from the same render, so both modalities share one coordinate frame by construction.",
    "feat.5h": "Swappable target LoRA",
    "feat.5p": "The framework is not tied to one target type: drop in any SD 1.5 kohya-format LoRA and change a single path.",
    "feat.6h": "Runs on CPU alone",
    "feat.6p": "Preprocessing, the validation chain and all reproduction scripts need no GPU; only generation and training do.",

    "fw.kicker": "Architecture",
    "fw.h2": "Generator · Validator · Loop",
    "fw.lead": "Six generation modules turn a background photo into an aligned pair; nine validation modules audit it stage by stage. A rejected sample yields a routable failure code rather than a single opaque score.",
    "m1.h": "Semantic parsing",
    "m1.p": "A natural-language task description becomes a structured schema: target type, distance band and scene constraints.",
    "m2.h": "Background retrieval",
    "m2.p": "A four-level fallback match over scene class, time of day and weather, drawing from a nine-class background pool and recording the match level.",
    "m3.h": "Depth & affordance",
    "m3.p": "Monocular relative depth plus a rule-based affordance map yields an insertable depth plane and candidate placements.",
    "m4.h": "Marker injection",
    "m4.p": "The geometric declaration (centre and extent) is written into the background as a visual marker that anchors the later repaint.",
    "m5.h": "LoRA target synthesis",
    "m5.p": "The target LoRA is merged into the UNet only, synthesising the target inside the marked region; a ControlNet-conditioned repaint then blends it in.",
    "m6.h": "RGB → pseudo-IR",
    "m6.p": "A pixel-wise conversion to white-hot infrared along identical geometry produces an RGB–IR pair that shares coordinates.",
    "fw.fig4": "Figure 2. The four intermediate products of marker injection: background → depth and affordance → geometric marker → synthesised result.",
    "fw.fig5": "Figure 3. The RGB, pseudo-IR and bounding-box triplet. The infrared frame is converted pixel by pixel from the same render, so the two share exactly the same box coordinates.",

    "loop.s1h": "Structured failure codes",
    "loop.s1p": "S6_BLUR · S7_SCALE_MISMATCH · S8_POSITION_JUMP …",
    "loop.s2h": "Component routing",
    "loop.s2p": "Each code sends the sample back to the module that caused it",
    "loop.s3h": "FailureBuffer",
    "loop.s3p": "Failures accumulate per code until a threshold trips",
    "loop.s4h": "Incremental fine-tuning",
    "loop.s4p": "Only the implicated component is tuned; weights are swapped and generation resumes",

    "ds.kicker": "Dataset",
    "ds.h2": "Scale · Composition · Annotation format",
    "ds.lead": "The benchmark comprises 300 visible–pseudo-infrared pairs spanning nine scene classes, five times of day and five weather conditions. All 300 condition tuples are unique, with condition entropy of 3.305 / 3.296 / 2.497 bits across the three dimensions.",
    "ds.cap": "Dataset specification",
    "ds.th1": "Item",
    "ds.th2": "Value",
    "ds.th3": "Notes",
    "ds.r1a": "Evaluation samples",
    "ds.pairs": "pairs",
    "ds.r1c": "300 pairs in the main benchmark plus one hard case ×2 shared by the repaint and paste arms",
    "ds.r2a": "Background pool",
    "ds.images": "images",
    "ds.r2c": "Real photographs, nine scene classes; not shipped with the repo",
    "ds.r3a": "Scene classes",
    "ds.r4a": "Time of day / weather",
    "ds.r4c": "Time of day from dawn to night; weather clear / overcast / rainy / foggy / dusty / backlight",
    "ds.r5a": "Modalities",
    "ds.ir": "pseudo-IR",
    "ds.r5c": "Pixel-aligned, sharing the same box coordinates",
    "ds.r6a": "Canvas",
    "ds.r6c": "Median resolution of the main benchmark; median diagonal 1538.18 px",
    "ds.r7a": "Target pixel scale",
    "ds.r7c": "Given analytically from the declared distance (60 m → 60 px)",
    "ds.r8a": "Annotation",
    "ds.r8b": "bbox + metadata",
    "ds.r8c": "JSON records conditions, ground-truth box, depth and failure codes",
    "ds.fig3": "Figure 4. A 3×3 sample of the nine-class background pool: airfield, coastal, desert, forest, industrial, mountain, pure sky, rural, urban.",
    "ds.comp.h": "Sample composition",
    "ds.comp.1": "Each pair combines one real background, one LoRA synthesis and one ControlNet repaint",
    "ds.comp.2": "Three distance bands — near / mid / far — with corresponding pixel scale and perspective constraints",
    "ds.comp.3": "Condition tuples (scene × time of day × weather × distance) are unique across all 300 pairs",
    "ds.comp.4": "Every validation verdict is persisted and traceable to a specific threshold and failure code",
    "ds.comp.5": "Preprocessing is pure CPU: one command each for background normalisation and LoRA dataset packing",
    "ds.file.h": "Layout and format",

    "res.kicker": "Results",
    "res.h2": "How well the geometry is honoured",
    "res.lead": "Alignment and quality metrics over the 300-pair main benchmark. Position error sits close to the half-pixel quantisation bound — evidence of a resolution-imposed floor, not of an accuracy ceiling.",
    "res.m1": "Centroid position error · 29.3% below one pixel",
    "res.m2": "Relative scale error · 61.3% within 3%",
    "res.m3": "Bounding-box IoU · 94.0% at or above 0.5",
    "res.m4": "No-reference quality · 88.3% pass rate",
    "res.fig6": "Figure 5. Distributions of the four metrics over the 300-pair main benchmark: position error, relative scale error, bounding-box IoU and BRISQUE.",
    "res.cap": "Alignment and quality (300-pair main benchmark)",
    "res.th1": "Metric",
    "res.th2": "Value",
    "res.th3": "Range / pass rate",
    "res.r4": "IoU ≥ 0.5",
    "res.r4c": "282 / 300",
    "res.r5": "Sub-pixel rate (E<sub>pos</sub> &lt; 1 px)",
    "res.r5c": "88 / 300",
    "res.r6": "BRISQUE",
    "res.r6c": "median 14.64, σ 20.66",
    "res.r7": "Quality pass rate (≤ 45)",
    "res.r7c": "265 / 300",
    "res.r8": "Beyond the half-pixel bound",
    "res.r8c": "294 / 300; position accuracy is bounded by render resolution",
    "res.r9": "Mean displacement / median canvas diagonal",
    "res.r9c": "worst single sample 0.253%",
    "res.fig7": "Figure 6. Qualitative comparison of the E1 ablation: paste versus marker injection, with ground-truth boxes across the near / mid / far bands.",
    "res.e1h": "Ablation E1: a null result",
    "res.e1p": "150 matched pairs ×2 arms. Geometry and no-reference quality are indistinguishable between the arms — position error 1.241 vs 1.241 px, IoU 0.706 vs 0.706, BRISQUE 20.67 vs 20.64. On the harmonisation metric LCR the injection arm is clearly lower (1.338 vs 1.655, Wilcoxon p = 4.9e-05), while the RLJ difference is not significant (p = 0.952).",
    "res.e1c": "<strong>The conclusion is a null result, not \"injection is worse\".</strong> The earlier trade-off narrative is retracted.",
    "res.e1th1": "Metric",
    "res.e1th2": "Injection",
    "res.e1th3": "Paste",
    "res.bh": "Evidence boundary",
    "res.bp": "The experiments characterise the <strong>generation process</strong> — whether a target lands at the requested position and scale, and whether defective samples are rejected — not product utility. No detector was trained on CDFF output and evaluated on real imagery, so this work does not support any claim of improved detection accuracy. V9 uses a COCO-pretrained YOLOv8x, whose class list contains no drone, and therefore serves only as a downstream saliency proxy.",

    "val.kicker": "Validation chain",
    "val.h2": "V1–V9: replacing \"looks fine\" with an accountable verdict",
    "val.lead": "On the 302 finished images, a BRISQUE threshold alone accepts 267 (88.4%), while the V6→V7→V9 chain accepts 161 (53.3%); the two agree on 158. Jaccard 0.585 — the symmetric difference is exactly the set that looks good but does not hold up geometrically.",
    "val.cap": "The nine validation stages",
    "val.th1": "Stage",
    "val.th2": "Role",
    "val.th3": "Checks",
    "val.th4": "Failure codes",
    "val.v1": "JSON structure",
    "val.v2": "Transformer parsing",
    "val.v3": "ControlNet conditioning",
    "val.v4": "LoRA sampling",
    "val.v5": "Infrared channel",
    "val.v6": "Perceptual quality",
    "val.v7": "Consistency (size / lighting / IR box / cross-modal)",
    "val.v8": "Trajectory physics",
    "val.v9": "Detection proxy",
    "val.t1h": "Three states, not two",
    "val.t1p": "Each V7 dimension has exactly three states — PASS, FAIL, SKIP — and <strong>SKIP is not a pass</strong>: a dimension with no usable input is recorded as SKIP and excluded from the verdict, while a sample with no evaluated dimension is judged SKIP rather than accepted.",
    "val.t2h": "How to read the cross-modal IoU",
    "val.t2p": "The RGB and pseudo-IR boxes have an IoU of exactly 1.000 because both derive from the same coordinates by construction. It verifies that the pipeline is self-consistent; it is <strong>not</strong> an independent measurement.",
    "val.t3h": "Self-check without weights",
    "val.t3p": "The three-state convention is pinned down by <code>validator/v7_consistency/test_s7_tristate.py</code>, which runs without any model weights.",

    "acc.kicker": "Access",
    "acc.h2": "Three routes",
    "acc.lead": "The code is released under MIT; weights, base models and imagery carry their own licences and are not redistributed here. For the evaluation set or a trained adapter, please reach out via the repository issues.",
    "acc.a.h": "Run the framework",
    "acc.a.p": "Clone the repo, install dependencies and point the asset paths at your local copies. A few dozen backgrounds are enough to run the whole pipeline.",
    "acc.a.l": "Read the README",
    "acc.b.h": "Reproduce the 300-pair benchmark",
    "acc.b.p": "Evaluation and ablation scripts live under <code>experiments/</code> and only read the JSON under <code>out_*</code>; redrawing the figures takes seconds.",
    "acc.b.l": "Browse reproduction scripts",
    "acc.c.h": "Evaluation set and weights",
    "acc.c.p": "Backgrounds come from third-party photo libraries and are not redistributed; the target LoRA and merged weights inherit the base model licence. <strong>Available on request</strong> — please state your institution and intended use.",
    "acc.c.1": "Academic research and teaching only",
    "acc.c.2": "No redistribution or resale",
    "acc.c.3": "Derivative weights remain bound by CreativeML OpenRAIL-M",
    "acc.c.l": "Contact via issues",

    "lic.h": "Licensing",
    "lic.lead": "<strong>The source code is MIT, but the project as a whole is not.</strong> The table below states the actual terms of each component.",
    "lic.th1": "Component",
    "lic.th2": "Licence",
    "lic.th3": "Shipped with the repo",
    "lic.r1": "Original source code of this project",
    "lic.yes": "Yes",
    "lic.r2": "Stable Diffusion v1.5 base model",
    "lic.no": "No",
    "lic.r3": "ControlNet depth / seg",
    "lic.no2": "No",
    "lic.r4": "LoRA adapter and merged weights",
    "lic.r4b": "CreativeML OpenRAIL-M (inherited)",
    "lic.no3": "No",
    "lic.no4": "No",
    "lic.r5": "Ultralytics YOLOv8 (optional, for V9)",
    "lic.no5": "No, not installed by default",
    "lic.r6": "Background pool / source drone images / evaluation images",
    "lic.r6b": "Terms of their original sources",
    "lic.no6": "No",
    "lic.note": "A LoRA adapter is a derivative work of the base model, so the adapter itself and any checkpoint merged from it remain bound by CreativeML OpenRAIL-M, including the use restrictions in its Attachment A; the licence must accompany any distribution. See <code>THIRD_PARTY_LICENSES.md</code> and <code>NOTICE</code> in the repository for the per-item terms.",

    "cite.kicker": "Citation",
    "cite.h2": "If this framework or benchmark helps your research",
    "cite.paper": "Paper",
    "cite.repo": "Code and framework",
    "cite.copy": "Copy BibTeX",

    "foot.tag": "A synthetic dataset generation framework for low-slow-small aerial targets. Geometry declared first, verified after rendering.",
    "foot.nav1": "Project",
    "foot.lic": "Third-party licences",
    "foot.nav2": "This page",
    "foot.nav3": "Contact",
    "foot.issue": "Issues",
    "foot.copy": "© 2026 CDFF Authors. Source code MIT; weights and base models follow their own licences.",
    "foot.disc": "This page describes the generation process and benchmark protocol only; it is not evidence of detection accuracy."
  };

  var TITLES = {
    zh: "CDFF — 低慢小目标合成数据集生成框架",
    en: "CDFF — A Closed-Loop Framework for Synthetic LSS Target Datasets"
  };

  var DESCS = {
    zh: "CDFF：几何先声明、渲染后可验证的低慢小（LSS）空中目标合成数据集生成框架。双 Agent 对抗 + 闭环反馈，输出像素对齐 RGB–伪红外对与标注框。",
    en: "CDFF: a synthetic dataset generation framework for low-slow-small aerial targets. Geometry is declared before rendering and verified afterwards; outputs are pixel-aligned RGB–pseudo-IR pairs with bounding boxes."
  };

  // 首次载入时把中文原文快照下来，切回中文时原样还原
  var ZH = {};
  var nodes = document.querySelectorAll("[data-i18n]");
  for (var i = 0; i < nodes.length; i++) {
    ZH[nodes[i].getAttribute("data-i18n")] = nodes[i].innerHTML;
  }

  var current = "zh";

  function apply(lang) {
    current = lang;
    var dict = lang === "en" ? EN : ZH;
    var list = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      var key = el.getAttribute("data-i18n");
      var val = dict[key];
      if (typeof val === "string") el.innerHTML = val;
    }
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.title = TITLES[lang] || TITLES.zh;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", DESCS[lang] || DESCS.zh);
    var ogt = document.querySelector('meta[property="og:title"]');
    if (ogt) ogt.setAttribute("content", TITLES[lang] || TITLES.zh);

    var btns = document.querySelectorAll(".lang-btn .lang-on");
    for (var j = 0; j < btns.length; j++) {
      var on = btns[j].getAttribute("data-lang-on") === lang;
      btns[j].style.color = on ? "var(--ink)" : "var(--muted)";
      btns[j].style.fontWeight = on ? "600" : "400";
    }
    try { localStorage.setItem("cdff-lang", lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("cdff:lang", { detail: { lang: lang } }));
  }

  window.CDFF_i18n = {
    apply: apply,
    current: function () { return current; },
    has: function (k) { return Object.prototype.hasOwnProperty.call(EN, k); }
  };

  var saved = null;
  try { saved = localStorage.getItem("cdff-lang"); } catch (e) {}
  // 默认中文（主要读者与作者语种），只有用户显式切换过才沿用记忆值
  if (saved === "en") apply("en");
})();
