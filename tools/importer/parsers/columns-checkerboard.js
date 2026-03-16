/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-checkerboard. Base: columns.
 * Source: https://www.caterpillar.com/en.html
 * Selector: .teaser--checkerboard
 * Structure: .teaser__text-wrap (h2.teaserHeading, p.teaser-blog-content, a.button)
 *            .teaser__img-wrap (picture > img)
 * Target: Columns table - 2 columns, 1 row. [text content | image]
 */
export default function parse(element, { document }) {
  const cells = [];

  // Extract text content
  const textWrap = element.querySelector('.teaser__text-wrap');
  const heading = textWrap ? textWrap.querySelector('h2.teaserHeading, h2, h1') : null;
  const description = textWrap ? textWrap.querySelector('p.teaser-blog-content, p') : null;
  const cta = textWrap ? textWrap.querySelector('a.button, a.teaserDefaultButtonText, a') : null;

  // Extract image
  const imgWrap = element.querySelector('.teaser__img-wrap');
  const img = imgWrap ? imgWrap.querySelector('img') : null;

  // Build text cell
  const textCell = [];
  if (heading) {
    const h = document.createElement('h2');
    h.textContent = heading.textContent.trim();
    textCell.push(h);
  }
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    textCell.push(p);
  }
  if (cta) {
    const link = document.createElement('a');
    link.href = cta.href;
    link.textContent = cta.textContent.trim();
    textCell.push(link);
  }

  // Build image cell
  const imageCell = [];
  if (img) {
    const newImg = document.createElement('img');
    newImg.src = img.src || img.dataset.src;
    newImg.alt = img.alt || '';
    imageCell.push(newImg);
  }

  cells.push([textCell, imageCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-checkerboard', cells });
  element.replaceWith(block);
}
