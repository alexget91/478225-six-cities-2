import * as React from "react";
import CitiesList from "../cities-list/cities-list";
import MainEmpty from "../main-empty/main-empty";
import {compose} from "recompose";
import MainContent from "../main-content/main-content";
import withActiveItem, {transformPropNames} from "../../hocs/with-active-item/with-active-item";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";
import {SortingOption} from "../../common/constants";
import {PlaceList} from "../../common/types";

interface Props {
  offers: PlaceList,
  cities: Array<string>,
  activeCity?: string,
  onCityClick: () => void,
  onFavoritesClick?: () => void,
}

const DEFAULT_SORT = SortingOption.POPULAR;

const getComponentWithOffer = (Component) => withActiveItem(withTransformProps(
  (props) => transformPropNames(`activeOffer`, `onActiveOfferChange`, props)
)(Component));

const getComponentWithSort = (Component) => withActiveItem(withTransformProps(
  (props) => transformPropNames(`sort`, `onSortChange`, props)
)(Component), DEFAULT_SORT);

const MainContentWrapped = compose(getComponentWithOffer, getComponentWithSort)(MainContent);

const Main = (props: Props) => {
  const {offers, cities, activeCity, onCityClick, onFavoritesClick} = props;

  return <React.Fragment>
    <h1 className="visually-hidden">Cities</h1>
    <CitiesList cities={cities} activeCity={activeCity} onCityClick={onCityClick}/>
    <div className="cities">
      <div className={`cities__places-container${!offers.length ? ` cities__places-container--empty` : ``} container`}>
        {!offers.length ? <MainEmpty cityName={activeCity}/> : <MainContentWrapped
          activeCity={offers[0].city}
          offers={offers}
          onFavoritesClick={onFavoritesClick}
        />}
      </div>
    </div>
  </React.Fragment>;
};

export default Main;
