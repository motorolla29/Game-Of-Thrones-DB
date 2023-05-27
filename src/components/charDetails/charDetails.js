import React, { Component } from 'react';
import './charDetails.css';
import GotService from '../../services/gotService';

export default class CharDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      char: {},
      keysChar: ['name', 'gender', 'born', 'died', 'culture'],
    };
  }
  gotService = new GotService();

  getChar(id) {
    this.gotService.getCharacter(id).then((data) => {
      this.state.keysChar.forEach((key) => {
        if (data[key] === '') {
          data[key] = 'No data :(';
        }
      });

      this.setState({
        char: data,
      });
    });
  }

  componentDidMount() {
    this.getChar(100);
  }

  componentDidUpdate(props) {
    this.getChar(props.charId);
  }

  render() {
    const { name, gender, born, died, culture } = this.state.char;
    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Born</span>
            <span>{born}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Died</span>
            <span>{died}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Culture</span>
            <span>{culture}</span>
          </li>
        </ul>
      </div>
    );
  }
}
