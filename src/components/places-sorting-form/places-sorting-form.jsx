import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {sortingOptions} from "../../common/constants";

const OPTIONS = {
  [sortingOptions.popular]: `Popular`,
  [sortingOptions.toHigh]: `Price: low to high`,
  [sortingOptions.toLow]: `Price: high to low`,
  [sortingOptions.topRated]: `Top rated first`,
};

class PlacesSortingForm extends PureComponent {
  constructor(props) {
    super(props);

    this._sortItemClickHandler = this._sortItemClickHandler.bind(this);
  }

  render() {
    const {isVisible, onVisibilityChange} = this.props;

    const sortKeys = Object.keys(OPTIONS);
    const sort = this.props.sort || sortKeys[0];

    return <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>&nbsp;
      <span className="places__sorting-type" tabIndex="0" onClick={onVisibilityChange}>
        {OPTIONS[sort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isVisible ? ` places__options--opened` : ``}`}>
        {sortKeys.map((key, i) => <li key={i} tabIndex="0" data-sort={key}
          className={`places__option${key === sort ? ` places__option--active` : ``} js-sorting-option`}
          onClick={this._sortItemClickHandler}>
          {OPTIONS[key]}
        </li>)}
      </ul>
    </form>;
  }

  _sortItemClickHandler(evt) {
    this.props.onSortChange(evt.target.dataset.sort);
  }
}

PlacesSortingForm.propTypes = {
  sort: PropTypes.oneOf([
    sortingOptions.popular,
    sortingOptions.toHigh,
    sortingOptions.toLow,
    sortingOptions.topRated,
  ]),
  isVisible: PropTypes.bool,
  onSortChange: PropTypes.func.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
};

export default PlacesSortingForm;
