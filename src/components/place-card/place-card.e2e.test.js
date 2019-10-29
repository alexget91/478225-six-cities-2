import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";

Enzyme.configure({adapter: new Adapter()});

const clickHandler = jest.fn();
const mouseHoverHandler = jest.fn();

const placeCard = shallow(<PlaceCard
  key={0}
  id={0}
  isPremium={false}
  isFavorite={false}
  imageSrc={``}
  priceByNight={0}
  rating={0}
  name={``}
  type={`apartment`}
  onPlaceNameClick={clickHandler}
  onMouseHover={mouseHoverHandler}
/>);

describe(`Mouse hover handler gets the correct information`, () => {
  it(`On mouseenter`, () => {
    placeCard.simulate(`mouseenter`);
    expect(mouseHoverHandler).toHaveBeenCalledTimes(1);
    expect(mouseHoverHandler).toHaveBeenCalledWith({
      id: 0,
      isPremium: false,
      isFavorite: false,
      imageSrc: ``,
      priceByNight: 0,
      rating: 0,
      name: ``,
      type: `apartment`,
    });
  });

  it(`On mouseleave`, () => {
    placeCard.simulate(`mouseleave`);
    expect(mouseHoverHandler).toHaveBeenCalledTimes(2);
    expect(mouseHoverHandler).toHaveBeenCalledWith();
  });
});

it(`Clicking on a place name calls callback`, () => {
  const placeName = placeCard.find(`.js-place-name`);
  expect(placeName.length).toBe(1);

  placeName.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
