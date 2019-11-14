import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const OPTIONS = {
  "popular": `Popular`,
  "to-high": `Price: low to high`,
  "to-low": `Price: high to low`,
  "top-rated": `Top rated first`,
};

class PlacesSorting extends PureComponent {
  constructor(props) {
    super(props);

    this._sortItemClickHandler = this._sortItemClickHandler.bind(this);
  }

  render() {
    const {sort, isVisible, onVisibilityChange} = this.props;

    return <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>&nbsp;
      <span className="places__sorting-type" tabIndex="0" onClick={onVisibilityChange}>
        {OPTIONS[sort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isVisible ? ` places__options--opened` : ``}`}>
        {Object.keys(OPTIONS).map((key, i) => <li key={i} tabIndex="0" data-sort={key}
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

PlacesSorting.propTypes = {
  sort: PropTypes.oneOf([`popular`, `to-high`, `to-low`, `top-rated`]),
  isVisible: PropTypes.bool,
  onSortChange: PropTypes.func.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
};

export default PlacesSorting;
