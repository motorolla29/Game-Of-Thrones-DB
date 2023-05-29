import React, { Component } from 'react';
import './charDetails.css';
import GotService from '../../services/gotService';

const Field = ({ char, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{char[field] || 'no data'}</span>
    </li>
  );
};

export { Field };
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

    const { char } = this.state;
    const { name } = char;

    return (
      <div className="char-details rounded">
        <h4>{name || 'no data'}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { char });
          })}
        </ul>
      </div>
    );
  }
}
