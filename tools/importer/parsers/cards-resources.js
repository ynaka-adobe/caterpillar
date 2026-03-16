/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-resources. Base: cards (no images).
 * Source: https://www.caterpillar.com/en.html
 * Selector: .list--no-image.list--col-4
 * Each item: li.list__item containing a.list__item-content wrapping
 *   .list__item-text > h3.list__name (heading), span.cat-follow (link text)
 * Target: Cards (no images) table - 1 column. Each row = [heading + link text].
 */
export default function parse(element, { document }) {
  const cells = [];

  const items = element.querySelectorAll('li.list__item');

  items.forEach((item) => {
    const link = item.querySelector('a.list__item-content');
    const heading = item.querySelector('h3.list__name, .list__name');
    const ctaText = item.querySelector('span.cat-follow');

    const contentCell = [];
    if (heading) {
      const h = document.createElement('h3');
      h.textContent = heading.textContent.trim();
      contentCell.push(h);
    }
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = ctaText ? ctaText.textContent.trim() : 'Learn More';
      contentCell.push(a);
    }

    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-resources', cells });
  element.replaceWith(block);
}
