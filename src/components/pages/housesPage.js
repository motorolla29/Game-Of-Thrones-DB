import React, { Component } from 'react';
import GotService from '../../services/gotService';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component {
  gotService = new GotService();
  state = {
    selectedHouse: null,
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  onItemSelected = (id) => {
    this.setState({
      selectedHouse: id,
    });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllHouses}
        renderItem={({ name }) => name}
      />
    );

    const houseDetails = (
      <ItemDetails
        getItem={(id) => this.gotService.getHouses(id)}
        itemsType="house"
        itemId={this.state.selectedHouse}
      >
        <Field field="name" label="Name" />
        <Field field="region" label="Region" />
        <Field field="words" label="Words" />
        <Field field="titles" label="Titles" />
        <Field field="overlord" label="Overlord" />
        <Field field="ancestralWeapons" label="Ancestral weapons" />
      </ItemDetails>
    );

    return <RowBlock left={itemList} rigth={houseDetails} />;
  }
}
