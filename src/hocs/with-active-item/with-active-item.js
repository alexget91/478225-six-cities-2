import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component, defaultActiveItem) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: defaultActiveItem,
      };

      this._activeItemChangeHandler = this._activeItemChangeHandler.bind(this);
    }

    render() {
      const {activeItem} = this.state;

      return <Component
        {...this.props}
        activeItem={activeItem}
        onActiveItemChange={this._activeItemChangeHandler}
      />;
    }

    _activeItemChangeHandler(activeItem) {
      this.setState({activeItem});
    }
  }

  WithActiveItem.propTypes = {
    defaultActiveItem: PropTypes.string
  };

  return WithActiveItem;
};

export default withActiveItem;
