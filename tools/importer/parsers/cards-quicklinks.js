/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-quicklinks. Base: cards.
 * Source: https://www.caterpillar.com/en.html
 * Selectors: .editorial-card--3-col, .editorial-card--2-col
 * Each card: .editorial-card__item containing a link wrapping
 *   .editorial-card__item--img-wrap (picture > img)
 *   .editorial-card__item--text-wrap (h2#defaultHeadlineText, p)
 * Target: Cards table - 2 columns. Each row = [image | heading + description].
 */
export default function parse(element, { document }) {
  const cells = [];

  const items = element.querySelectorAll('.editorial-card__item');

  items.forEach((item) => {
    // Extract image
    const img = item.querySelector('.editorial-card__item--img-wrap img');
    const imageCell = [];
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src || img.dataset.src;
      newImg.alt = img.alt || '';
      imageCell.push(newImg);
    }

    // Extract text content
    const textWrap = item.querySelector('.editorial-card__item--text-wrap');
    const heading = textWrap ? textWrap.querySelector('h2, h3') : null;
    const description = textWrap ? textWrap.querySelector('p') : null;
    const link = item.querySelector('a[href]');

    const contentCell = [];
    if (heading) {
      const h = document.createElement('h3');
      h.textContent = heading.textContent.trim();
      contentCell.push(h);
    }
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      contentCell.push(p);
    }
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = heading ? heading.textContent.trim() : 'Learn More';
      contentCell.push(a);
    }

    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-quicklinks', cells });
  element.replaceWith(block);
}
