import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {placeCard} from "../../common/global-prop-types";

const withHandleFavoritesClick = (Component) => {
  class WithHandleFavoritesClick extends PureComponent {
    constructor(props) {
      super(props);

      this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onFavoritesClick={this._handleFavoritesClick}
      />;
    }

    _handleFavoritesClick() {
      const {offer, onFavoritesClick} = this.props;
      onFavoritesClick(offer.id, offer.isFavorite);
    }
  }

  WithHandleFavoritesClick.propTypes = {
    offer: PropTypes.exact(placeCard).isRequired,
    onFavoritesClick: PropTypes.func,
  };

  return WithHandleFavoritesClick;
};

export default withHandleFavoritesClick;
