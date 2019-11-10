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

    this._sortTitleClickHandler = this._sortTitleClickHandler.bind(this);
    this._sortItemClickHandler = this._sortItemClickHandler.bind(this);
    this._documentClickHandler = this._documentClickHandler.bind(this);

    this.state = {
      listIsVisible: false
    };
  }

  render() {
    const {sort} = this.props;
    const {listIsVisible} = this.state;

    return <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>&nbsp;
      <span className="places__sorting-type" tabIndex="0" onClick={this._sortTitleClickHandler}>
        {OPTIONS[sort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${listIsVisible ? ` places__options--opened` : ``}`}>
        {Object.keys(OPTIONS).map((key, i) => <li key={i} tabIndex="0" data-sort={key}
          className={`places__option${key === sort ? ` places__option--active` : ``} js-sorting-option`}
          onClick={this._sortItemClickHandler}>
          {OPTIONS[key]}
        </li>)}
      </ul>
      {/*
      <select className="places__sorting-type" id="places-sorting" value={sort} onChange={(evt) => {
        onSortChange(evt.target.value);
      }}>
        {Object.keys(OPTIONS).map((key, i) => <option key={i} className="places__option" value={key}>{OPTIONS[key]}</option>)}
      </select>
      */}
    </form>;
  }

  componentDidUpdate() {
    const {listIsVisible} = this.state;

    if (listIsVisible) {
      document.addEventListener(`click`, this._documentClickHandler);
    }
  }

  _documentClickHandler() {
    this.setState({listIsVisible: false});
    document.removeEventListener(`click`, this._documentClickHandler);
  }

  _sortTitleClickHandler() {
    this.setState({listIsVisible: !this.state.listIsVisible});
  }

  _sortItemClickHandler(evt) {
    this.props.onSortChange(evt.target.dataset.sort);
  }
}

PlacesSorting.propTypes = {
  sort: PropTypes.oneOf([`popular`, `to-high`, `to-low`, `top-rated`]),
  onSortChange: PropTypes.func.isRequired,
};

export default PlacesSorting;
