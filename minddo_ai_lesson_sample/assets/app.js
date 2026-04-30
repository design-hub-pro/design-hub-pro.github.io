// ============= MY WORK DRAWER =============
// Single source of truth for the student's submitted work.
// Updated as they progress through milestones.
const STUDENT_WORK = {
  studentName: "Maya",
  totalFields: 15,
  filledFields: 8,
  progressPct: 35,
  mantou: { earned: 7, total: 35 },
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
        <div class="dr-progress-row" style="margin-top:10px;margin-bottom:0">
          <span><span class="mantou-coin"></span><b>${w.mantou.earned}</b> 馒头 collected</span>
          <span class="pct" style="color:var(--tea);background:var(--milk-soft);padding:2px 10px;border-radius:100px;font-size:11px">${w.mantou.total} to grad day</span>
        </div>
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

// ============= TOPNAV — heavier shadow on scroll =============
const topnav = document.querySelector('.topnav');
if (topnav) {
  const onScroll = () => {
    if (window.scrollY > 24) topnav.classList.add('scrolled');
    else topnav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

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

// ============= REWARD POPUP =============
// Per-milestone reward config
const MILESTONE_REWARDS = {
  1: { mantou: 3, title: "Discovery", emoji: "🔍", praise: "You found the angle. The user is real now." },
  2: { mantou: 4, title: "Brand Identity", emoji: "🪪", praise: "Your brand has a face. Take it out for a spin." },
  3: { mantou: 5, title: "Feature Planning", emoji: "🧠", praise: "You picked the moves that make this app unmistakable." },
  4: { mantou: 4, title: "User Flow", emoji: "🗺️", praise: "Every tap mapped. Now it actually feels like an app." },
  5: { mantou: 6, title: "UI Design", emoji: "🎨", praise: "Pixels, on brand. Your moodboard is now a real interface." },
  6: { mantou: 8, title: "Build the Prototype", emoji: "🛠️", praise: "You shipped a real prototype. Family-dinner moment." },
  7: { mantou: 5, title: "Launch", emoji: "🚀", praise: "Pitch locked. Demo Day, here you come." }
};

function detectMilestone() {
  const path = location.pathname;
  const match = path.match(/milestone-(\d+)/);
  return match ? parseInt(match[1]) : null;
}

function showReward(milestoneNum) {
  const w = STUDENT_WORK;
  const r = MILESTONE_REWARDS[milestoneNum];
  if (!r) return;

  const newEarned = Math.min(w.mantou.earned + r.mantou, w.mantou.total);
  const newPct = Math.round((newEarned / w.mantou.total) * 100);

  const colors = ['#FF6B9D','#FFB088','#FFC94D','#7BB661','#9B6BD8','#5EEAD4'];
  const confetti = Array.from({length:24}).map(() => {
    const left = Math.random()*100;
    const dx = (Math.random()*200 - 100);
    const delay = Math.random()*0.4;
    const c = colors[Math.floor(Math.random()*colors.length)];
    return `<span class="confetti-bit" style="left:${left}%;background:${c};--dx:${dx}px;animation-delay:${delay}s"></span>`;
  }).join('');

  const html = `
    <div class="reward-overlay" id="reward-ov">
      <div class="reward-card">
        <div class="reward-confetti">${confetti}</div>
        <div class="reward-mascot" style="background-image:url(https://cm-idea-images.s3.us-west-1.amazonaws.com/1777501761002-image-1.png)"></div>
        <h2 class="reward-title">Milestone <span class="grad">${r.emoji} ${r.title}</span><br>shipped!</h2>
        <p class="reward-sub">${r.praise}<br>Coach Mei has been notified for review.</p>

        <div class="reward-prize">
          <div class="reward-prize-coin"></div>
          <div class="reward-prize-text">
            <div class="amt">+${r.mantou} 馒头</div>
            <div class="label">added to your collection</div>
          </div>
        </div>

        <div class="reward-progress">
          <div class="row">
            <span><b>${newEarned}</b> of ${w.mantou.total} 馒头 collected</span>
            <span class="pct">${newPct}%</span>
          </div>
          <div class="pbar"><div class="pfill" id="reward-pfill"></div></div>
        </div>

        <div class="reward-actions">
          ${milestoneNum < 7
            ? `<a href="milestone-${milestoneNum+1}.html" class="btn-reward-primary">Unlock Milestone ${milestoneNum+1} →</a>`
            : `<a href="index.html" class="btn-reward-primary">🏆 Mission Complete · Back to hub</a>`
          }
          <button class="btn-reward-secondary" id="reward-close">Stay on this page</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
  const ov = document.getElementById('reward-ov');
  const close = () => { ov.classList.remove('show'); setTimeout(()=>ov.remove(), 350); document.body.style.overflow=''; };
  requestAnimationFrame(() => {
    ov.classList.add('show');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { document.getElementById('reward-pfill').style.width = newPct + '%'; }, 200);
  });
  document.getElementById('reward-close').addEventListener('click', close);
  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  document.addEventListener('keydown', function escClose(e){
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escClose); }
  });
}

// ============= SUBMIT / DRAFT BUTTONS =============
document.querySelectorAll('.btn-submit').forEach(btn=>{
  if(btn.disabled) return;
  btn.addEventListener('click',e=>{
    e.preventDefault();
    const ms = detectMilestone();
    if (ms) {
      showReward(ms);
    } else {
      btn.classList.add('success');
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Submitted!';
      setTimeout(()=>{ btn.classList.remove('success'); btn.innerHTML = orig; }, 2000);
    }
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
