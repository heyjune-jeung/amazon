/* ==========================================================================
   Grace Jeung — Amazon-storefront themed portfolio

   Ported from the DCLogic class in the design file:
     state.activeId + openProject/goHome  ->  URL-hash routing.

   The design tracked the open project in in-memory state, so the URL never
   changed: the browser Back button would leave the site instead of returning
   to the storefront, and a single case study could not be linked to. Routing
   on the hash fixes both.

   Which view is visible is decided in CSS (.detail:target), not here, so the
   site still works with JavaScript off. This file only handles the two things
   CSS cannot: syncing the document title, and scrolling to the top when the
   view changes.
   ========================================================================== */

(function () {
  'use strict';

  var PROJECT_IDS = ['quickdraft', 'invoice-automation', 'qvc-dropship', 'pricing-ops'];
  var BASE_TITLE = document.title;

  function currentId() {
    var id = (location.hash || '').replace(/^#/, '');
    return PROJECT_IDS.indexOf(id) !== -1 ? id : null;
  }

  function syncTitle() {
    var id = currentId();
    if (!id) {
      document.title = BASE_TITLE;
      return;
    }
    var view = document.getElementById(id);
    var heading = view && view.querySelector('.detail__title');
    document.title = (heading ? heading.textContent.trim() + ' — ' : '') + BASE_TITLE;
  }

  window.addEventListener('hashchange', function () {
    syncTitle();
    window.scrollTo(0, 0);
  });

  // Deep link on first load: :target already shows the right view, but the
  // browser may have scrolled down to the anchor. Reset to the top.
  if (currentId()) window.scrollTo(0, 0);
  syncTitle();
})();
