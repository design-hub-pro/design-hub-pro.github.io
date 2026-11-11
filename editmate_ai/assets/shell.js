/* EditMate AI window shell.
   Usage: <body data-title="Dashboard" data-nav="dashboard" data-copilot="1">
            <template id="main">…center workspace…</template>
            <template id="copilot">…optional right panel…</template>
            <template id="overlay">…optional absolutely-positioned overlay on the desktop…</template>
          <script src="assets/shell.js"></script>
   data-shell="none" renders only the desktop + menubar, so the screen draws its own windows. */
(function () {
  const b = document.body, d = b.dataset;
  const tpl = id => { const t = document.getElementById(id); return t ? t.innerHTML : ''; };
  const NAV = [
    ['dashboard', 'fa-solid fa-house', 'Dashboard', 'dashboard.html'],
    ['projects', 'fa-regular fa-folder-open', 'My Projects', 'project.html', '4'],
    ['copilot', 'fa-solid fa-wand-magic-sparkles', 'AI Copilot', 'copilot.html'],
    ['media', 'fa-regular fa-images', 'Media Organizer', 'media.html', '214'],
    ['music', 'fa-solid fa-wave-square', 'Music &amp; Beats', 'music.html'],
    ['tools', 'fa-regular fa-lightbulb', 'AI Editing Tools', 'tools.html'],
    ['learn', 'fa-solid fa-graduation-cap', 'Learning Hub', 'learning.html'],
    ['access', 'fa-solid fa-universal-access', 'Accessibility', 'accessibility.html'],
    ['settings', 'fa-solid fa-gear', 'Settings', 'settings.html'],
  ];
  const nav = NAV.map(([k, ic, label, href, badge]) =>
    `<a href="${href}" class="${d.nav === k ? 'on' : ''}"><i class="${ic}"></i>${label}${badge ? `<span class="badge">${badge}</span>` : ''}</a>`).join('');

  const menubar = `
  <div class="mac-menubar">
    <i class="fa-brands fa-apple" style="font-size:14px"></i><b>EditMate AI</b><span>File</span><span>Edit</span><span>View</span><span>Copilot</span><span>Window</span><span>Help</span>
    <div class="right">
      <span class="tray ${d.tray === 'on' ? 'on' : ''}"><i class="fa-solid fa-wand-magic-sparkles" style="font-size:12px"></i></span>
      <i class="fa-solid fa-wifi"></i><i class="fa-solid fa-battery-three-quarters"></i><i class="fa-solid fa-magnifying-glass"></i>
      <span>Wed Nov 11&nbsp;&nbsp;4:42 PM</span>
    </div>
  </div>`;

  const titlebar = `
  <div class="titlebar">
    <div class="lights"><i></i><i></i><i></i></div>
    <span class="tb-btn"><i class="fa-solid fa-table-columns"></i></span>
    <span class="tb-btn"><i class="fa-solid fa-chevron-left"></i></span>
    <div class="tb-title"><span style="width:16px;height:16px;border-radius:4px;background:linear-gradient(135deg,#f97316,#ef4444);display:inline-block"></span>Basketball Highlights<i class="fa-solid fa-chevron-down" style="font-size:9px;color:var(--dim)"></i><span class="dim" style="font-weight:400">&nbsp;·&nbsp;${d.title || ''}</span></div>
    <span class="pill" style="margin-left:10px"><span class="dot"></span>CapCut 5.2 connected</span>
    <div class="row" style="margin-left:auto;gap:8px">
      <div class="search"><i class="fa-solid fa-magnifying-glass" style="font-size:11px"></i>Search clips, tools, lessons<span class="kbd" style="margin-left:auto">⌘K</span></div>
      <div class="seg" style="margin-left:10px"><span class="on"><i class="fa-regular fa-window-maximize"></i>Workspace</span><span><i class="fa-regular fa-window-restore"></i>Floating</span></div>
      <span class="tb-btn" style="margin-left:6px"><i class="fa-regular fa-bell"></i></span>
      <img class="avatar" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop" alt="">
    </div>
  </div>`;

  const sidebar = `
  <aside class="sidebar">
    <nav class="nav">${nav}</nav>
    <div class="side-h" style="margin-top:12px">PROJECTS</div>
    <div class="proj">
      <a href="project.html" style="color:var(--text)"><span class="sw" style="background:#f97316"></span>Basketball Highlights</a>
      <a href="#"><span class="sw" style="background:#34d1bf"></span>Volunteer Day Doc</a>
      <a href="#"><span class="sw" style="background:#8b7cf6"></span>Yosemite Travel Vlog</a>
      <a href="#"><span class="sw" style="background:#f06a6a"></span>Robotics Club Promo</a>
    </div>
    <div class="side-foot">
      <div class="row" style="gap:8px"><span class="ai-avatar"><i class="fa-solid fa-wand-magic-sparkles"></i></span><div><div style="font-size:12px;font-weight:600">Floating Copilot</div><div class="dim" style="font-size:11px">Pop out next to CapCut</div></div></div>
      <div class="row" style="margin-top:8px;justify-content:space-between"><span class="btn sm" style="width:100%;justify-content:center"><i class="fa-regular fa-window-restore"></i>Pop out<span class="kbd" style="margin-left:4px">⌥Space</span></span></div>
    </div>
  </aside>`;

  const statusbar = `
  <div class="statusbar">
    <span><i class="fa-solid fa-circle" style="color:var(--ok);font-size:7px"></i>&nbsp; All changes saved locally</span>
    <span>214 clips · 38.6 GB in ~/Movies/Basketball 2026</span>
    <span>${d.status || 'Analysis idle'}</span>
    <div class="r"><span><i class="fa-solid fa-microphone"></i>&nbsp; Voice ready (fn fn)</span><span><i class="fa-solid fa-lock"></i>&nbsp; On-device first</span></div>
  </div>`;

  let html = `<div class="desktop">${menubar}`;
  if (d.shell !== 'none') {
    html += `<div class="window">${titlebar}<div class="body">${sidebar}<section class="main">${tpl('main')}</section>${d.copilot ? `<aside class="copilot">${tpl('copilot')}</aside>` : ''}</div>${statusbar}</div>`;
  }
  html += tpl('overlay') + `</div>`;
  b.innerHTML = html;
})();
