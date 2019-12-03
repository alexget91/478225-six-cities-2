const initialState = {
  offers: [],
  isOffersLoaded: false,
};

const ActionTypes = {
  SET_OFFERS: `SET_OFFERS`,
  SET_OFFERS_LOADED: `SET_OFFERS_LOADED`,
  UPDATE_OFFER: `UPDATE_OFFER`,
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

const transformOffersList = (offers) => offers.map((offer) => transformOfferData(offer));

const updateOffer = (offers, newOffer) => {
  const index = offers.findIndex((offer) => offer.id === newOffer.id);
  offers.splice(index, 1, transformOfferData(newOffer));

  return offers.slice();
};

const ActionCreator = {
  setOffers: (offers) => ({
    type: ActionTypes.SET_OFFERS,
    payload: transformOffersList(offers),
  }),

  setOffersLoaded: (status) => ({
    type: ActionTypes.SET_OFFERS_LOADED,
    payload: status,
  }),

  updateOffer: (offer) => ({
    type: ActionTypes.UPDATE_OFFER,
    payload: offer,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload
      });
    case ActionTypes.SET_OFFERS_LOADED:
      return Object.assign({}, state, {
        isOffersLoaded: action.payload
      });
    case ActionTypes.UPDATE_OFFER:
      return Object.assign({}, state, {
        offers: updateOffer(state.offers, action.payload)
      });
  }

  return state;
};

export {reducer, ActionCreator, ActionTypes, transformOfferData, transformOffersList, updateOffer};
