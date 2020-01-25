import {getOffersInCity} from "../reducer/data/selectors/selectors";
import {Pin, PlaceCard, PlaceList} from "./types";

const STARS_COUNT: number = 5;
const NEAR_PLACES_COUNT: number = 3;

const getRatingPercent = (rating: number): number => rating ? rating / STARS_COUNT * 100 : 0;

const getPinsForMap = (offers: PlaceList, activeOfferId: number) => {
  return offers.reduce((result: Array<Pin>, place: PlaceCard): Array<Pin> => {
    result.push({
      coords: [place.location.latitude, place.location.longitude],
      isActive: place.id === activeOfferId,
    });

    return result;
  }, []);
};

const getNearPlaces = (offers: PlaceList, currentOffer: PlaceCard): PlaceList =>
  getOffersInCity(offers, currentOffer.city.name)
    .reduce((result: PlaceList, offer: PlaceCard) => {
      if (offer.id !== currentOffer.id && result.length < NEAR_PLACES_COUNT) {
        result.push(offer);
      }

      return result;
    }, []);

export {getRatingPercent, getPinsForMap, getNearPlaces};
