import React, { Component } from 'react';
import './charDetails.css';
import GotService from '../../services/gotService';

export default class CharDetails extends Component {
  state = {
    char: null,
  };
  gotService = new GotService();

  updateChar() {
    const { charId } = this.props;

    if (!charId) {
      return;
    }

    this.gotService.getCharacter(charId).then((char) => {
      this.setState({ char });
    });
  }

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevPops) {
    if (this.props.charId !== prevPops.charId) {
      this.updateChar();
    }
  }

  render() {
    if (!this.state.char) {
      return <span className="select-error">Please select a character</span>;
    }

    const { name, gender, born, died, culture } = this.state.char;

    return (
      <div className="char-details rounded">
        <h4>{name || 'no data'}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Gender</span>
            <span>{gender || 'no data'}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Born</span>
            <span>{born || 'no data'}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Died</span>
            <span>{died || 'no data'}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Culture</span>
            <span>{culture || 'no data'}</span>
          </li>
        </ul>
      </div>
    );
  }
}
