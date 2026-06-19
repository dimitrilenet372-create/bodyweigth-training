export function escapeHTML(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function fmtTime(sec) {
  return `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;
}

export function animateList(el) {
  [...el.children].forEach((child, i) => {
    child.classList.add('anim-item');
    child.style.animationDelay = `${Math.min(i, 7) * 0.048}s`;
  });
}

export function countUp(el, target) {
  const dur = 550, t0 = performance.now();
  const tick = now => {
    const p = Math.min((now - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * ease);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function emptyStateHTML(svgPath, title, sub) {
  return `<div class="empty-state">
    <div class="empty-icon-wrap"><svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">${svgPath}</svg></div>
    <div class="empty-title">${title}</div>
    <div class="empty-sub">${sub}</div>
  </div>`;
}
