const initialState = {
  offers: [],
  reviews: [],
};

const ActionTypes = {
  SET_OFFERS: `SET_OFFERS`,
  SET_REVIEWS: `SET_REVIEWS`,
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
    type: ActionTypes.SET_OFFERS,
    payload: transformOffersList(offers),
  }),

  setReviews: (reviews) => ({
    type: ActionTypes.SET_REVIEWS,
    payload: transformReviewsList(reviews),
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
    case ActionTypes.SET_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload
      });
    case ActionTypes.UPDATE_OFFER:
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
  ActionTypes,
  ActionCreator,
  updateOffer,
  reducer,
};
