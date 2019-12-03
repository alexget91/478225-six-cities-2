const createMapBlock = () => {
  const div = global.document.createElement(`div`);
  div.setAttribute(`id`, `map`);
  global.document.body.appendChild(div);
};

const getMockOfferTransformed = (id, cityName, isFavorite) => ({
  id,
  city: {
    name: cityName,
    location: {
      latitude: 0,
      longitude: 0,
    },
  },
  isFavorite: isFavorite || false,
  priceByNight: 0,
  title: `Title${id}`,
  type: `apartment`,
  location: {
    latitude: 0,
    longitude: 0,
  },
});

const getMockOfferFields = (id, cityName) => ({
  "id": id,
  "city": {
    name: cityName,
    location: {
      latitude: `city_lat`,
      longitude: `city_lon`,
    }
  },
  "preview_image": `preview_image`,
  "is_favorite": `is_favorite`,
  "is_premium": `is_premium`,
  "max_adults": `max_adults`,
  "price": `price`,
  "title": `Title${id}`,
  "type": `apartment`,
  "host": {
    "is_pro": `is_pro`,
    "avatar_url": `avatar_url`,
    "foo": `bar`,
  },
  "location": {
    latitude: `offer_lat`,
    longitude: `offer_lon`,
  }
});

const getMockOfferFieldsTransformed = (id, cityName) => ({
  id,
  city: {
    name: cityName,
    location: {
      latitude: `city_lat`,
      longitude: `city_lon`,
    }
  },
  priceByNight: `price`,
  title: `Title${id}`,
  type: `apartment`,
  previewImage: `preview_image`,
  isFavorite: `is_favorite`,
  isPremium: `is_premium`,
  maxAdults: `max_adults`,
  host: {
    isPro: `is_pro`,
    avatarUrl: `avatar_url`,
    foo: `bar`,
  },
  location: {
    latitude: `offer_lat`,
    longitude: `offer_lon`,
  }
});

export {
  createMapBlock,
  getMockOfferTransformed,
  getMockOfferFields,
  getMockOfferFieldsTransformed
};
