const initialState = {
  offers: [],
  reviews: [],
  favorites: [],
};

const ActionType = {
  SET_OFFERS: `SET_OFFERS`,
  SET_REVIEWS: `SET_REVIEWS`,
  SET_FAVORITES: `SET_FAVORITES`,
  UPDATE_OFFER: `UPDATE_OFFER`,
};

const transformUserData = (data) => {
  const newData = Object.assign({}, data, {
    isPro: data.is_pro,
    avatarUrl: data.avatar_url,
  });

  delete newData.is_pro;
  delete newData.avatar_url;

  return newData;
};

const transformOfferData = (data) => {
  const newData = Object.assign({}, data, {
    previewImage: data.preview_image,
    isFavorite: data.is_favorite,
    isPremium: data.is_premium,
    maxAdults: data.max_adults,
    priceByNight: data.price,
    host: transformUserData(data.host),
  });

  delete newData.preview_image;
  delete newData.is_favorite;
  delete newData.is_premium;
  delete newData.max_adults;
  delete newData.price;

  return newData;
};

const transformOffersList = (offers) => offers.map((offer) => transformOfferData(offer));

const transformReviewsList = (reviews) => reviews ? reviews
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10)
    .map((comment) => Object.assign({}, comment, {user: transformUserData(comment.user)}))
  : [];

const updateOffer = (offers, newOffer) => {
  const index = offers.findIndex((offer) => offer.id === newOffer.id);
  offers.splice(index, 1, transformOfferData(newOffer));

  return offers.slice();
};

const ActionCreator = {
  setOffers: (offers) => ({
    type: ActionType.SET_OFFERS,
    payload: transformOffersList(offers),
  }),

  setReviews: (reviews) => ({
    type: ActionType.SET_REVIEWS,
    payload: transformReviewsList(reviews),
  }),

  setFavorites: (favorites) => ({
    type: ActionType.SET_FAVORITES,
    payload: transformOffersList(favorites),
  }),

  updateOffer: (offer) => ({
    type: ActionType.UPDATE_OFFER,
    payload: offer,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload
      });
    case ActionType.SET_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload
      });
    case ActionType.SET_FAVORITES:
      return Object.assign({}, state, {
        favorites: action.payload
      });
    case ActionType.UPDATE_OFFER:
      return Object.assign({}, state, {
        offers: updateOffer(state.offers, action.payload)
      });
  }

  return state;
};

export {
  transformUserData,
  transformOfferData,
  transformOffersList,
  transformReviewsList,
  ActionType,
  ActionCreator,
  updateOffer,
  reducer,
};
