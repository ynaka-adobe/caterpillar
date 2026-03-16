/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-banner. Base: hero.
 * Source: https://www.caterpillar.com/en.html
 * Selector: .teaser--full-width
 * Structure: .teaser__text-wrap (h2.teaserHeading, p.teaser-blog-content, a.button)
 *            .teaser__img-wrap (figure > picture > img)
 * Target: Hero table - 1 column, 3 rows. Row 1 = name. Row 2 = bg image. Row 3 = heading + text + CTA.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Extract background image
  const imgWrap = element.querySelector('.teaser__img-wrap');
  const img = imgWrap ? imgWrap.querySelector('img') : null;
  if (img) {
    const newImg = document.createElement('img');
    newImg.src = img.src || img.dataset.src;
    newImg.alt = img.alt || '';
    cells.push([newImg]);
  }

  // Extract text content
  const textWrap = element.querySelector('.teaser__text-wrap');
  const heading = textWrap ? textWrap.querySelector('h2.teaserHeading, h2, h1') : null;
  const description = textWrap ? textWrap.querySelector('p.teaser-blog-content, p') : null;
  const cta = textWrap ? textWrap.querySelector('a.button, a.teaserDefaultButtonText, a') : null;

  const contentCell = [];
  if (heading) {
    const h = document.createElement('h2');
    h.innerHTML = heading.innerHTML;
    contentCell.push(h);
  }
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    contentCell.push(p);
  }
  if (cta) {
    const link = document.createElement('a');
    link.href = cta.href;
    link.textContent = cta.textContent.trim();
    contentCell.push(link);
  }
  cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
