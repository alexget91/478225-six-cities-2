import {getSortedOffers} from "./places-sorting";
import {PlaceType, SortingOption} from "../../common/constants";
import {PlaceList} from "../../common/types";

describe(`Offers are sorted correctly`, () => {
  const mockOffers: PlaceList = [
    {
      id: 1,
      rating: 4.6,
      price: 120,
      title: ``,
      type: PlaceType.APARTMENT,
    },
    {
      id: 2,
      price: 80,
      rating: 4,
      title: ``,
      type: PlaceType.APARTMENT,
    },
    {
      id: 3,
      price: 132,
      rating: 4,
      title: ``,
      type: PlaceType.APARTMENT,
    },
    {
      id: 4,
      price: 180,
      rating: 5,
      title: ``,
      type: PlaceType.APARTMENT,
    },
  ];

  it(`Popular`, () => {
    expect(getSortedOffers(SortingOption.POPULAR, mockOffers)).toEqual([
      {
        id: 1,
        rating: 4.6,
        price: 120,
        title: ``,
        type: PlaceType.APARTMENT,
      },
      {
        id: 2,
        price: 80,
        rating: 4,
        title: ``,
        type: PlaceType.APARTMENT,
      },
      {
        id: 3,
        price: 132,
        rating: 4,
        title: ``,
        type: PlaceType.APARTMENT,
      },
      {
        id: 4,
        price: 180,
        rating: 5,
        title: ``,
        type: PlaceType.APARTMENT,
      },
    ]);
  });

  it(`Price: low to high`, () => {
    expect(getSortedOffers(SortingOption.TO_HIGH, mockOffers)).toEqual([
      {
        id: 2,
        price: 80,
        rating: 4,
        title: ``,
        type: PlaceType.APARTMENT,
      },
      {
        id: 1,
        rating: 4.6,
        price: 120,
        title: ``,
        type: PlaceType.APARTMENT,
      },
      {
        id: 3,
        price: 132,
        rating: 4,
        title: ``,
        type: PlaceType.APARTMENT,
      },
      {
        id: 4,
        price: 180,
        rating: 5,
        title: ``,
        type: PlaceType.APARTMENT,
      },
    ]);
  });

  it(`Price: high to low`, () => {
    expect(getSortedOffers(SortingOption.TO_LOW, mockOffers)).toEqual([
      {
        id: 4,
        price: 180,
        rating: 5,
        title: ``,
        type: PlaceType.APARTMENT,
      },
      {
        id: 3,
        price: 132,
        rating: 4,
        title: ``,
        type: PlaceType.APARTMENT,
      },
      {
        id: 1,
        rating: 4.6,
        price: 120,
        title: ``,
        type: PlaceType.APARTMENT,
      },
      {
        id: 2,
        price: 80,
        rating: 4,
        title: ``,
        type: PlaceType.APARTMENT,
      },
    ]);
  });

  it(`Top rated first`, () => {
    expect(getSortedOffers(SortingOption.TOP_RATED, mockOffers)).toEqual([
      {
        id: 4,
        price: 180,
        rating: 5,
        title: ``,
        type: PlaceType.APARTMENT,
      },
      {
        id: 1,
        rating: 4.6,
        price: 120,
        title: ``,
        type: PlaceType.APARTMENT,
      },
      {
        id: 2,
        price: 80,
        rating: 4,
        title: ``,
        type: PlaceType.APARTMENT,
      },
      {
        id: 3,
        price: 132,
        rating: 4,
        title: ``,
        type: PlaceType.APARTMENT,
      },
    ]);
  });
});
