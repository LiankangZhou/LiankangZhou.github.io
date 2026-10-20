
document.querySelector('#print-report')?.addEventListener('click', async function () {
  this.disabled = true;
  this.textContent = 'Preparing...';
  await Promise.all([...document.images].map(async image => {
    image.loading = 'eager';
    try { await image.decode(); } catch (_) { /* A missing image stays visible for review. */ }
  }));
  this.disabled = false;
  this.textContent = 'Print / Save PDF';
  window.print();
});
