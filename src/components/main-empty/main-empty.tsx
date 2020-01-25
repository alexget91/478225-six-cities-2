import * as React from "react";

interface Props {
  cityName: string,
}

const MainEmpty = (props: Props): React.ReactElement => {
  const {cityName} = props;

  return <React.Fragment>
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">We could not find any property availbale at the moment in {cityName}</p>
      </div>
    </section>
    <div className="cities__right-section"></div>
  </React.Fragment>;
};

export default MainEmpty;
