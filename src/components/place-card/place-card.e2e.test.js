import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";
import Path from "../../common/path";

Enzyme.configure({adapter: new Adapter()});

const mouseHoverHandler = jest.fn();
const id = 0;

const placeCard = shallow(<PlaceCard
  key={0}
  id={id}
  isPremium={false}
  isFavorite={false}
  previewImage={``}
  priceByNight={0}
  rating={0}
  title={``}
  type={`apartment`}
  cardType={`list`}
  onMouseHover={mouseHoverHandler}
/>);

describe(`Mouse hover handler gets the correct information`, () => {
  it(`On mouseenter`, () => {
    placeCard.simulate(`mouseenter`);
    expect(mouseHoverHandler).toHaveBeenCalledTimes(1);
    expect(mouseHoverHandler).toHaveBeenCalledWith({
      id,
      isPremium: false,
      isFavorite: false,
      previewImage: ``,
      priceByNight: 0,
      rating: 0,
      title: ``,
      type: `apartment`,
    });
  });

  it(`On mouseleave`, () => {
    placeCard.simulate(`mouseleave`);
    expect(mouseHoverHandler).toHaveBeenCalledTimes(2);
    expect(mouseHoverHandler).toHaveBeenCalledWith();
  });
});

it(`Links to the offer page has correct URL`, () => {
  const detailLinks = placeCard.find(`.js-detail-link`);
  expect(detailLinks.length).toBe(2);
  detailLinks.forEach((link) => {
    expect(link.props().to).toBe(`${Path.OFFER}/${id}`);
  });
});
