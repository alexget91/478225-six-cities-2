import * as renderer from "react-test-renderer";
import * as React from "react";
import Offer from "./offer";
import {createMapBlock} from "../../common/test-stubs";
import {MemoryRouter} from "react-router-dom";
import {PlaceType} from "../../common/constants";

it(`Offer page correctly renders after relaunch`, () => {
  createMapBlock();

  const tree = renderer
    .create(<MemoryRouter><Offer
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
      reviews={[{
        id: 0,
        user: {
          id: 0,
          name: ``,
        },
        rating: 0,
        comment: ``,
        date: `2019-05-08T14:13:56.569Z`
      }]}
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
      onCommentSubmit={jest.fn()}
      onCommentSubmitSuccess={jest.fn()}
    /></MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
