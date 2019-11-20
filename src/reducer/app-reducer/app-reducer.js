const AppActionTypes = {
  SET_OFFERS: `SET_OFFERS`,
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

  delete newData.city;
  delete newData.preview_image;
  delete newData.is_favorite;
  delete newData.is_premium;
  delete newData.max_adults;
  delete newData.price;
  delete newData.host.is_pro;
  delete newData.host.avatar_url;

  return newData;
};

const getOffersByCities = (data) => data.reduce((result, offer) => {
  if (!result[offer.city.name]) {
    result[offer.city.name] = {
      city: offer.city,
      offers: [],
    };
  }
  result[offer.city.name][`offers`].push(transformOfferData(offer));

  return result;
}, {});

const initialState = {
  offers: {},
};

const AppActionCreator = {
  setOffers: (allOffers) => ({
    type: AppActionTypes.SET_OFFERS,
    payload: getOffersByCities(allOffers),
  }),
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case AppActionTypes.SET_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload
      });
  }

  return state;
};

export {appReducer, AppActionCreator, AppActionTypes, transformOfferData, getOffersByCities};
