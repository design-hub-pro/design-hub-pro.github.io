// ============= MY WORK DRAWER =============
// Single source of truth for the student's submitted work.
// Updated as they progress through milestones.
const STUDENT_WORK = {
  studentName: "Maya",
  totalFields: 15,
  filledFields: 8,
  progressPct: 35,
  activeMilestone: 3,
  activeMilestoneTitle: "Feature Planning",
  milestones: [
    {
      n: 1, color: "c1", emoji: "🔍",
      title: "Understand the Mission", status: "done",
      fields: [
        { label: "Target user", value: "Middle & high school students in Irvine who use boba as a social ritual — meeting friends after school, posting drinks on stories, and chasing weekly flavor drops." },
        { label: "Brand keywords", value: "playful · social · craveable · drop-culture · pastel-bold" },
        { label: "Brand vibe", value: "It should feel like the milk tea version of a sneaker drop — colorful, limited, made for sharing, and something parents would never quite get." }
      ]
    },
    {
      n: 2, color: "c2", emoji: "🪪",
      title: "Brand Naming & Identity", status: "done",
      fields: [
        { label: "Brand name", value: "Boba.Lab" },
        { label: "Slogan", value: "Tea drops. Friends know." },
        { label: "Personality", value: "bold · curious · soft · craveable · playful" },
        { label: "Logo", value: "boba_lab_logo_v1.png · uploaded ✓" }
      ]
    },
    {
      n: 3, color: "c3", emoji: "🧠",
      title: "Feature Planning", status: "draft",
      fields: []
    },
    { n: 4, color: "c4", emoji: "🗺️", title: "App Structure & User Flow", status: "lock", fields: [] },
    { n: 5, color: "c5", emoji: "🎨", title: "UI & Visual Design", status: "lock", fields: [] },
    { n: 6, color: "c6", emoji: "🛠️", title: "Build the Prototype", status: "lock", fields: [] },
    { n: 7, color: "c7", emoji: "🚀", title: "Launch & Showcase", status: "lock", fields: [] }
  ]
};

function renderDrawer() {
  const w = STUDENT_WORK;
  const statusLabel = (s) => s === "done" ? "✓ Submitted" : s === "draft" ? "⚡ Draft" : "🔒 Locked";

  const fieldsHtml = (m) => {
    if (m.status === "lock") return `<div class="dr-empty">🔒 Unlock by finishing the previous milestone.</div>`;
    if (m.fields.length === 0) return `<div class="dr-empty">Nothing submitted yet — pick up where you left off.</div>`;
    return `<div class="dr-fields">${m.fields.map(f => `
      <div class="dr-field">
        <label>${f.label}</label>
        <p>${f.value}</p>
      </div>`).join('')}</div>`;
  };

  const editLink = (m) => {
    if (m.status === "lock") return '';
    const verb = m.status === "done" ? "Edit submission" : "Continue this milestone";
    return `<a href="milestone-${m.n}.html" class="dr-edit">${verb} →</a>`;
  };

  const milestonesHtml = w.milestones.map(m => `
    <div class="dr-ms ${m.status === 'lock' ? 'locked' : ''}">
      <div class="dr-ms-head">
        <div class="dr-ms-num ${m.color}">${String(m.n).padStart(2,'0')}</div>
        <h3>${m.emoji} ${m.title}</h3>
        <span class="dr-ms-stat ${m.status}">${statusLabel(m.status)}</span>
      </div>
      ${fieldsHtml(m)}
      ${editLink(m)}
    </div>
  `).join('');

  const drawerHtml = `
    <div class="drawer-backdrop" id="drawer-bd"></div>
    <aside class="work-drawer" id="work-drawer" aria-hidden="true">
      <div class="dr-head">
        <h2>📋 My Mission Work<small>${w.studentName} · all submissions</small></h2>
        <button class="dr-close" id="dr-close" aria-label="Close">×</button>
      </div>
      <div class="dr-progress">
        <div class="dr-progress-row">
          <span><b>${w.filledFields}</b> of ${w.totalFields} fields submitted</span>
          <span class="pct">${w.progressPct}%</span>
        </div>
        <div class="dr-bar"><div class="dr-bar-fill" style="width:${w.progressPct}%"></div></div>
      </div>
      <div class="dr-body">
        <a href="milestone-${w.activeMilestone}.html" class="dr-resume">
          <span class="em">⚡</span>
          <div class="meta">
            <small>Resume mission</small>
            <b>Milestone ${w.activeMilestone} — ${w.activeMilestoneTitle}</b>
          </div>
          <span class="arrow">→</span>
        </a>
        ${milestonesHtml}
      </div>
    </aside>
  `;
  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const drawer = document.getElementById('work-drawer');
  const backdrop = document.getElementById('drawer-bd');
  const close = document.getElementById('dr-close');
  const open = () => { drawer.classList.add('open'); backdrop.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeFn = () => { drawer.classList.remove('open'); backdrop.classList.remove('open'); document.body.style.overflow = ''; };
  document.querySelectorAll('[data-open-drawer]').forEach(b => b.addEventListener('click', open));
  close.addEventListener('click', closeFn);
  backdrop.addEventListener('click', closeFn);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFn(); });
}
renderDrawer();

// ============= COPY PROMPTS =============
document.querySelectorAll('.copy-btn').forEach(b=>{
  b.addEventListener('click',e=>{
    e.stopPropagation();
    const txt = b.previousElementSibling?.innerText || b.parentElement?.querySelector('.prompt-text')?.innerText || '';
    if(navigator.clipboard) navigator.clipboard.writeText(txt);
    const orig = b.innerHTML;
    b.innerHTML = '✓ Copied to clipboard';
    b.style.background = 'var(--matcha)';
    b.style.borderColor = 'var(--matcha)';
    b.style.color = '#fff';
    setTimeout(()=>{
      b.innerHTML = orig;
      b.style.background = '';
      b.style.borderColor = '';
      b.style.color = '';
    }, 1600);
  });
});

// ============= FADE-IN ON SCROLL =============
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      en.target.style.opacity = '1';
      en.target.style.transform = 'translateY(0)';
      io.unobserve(en.target);
    }
  });
},{threshold:0.06});
document.querySelectorAll('[data-fade]').forEach(el=>{
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = 'opacity .55s cubic-bezier(.2,.7,.2,1), transform .55s cubic-bezier(.2,.7,.2,1)';
  io.observe(el);
});

// ============= SUBMIT / DRAFT BUTTONS =============
document.querySelectorAll('.btn-submit').forEach(btn=>{
  if(btn.disabled) return;
  btn.addEventListener('click',e=>{
    e.preventDefault();
    btn.classList.add('success');
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Submitted! Coach notified';
    setTimeout(()=>{ btn.classList.remove('success'); btn.innerHTML = orig; }, 2400);
  });
});
document.querySelectorAll('.btn-draft').forEach(btn=>{
  btn.addEventListener('click',e=>{
    if(btn.tagName === 'A') return;
    e.preventDefault();
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Draft saved';
    btn.style.color = 'var(--matcha)';
    btn.style.borderColor = 'var(--matcha)';
    setTimeout(()=>{ btn.innerHTML = orig; btn.style.color=''; btn.style.borderColor=''; }, 1600);
  });
});
