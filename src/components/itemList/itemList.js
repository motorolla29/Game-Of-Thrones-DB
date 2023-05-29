import React, { Component } from 'react';
import './itemList.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
export default class ItemList extends Component {
  state = {
    charList: null,
  };
  gotService = new GotService();

  componentDidMount() {
    this.gotService.getAllCharacters().then((charList) => {
      this.setState({
        charList,
      });
    });
  }

  renderItems(items) {
    return items.map((item, id) => {
      return (
        <li
          key={id}
          onClick={() => {
            this.props.onCharSelected(41 + id);
          }}
          className="list-group-item"
        >
          {item.name}
        </li>
      );
    });
  }

  render() {
    const { charList } = this.state;

    if (!charList) {
      return <Spinner />;
    }

    const items = this.renderItems(charList);
    return <ul className="item-list list-group">{items}</ul>;
  }
}
