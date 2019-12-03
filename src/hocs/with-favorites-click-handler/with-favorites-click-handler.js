import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {placeCard} from "../../common/global-prop-types";

const withFavoritesClickHandler = (Component) => {
  class WithFavoritesClickHandler extends PureComponent {
    constructor(props) {
      super(props);

      this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onFavoritesClick={this._favoritesClickHandler}
      />;
    }

    _favoritesClickHandler() {
      const {offer, onFavoritesClick} = this.props;
      onFavoritesClick(offer.id, offer.isFavorite);
    }
  }

  WithFavoritesClickHandler.propTypes = {
    offer: PropTypes.exact(placeCard).isRequired,
    onFavoritesClick: PropTypes.func,
  };

  return WithFavoritesClickHandler;
};

export default withFavoritesClickHandler;
