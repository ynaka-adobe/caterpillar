export default function init(el) {
  const cols = [...el.firstElementChild.children];
  el.classList.add(`columns-checkerboard-${cols.length}-cols`);

  [...el.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-checkerboard-img-col');
        }
      }
    });
  });
}
