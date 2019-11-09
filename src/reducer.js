import offers from "./mocks/offers";

const getOffersInCity = (city, allOffers) => allOffers.filter((offer) => offer.city.name === city);

const initialState = {
  city: offers[0].city.name,
  offers: getOffersInCity(offers[0].city.name, offers),
};

const ActionCreator = {
  setCity: (city) => ({
    type: `SET_CITY`,
    payload: city
  }),

  setOffers: (city, allOffers) => ({
    type: `SET_OFFERS`,
    payload: getOffersInCity(city, allOffers)
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SET_CITY`:
      return Object.assign({}, state, {
        city: action.payload
      });
    case `SET_OFFERS`:
      return Object.assign({}, state, {
        offers: action.payload
      });
  }

  return state;
};

export {ActionCreator, reducer, getOffersInCity};
