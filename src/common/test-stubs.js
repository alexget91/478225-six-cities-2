const createMapBlock = () => {
  const div = global.document.createElement(`div`);
  div.setAttribute(`id`, `map`);
  global.document.body.appendChild(div);
};

export {createMapBlock};
