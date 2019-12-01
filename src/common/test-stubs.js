const createMapBlock = () => {
  const div = global.document.createElement(`div`);
  div.setAttribute(`id`, `map`);
  global.document.body.appendChild(div);
};

const getMockOffer = (id, cityName) => {
  return {
    id,
    city: {
      name: cityName,
      location: {
        latitude: 0,
        longitude: 0,
      }
    },
    priceByNight: 0,
    title: `Title${id}`,
    type: `apartment`,
    location: {
      latitude: 0,
      longitude: 0,
    }
  };
};

export {createMapBlock, getMockOffer};
