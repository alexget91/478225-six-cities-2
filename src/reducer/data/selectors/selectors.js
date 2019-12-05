import {createSelector} from "reselect";
import NameSpace from "../../name-space";
import {getCity} from "../../user/selectors/selectors";

const NAME_SPACE = NameSpace.DATA;

const getOffers = (state) => state[NAME_SPACE].offers;
const getReviews = (state) => state[NAME_SPACE].reviews;

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

const getCitiesSelector = createSelector(getOffers, getCities);
const getOffersInCitySelector = createSelector(getOffers, getCity, getOffersInCity);

export {
  getOffers,
  getReviews,
  getCities,
  getOffersInCity,
  getOfferByID,
  getCitiesSelector,
  getOffersInCitySelector
};
