import {createSelector} from "reselect";
import {SortingOption} from "../../common/constants";

const getSort = (data) => data.sort;
const getOffers = (data) => data.offers;

const getSortedOffers = (sort, offers) => {
  switch (sort) {
    case SortingOption.TO_HIGH:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SortingOption.TO_LOW:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SortingOption.TOP_RATED:
      return offers.slice().sort((a, b) => b.rating - a.rating);
  }

  return offers;
};

const getSortedOffersSelector = createSelector(getSort, getOffers, getSortedOffers);

export {getSortedOffers, getSortedOffersSelector};
