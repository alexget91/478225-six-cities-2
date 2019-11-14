import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";
import {createMapBlock} from "../../common/test-stubs";

it(`Main page correctly renders after relaunch`, () => {
  createMapBlock();

  const tree = renderer
    .create(<Main
      cities={[`1`, `2`]}
      activeCity={`1`}
      offers={[{
        id: 0,
        city: {
          name: ``,
          location: {
            latitude: 0,
            longitude: 0,
          }
        },
        priceByNight: 0,
        title: ``,
        type: `apartment`,
        location: {
          latitude: 0,
          longitude: 0,
        }
      }]}
      sort={`popular`}
      onCityClick={jest.fn()}
      onSortChange={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

describe(`Offers is sorted correctly`, () => {
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
    expect(Main.getSortedOffers(`popular`, mockOffers)).toEqual([
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
    expect(Main.getSortedOffers(`to-high`, mockOffers)).toEqual([
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
    expect(Main.getSortedOffers(`to-low`, mockOffers)).toEqual([
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
    expect(Main.getSortedOffers(`top-rated`, mockOffers)).toEqual([
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
