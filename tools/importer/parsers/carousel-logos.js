/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-logos. Base: carousel.
 * Source: https://www.caterpillar.com/en.html
 * Selector: section.carousel--film-strip-simple
 * Each slide: .fs-single containing .editorial-card--fs-simple with linked brand logo image.
 * Target: Carousel table - 2 columns. Each row = [image | brand link].
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find all brand logo cards in the film strip
  const items = element.querySelectorAll('.editorial-card--fs-simple');

  items.forEach((item) => {
    const img = item.querySelector('img');
    const link = item.querySelector('a[href]');

    const imageCell = [];
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src || img.dataset.src;
      newImg.alt = img.alt || '';
      imageCell.push(newImg);
    }

    const contentCell = [];
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = img ? (img.alt || '') : '';
      contentCell.push(a);
    }

    if (imageCell.length > 0) {
      cells.push([imageCell, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-logos', cells });
  element.replaceWith(block);
}
