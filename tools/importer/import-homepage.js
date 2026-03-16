/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselHeroParser from './parsers/carousel-hero.js';
import columnsCheckerboardParser from './parsers/columns-checkerboard.js';
import cardsQuicklinksParser from './parsers/cards-quicklinks.js';
import carouselLogosParser from './parsers/carousel-logos.js';
import heroBannerParser from './parsers/hero-banner.js';
import cardsNewsParser from './parsers/cards-news.js';
import cardsResourcesParser from './parsers/cards-resources.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/caterpillar-cleanup.js';
import sectionsTransformer from './transformers/caterpillar-sections.js';

// PARSER REGISTRY
const parsers = {
  'carousel-hero': carouselHeroParser,
  'columns-checkerboard': columnsCheckerboardParser,
  'cards-quicklinks': cardsQuicklinksParser,
  'carousel-logos': carouselLogosParser,
  'hero-banner': heroBannerParser,
  'cards-news': cardsNewsParser,
  'cards-resources': cardsResourcesParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Caterpillar homepage with hero carousel, product categories, news, and promotional content',
  urls: [
    'https://www.caterpillar.com/en.html'
  ],
  blocks: [
    {
      name: 'carousel-hero',
      instances: ['section.carousel--hero']
    },
    {
      name: 'columns-checkerboard',
      instances: ['.teaser--checkerboard']
    },
    {
      name: 'cards-quicklinks',
      instances: ['.editorial-card--3-col', '.editorial-card--2-col']
    },
    {
      name: 'carousel-logos',
      instances: ['section.carousel--film-strip-simple']
    },
    {
      name: 'hero-banner',
      instances: ['.teaser--full-width']
    },
    {
      name: 'cards-news',
      instances: ['.list--content.list--simple']
    },
    {
      name: 'cards-resources',
      instances: ['.list--no-image.list--col-4']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Carousel',
      selector: 'section.carousel.carousel--hero',
      style: null,
      blocks: ['carousel-hero'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'About Caterpillar',
      selector: '.section-container:has(.teaser--checkerboard)',
      style: 'light-grey',
      blocks: ['columns-checkerboard'],
      defaultContent: []
    },
    {
      id: 'section-3',
      name: 'Quick Links Cards',
      selector: '.section-container:has(.editorial-card--3-col)',
      style: 'light-grey',
      blocks: ['cards-quicklinks'],
      defaultContent: []
    },
    {
      id: 'section-4',
      name: 'Our Family of Brands',
      selector: '.section-container:has(.carousel--film-strip-simple)',
      style: null,
      blocks: ['carousel-logos'],
      defaultContent: [".deg-title:has(h2[aria-label='Our Family of Brands'])"]
    },
    {
      id: 'section-5',
      name: 'Cat Products and Services',
      selector: '.teaser--full-width',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: []
    },
    {
      id: 'section-6',
      name: 'Latest News',
      selector: '.section-container:has(.list--content.list--simple)',
      style: 'light-grey',
      blocks: ['cards-news'],
      defaultContent: [".deg-title:has(h2[aria-label='Latest News'])", '.teaser--tile-text']
    },
    {
      id: 'section-7',
      name: 'Resource Links',
      selector: '.list--no-image.list--col-4',
      style: 'light-grey',
      blocks: ['cards-resources'],
      defaultContent: []
    },
    {
      id: 'section-8',
      name: 'Social Media',
      selector: '.socialMedia.section-padding',
      style: null,
      blocks: [],
      defaultContent: ['.socialMedia.section-padding']
    }
  ]
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn(hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
