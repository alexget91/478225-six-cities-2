import {createSelector} from "reselect";
import NameSpace from "../../name-space";
import {getCity} from "../../user/selectors/selectors";
import {GlobalState} from "../../reducer";
import {State} from "../reducer/reducer";
import {PlaceCard, PlaceList, ReviewsList} from "../../../common/types";

interface OffersByCities {
  [city: string]: PlaceList
}

const NAME_SPACE: NameSpace = NameSpace.DATA;

const getOffers = (state: GlobalState): PlaceList => (state[NAME_SPACE] as State).offers;
const getReviews = (state: GlobalState): ReviewsList => (state[NAME_SPACE] as State).reviews;
const getFavorites = (state: GlobalState): PlaceList => (state[NAME_SPACE] as State).favorites;

const getCities = (offers: PlaceList): Array<string> => Array.from(
    offers.reduce(
        (result: Set<string>, offer: PlaceCard): Set<string> => result.add(offer.city.name),
        new Set()
    )
);

const getOffersInCity = (offers: PlaceList, city: string): PlaceList => offers.filter(
    (offer: PlaceCard): boolean => offer.city.name === city
);

const getOfferByID = (offers: PlaceList, id: number): PlaceCard => offers.find(
    (offer: PlaceCard): boolean => offer.id === id
);

const getOffersByCities = (offers: PlaceList): OffersByCities =>
  offers.reduce((result: OffersByCities, offer: PlaceCard) => {
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
