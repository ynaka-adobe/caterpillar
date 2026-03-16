/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-news. Base: cards.
 * Source: https://www.caterpillar.com/en.html
 * Selector: .list--content.list--simple
 * Each item: li.list__item containing a.list__item-content wrapping
 *   figure > img.list__item-image
 *   .list__item-text > p.list__name (title), h4 (date), p (excerpt), span.cat-follow
 * Target: Cards table - 2 columns. Each row = [image | title + date + excerpt].
 */
export default function parse(element, { document }) {
  const cells = [];

  const items = element.querySelectorAll('li.list__item');

  items.forEach((item) => {
    // Extract image
    const img = item.querySelector('img.list__item-image');
    const link = item.querySelector('a.list__item-content');

    const imageCell = [];
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src || img.dataset.src;
      newImg.alt = img.alt || '';
      imageCell.push(newImg);
    }

    // Extract text content from .list__item-text
    const textDiv = item.querySelector('.list__item-text');
    const title = textDiv ? textDiv.querySelector('p.list__name, .accessible-name') : null;
    const date = textDiv ? textDiv.querySelector('h4') : null;
    const excerpt = textDiv ? textDiv.querySelector('p:not(.list__name):not(.accessible-name)') : null;

    const contentCell = [];
    if (title) {
      const h = document.createElement('h3');
      h.textContent = title.textContent.trim();
      contentCell.push(h);
    }
    if (date) {
      const p = document.createElement('p');
      p.textContent = date.textContent.trim();
      contentCell.push(p);
    }
    if (excerpt) {
      const p = document.createElement('p');
      p.textContent = excerpt.textContent.trim();
      contentCell.push(p);
    }
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = 'View Release';
      contentCell.push(a);
    }

    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-news', cells });
  element.replaceWith(block);
}
