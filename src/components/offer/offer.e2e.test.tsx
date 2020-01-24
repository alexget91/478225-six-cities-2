import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Offer from "./offer";
import {PlaceType} from "../../common/constants";

Enzyme.configure({adapter: new Adapter()});

const handleFavoritesClick = jest.fn();

const placeCard = Enzyme.shallow(<Offer
  offer={{
    id: 0,
    city: {
      name: ``,
      location: {
        latitude: 0,
        longitude: 0,
      }
    },
    preview_image: ``,
    images: [``],
    title: ``,
    is_premium: true,
    is_favorite: false,
    rating: 1,
    type: PlaceType.APARTMENT,
    bedrooms: 1,
    max_adults: 1,
    price: 1,
    goods: [``],
    host: {
      id: 0,
      is_pro: true,
      name: ``,
      avatar_url: ``
    },
    description: ` `,
    location: {
      latitude: 0,
      longitude: 0,
    },
  }}
  reviews={[]}
  neighbourhood={[{
    id: 0,
    price: 0,
    title: ``,
    type: PlaceType.APARTMENT,
    location: {
      latitude: 0,
      longitude: 0,
    }
  }]}
  onFavoritesClick={handleFavoritesClick}
/>);

it(`Click on favorites button calls callback`, () => {
  const favoritesLinks = placeCard.find(`.js-favorites-link`);
  expect(favoritesLinks.length).toBe(1);

  favoritesLinks.simulate(`click`);
  expect(handleFavoritesClick).toHaveBeenCalledTimes(1);
});
