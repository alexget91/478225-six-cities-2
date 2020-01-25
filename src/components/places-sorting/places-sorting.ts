import {createSelector} from "reselect";
import {SortingOption} from "../../common/constants";
import {PlaceCard, PlaceList} from "../../common/types";

type Data = {
  sort: SortingOption,
  offers: PlaceList,
};

const getSort = (data: Data): SortingOption => data.sort;
const getOffers = (data: Data): PlaceList => data.offers;

const getSortedOffers = (sort: SortingOption, offers: PlaceList): PlaceList => {
  switch (sort) {
    case SortingOption.TO_HIGH:
      return offers.slice().sort((a: PlaceCard, b: PlaceCard): number => a.price - b.price);
    case SortingOption.TO_LOW:
      return offers.slice().sort((a: PlaceCard, b: PlaceCard): number => b.price - a.price);
    case SortingOption.TOP_RATED:
      return offers.slice().sort((a: PlaceCard, b: PlaceCard): number => b.rating - a.rating);
  }

  return offers;
};

const getSortedOffersSelector = createSelector(getSort, getOffers, getSortedOffers);

export {getSortedOffers, getSortedOffersSelector};
