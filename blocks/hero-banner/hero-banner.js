export default function init(el) {
  if (!el.querySelector(':scope > div:first-child picture')) {
    el.classList.add('no-image');
  }
}
