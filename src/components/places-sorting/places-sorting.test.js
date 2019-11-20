import {getSortedOffers} from "./places-sorting";
import {sortingOptions} from "../../common/constants";

describe(`Offers are sorted correctly`, () => {
  const mockOffers = [
    {
      id: 1,
      rating: 4.6,
      priceByNight: 120,
    },
    {
      id: 2,
      priceByNight: 80,
      rating: 4,
    },
    {
      id: 3,
      priceByNight: 132,
      rating: 4,
    },
    {
      id: 4,
      priceByNight: 180,
      rating: 5,
    },
  ];

  it(`Popular`, () => {
    expect(getSortedOffers(sortingOptions.popular, mockOffers)).toEqual([
      {
        id: 1,
        rating: 4.6,
        priceByNight: 120,
      },
      {
        id: 2,
        priceByNight: 80,
        rating: 4,
      },
      {
        id: 3,
        priceByNight: 132,
        rating: 4,
      },
      {
        id: 4,
        priceByNight: 180,
        rating: 5,
      },
    ]);
  });

  it(`Price: low to high`, () => {
    expect(getSortedOffers(sortingOptions.toHigh, mockOffers)).toEqual([
      {
        id: 2,
        priceByNight: 80,
        rating: 4,
      },
      {
        id: 1,
        rating: 4.6,
        priceByNight: 120,
      },
      {
        id: 3,
        priceByNight: 132,
        rating: 4,
      },
      {
        id: 4,
        priceByNight: 180,
        rating: 5,
      },
    ]);
  });

  it(`Price: high to low`, () => {
    expect(getSortedOffers(sortingOptions.toLow, mockOffers)).toEqual([
      {
        id: 4,
        priceByNight: 180,
        rating: 5,
      },
      {
        id: 3,
        priceByNight: 132,
        rating: 4,
      },
      {
        id: 1,
        rating: 4.6,
        priceByNight: 120,
      },
      {
        id: 2,
        priceByNight: 80,
        rating: 4,
      },
    ]);
  });

  it(`Top rated first`, () => {
    expect(getSortedOffers(sortingOptions.topRated, mockOffers)).toEqual([
      {
        id: 4,
        priceByNight: 180,
        rating: 5,
      },
      {
        id: 1,
        rating: 4.6,
        priceByNight: 120,
      },
      {
        id: 2,
        priceByNight: 80,
        rating: 4,
      },
      {
        id: 3,
        priceByNight: 132,
        rating: 4,
      },
    ]);
  });
});
