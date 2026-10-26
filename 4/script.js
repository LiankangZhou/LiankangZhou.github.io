document.querySelector('#print-report')?.addEventListener('click', async function () {
  this.disabled = true;
  this.textContent = 'Preparing images…';
  // Include supplementary figures and lazy-loaded images in the printed report.
  document.querySelectorAll('details').forEach(detail => { detail.open = true; });
  await Promise.all([...document.images].map(async image => {
    image.loading = 'eager';
    try { await image.decode(); } catch (_) { /* Keep failed images visible for inspection. */ }
  }));
  if (document.fonts?.ready) await document.fonts.ready;
  this.disabled = false;
  this.textContent = 'Print / Save PDF';
  window.print();
});
