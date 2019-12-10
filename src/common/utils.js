import {getOffersInCity} from "../reducer/data/selectors/selectors";

const STARS_COUNT = 5;
const NEAR_PLACES_COUNT = 3;

const getRatingPercent = (rating) => rating ? rating / STARS_COUNT * 100 : 0;

const getPinsForMap = (offers, activeOfferId) => {
  return offers.reduce((result, place) => {
    result.push({
      coords: [place.location.latitude, place.location.longitude],
      isActive: place.id === activeOfferId,
    });

    return result;
  }, []);
};

const getNearPlaces = (offers, currentOffer) => getOffersInCity(offers, currentOffer.city.name)
  .reduce((result, offer) => {
    if (offer.id !== currentOffer.id && result.length < NEAR_PLACES_COUNT) {
      result.push(offer);
    }

    return result;
  }, []);

export {getRatingPercent, getPinsForMap, getNearPlaces};
