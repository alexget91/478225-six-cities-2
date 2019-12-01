const initialState = {
  offers: {},
  cities: [],
};

const ActionTypes = {
  SET_OFFERS: `SET_OFFERS`,
  SET_CITIES: `SET_CITIES`,
};

const transformOfferData = (data) => {
  const newData = Object.assign({}, data, {
    previewImage: data.preview_image,
    isFavorite: data.is_favorite,
    isPremium: data.is_premium,
    maxAdults: data.max_adults,
    priceByNight: data.price,
    host: Object.assign({}, data.host, {
      isPro: data.host.is_pro,
      avatarUrl: data.host.avatar_url,
    })
  });

  delete newData.preview_image;
  delete newData.is_favorite;
  delete newData.is_premium;
  delete newData.max_adults;
  delete newData.price;
  delete newData.host.is_pro;
  delete newData.host.avatar_url;

  return newData;
};

const transformOffersList = (data) => data.reduce((result, offer) => {
  if (!result.offersByCities[offer.city.name]) {
    result.offersByCities[offer.city.name] = [];
  }

  const transformedOffer = transformOfferData(offer);
  result.allOffers[offer.id] = transformedOffer;
  result.offersByCities[offer.city.name].push(transformedOffer);

  return result;
}, {
  allOffers: {},
  offersByCities: {},
});

const ActionCreator = {
  setOffers: (offers) => ({
    type: ActionTypes.SET_OFFERS,
    payload: transformOffersList(offers),
  }),

  setCities: () => ({
    type: ActionTypes.SET_CITIES,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload
      });
    case ActionTypes.SET_CITIES:
      return Object.assign({}, state, {
        cities: Object.keys(state.offers.offersByCities)
      });
  }

  return state;
};

export {reducer, ActionCreator, ActionTypes, transformOfferData, transformOffersList};
