import React, {PureComponent} from "react";

const withOpenable = (Component) => class WithOpenable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };

    this._visibilityChangeHandler = this._visibilityChangeHandler.bind(this);
    this._documentClickHandler = this._documentClickHandler.bind(this);
  }

  render() {
    const {isVisible} = this.state;

    return <Component
      {...this.props}
      isVisible={isVisible}
      onVisibilityChange={this._visibilityChangeHandler}
    />;
  }

  componentDidUpdate() {
    const {isVisible} = this.state;

    if (isVisible) {
      document.addEventListener(`click`, this._documentClickHandler);
    }
  }

  _documentClickHandler() {
    this.setState({isVisible: false});
    document.removeEventListener(`click`, this._documentClickHandler);
  }

  _visibilityChangeHandler() {
    this.setState({isVisible: !this.state.isVisible});
  }
};

export default withOpenable;
