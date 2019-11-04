import React from "react";
import renderer from "react-test-renderer";
import Reviews from "./reviews";

it(`Reviews correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<Reviews reviews={[{
      id: 0,
      user: {
        name: ``,
      },
      rating: 0,
      comment: ``,
      date: `2019-05-08T14:13:56.569Z`
    }]}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
