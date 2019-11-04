import renderer from "react-test-renderer";
import React from "react";
import Offer from "./offer";
import {createMapBlock} from "../../common/test-stubs";

it(`Offer page correctly renders after relaunch`, () => {
  createMapBlock();

  const tree = renderer
    .create(<Offer
      offer={{
        id: 0,
        previewImage: ``,
        images: [``],
        title: ``,
        isPremium: true,
        isFavorite: false,
        rating: 1,
        type: `apartment`,
        bedrooms: 1,
        maxAdults: 1,
        priceByNight: 1,
        goods: [``],
        host: {
          isPro: true,
          name: ``,
          avatarUrl: ``
        },
        description: ` `,
      }}
      reviews={[{
        id: 0,
        user: {
          name: ``,
        },
        rating: 0,
        comment: ``,
        date: `2019-05-08T14:13:56.569Z`
      }]}
      neighbourhood={[{
        id: 0,
        priceByNight: 0,
        title: ``,
        type: `apartment`,
        location: {
          latitude: 0,
          longitude: 0,
        }
      }]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
