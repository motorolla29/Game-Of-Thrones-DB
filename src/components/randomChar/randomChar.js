import React, { Component } from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

export default class RandomChar extends Component {
  gotService = new GotService();

  state = { char: {}, loading: true, error: false };

  static defaultProps = {
    interval: 5000,
  };

  static propTypes = {
    interval: PropTypes.number,
    // interval: (props, propName, componentName) => {
    //   const value = props[propName];
    //   if (typeof value === 'number' && !isNaN(value)) {
    //     return null;
    //   }
    //   return new TypeError(`${componentName}: ${propName} must be a number`);
    // },
  };

  componentDidMount() {
    this.updateChar();
    this.timerId = setInterval(this.updateChar, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * 140 + 25);
    this.gotService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
      <div className="random-block rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;

  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender || 'no data'}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born || 'no data'}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{died || 'no data'}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture </span>
          <span>{culture || 'no data'}</span>
        </li>
      </ul>
    </>
  );
};
