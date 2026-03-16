/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-hero. Base: carousel.
 * Source: https://www.caterpillar.com/en.html
 * Selector: section.carousel--hero
 * Each slide is a .cmp-carousel__item containing a .teaser--hero with
 * .teaser__text-wrap (heading h2.teaserHeading, p.teaser-blog-content, a.button)
 * and .teaser__img-wrap (picture > img).
 * Target: Carousel table - 2 columns. Each row = [image | heading + text + CTA].
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find all carousel slides
  const slides = element.querySelectorAll('.cmp-carousel__item');

  slides.forEach((slide) => {
    // Extract image from .teaser__img-wrap
    const imgWrap = slide.querySelector('.teaser__img-wrap');
    const img = imgWrap ? imgWrap.querySelector('img') : null;

    // Extract text content from .teaser__text-wrap
    const textWrap = slide.querySelector('.teaser__text-wrap');
    const heading = textWrap ? textWrap.querySelector('h2.teaserHeading, h2, h1') : null;
    const description = textWrap ? textWrap.querySelector('p.teaser-blog-content, p') : null;
    const cta = textWrap ? textWrap.querySelector('a.button, a.teaserDefaultButtonText, a') : null;

    // Build image cell
    const imageCell = [];
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src || img.dataset.src;
      newImg.alt = img.alt || '';
      imageCell.push(newImg);
    }

    // Build content cell
    const contentCell = [];
    if (heading) {
      const h = document.createElement('h2');
      h.textContent = heading.textContent.trim();
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

    if (imageCell.length > 0 || contentCell.length > 0) {
      cells.push([imageCell, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
