import React from "react";
import renderer from "react-test-renderer";
import Header from "./header";

describe(`Header correctly renders after relaunch`, () => {
  it(`When user is not authorized`, () => {
    const tree = renderer
      .create(<Header/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`When user is authorized`, () => {
    const tree = renderer
      .create(<Header email={`1`}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
