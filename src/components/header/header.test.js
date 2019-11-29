import React from "react";
import renderer from "react-test-renderer";
import Header from "./header";
import {MemoryRouter} from "react-router-dom";

describe(`Header correctly renders after relaunch`, () => {
  it(`When user is not authorized`, () => {
    const tree = renderer
      .create(<MemoryRouter>
        <Header/>
      </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`When user is authorized`, () => {
    const tree = renderer
      .create(<MemoryRouter>
        <Header email={`1`}/>
      </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
