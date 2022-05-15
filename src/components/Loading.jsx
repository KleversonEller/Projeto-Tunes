import React from 'react';
import PropTypes from 'prop-types';
import loading from '../images/onda-sonora.gif';

class Loading extends React.Component {
  render() {
    const { wid } = this.props;
    return (
      <img
        src={ loading }
        width={ wid }
        alt="Gif de ondas sonoras"
      />
    );
  }
}

Loading.propTypes = {
  wid: PropTypes.string,
}.isRequired;

export default Loading;
