import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Offer from "./offer";

Enzyme.configure({adapter: new Adapter()});

const favoritesClickHandler = jest.fn();

const placeCard = shallow(<Offer
  offer={{
    id: 0,
    city: {
      name: ``,
      location: {
        latitude: 0,
        longitude: 0,
      }
    },
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
  reviews={[]}
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
  onFavoritesClick={favoritesClickHandler}
/>);

it(`Click on favorites button calls callback`, () => {
  const favoritesLinks = placeCard.find(`.js-favorites-link`);
  expect(favoritesLinks.length).toBe(1);

  favoritesLinks.simulate(`click`);
  expect(favoritesClickHandler).toHaveBeenCalledTimes(1);
});
