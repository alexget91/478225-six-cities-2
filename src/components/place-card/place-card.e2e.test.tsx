import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";
import Path from "../../common/path";
import {PlacesListView, PlaceType} from "../../common/constants";

Enzyme.configure({adapter: new Adapter()});

const handleMouseHover = jest.fn();
const handleFavoritesClick = jest.fn();
const id = 0;

const placeCard = Enzyme.shallow(<PlaceCard
  offer={{
    id,
    is_premium: false,
    is_favorite: false,
    preview_image: ``,
    price: 0,
    rating: 0,
    title: ``,
    type: PlaceType.APARTMENT,
  }}
  cardType={PlacesListView.LIST}
  onMouseHover={handleMouseHover}
  onFavoritesClick={handleFavoritesClick}
/>);

it(`Links to the offer page has correct URL`, () => {
  const detailLinks = placeCard.find(`.js-detail-link`);
  expect(detailLinks.length).toBe(2);
  detailLinks.forEach((link) => {
    expect(link.props().to).toBe(`${Path.OFFER}/${id}`);
  });
});

describe(`Mouse hover handler gets the correct information`, () => {
  it(`On mouseenter`, () => {
    placeCard.simulate(`mouseenter`);
    expect(handleMouseHover).toHaveBeenCalledTimes(1);
    expect(handleMouseHover).toHaveBeenCalledWith({
      id,
      is_premium: false,
      is_favorite: false,
      preview_image: ``,
      price: 0,
      rating: 0,
      title: ``,
      type: PlaceType.APARTMENT,
    });
  });

  it(`On mouseleave`, () => {
    placeCard.simulate(`mouseleave`);
    expect(handleMouseHover).toHaveBeenCalledTimes(2);
    expect(handleMouseHover).toHaveBeenCalledWith();
  });
});

it(`Click on favorites button calls callback`, () => {
  const favoritesLinks = placeCard.find(`.js-favorites-link`);
  expect(favoritesLinks.length).toBe(1);

  favoritesLinks.simulate(`click`);
  expect(handleFavoritesClick).toHaveBeenCalledTimes(1);
});
