export function openModal(id)  { document.getElementById(id).classList.add('open'); }
export function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function initSwipeToClose(overlay) {
  const modal = overlay.querySelector('.modal');
  const handle = modal?.querySelector('.modal-handle');
  if (!handle || overlay.id === 'modal-session') return;

  let startY = 0;
  let currentY = 0;
  let dragging = false;

  handle.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
    dragging = true;
    modal.style.transition = 'none';
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!dragging) return;
    currentY = e.touches[0].clientY;
    const diff = Math.max(0, currentY - startY);
    modal.style.transform = `translateY(${diff}px)`;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    modal.style.transition = '';
    if (currentY - startY > 80) {
      closeModal(overlay.id);
      modal.style.transform = '';
    } else {
      modal.style.transform = '';
    }
  });
}

export function initModalOverlays() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target !== overlay || overlay.id === 'modal-session') return;
      closeModal(overlay.id);
    });
    initSwipeToClose(overlay);
  });
}
