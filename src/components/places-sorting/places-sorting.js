import {createSelector} from "reselect";
import {sortingOptions} from "../../common/constants";

const getSort = (data) => data.sort;
const getOffers = (data) => data.offers;

const getSortedOffers = (sort, offers) => {
  switch (sort) {
    case sortingOptions.toHigh:
      return offers.slice().sort((a, b) => a.priceByNight - b.priceByNight);
    case sortingOptions.toLow:
      return offers.slice().sort((a, b) => b.priceByNight - a.priceByNight);
    case sortingOptions.topRated:
      return offers.slice().sort((a, b) => b.rating - a.rating);
  }

  return offers;
};

const getSortedOffersSelector = createSelector(getSort, getOffers, getSortedOffers);

export {getSortedOffers, getSortedOffersSelector};
