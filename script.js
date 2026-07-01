/* ═══════════════════════════════════════════════════
   3D Printing Service — script.js
   Nav · Scroll Engine · Modals · Forms · Reveal
═══════════════════════════════════════════════════ */


document.addEventListener('DOMContentLoaded', () => {


  /* ─────────────────────────────────────────────
     STREAM DATA
  ───────────────────────────────────────────── */
  const STREAMS = {
    1: {
      num: '01', title: 'Gaming & Cosplay Assets',
      sub: 'Props · Armor · Miniatures · Display Builds',
      paras: [
        'We handle large-format cosplay pieces, wearable armor segments, screen-accurate prop replicas, gaming peripheral modifications, custom character busts, and tabletop miniatures.',
        'Every print is dialed in for its use-case. A display helmet gets different layer settings than a wearable gauntlet. We consult on material and finish before a single layer prints.',
      ],
      bullets: [
        'Full-Scale Helmets & Wearable Armor Panels',
        'Prop Weapons & Screen-Replica Accessories',
        'Tabletop RPG Miniatures & Character Busts',
        'Custom Controller Shells & Peripheral Mods',
        'Display Stands, Dioramas & Scenic Bases',
      ],
      items: [
        { emo: '/images/1r.jpg0001.jpg', name: 'Mandalorian Helmet', meta: 'Full-Scale · PLA+ · 3-Piece Assembly', tag: 'Cosplay' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Custom Controller Shell', meta: 'Xbox Ergonomic Mod · PETG · 0.16mm', tag: 'Gaming' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Prop Sword Replica', meta: '280mm Blade · PLA+ · Display-Ready', tag: 'Prop' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Iron Man Forearm Piece', meta: 'PETG Flex Joints · Sanded Finish', tag: 'Cosplay' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Dragon RPG Bust', meta: '0.08mm · PLA+ · Paint-Ready Surface', tag: 'Miniature' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Gaming Trophy Plinth', meta: 'Tiered Display · PLA+ · 0.1mm', tag: 'Display' },
      ],
    },
    2: {
      num: '02', title: 'Replacement Parts & Functional Pieces',
      sub: 'Brackets · Enclosures · Gears · Fittings',
      paras: [
        'Broken brackets, missing clips, custom enclosures, cable management solutions, and precision mechanical fittings. If the factory part no longer exists or never existed — we print one that does.',
        'Functional parts require specific tolerances. We review your reference dimensions, print test fits when needed, and deliver parts built to slot in, snap, or thread exactly as intended.',
      ],
      bullets: [
        'Snap-Fit & Press-Fit Mechanical Components',
        'Electronics Enclosures With Ventilation Slots',
        'Custom Gear Sets & Timing Belt Tensioners',
        'Cable Management Clips & Desk-Mount Brackets',
        'RC Vehicle Suspension Arms & Chassis Plates',
      ],
      items: [
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Mounting Bracket', meta: 'M6-Compatible · ABS · 40% Gyroid Infill', tag: 'Mechanical' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Spur Gear Set', meta: '48T / 0.5M Pitch · Nylon · Press-Fit', tag: 'Engineering' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'RPi 4 Enclosure', meta: 'Fan Slot + GPIO Access · PETG · 0.16mm', tag: 'Enclosure' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Cable Clip Run', meta: 'Desk-Mount Series · ABS · 100% Infill', tag: 'Utility' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'RC Suspension Arm', meta: 'Short-Course Lower · CF-Nylon · 0.2mm', tag: 'RC Parts' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Smart Switch Faceplate', meta: 'Flush-Fit · PETG · 0.14mm Layer', tag: 'Smart Home' },
      ],
    },
    3: {
      num: '03', title: 'Functional Prototyping',
      sub: 'Concept Models · Assemblies · Student Builds',
      paras: [
        'Got a product idea, a startup concept, or a university project you need to hold in your hands? We print at real scale so you can test tolerances, run usability checks, and iterate fast.',
        'We work with individuals, student engineers, and early-stage startups. Bring a sketch, a CAD file, or a reference image. We scope the print and issue a fixed quote upfront.',
      ],
      bullets: [
        'Functional Concept Models For Investor Pitches',
        'Student Engineering & University Project Builds',
        'Multi-Part Assemblies With Jointed Components',
        'Drone Frames, Quadcopter Chassis & UAV Shells',
        'Medical Device Casings & Wearable Tech Prototypes',
      ],
      items: [
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'FPV Drone Frame', meta: '250mm Quad · CF-Nylon · 5-Part Kit', tag: 'Aerospace' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Pill Dispenser Proto', meta: '7-Day Rotating Tray · PETG · Snap-Close', tag: 'Product' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Architectural Model', meta: '1:100 Scale Study · PLA+ · 8-Piece Kit', tag: 'Architecture' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Battery Pack Housing', meta: '18650 ×4 · ABS · Clip Assembly', tag: 'Electronics' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Prosthetic Grip Base', meta: 'e-NABLE Design · PETG Flex', tag: 'Medical' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'IoT Sensor Casing', meta: 'Temp Module · PLA+ · Vent Slot Design', tag: 'IoT' },
      ],
    },
    4: {
      num: '04', title: 'Print Configuration Optimization',
      sub: 'File Checks · Infill Consulting · Material Guidance',
      paras: [
        'Already have an STL or STEP file but not sure if it will print cleanly? We run a full geometry audit — checking wall thickness, overhangs, mesh integrity, and dimensional accuracy.',
        'We then recommend the optimal layer height, infill pattern, material choice, and print orientation for your use-case, confirm the config with you, then print. Zero wasted filament.',
      ],
      bullets: [
        'Wall Thickness Audit — Flag Thin Or Non-Printable Walls',
        'Overhang Analysis & Strategic Support Placement',
        'Infill Pattern Selection: Gyroid, Honeycomb, Cubic',
        'Warp Prevention Config For ABS & High-Temp Materials',
        'Speed vs Quality Profile Matched To Your Deadline',
      ],
      items: [
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Infill Density Study', meta: '15% / 40% / 80% — Structural Load Samples', tag: 'Infill' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Wall Thickness Audit', meta: 'Before/After DFM Fix — 0.8→1.6mm Walls', tag: 'DFM Fix' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Support Strategy Test', meta: 'Gyroid vs Tree Supports On Same Part', tag: 'Supports' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Warp Prevention Config', meta: 'ABS + Brim + Draft Shield · Zero Warp', tag: 'Material' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Speed vs Quality', meta: '0.2mm Draft vs 0.1mm Quality Samples', tag: 'Profile' },
        { emo: '/images/WhatsApp Image 2026-07-01 at 2.07.50 PM.jpeg', name: 'Multi-Mat Slice Config', meta: 'PLA + PETG · Optimised Purge Tower', tag: 'Multi-Mat' },
      ],
    },
  };


  /* ─────────────────────────────────────────────
     1. NAV — scroll shadow + burger
  ───────────────────────────────────────────── */
  const navEl = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const navMenu = document.getElementById('navMenu');


  window.addEventListener('scroll', () => {
    navEl.classList.toggle('on', window.scrollY > 10);
  }, { passive: true });


  burger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });


  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });


  /* ─────────────────────────────────────────────
     2. SMOOTH SCROLL ENGINE
     All [data-scroll="sectionId"] triggers
     scroll precisely to the target element,
     offset by the fixed nav height.
     KEY SEPARATION:
       "Contact" nav link   → data-scroll="footer-contact"  (scrolls to footer)
       "Get A Quote" button → data-scroll="intake"          (scrolls to form)
  ───────────────────────────────────────────── */
  function smoothScrollTo(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const offset = navEl.offsetHeight + 12;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }


  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', e => {
      const id = el.dataset.scroll;
      if (!id) return;
      e.preventDefault();
      smoothScrollTo(id);
    });
  });


  /* ─────────────────────────────────────────────
     3. MATERIAL CHIPS — intake form
  ───────────────────────────────────────────── */
  const chipsBox = document.getElementById('ifChips');
  const matHid = document.getElementById('if-mat');


  chipsBox?.querySelectorAll('.if-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chipsBox.querySelectorAll('.if-chip').forEach(c => c.classList.remove('if-chip--on'));
      chip.classList.add('if-chip--on');
      if (matHid) matHid.value = chip.dataset.val;
    });
  });


  /* ─────────────────────────────────────────────
     4. FILE UPLOAD — drag, drop, browse
     accept="*" — all file types allowed
  ───────────────────────────────────────────── */
  const dropEl = document.getElementById('ifDrop');
  const fileInp = document.getElementById('ifFile');
  const fileList = document.getElementById('ifFilelist');
  const browse = document.getElementById('ifdBrowse');


  if (dropEl && fileInp) {
    // Remove any type restriction so all files are accepted
    fileInp.removeAttribute('accept');

    dropEl.addEventListener('click', () => fileInp.click());
    browse?.addEventListener('click', e => { e.stopPropagation(); fileInp.click(); });
    fileInp.addEventListener('change', () => renderFiles(fileInp.files));
    dropEl.addEventListener('dragover', e => { e.preventDefault(); dropEl.classList.add('on'); });
    dropEl.addEventListener('dragleave', () => dropEl.classList.remove('on'));
    dropEl.addEventListener('drop', e => {
      e.preventDefault(); dropEl.classList.remove('on');
      renderFiles(e.dataTransfer.files);
    });
  }


  function renderFiles(files) {
    if (!fileList || !files?.length) return;
    fileList.innerHTML = '';
    Array.from(files).forEach(f => {
      const ext = f.name.includes('.')
        ? f.name.split('.').pop().toUpperCase()
        : 'FILE';
      const size = f.size >= 1_048_576
        ? `${(f.size / 1_048_576).toFixed(1)} MB`
        : `${(f.size / 1024).toFixed(0)} KB`;
      const row = document.createElement('div');
      row.className = 'ifl-row';
      row.innerHTML = `
        <span class="ifl-ico">📄</span>
        <span>${f.name}</span>
        <span class="ifl-size">${ext} · ${size}</span>`;
      fileList.appendChild(row);
    });
  }


  /* ─────────────────────────────────────────────
     4b. DEADLINE — Block past dates in date picker
  ───────────────────────────────────────────── */
  const deadlineInput = document.getElementById('if-date');
  if (deadlineInput) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    deadlineInput.setAttribute('min', today);
  }


  /* ─────────────────────────────────────────────
     5. INTAKE FORM — validate + POST to /contact
     Files converted to base64 before sending
  ───────────────────────────────────────────── */
  const iform = document.getElementById('iform');
  const iconfirm = document.getElementById('ifConfirm');
  const isubmit = document.getElementById('ifSubmit');


  iform?.addEventListener('submit', async e => {
    e.preventDefault();
    const required = iform.querySelectorAll('[required]');
    let ok = true;


    required.forEach(f => {
      const empty = !f.value.trim();
      f.style.borderColor = empty ? 'rgba(239,68,68,.75)' : '';
      if (empty) ok = false;
    });


    if (!ok) {
      const first = iform.querySelector('[style*="239"]');
      if (first) {
        window.scrollTo({
          top: first.getBoundingClientRect().top + window.scrollY - navEl.offsetHeight - 22,
          behavior: 'smooth',
        });
      }
      return;
    }


    // Loading state
    isubmit.disabled = true;
    isubmit.style.opacity = '.6';
    isubmit.innerHTML = 'Sending… ⏳';


    // Convert any attached files to base64
    const rawFiles = fileInp?.files ? Array.from(fileInp.files) : [];
    let attachments = [];
    if (rawFiles.length > 0) {
      try {
        attachments = await Promise.all(rawFiles.map(f => fileToBase64(f)));
      } catch {
        showFormError(iform, 'File encoding failed. Try again or remove the attached files.');
        isubmit.disabled = false;
        isubmit.style.opacity = '';
        isubmit.innerHTML = 'Submit Print Order <span class="btn-arr">→</span>';
        return;
      }
    }


    const payload = {
      formType: 'intake',
      name: document.getElementById('if-name').value.trim(),
      email: document.getElementById('if-email').value.trim(),
      message: document.getElementById('if-brief').value.trim(),
      stream: document.getElementById('if-stream').value,
      material: document.getElementById('if-mat').value,
      qty: document.getElementById('if-qty').value,
      colour: document.getElementById('if-colour').value.trim(),
      deadline: document.getElementById('if-date').value,
      attachments, // base64 encoded file array
    };


    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();


      if (data.ok) {
        iconfirm?.classList.add('on');
        isubmit.innerHTML = 'Order Submitted ✓';


        setTimeout(() => {
          iform.reset();
          if (fileList) fileList.innerHTML = '';
          chipsBox?.querySelectorAll('.if-chip').forEach((c, i) =>
            c.classList.toggle('if-chip--on', i === 0)
          );
          if (matHid) matHid.value = 'PLA+';
          iconfirm?.classList.remove('on');
          isubmit.disabled = false;
          isubmit.style.opacity = '';
          isubmit.innerHTML = 'Submit Print Order <span class="btn-arr">→</span>';
          required.forEach(f => f.style.borderColor = '');
        }, 7000);
      } else {
        isubmit.disabled = false;
        isubmit.style.opacity = '';
        isubmit.innerHTML = 'Submit Print Order <span class="btn-arr">→</span>';
        showFormError(iform, data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      isubmit.disabled = false;
      isubmit.style.opacity = '';
      isubmit.innerHTML = 'Submit Print Order <span class="btn-arr">→</span>';
      showFormError(iform, 'Network error. Please check your connection and try again.');
    }
  });


  iform?.querySelectorAll('[required]').forEach(f => {
    f.addEventListener('input', () => { if (f.value.trim()) f.style.borderColor = ''; });
  });


  /* ─────────────────────────────────────────────
     6. QUICK CONTACT FORM (footer) — POST to /contact
  ───────────────────────────────────────────── */
  const qform = document.getElementById('qform');
  const qconfirm = document.getElementById('qfConfirm');


  qform?.addEventListener('submit', async e => {
    e.preventDefault();
    const fields = qform.querySelectorAll('[required]');
    let ok = true;
    fields.forEach(f => {
      const empty = !f.value.trim();
      f.style.borderColor = empty ? 'rgba(239,68,68,.75)' : '';
      if (empty) ok = false;
    });
    if (!ok) return;


    const qBtn = qform.querySelector('button[type="submit"]');
    qBtn.disabled = true;
    qBtn.style.opacity = '.6';
    qBtn.innerHTML = 'Sending… ⏳';


    const payload = {
      formType: 'quick',
      name: qform.querySelector('[name="qname"]').value.trim(),
      email: qform.querySelector('[name="qemail"]').value.trim(),
      message: qform.querySelector('[name="qmessage"]').value.trim(),
    };


    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();


      if (data.ok) {
        qconfirm?.classList.add('on');
        qBtn.innerHTML = 'Message Sent ✓';


        setTimeout(() => {
          qform.reset();
          qconfirm?.classList.remove('on');
          qBtn.disabled = false;
          qBtn.style.opacity = '';
          qBtn.innerHTML = 'Send Message →';
          fields.forEach(f => f.style.borderColor = '');
        }, 6000);
      } else {
        qBtn.disabled = false;
        qBtn.style.opacity = '';
        qBtn.innerHTML = 'Send Message →';
        showFormError(qform, data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      qBtn.disabled = false;
      qBtn.style.opacity = '';
      qBtn.innerHTML = 'Send Message →';
      showFormError(qform, 'Network error. Please check your connection and try again.');
    }
  });


  qform?.querySelectorAll('[required]').forEach(f => {
    f.addEventListener('input', () => { if (f.value.trim()) f.style.borderColor = ''; });
  });


  /* ─────────────────────────────────────────────
     7. MODAL SYSTEM
     Layout: Portfolio Gallery FIRST → Description SECOND
  ───────────────────────────────────────────── */
  const modalBg = document.getElementById('modalBg');
  const modalEl = document.getElementById('modal');
  const mNum = document.getElementById('mNum');
  const mTitle = document.getElementById('mTitle');
  const mSub = document.getElementById('mSub');
  const mDesc = document.getElementById('mDesc');
  const mGal = document.getElementById('mGal');
  const mClose = document.getElementById('modalClose');
  const mOrder = document.getElementById('mOrder');


  function buildModal(id) {
    const s = STREAMS[id];
    if (!s) return;


    // Top bar
    mNum.textContent = s.num;
    mTitle.innerHTML = s.title;
    mSub.textContent = s.sub;


    // Gallery FIRST
    mGal.innerHTML = '';
    s.items.forEach((item, i) => {
      const el = document.createElement('div');
      el.className = `gi gi--${id}`;
      el.innerHTML = `
        <div class="gi__thumb">
          <img src="${item.emo}" alt="${item.name}" class="gi__img" />
        </div>
        <div class="gi__body">
          <div class="gi__n">${String(i + 1).padStart(2, '0')}</div>
          <div class="gi__name">${item.name}</div>
          <div class="gi__meta">${item.meta}</div>
          <span class="gi__tag">${item.tag}</span>
        </div>`;
      mGal.appendChild(el);
    });


    // Description SECOND
    let html = '';
    s.paras.forEach(p => { html += `<p>${p}</p>`; });
    html += '<ul>';
    s.bullets.forEach(b => { html += `<li>${b}</li>`; });
    html += '</ul>';
    mDesc.innerHTML = html;


    // Reset scroll
    modalEl.querySelector('.modal__body').scrollTop = 0;
  }


  function openModal(id) {
    buildModal(id);
    modalBg.classList.add('open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => mClose?.focus());
  }


  function closeModal() {
    modalBg.classList.remove('open');
    document.body.style.overflow = '';
  }


  // Card triggers
  document.querySelectorAll('.sc').forEach(card => {
    card.addEventListener('click', () => openModal(+card.dataset.stream));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(+card.dataset.stream); }
    });
  });


  // Close paths: button · backdrop · Escape
  mClose?.addEventListener('click', closeModal);
  modalBg.addEventListener('click', e => { if (e.target === modalBg) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalBg.classList.contains('open')) closeModal();
  });


  // "Order This Stream" → close modal, then scroll to intake form
  mOrder?.addEventListener('click', () => {
    closeModal();
    setTimeout(() => smoothScrollTo('intake'), 340);
  });


  /* ─────────────────────────────────────────────
     8. INTERSECTION OBSERVER — SCROLL REVEAL
  ───────────────────────────────────────────── */
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revObs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });


  document.querySelectorAll('.sr').forEach(el => revObs.observe(el));


  /* ─────────────────────────────────────────────
     9. HERO STAGGERED ENTRANCE
  ───────────────────────────────────────────── */
  const heroAnims = [
    ['.hero__h1', 0.22],
    ['.hero__caption', 0.34],
    ['.hero__actions', 0.44],
    ['.hero__pills', 0.54],
  ];


  heroAnims.forEach(([sel, delay]) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.cssText += `
      opacity: 0;
      transform: translateY(18px);
      transition: opacity .72s ease ${delay}s, transform .72s ease ${delay}s;
    `;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }));
  });


  /* ─────────────────────────────────────────────
     SHARED: File → Base64 converter
     Strips data URI prefix — Resend needs raw
     base64 only, no "data:image/png;base64," prefix
  ───────────────────────────────────────────── */
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;

        // Always strip the data URI prefix if present
        const base64 = result.includes(',')
          ? result.split(',')[1]
          : result;

        if (!base64 || base64.length === 0) {
          reject(new Error(`Empty base64 for file: ${file.name}`));
          return;
        }

        resolve({
          filename: file.name,
          content: base64,
          type: file.type || 'application/octet-stream',
        });
      };
      reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
      reader.readAsDataURL(file);
    });
  }


  /* ─────────────────────────────────────────────
     SHARED: Inline error banner for form failures
  ───────────────────────────────────────────── */
  function showFormError(formEl, message) {
    let banner = formEl.querySelector('.form-error-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'form-error-banner';
      banner.style.cssText = `
        background: rgba(239,68,68,.12);
        border: 1px solid rgba(239,68,68,.35);
        color: #f87171;
        font-size: .8rem;
        font-weight: 600;
        padding: 11px 14px;
        border-radius: 6px;
        margin-top: 10px;
      `;
      formEl.appendChild(banner);
    }
    banner.textContent = `⚠ ${message}`;
    banner.style.display = 'block';
    setTimeout(() => { banner.style.display = 'none'; }, 6000);
  }


});