import {getSortedOffers} from "./places-sorting";
import {SortingOption} from "../../common/constants";

describe(`Offers are sorted correctly`, () => {
  const mockOffers = [
    {
      id: 1,
      rating: 4.6,
      price: 120,
    },
    {
      id: 2,
      price: 80,
      rating: 4,
    },
    {
      id: 3,
      price: 132,
      rating: 4,
    },
    {
      id: 4,
      price: 180,
      rating: 5,
    },
  ];

  it(`Popular`, () => {
    expect(getSortedOffers(SortingOption.POPULAR, mockOffers)).toEqual([
      {
        id: 1,
        rating: 4.6,
        price: 120,
      },
      {
        id: 2,
        price: 80,
        rating: 4,
      },
      {
        id: 3,
        price: 132,
        rating: 4,
      },
      {
        id: 4,
        price: 180,
        rating: 5,
      },
    ]);
  });

  it(`Price: low to high`, () => {
    expect(getSortedOffers(SortingOption.TO_HIGH, mockOffers)).toEqual([
      {
        id: 2,
        price: 80,
        rating: 4,
      },
      {
        id: 1,
        rating: 4.6,
        price: 120,
      },
      {
        id: 3,
        price: 132,
        rating: 4,
      },
      {
        id: 4,
        price: 180,
        rating: 5,
      },
    ]);
  });

  it(`Price: high to low`, () => {
    expect(getSortedOffers(SortingOption.TO_LOW, mockOffers)).toEqual([
      {
        id: 4,
        price: 180,
        rating: 5,
      },
      {
        id: 3,
        price: 132,
        rating: 4,
      },
      {
        id: 1,
        rating: 4.6,
        price: 120,
      },
      {
        id: 2,
        price: 80,
        rating: 4,
      },
    ]);
  });

  it(`Top rated first`, () => {
    expect(getSortedOffers(SortingOption.TOP_RATED, mockOffers)).toEqual([
      {
        id: 4,
        price: 180,
        rating: 5,
      },
      {
        id: 1,
        rating: 4.6,
        price: 120,
      },
      {
        id: 2,
        price: 80,
        rating: 4,
      },
      {
        id: 3,
        price: 132,
        rating: 4,
      },
    ]);
  });
});
