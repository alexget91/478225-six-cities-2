import * as React from "react";
import * as renderer from "react-test-renderer";
import Reviews from "./reviews";

describe(`Reviews correctly renders after relaunch`, () => {
  it(`Empty`, () => {
    const tree = renderer
      .create(<Reviews
        reviews={[]}
        isAuthorizationRequired={true}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With data`, () => {
    const tree = renderer
      .create(<Reviews
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
        isAuthorizationRequired={true}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`For authorized user`, () => {
    const tree = renderer
      .create(<Reviews
        offerID={1}
        reviews={[]}
        onCommentSubmit={jest.fn()}
        onCommentSubmitSuccess={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
