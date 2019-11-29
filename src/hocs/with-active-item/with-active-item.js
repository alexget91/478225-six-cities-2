import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const PropNames = {
  ACTIVE_ITEM: `activeItem`,
  ON_ACTIVE_ITEM_CHANGE: `onActiveItemChange`,
};

const transformPropNames = (newItem, newCallback, props) => {
  const newProps = Object.assign({}, props, {
    [newItem]: props[PropNames.ACTIVE_ITEM],
    [newCallback]: props[PropNames.ON_ACTIVE_ITEM_CHANGE],
  });

  delete newProps[PropNames.ACTIVE_ITEM];
  delete newProps[PropNames.ON_ACTIVE_ITEM_CHANGE];

  return newProps;
};

const withActiveItem = (Component, defaultActiveItem) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        [PropNames.ACTIVE_ITEM]: defaultActiveItem,
      };

      this._activeItemChangeHandler = this._activeItemChangeHandler.bind(this);
    }

    render() {
      const newProps = {
        [PropNames.ACTIVE_ITEM]: this.state[PropNames.ACTIVE_ITEM],
        [PropNames.ON_ACTIVE_ITEM_CHANGE]: this._activeItemChangeHandler,
      };

      return <Component
        {...this.props}
        {...newProps}
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

export {PropNames, transformPropNames};

export default withActiveItem;
