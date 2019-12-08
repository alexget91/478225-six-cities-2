import {createSelector} from "reselect";
import NameSpace from "../../name-space";
import {getCity} from "../../user/selectors/selectors";

const NAME_SPACE = NameSpace.DATA;

const getOffers = (state) => state[NAME_SPACE].offers;
const getReviews = (state) => state[NAME_SPACE].reviews;
const getFavorites = (state) => state[NAME_SPACE].favorites;

const getCities = (offers) => Array.from(
    offers.reduce(
        (result, offer) => result.add(offer.city.name),
        new Set()
    )
);

const getOffersInCity = (offers, city) => offers.filter(
    (offer) => offer.city.name === city
);

const getOfferByID = (offers, id) => offers.find(
    (offer) => offer.id === id
);

const getOffersByCities = (offers) => offers.reduce((result, offer) => {
  if (!result[offer.city.name]) {
    result[offer.city.name] = [];
  }

  result[offer.city.name].push(offer);

  return result;
}, {});

const getCitiesSelector = createSelector(getOffers, getCities);
const getOffersInCitySelector = createSelector(getOffers, getCity, getOffersInCity);

export {
  getOffers,
  getReviews,
  getFavorites,
  getCities,
  getOffersInCity,
  getOfferByID,
  getOffersByCities,
  getCitiesSelector,
  getOffersInCitySelector
};
