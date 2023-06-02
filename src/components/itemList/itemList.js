import React, { useState, useEffect } from 'react';
import './itemList.css';
import Spinner from '../spinner';

export default function ItemList({ getData, onItemSelected, renderItem }) {
  const [itemList, updateList] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      updateList(data);
    });
  }, [getData]);

  function renderItems(items) {
    return items.map((item) => {
      const { id } = item;
      const label = renderItem(item);
      return (
        <li
          key={id}
          onClick={() => {
            onItemSelected(id);
          }}
          className="list-group-item"
        >
          {label}
        </li>
      );
    });
  }

  if (!itemList) {
    return <Spinner />;
  }

  const items = renderItems(itemList);

  return <ul className="item-list list-group">{items}</ul>;
}
