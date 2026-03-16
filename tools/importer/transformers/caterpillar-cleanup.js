/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Caterpillar site cleanup.
 * Selectors from captured DOM of caterpillar.com/en.html.
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie consent and overlays (from captured DOM: .cookie div)
    WebImporter.DOMUtils.remove(element, [
      '.cookie',
      '#onetrust-consent-sdk',
      '[class*="cookie"]',
    ]);

    // Remove hidden inputs that pollute content
    element.querySelectorAll('input[type="hidden"]').forEach((input) => input.remove());

    // Remove accent bars (decorative only)
    element.querySelectorAll('.accent-bar').forEach((el) => el.remove());
  }

  if (hookName === H.after) {
    // Remove non-authorable content: header, footer, nav, skip links
    WebImporter.DOMUtils.remove(element, [
      '.header',
      'header',
      'footer',
      '.skip-to-content',
      '.skip-search-crawl',
      'noscript',
      'iframe',
      'link',
    ]);

    // Remove carousel play/pause controls and pagination (non-authorable UI)
    WebImporter.DOMUtils.remove(element, [
      '.carousel_play',
      '.carousel__pagination',
    ]);

    // Clean tracking attributes
    element.querySelectorAll('[data-component]').forEach((el) => {
      el.removeAttribute('data-component');
    });
    element.querySelectorAll('[onclick]').forEach((el) => {
      el.removeAttribute('onclick');
    });
  }
}
