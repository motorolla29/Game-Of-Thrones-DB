import React, { Component } from 'react';
import './itemList.css';
import Spinner from '../spinner';
import PropTypes from 'prop-types';
export default class ItemList extends Component {
  state = {
    itemList: null,
  };

  static propTypes = {
    onItemSelected: PropTypes.func,
    getData: PropTypes.arrayOf(PropTypes.object),
  };

  componentDidMount() {
    const { getData } = this.props;
    getData().then((itemList) => {
      this.setState({
        itemList,
      });
    });
  }

  renderItems(items) {
    return items.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);
      return (
        <li
          key={id}
          onClick={() => {
            this.props.onItemSelected(id);
          }}
          className="list-group-item"
        >
          {label}
        </li>
      );
    });
  }

  render() {
    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner />;
    }

    const items = this.renderItems(itemList);
    return <ul className="item-list list-group">{items}</ul>;
  }
}
