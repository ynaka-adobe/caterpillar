var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document }) {
    const cells = [];
    const slides = element.querySelectorAll(".cmp-carousel__item");
    slides.forEach((slide) => {
      const imgWrap = slide.querySelector(".teaser__img-wrap");
      const img = imgWrap ? imgWrap.querySelector("img") : null;
      const textWrap = slide.querySelector(".teaser__text-wrap");
      const heading = textWrap ? textWrap.querySelector("h2.teaserHeading, h2, h1") : null;
      const description = textWrap ? textWrap.querySelector("p.teaser-blog-content, p") : null;
      const cta = textWrap ? textWrap.querySelector("a.button, a.teaserDefaultButtonText, a") : null;
      const imageCell = [];
      if (img) {
        const newImg = document.createElement("img");
        newImg.src = img.src || img.dataset.src;
        newImg.alt = img.alt || "";
        imageCell.push(newImg);
      }
      const contentCell = [];
      if (heading) {
        const h = document.createElement("h2");
        h.textContent = heading.textContent.trim();
        contentCell.push(h);
      }
      if (description) {
        const p = document.createElement("p");
        p.textContent = description.textContent.trim();
        contentCell.push(p);
      }
      if (cta) {
        const link = document.createElement("a");
        link.href = cta.href;
        link.textContent = cta.textContent.trim();
        contentCell.push(link);
      }
      if (imageCell.length > 0 || contentCell.length > 0) {
        cells.push([imageCell, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-checkerboard.js
  function parse2(element, { document }) {
    const cells = [];
    const textWrap = element.querySelector(".teaser__text-wrap");
    const heading = textWrap ? textWrap.querySelector("h2.teaserHeading, h2, h1") : null;
    const description = textWrap ? textWrap.querySelector("p.teaser-blog-content, p") : null;
    const cta = textWrap ? textWrap.querySelector("a.button, a.teaserDefaultButtonText, a") : null;
    const imgWrap = element.querySelector(".teaser__img-wrap");
    const img = imgWrap ? imgWrap.querySelector("img") : null;
    const textCell = [];
    if (heading) {
      const h = document.createElement("h2");
      h.textContent = heading.textContent.trim();
      textCell.push(h);
    }
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent.trim();
      textCell.push(p);
    }
    if (cta) {
      const link = document.createElement("a");
      link.href = cta.href;
      link.textContent = cta.textContent.trim();
      textCell.push(link);
    }
    const imageCell = [];
    if (img) {
      const newImg = document.createElement("img");
      newImg.src = img.src || img.dataset.src;
      newImg.alt = img.alt || "";
      imageCell.push(newImg);
    }
    cells.push([textCell, imageCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-checkerboard", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-quicklinks.js
  function parse3(element, { document }) {
    const cells = [];
    const items = element.querySelectorAll(".editorial-card__item");
    items.forEach((item) => {
      const img = item.querySelector(".editorial-card__item--img-wrap img");
      const imageCell = [];
      if (img) {
        const newImg = document.createElement("img");
        newImg.src = img.src || img.dataset.src;
        newImg.alt = img.alt || "";
        imageCell.push(newImg);
      }
      const textWrap = item.querySelector(".editorial-card__item--text-wrap");
      const heading = textWrap ? textWrap.querySelector("h2, h3") : null;
      const description = textWrap ? textWrap.querySelector("p") : null;
      const link = item.querySelector("a[href]");
      const contentCell = [];
      if (heading) {
        const h = document.createElement("h3");
        h.textContent = heading.textContent.trim();
        contentCell.push(h);
      }
      if (description) {
        const p = document.createElement("p");
        p.textContent = description.textContent.trim();
        contentCell.push(p);
      }
      if (link) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = heading ? heading.textContent.trim() : "Learn More";
        contentCell.push(a);
      }
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-quicklinks", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-logos.js
  function parse4(element, { document }) {
    const cells = [];
    const items = element.querySelectorAll(".editorial-card--fs-simple");
    items.forEach((item) => {
      const img = item.querySelector("img");
      const link = item.querySelector("a[href]");
      const imageCell = [];
      if (img) {
        const newImg = document.createElement("img");
        newImg.src = img.src || img.dataset.src;
        newImg.alt = img.alt || "";
        imageCell.push(newImg);
      }
      const contentCell = [];
      if (link) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = img ? img.alt || "" : "";
        contentCell.push(a);
      }
      if (imageCell.length > 0) {
        cells.push([imageCell, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-logos", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse5(element, { document }) {
    const cells = [];
    const imgWrap = element.querySelector(".teaser__img-wrap");
    const img = imgWrap ? imgWrap.querySelector("img") : null;
    if (img) {
      const newImg = document.createElement("img");
      newImg.src = img.src || img.dataset.src;
      newImg.alt = img.alt || "";
      cells.push([newImg]);
    }
    const textWrap = element.querySelector(".teaser__text-wrap");
    const heading = textWrap ? textWrap.querySelector("h2.teaserHeading, h2, h1") : null;
    const description = textWrap ? textWrap.querySelector("p.teaser-blog-content, p") : null;
    const cta = textWrap ? textWrap.querySelector("a.button, a.teaserDefaultButtonText, a") : null;
    const contentCell = [];
    if (heading) {
      const h = document.createElement("h2");
      h.innerHTML = heading.innerHTML;
      contentCell.push(h);
    }
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent.trim();
      contentCell.push(p);
    }
    if (cta) {
      const link = document.createElement("a");
      link.href = cta.href;
      link.textContent = cta.textContent.trim();
      contentCell.push(link);
    }
    cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-news.js
  function parse6(element, { document }) {
    const cells = [];
    const items = element.querySelectorAll("li.list__item");
    items.forEach((item) => {
      const img = item.querySelector("img.list__item-image");
      const link = item.querySelector("a.list__item-content");
      const imageCell = [];
      if (img) {
        const newImg = document.createElement("img");
        newImg.src = img.src || img.dataset.src;
        newImg.alt = img.alt || "";
        imageCell.push(newImg);
      }
      const textDiv = item.querySelector(".list__item-text");
      const title = textDiv ? textDiv.querySelector("p.list__name, .accessible-name") : null;
      const date = textDiv ? textDiv.querySelector("h4") : null;
      const excerpt = textDiv ? textDiv.querySelector("p:not(.list__name):not(.accessible-name)") : null;
      const contentCell = [];
      if (title) {
        const h = document.createElement("h3");
        h.textContent = title.textContent.trim();
        contentCell.push(h);
      }
      if (date) {
        const p = document.createElement("p");
        p.textContent = date.textContent.trim();
        contentCell.push(p);
      }
      if (excerpt) {
        const p = document.createElement("p");
        p.textContent = excerpt.textContent.trim();
        contentCell.push(p);
      }
      if (link) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = "View Release";
        contentCell.push(a);
      }
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-news", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-resources.js
  function parse7(element, { document }) {
    const cells = [];
    const items = element.querySelectorAll("li.list__item");
    items.forEach((item) => {
      const link = item.querySelector("a.list__item-content");
      const heading = item.querySelector("h3.list__name, .list__name");
      const ctaText = item.querySelector("span.cat-follow");
      const contentCell = [];
      if (heading) {
        const h = document.createElement("h3");
        h.textContent = heading.textContent.trim();
        contentCell.push(h);
      }
      if (link) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = ctaText ? ctaText.textContent.trim() : "Learn More";
        contentCell.push(a);
      }
      if (contentCell.length > 0) {
        cells.push(contentCell);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-resources", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/caterpillar-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        ".cookie",
        "#onetrust-consent-sdk",
        '[class*="cookie"]'
      ]);
      element.querySelectorAll('input[type="hidden"]').forEach((input) => input.remove());
      element.querySelectorAll(".accent-bar").forEach((el) => el.remove());
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        ".header",
        "header",
        "footer",
        ".skip-to-content",
        ".skip-search-crawl",
        "noscript",
        "iframe",
        "link"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".carousel_play",
        ".carousel__pagination"
      ]);
      element.querySelectorAll("[data-component]").forEach((el) => {
        el.removeAttribute("data-component");
      });
      element.querySelectorAll("[onclick]").forEach((el) => {
        el.removeAttribute("onclick");
      });
    }
  }

  // tools/importer/transformers/caterpillar-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const template = payload && payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectorList = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectorList) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "carousel-hero": parse,
    "columns-checkerboard": parse2,
    "cards-quicklinks": parse3,
    "carousel-logos": parse4,
    "hero-banner": parse5,
    "cards-news": parse6,
    "cards-resources": parse7
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Caterpillar homepage with hero carousel, product categories, news, and promotional content",
    urls: [
      "https://www.caterpillar.com/en.html"
    ],
    blocks: [
      {
        name: "carousel-hero",
        instances: ["section.carousel--hero"]
      },
      {
        name: "columns-checkerboard",
        instances: [".teaser--checkerboard"]
      },
      {
        name: "cards-quicklinks",
        instances: [".editorial-card--3-col", ".editorial-card--2-col"]
      },
      {
        name: "carousel-logos",
        instances: ["section.carousel--film-strip-simple"]
      },
      {
        name: "hero-banner",
        instances: [".teaser--full-width"]
      },
      {
        name: "cards-news",
        instances: [".list--content.list--simple"]
      },
      {
        name: "cards-resources",
        instances: [".list--no-image.list--col-4"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Carousel",
        selector: "section.carousel.carousel--hero",
        style: null,
        blocks: ["carousel-hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "About Caterpillar",
        selector: ".section-container:has(.teaser--checkerboard)",
        style: "light-grey",
        blocks: ["columns-checkerboard"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Quick Links Cards",
        selector: ".section-container:has(.editorial-card--3-col)",
        style: "light-grey",
        blocks: ["cards-quicklinks"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Our Family of Brands",
        selector: ".section-container:has(.carousel--film-strip-simple)",
        style: null,
        blocks: ["carousel-logos"],
        defaultContent: [".deg-title:has(h2[aria-label='Our Family of Brands'])"]
      },
      {
        id: "section-5",
        name: "Cat Products and Services",
        selector: ".teaser--full-width",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Latest News",
        selector: ".section-container:has(.list--content.list--simple)",
        style: "light-grey",
        blocks: ["cards-news"],
        defaultContent: [".deg-title:has(h2[aria-label='Latest News'])", ".teaser--tile-text"]
      },
      {
        id: "section-7",
        name: "Resource Links",
        selector: ".list--no-image.list--col-4",
        style: "light-grey",
        blocks: ["cards-resources"],
        defaultContent: []
      },
      {
        id: "section-8",
        name: "Social Media",
        selector: ".socialMedia.section-padding",
        style: null,
        blocks: [],
        defaultContent: [".socialMedia.section-padding"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn(hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
