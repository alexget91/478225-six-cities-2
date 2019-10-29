import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card";

it(`Place card correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<PlaceCard
      key={0}
      id={0}
      isPremium={true}
      isFavorite={false}
      imageSrc={``}
      priceByNight={0}
      rating={0}
      name={``}
      type={`apartment`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});