import renderer from "react-test-renderer";
import React from "react";
import Offer from "./offer";

it(`Offer page correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<Offer offer={{
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
    }}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
